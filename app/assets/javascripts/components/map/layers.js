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
      visible: false,
      zIndex: 0
    })
  },

  surfaceWater: (liklihood, band) => {
    const dynamicLayers = [
      '[{"id":2,"name":"RoFSW_Extent_1in30","source":{"type":"mapLayer","mapLayerId":2},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[102,131,174,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}}]',
      '[{"id":4,"name":"RoFSW_Extent_1in100","source":{"type":"mapLayer","mapLayerId":4},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[102,131,174,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}}]',
      '[{"id":6,"name":"RoFSW_Extent_1in1000","source":{"type":"mapLayer","mapLayerId":6},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[102,131,174,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}}]'
    ]
    return new TileLayer({
      ref: `surfaceWater${liklihood}${band}`,
      className: 'defra-map-raster-canvas',
      source: new TileArcGISRest({
        url: 'https://environment.data.gov.uk/arcgis/rest/services/EA/RiskOfFloodingFromSurfaceWaterBasic/MapServer',
        projection: 'EPSG:27700',
        params: {
          'TRANSPARENT': true,
          'FORMAT': 'GIF',
          // 'dynamicLayers' : '[{"id":2,"name":"RoFSW_Extent_1in30","source":{"type":"mapLayer","mapLayerId":2},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[0,48,120,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}},{"id":4,"name":"RoFSW_Extent_1in100","source":{"type":"mapLayer","mapLayerId":4},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[76,230,0,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}},{"id":6,"name":"RoFSW_Extent_1in1000","source":{"type":"mapLayer","mapLayerId":6},"drawingInfo":{"renderer":{"type":"simple","symbol":{"color":[197,0,255,255],"outline":{"color":[0,0,0,0],"width":0.4,"type":"esriSLS","style":"esriSLSNull"},"type":"esriSFS","style":"esriSFSSolid"}}}}]',
          'dynamicLayers' : dynamicLayers[liklihood]
          // 'layers': 'show:6'
        }
      }),
      visible: false,
      zIndex: 1
    })
  },

  riverSea: (liklihood) => {
    return new TileLayer({
      ref: `riverSea${liklihood}`,
      className: 'defra-map-raster-canvas',
      source: new TileArcGISRest({
        url: 'https://environment.data.gov.uk/arcgis/rest/services/EA/RiskOfFloodingFromRiversAndSea/MapServer',
        projection: 'EPSG:27700',
        params: {
          'TRANSPARENT': true,
          'FORMAT': 'GIF',
          // 'dynamicLayers' : '[{"id":0,"name":"Risk_of_Flooding_from_Rivers_and_Sea","source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"uniqueValue","field1":"prob_4band","uniqueValueInfos":[{"value":"High","label":"High","symbol":{"color":[102,131,174,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Medium","label":"Medium","symbol":{"color":[237,81,81,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Low","label":"Low","symbol":{"color":[20,158,206,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Very Low","label":"Very Low","symbol":{"color":[158,85,156,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}]},"showLabels":false}}]'
          'dynamicLayers' : `[{"id":0,"name":"Risk_of_Flooding_from_Rivers_and_Sea","source":{"type":"mapLayer","mapLayerId":0},"drawingInfo":{"renderer":{"type":"uniqueValue","field1":"prob_4band","uniqueValueInfos":[{"value":"High","label":"High","symbol":{"color":[102,131,174,255],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Medium","label":"Medium","symbol":{"color":[${liklihood > 1 ? '102,131,174,255' : '0,0,0,0'}],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Low","label":"Low","symbol":{"color":[${liklihood > 2 ? '102,131,174,255' : '0,0,0,0'}],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}},{"value":"Very Low","label":"Very Low","symbol":{"color":[0,0,0,0],"outline":{"color":[0,0,0,0],"width":0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}]},"showLabels":false}}]`
        }
      }),
      visible: false,
      zIndex: 1
    })
  }
}
