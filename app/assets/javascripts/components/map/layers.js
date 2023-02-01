'use strict'
/*
Initialises the window.flood.maps layers
*/
import TileLayer from 'ol/layer/WebGLTile'
import { TileArcGISRest } from 'ol/source'
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

  road27700: () => {
    return new TileLayer({
      ref: 'road',
      className: 'defra-map-bg-canvas',
      source: new XYZ({
        url: `https://api.os.uk/maps/raster/v1/zxy/Outdoor_27700/{z}/{x}/{y}.png?key=${osApiKey}`,
        projection: 'EPSG:27700',
        tileGrid: window.flood.maps.tilegrid,
        attributions: `Contains OS data<br/>&copy; Crown copyright and database rights ${(new Date()).getFullYear()}`
      }),
      visible: false,
      zIndex: 0
    })
  },

  surfaceWaterDepthHigh: () => {
    return new TileLayer({
      ref: 'surfaceWaterDepthHigh',
      source: new TileArcGISRest({
        url: 'https://environment.data.gov.uk/arcgis/rest/services/EA/RiskOfFloodingFromSurfaceWaterBasic/MapServer',
        projection: 'EPSG:27700',
        // params: {'TRANSPARENT': false, 'LAYERS': 'RoFSW_Extent_1in30'}
        params: { 'TRANSPARENT': true }
      }),
      // source: new TileWMS({
      //   url: 'https://environment.data.gov.uk/spatialdata/risk-of-flooding-from-surface-water-extent-3-3-percent-annual-chance/wms',
      //   params: {'LAYERS': '1', 'TILED': true },
      //   attributions: `Usage information ${(new Date()).getFullYear()}`
      // }),
      visible: false,
      zIndex: 1
    })
  }
}
