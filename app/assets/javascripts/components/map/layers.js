'use strict'
/*
Initialises the window.flood.maps layers
*/
import { Tile as TileLayer, Vector as VectorLayer, VectorTile as VectorTileLayer } from 'ol/layer' // VectorTile as VectorTileLayer for vector tiles
import WebGLPointsLayer from 'ol/layer/WebGLPoints'
import { BingMaps, OSM, Vector as VectorSource, VectorTile as VectorTileSource } from 'ol/source' // VectorTile as VectorTileSource for vector tiles
import { GeoJSON, MVT } from 'ol/format' // MVT for vector tiles

window.flood.maps.layers = {

  road: () => {
    return new TileLayer({
      ref: 'road',
      source: new OSM(),
      /*
      source: new BingMaps({
        key: 'AvRzILjH5stoE_Mt6C08M051nlcQL9vWaWlMrcIjktGcFBgvjTV0TWULhTYL-4-s', // + '&c4w=1&cstl=rd&src=h&st=ar|fc:b5db81_wt|fc:a3ccff_tr|fc:50a964f4;sc:50a964f4_ard|fc:ffffff;sc:ffffff_rd|fc:50fed89d;sc:50eab671;lbc:626a6e_mr|lbc:626a6e_hr|lbc:626a6e_st|fc:ffffff;sc:ffffff_g|lc:dfdfdf_trs|lbc:626a6e',
        imagerySet: 'RoadOnDemand',
        hidpi: true
      }),
      */
      visible: false,
      zIndex: 0
    })
  },

  satellite: () => {
    return new TileLayer({
      ref: 'satellite',
      source: new BingMaps({
        key: 'AvRzILjH5stoE_Mt6C08M051nlcQL9vWaWlMrcIjktGcFBgvjTV0TWULhTYL-4-s',
        imagerySet: 'AerialWithLabelsOnDemand'
      }),
      visible: false,
      zIndex: 0
    })
  }
}
