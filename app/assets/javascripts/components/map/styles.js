'use strict'
/*
Sets up the window.flood.maps styles objects
*/
import { Style, Icon, Fill, Stroke, Text, RegularShape } from 'ol/style'

const createRectangle = () => {
  var canvas = document.createElement('canvas')
  canvas.width = 340
  canvas.height = 120
  var ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.fillStyle = 'white'
  // ctx.strokeStyle = '#0b0c0c'
  // ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  return new Style({
    image: new Icon({
      img: canvas,
      imgSize: [canvas.width, canvas.height],
      anchorYUnits: 'pixels',
      anchor: [0.5, 160],
      offset: [0, 0],
      scale: 0.5,
    })
  })
}

const createText = (value, units, offsetX) => {
  const fontLarge = 'bold 16px GDS Transport, Arial, sans-serif'
  const fontSmall = 'normal 14px GDS Transport, Arial, sans-serif'
  const text = [value, fontLarge, '\n', '', units, fontSmall]
  return new Style({
    text: new Text({
      text: text,
      textAlign: 'left',
      offsetY: -48,
      offsetX: offsetX
    })
  })
}

const createSymbol = (options) => {
  const defaults = {
    size: [100, 100],
    anchor: [0.5, 0.5],
    offset: [0, 0],
    scale: 0.5,
    zIndex: 1
  }
  options = Object.assign({}, defaults, options)
  return new Style({
    image: new Icon({
      src: '/public/images/map-symbols.png',
      size: options.size,
      anchor: options.anchor,
      offset: options.offset,
      scale: options.scale
    }),
    zIndex: options.zIndex
  })
}

window.flood.maps.styles = {
  stations: (feature, resolution) => {
    const scenario = window.flood.maps.scenario
    const heightProperties = ['depth_30', 'depth_100', 'depth_1000']
    const speedProperties = ['flow_30', 'flow_100', 'flow_1000']
    const height = feature.get(heightProperties[scenario - 1])
    const speed = feature.get(speedProperties[scenario - 1])
    return [
      createSymbol({ offset: [0, 600], zIndex: 2 }),
      createRectangle(),
      createText(`${height ? height + 'm' : 'n/a'}`, 'height', -72),
      createText(`${speed}m${String.fromCharCode(0x00B3)}/s`, 'flow rate', -2)
    ]
  }
}
