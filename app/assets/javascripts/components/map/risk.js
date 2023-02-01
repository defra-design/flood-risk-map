'use strict'

// Flood risk map
import { View } from 'ol'
import { defaults as defaultInteractions } from 'ol/interaction'
import { Control } from 'ol/control'
import * as proj4 from 'proj4'
import { register as registerProj4 } from 'ol/proj/proj4'


const { addOrUpdateParameter, getParameterByName, forEach } = window.flood.utils
const maps = window.flood.maps
const { setExtentFromLonLat, getLonLatFromExtent } = window.flood.maps
const MapContainer = maps.MapContainer

function RiskMap (mapId, options) {
  // Proj4 defs
  proj4.default.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs')
  registerProj4(proj4.default)

  // Scenario
  let scenario = 1

  // View
  const view = new View({
    projection: 'EPSG:27700',
    resolutions: maps.tilegrid.getResolutions(),
    zoom: 7,
    minZoom: 0,
    maxZoom: 9,
    // extent: maps.extent27700,
    // center: maps.center27700
    extent: [ -238375.0, 0.0, 900000.0, 1376256.0 ],
    center: [ 337297, 503695 ]
  })

  // Layers
  const road = maps.layers.road27700()
  const surfaceWater = maps.layers.surfaceWater()
  const riverSea = maps.layers.riverSea()

  // Configure default interactions
  const interactions = defaultInteractions({
    pinchRotate: false
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
    // layers: [road, riverSea, surfaceWater],
    layers: [road, surfaceWater, riverSea],
    controls: [scenarioControl],
    queryParamKeys: ['v'],
    interactions: interactions,
    originalTitle: options.originalTitle,
    title: options.title,
    heading: options.heading,
    keyTemplate: 'key-risk.html',
    isBack: options.isBack
  }

  // Create MapContainer
  const container = new MapContainer(mapId, containerOptions)
  const containerElement = container.containerElement
  const closeInfoButton = container.closeInfoButton
  const openKeyButton = container.openKeyButton
  const closeKeyButton = container.closeKeyButton
  const attributionButton = container.attributionButton
  const keyElement = container.keyElement
  const map = container.map

  //
  // Private methods
  //

  // Set feature visiblity
  const setFeatureVisibility = () => {
    console.log('setFeatureVisibility')
  }

  // Set scenario
  const setScenarioButton = () => {
    forEach(document.querySelectorAll('.defra-map-scenario-button'), (button, i) => {
      button.setAttribute('aria-selected', i + 1 === scenario)
    })
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

  //
  // Setup
  //

  // Define map extent
  // let extent
  // if (getParameterByName('ext')) {
  //   extent = getParameterByName('ext').split(',').map(Number)
  // } else {
  //   extent = getLonLatFromExtent(maps.extent)
  // }

  // Set map viewport
  // setExtentFromLonLat(map, extent)

  // Show layers
  road.setVisible(true)
  surfaceWater.setVisible(true)
  // riverSea.setVisible(true)

  // Centre map on bbox
  // if (options.extent && options.extent.length) {
  //   maps.setExtentFromLonLat(map, options.extent)
  // }

  //
  // Events
  //

  // Show scenarios if map is clicked
  map.addEventListener('click', (e) => {
    showScenarios()
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

  // Scenario button
  forEach(document.querySelectorAll('.defra-map-scenario-button'), (button) => {
    button.addEventListener('click', (e) => {
      e.currentTarget.focus()
      scenario = parseInt(e.currentTarget.getAttribute('data-scenario'), 10)
      setFeatureVisibility()
      setScenarioButton()
    })
  })

  // Key checkbox click
  keyElement.addEventListener('click', (e) => {
    if (e.target.nodeName === 'INPUT') {
      state.visibleRiskLevels = [...keyElement.querySelectorAll('input:checked')].map(e => parseInt(e.getAttribute('data-risk-level'), 10))
      setFeatureVisibility()
    }
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
