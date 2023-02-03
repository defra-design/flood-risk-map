'use strict'

// Flood risk map
import { View } from 'ol'
import { transform, transformExtent } from 'ol/proj'
import { containsExtent } from 'ol/extent'
import { defaults as defaultInteractions } from 'ol/interaction'
import { Control } from 'ol/control'

const { addOrUpdateParameter, getParameterByName, forEach } = window.flood.utils
const maps = window.flood.maps
const { setExtentFromLonLat, getLonLatFromExtent } = window.flood.maps
const MapContainer = maps.MapContainer

function RiskMap (mapId, options) {
  // State object
  const state = {
    initialExt: [],
    scenario: 1,
    lyrCode: 'ae'
  }

  // View
  const view = new View({
    projection: 'EPSG:27700',
    resolutions: maps.tilegrid.getResolutions(),
    zoom: 7,
    minZoom: 0,
    maxZoom: 9,
    extent: maps.extent,
    center: maps.centre
  })

  // Layers
  const road = maps.layers.road()
  const surfaceWater1 = maps.layers.surfaceWater(1)
  const surfaceWater1d = maps.layers.surfaceWaterDepth(1)
  const surfaceWater1s = maps.layers.surfaceWaterSpeed(1)
  const surfaceWater2 = maps.layers.surfaceWater(2)
  const surfaceWater2d = maps.layers.surfaceWaterDepth(2)
  const surfaceWater2s = maps.layers.surfaceWaterSpeed(2)
  const surfaceWater3 = maps.layers.surfaceWater(3)
  const surfaceWater3d = maps.layers.surfaceWaterDepth(3)
  const surfaceWater3s = maps.layers.surfaceWaterSpeed(3)
  const riverSea1 = maps.layers.riverSea(1)
  const riverSea2 = maps.layers.riverSea(2)
  const riverSea3 = maps.layers.riverSea(3)
  const stations = maps.layers.stations()

  const baseLayers = [
    road
  ]

  const dataLayers = [
    surfaceWater1,
    surfaceWater1d,
    surfaceWater1s,
    surfaceWater2,
    surfaceWater2d,
    surfaceWater2s,
    surfaceWater3,
    surfaceWater3d,
    surfaceWater3s,
    riverSea1,
    riverSea2,
    riverSea3,
    stations
  ]

  const layers = baseLayers.concat(dataLayers)

  // Configure default interactions
  const interactions = defaultInteractions({
    pinchRotate: false
  })

  // Add OS copyright logo
  const osLogoImage = document.createElement('img')
  osLogoImage.className = 'defra-map-os-logo'
  osLogoImage.setAttribute('alt', 'Ordnance Survey logo')
  osLogoImage.src = '/public/images/map-os-logo.png'
  osLogoImage.width = 90
  osLogoImage.height = 24
  const osLogo = new Control({
    element: osLogoImage
  })

  // Create scenario control
  const scenarioElement = document.createElement('div')
  scenarioElement.id = 'map-scenarios'
  scenarioElement.className = 'defra-map-scenarios'
  scenarioElement.innerHTML = window.nunjucks.render('scenarios.html')

  const scenarioControl = new Control({
    element: scenarioElement
  })
  
  // Options to pass to the MapContainer constructor
  const containerOptions = {
    view: view,
    layers: layers,
    controls: [osLogo, scenarioControl],
    queryParamKeys: ['v'],
    interactions: interactions,
    originalTitle: options.originalTitle,
    title: options.title,
    heading: options.heading,
    keyTemplate: 'key-risk.html',
    isBack: options.isBack,
    class: 'defra-map--risk'
  }

  // Create MapContainer
  const container = new MapContainer(mapId, containerOptions)
  const containerElement = container.containerElement
  const resetButton = container.resetButton
  const closeInfoButton = container.closeInfoButton
  const openKeyButton = container.openKeyButton
  const closeKeyButton = container.closeKeyButton
  const attributionButton = container.attributionButton
  const keyElement = container.keyElement
  const map = container.map

  //
  // Private methods
  //

  // Set scenario
  const setScenarioButton = () => {
    forEach(document.querySelectorAll('.defra-map-scenario-button'), (button, i) => {
      button.setAttribute('aria-selected', i + 1 === state.scenario)
    })
    // Re-apply style to stations layer when scenario changes
    if (stations.getVisible()) {
      stations.setStyle(stations.getStyle())
    }
  }

  // Hide scenario control
  const hideScenarios = () => {
    scenarioElement.style.display = 'none'
    scenarioElement.setAttribute('open', false)
    scenarioElement.removeAttribute('aria-modal')
    scenarioElement.setAttribute('aria-hidden', true)
  }

  // Show scenario control
  const showScenarios = () => {
    scenarioElement.style.display = 'block'
    scenarioElement.setAttribute('open', true)
    scenarioElement.setAttribute('aria-modal', true)
    scenarioElement.removeAttribute('aria-hidden')
  }

  // Update url and replace history state
  const replaceHistory = (key, value) => {
    const data = { v: mapId, isBack: options.isBack, initialExt: state.initialExt }
    const uri = addOrUpdateParameter(window.location.href, key, value)
    const title = document.title
    window.history.replaceState(data, title, uri)
  }

  // Compare two lonLat extent arrays and return true if they are different
  const isNewExtent = (newExt) => {
    // Check either lons or lats are the same
    const isSameLon1 = newExt[0] < (state.initialExt[0] + 0.0001) && newExt[0] > (state.initialExt[0] - 0.0001)
    const isSameLon2 = newExt[2] < (state.initialExt[2] + 0.0001) && newExt[2] > (state.initialExt[2] - 0.0001)
    const isSameLat1 = newExt[1] < (state.initialExt[1] + 0.0001) && newExt[1] > (state.initialExt[1] - 0.0001)
    const isSameLat2 = newExt[3] < (state.initialExt[3] + 0.0001) && newExt[3] > (state.initialExt[3] - 0.0001)
    const isSameWidth = isSameLon1 && isSameLon2
    const isSameHeight = isSameLat1 && isSameLat2
    // Check extent is within original extent
    const initialExtent = transformExtent(state.initialExt, 'EPSG:4326', 'EPSG:27700')
    const newExtent = transformExtent(newExt, 'EPSG:4326', 'EPSG:27700')
    const isNewWithinInitital = containsExtent(newExtent, initialExtent)
    return !((isSameWidth || isSameHeight) && isNewWithinInitital)
  }

  // Show or hide layers
  const toggleLayerVisibility = (code) => {
    dataLayers.forEach(layer => {
      const isVisible = layer.get('layerCodes').includes(code)
      layer.setVisible(isVisible)
    })
    osLogoImage.style.display = 'block'
  }

  //
  // Setup
  //

  // Define map extent
  let extent
  if (getParameterByName('ext')) {
    extent = getParameterByName('ext').split(',').map(Number)
  } else if (options.extent && options.extent.length) {
    extent = options.extent.map(x => { return parseFloat(x.toFixed(6)) })
  } else {
    extent = getLonLatFromExtent(maps.extent)
  }

  // Set map viewport
  if (!getParameterByName('ext') && options.centre) {
    container.map.getView().setCenter(transform(options.centre, 'EPSG:4326', 'EPSG:3857'))
    container.map.getView().setZoom(options.zoom || 6)
  } else {
    setExtentFromLonLat(container.map, extent)
  }

  // Store extent for use with reset button
  state.initialExt = window.history.state.initialExt || getLonLatFromExtent(container.map.getView().calculateExtent(container.map.getSize()))

  // Set layers, key and scenario buttons from querystring
  if (getParameterByName('lyr')) {
    const code = getParameterByName('lyr')
    // Need some validation
    state.scenario = parseInt(code.charAt(2), 10)
    // Global referecne for usein style function
    maps.scenario = state.scenario
    toggleLayerVisibility(code)
    state.lyrCode = code.slice(0, 2)
    const radios = document.querySelectorAll('.defra-map-key input[type=radio]')
    forEach(radios, radio => radio.checked = state.lyrCode === radio.value)
    setScenarioButton()
  }

  //
  // Events
  //

  // Set key symbols, opacity, history and overlays on map pan or zoom (fires on map load aswell)
  let historyTimer = null
  container.map.addEventListener('moveend', (e) => {
    // Listeners can remain after map has been removed
    if (!container.map) return
    // Timer used to stop 100 url replaces in 30 seconds limit
    clearTimeout(historyTimer)
    // Tasks dependent on a time delay
    historyTimer = setTimeout(() => {
      if (!container.map) return
      // Update url (history state) to reflect new extent
      const ext = getLonLatFromExtent(container.map.getView().calculateExtent(container.map.getSize()))
      replaceHistory('ext', ext.join(','))
      // Show reset button if extent has changed
      if (isNewExtent(ext)) resetButton.removeAttribute('disabled')
      // Fix margin issue
      container.map.updateSize()
    }, 350)
  })

  // Show scenarios if map is clicked
  map.addEventListener('click', (e) => {
    showScenarios()
  })

  // Reset map extent on reset button click
  resetButton.addEventListener('click', (e) => {
    setExtentFromLonLat(container.map, state.initialExt)
    resetButton.setAttribute('disabled', '')
    viewport.focus()
  })

  // Handle all Risk Map specific key presses
  containerElement.addEventListener('keyup', (e) => {
    // Re-instate scenarios when key has been closed
    if (e.key === 'Escape') {
      showScenarios()
    }
  })

  // Hhide scenarios when key is opened
  openKeyButton.addEventListener('click', (e) => {
    hideScenarios()
  })

  // Re-instate scenarios when key has been closed
  closeKeyButton.addEventListener('click', (e) => {
    showScenarios()
  })

  // Clear selectedfeature when info is closed
  closeInfoButton.addEventListener('click', (e) => {
    showScenarios()
  })

  // Hide scenarios when attribution is opended
  attributionButton.addEventListener('click', (e) => {
    hideScenarios()
  })

  // Key radio button
  keyElement.addEventListener('click', (e) => {
    if (e.target.nodeName === 'INPUT' && e.target.type === 'radio') {
      e.stopPropagation()
      state.lyrCode = e.target.value
      const code = state.lyrCode.concat(state.scenario)
      toggleLayerVisibility(code)
      replaceHistory('lyr', code)
    }
  })

  // Scenario button
  forEach(document.querySelectorAll('.defra-map-scenario-button'), (button) => {
    button.addEventListener('click', (e) => {
      e.currentTarget.focus()
      state.scenario = parseInt(e.currentTarget.getAttribute('data-scenario'), 10)
      // Global referecne for use in style function
      maps.scenario = state.scenario
      const code = state.lyrCode.concat(state.scenario)
      toggleLayerVisibility(code)
      setScenarioButton()
      replaceHistory('lyr', code)
    })
  })
}

// Export a helper factory to create this map
// onto the `maps` object.
// (This is done mainly to avoid the rule
// "do not use 'new' for side effects. (no-new)")
maps.createRiskMap = (mapId, options = {}) => {
  // Set meta title and page heading
  options.originalTitle = document.title
  options.heading = 'Flood risk map'
  options.title = options.heading + ' - GOV.UK' // `Map view: ${document.title}`

  // Set initial history state
  if (!window.history.state) {
    const data = {}
    const title = options.title
    const uri = window.location.href
    window.history.replaceState(data, title, uri)
  }

  // Build default uri
  let uri = window.location.href
  uri = addOrUpdateParameter(uri, 'v', mapId)
  uri = addOrUpdateParameter(uri, 'lyr', options.layer || '')
  uri = addOrUpdateParameter(uri, 'ext', options.extent || '')

  // Create map button
  const btnContainer = document.getElementById(mapId)
  const button = document.createElement('button')
  button.id = mapId + '-btn'
  button.innerHTML = `<svg width="15" height="20" viewBox="0 0 15 20" focusable="false"><path d="M15,7.5c0.009,3.778 -4.229,9.665 -7.5,12.5c-3.271,-2.835 -7.509,-8.722 -7.5,-12.5c0,-4.142 3.358,-7.5 7.5,-7.5c4.142,0 7.5,3.358 7.5,7.5Zm-7.5,5.461c3.016,0 5.461,-2.445 5.461,-5.461c0,-3.016 -2.445,-5.461 -5.461,-5.461c-3.016,0 -5.461,2.445 -5.461,5.461c0,3.016 2.445,5.461 5.461,5.461Z" fill="currentColor"/></svg><span>${options.btnText || 'View map'}</span><span class="govuk-visually-hidden">(Visual only)</span>`
  button.className = options.btnClasses || 'defra-button-secondary defra-button-secondary--icon'
  btnContainer.parentNode.replaceChild(button, btnContainer)

  // Detect keyboard interaction
  window.addEventListener('keydown', (e) => {
    maps.isKeyboard = true
  })
  // Needs keyup to detect first tab into web area
  window.addEventListener('keyup', (e) => {
    maps.isKeyboard = true
  })
  window.addEventListener('pointerdown', (e) => {
    maps.isKeyboard = false
  })
  window.addEventListener('focusin', (e) => {
    if (maps.isKeyboard) {
      e.target.setAttribute('keyboard-focus', '')
    }
  })
  window.addEventListener('focusout', (e) => {
    forEach(document.querySelectorAll('[keyboard-focus]'), (element) => {
      element.removeAttribute('keyboard-focus')
    })
  })

  // Create map on button press
  button.addEventListener('click', (e) => {
    // Advance history
    const data = { v: mapId, isBack: true }
    const title = options.title
    window.history.pushState(data, title, uri)
    options.isBack = true
    return new RiskMap(mapId, options)
  })

  // Recreate map on browser history change
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.v === mapId) {
      options.isBack = window.history.state.isBack
      return new RiskMap(e.state.v, options)
    }
  })

  // Recreate map on page refresh
  if (window.flood.utils.getParameterByName('v') === mapId) {
    options.isBack = window.history.state.isBack
    return new RiskMap(mapId, options)
  }
}
