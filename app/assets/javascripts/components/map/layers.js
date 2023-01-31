'use strict'
/*
Initialises the window.flood.maps layers
*/
import TileLayer from 'ol/layer/WebGLTile'
import TileWMS from 'ol/source/TileWMS'
import { XYZ } from 'ol/source'
const osApiKey = process.env.OS_API_KEY

//
// Vector source
//

window.flood.maps.layers = {

  //
  // Tile layers
  //

  // Default base map
  road: () => {
    return new TileLayer({
      ref: 'road',
      className: 'defra-map-bg-canvas',
      source: new XYZ({
        url: `https://api.os.uk/maps/raster/v1/zxy/Outdoor_3857/{z}/{x}/{y}.png?key=${osApiKey}`,
        attributions: `Contains OS data<br/>&copy; Crown copyright and database rights ${(new Date()).getFullYear()}`
      }),
      extent: window.flood.maps.extent,
      visible: false,
      zIndex: 0
    })
  },

  surfaceWaterDepthHigh: () => {
    return new TileLayer({
      ref: 'surfaceWaterDepthHigh',
      source: new TileWMS({
        url: '',
        params: {'LAYERS': '', 'TILED': true},
        attributions: `Usage information ${(new Date()).getFullYear()}`
      }),
      extent: window.flood.maps.extent,
      visible: true,
      zIndex: 0
    })
  }
}
