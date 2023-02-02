'use strict'
import 'elm-pep'
import './core'
import './build/templates'
import './nunjucks'
import './components/map/maps'
import './components/map/styles'
import './components/map/layers'
import './components/map/container'
import './components/map/risk'

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

document.addEventListener('DOMContentLoaded', () => {
  window.GOVUKFrontend.initAll()

  // Create Risk Map
  if (document.getElementById('risk-map')) {
    window.flood.maps.createRiskMap('risk-map', {
      btnText: 'View map showing flood risk areas',
      btnClasses: 'defra-button-secondary defra-button-secondary--icon',
      layer: 'ae1' // 'ae1,ae2,ae3,re1,re2,re3,sd1,sd2,sd3,ss1,ss2,ss3'
    })
  }
})
