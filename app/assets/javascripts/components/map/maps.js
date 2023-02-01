'use strict'
/*
  Intialises the window.flood.maps object with extent and center
  Risk map uses BNG 27700
*/
import { transform, transformExtent } from 'ol/proj'
import TileGrid from 'ol/tilegrid/TileGrid'

import * as proj4 from 'proj4'
import { register as registerProj4 } from 'ol/proj/proj4'

// Proj4 defs
proj4.default.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs')
registerProj4(proj4.default)

window.flood.maps = {

  // Extent of England and Wales
  extent: transformExtent([
    -5.75447,
    49.93027,
    1.799683,
    55.84093
  ], 'EPSG:4326', 'EPSG:27700'),

  // A large extent that allows restricting but full map view
  extentLarge: transformExtent([
    -15.75447,
    46.93027,
    10.799683,
    58.84093
  ], 'EPSG:4326', 'EPSG:27700'),

  // Centre of England and Wales (approx)
  centre: transform([
    -1.4758,
    52.9219
  ], 'EPSG:4326', 'EPSG:27700'),

  tilegrid: new TileGrid({
    resolutions: [ 896.0, 448.0, 224.0, 112.0, 56.0, 28.0, 14.0, 7.0, 3.5, 1.75 ],
    origin: [ -238375.0, 1376256.0 ]
  }),

  // Set a map extent from a array of lonLat's
  setExtentFromLonLat: (map, extent, padding = 0) => {
    padding = [padding, padding, padding, padding]
    extent = transformExtent(extent, 'EPSG:4326', 'EPSG:27700')
    map.getView().fit(extent, { constrainResolution: false, padding: padding })
  },

  // Get array of lonLat's from an extent object
  getLonLatFromExtent: (extent) => {
    extent = transformExtent(extent, 'EPSG:27700', 'EPSG:4326')
    const ext = extent.map(x => { return parseFloat(x.toFixed(6)) })
    return ext
  }
}
