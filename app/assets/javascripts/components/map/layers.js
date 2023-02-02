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

  road: () => {
    return new TileLayer({
      ref: 'road',
      className: 'defra-map-bg-canvas',
      source: new XYZ({
        url: `https://api.os.uk/maps/raster/v1/zxy/Outdoor_27700/{z}/{x}/{y}.png?key=${osApiKey}`,
        projection: 'EPSG:27700',
        tileGrid: window.flood.maps.tilegrid,
        attributions: `Contains OS data<br/>&copy; Crown copyright and database rights ${(new Date()).getFullYear()}`
      }),
      visible: true,
      zIndex: 0
    })
  },

  surfaceWater: (liklihood) => {
    const dynamicLayers = [
      '[{"id":2,"name":"RoFSW_Extent_1in30","source":{"type":"mapLayer","mapLayerId":2},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[127,151,187,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}}]',
      '[{"id":4,"name":"RoFSW_Extent_1in100","source":{"type":"mapLayer","mapLayerId":4},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[127,151,187,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}}]',
      '[{"id":6,"name":"RoFSW_Extent_1in1000","source":{"type":"mapLayer","mapLayerId":6},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[127,151,187,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}}]'
    ]
    return new TileLayer({
      ref: `surfaceWater${liklihood}`,
      className: 'defra-map-raster-canvas',
      layerCodes: `se${liklihood},ae${liklihood}`,
      source: new TileArcGISRest({
        url: 'https://environment.data.gov.uk/arcgis/rest/services/EA/RiskOfFloodingFromSurfaceWaterBasic/MapServer',
        projection: 'EPSG:27700',
        params: {
          'TRANSPARENT': true,
          'FORMAT': 'GIF',
          'dynamicLayers' : dynamicLayers[liklihood-1]
        }
      }),
      minZoom: 7,
      visible: false,
      zIndex: 1
    })
  },

  surfaceWaterDepth: (liklihood) => {
    const bands = ['RoFSWDepth1in30', 'RoFSWDepth1in100', 'RoFSWDepth1in1000']
    return new TileLayer({
      ref: `surfaceWaterDepth${liklihood}`,
      className: 'defra-map-raster-canvas',
      layerCodes: `sd${liklihood}`,
      source: new TileArcGISRest({
        url: `https://environment.data.gov.uk/arcgis/rest/services/EA/${bands[liklihood - 1]}/MapServer`,
        projection: 'EPSG:27700',
        params: {
          'TRANSPARENT': true,
          'FORMAT': 'GIF'
          // 'dynamicLayers' : '[{"id":0,"source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"uniqueValue","field1":"depth","uniqueValueInfos":[{"description":"","label":"Below 150mm","symbol":{"type":"esriSFS","color":[191,203,221,255],"outline":{"type":"esriSLS","color":[0,0,0,0],"width":0,"style":"esriSLSSolid"},"style":"esriSFSSolid"},"value":"0.00 - 0.15"},{"description":"","label":"150-300mm","symbol":{"type":"esriSFS","color":[191,203,221,255],"outline":{"type":"esriSLS","color":[0,0,0,0],"width":0,"style":"esriSLSSolid"},"style":"esriSFSSolid"},"value":"0.15 - 0.30"},{"description":"","label":"300-600mm","symbol":{"type":"esriSFS","color":[191,203,221,255],"outline":{"type":"esriSLS","color":[0,0,0,0],"width":0,"style":"esriSLSNull"},"style":"esriSFSSolid"},"value":"0.30 - 0.60"},{"description":"","label":"600-900mm","symbol":{"type":"esriSFS","color":[191,203,221,255],"outline":{"type":"esriSLS","color":[0,0,0,0],"width":0,"style":"esriSLSNull"},"style":"esriSFSSolid"},"value":"0.60 - 0.90"},{"description":"","label":"900-1200mm","symbol":{"type":"esriSFS","color":[64,100,154,0],"outline":{"type":"esriSLS","color":[0,0,0,0],"width":0,"style":"esriSLSNull"},"style":"esriSFSSolid"},"value":"0.90 - 1.20"},{"description":"","label":"Over 1200mm","symbol":{"type":"esriSFS","color":[64,100,154,0],"outline":{"type":"esriSLS","color":[0,0,0,0],"width":0,"style":"esriSLSNull"},"style":"esriSFSSolid"},"value":"> 1.20"}]}}}]'
        }
      }),
      minZoom: 7,
      visible: false,
      zIndex: 1
    })
  },

  surfaceWaterSpeed: (liklihood) => {
    const bands = ['RoFSWSpeed1in30', 'RoFSWSpeed1in100', 'RoFSWSpeed1in1000']
    return new TileLayer({
      ref: `surfaceWaterSpeed${liklihood}`,
      className: 'defra-map-raster-canvas',
      layerCodes: `ss${liklihood}`,
      source: new TileArcGISRest({
        url: `https://environment.data.gov.uk/arcgis/rest/services/EA/${bands[liklihood - 1]}/MapServer`,
        projection: 'EPSG:27700',
        params: {
          'TRANSPARENT': true,
          'FORMAT': 'GIF'
          // 'dynamicLayers' : '[{"id":0,"source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"uniqueValue","field1":"depth","uniqueValueInfos":[{"value":"0.00 - 0.25","label":"Less than 0.25 m/s","symbol":{"color":[191,203,221,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"0.25 - 0.50","label":"0.25 - 0.50 m/s","symbol":{"color":[64,100,154,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"0.50 - 1.00","label":"0.50 - 1.00 m/s","symbol":{"color":[64,100,154,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"1.00 - 2.00","label":"1.00 - 2.00 m/s","symbol":{"color":[64,100,154,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"> 2.00","label":"Over 2.00 m/s","symbol":{"color":[64,100,154,0],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}]},"showLabels":false}}]'
        }
      }),
      minZoom: 7,
      visible: false,
      zIndex: 1
    })
  },
  
  riverSea: (liklihood) => {
    return new TileLayer({
      ref: `riverSea${liklihood}`,
      className: 'defra-map-raster-canvas',
      layerCodes: `re${liklihood},ae${liklihood}`,
      source: new TileArcGISRest({
        url: 'https://environment.data.gov.uk/arcgis/rest/services/EA/RiskOfFloodingFromRiversAndSea/MapServer',
        projection: 'EPSG:27700',
        params: {
          'TRANSPARENT': true,
          'FORMAT': 'GIF',
          'dynamicLayers' : `[{"id":0,"name":"Risk_of_Flooding_from_Rivers_and_Sea","source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"uniqueValue","field1":"prob_4band","uniqueValueInfos":[{"value":"High","label":"High","symbol":{"color":[127,151,187,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Medium","label":"Medium","symbol":{"color":[${liklihood > 1 ? '127,151,187,255' : '0,0,0,0'}],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Low","label":"Low","symbol":{"color":[${liklihood > 2 ? '127,151,187,255' : '0,0,0,0'}],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Very Low","label":"Very Low","symbol":{"color":[0,0,0,0],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}]},"showLabels":false}}]`
        }
      }),
      minZoom: 7,
      visible: false,
      zIndex: 1
    })
  }
}
