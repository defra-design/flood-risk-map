const express = require('express')
const router = express.Router()
const mapServices = require('./map')

// GeoJSON layers
router.get('/service/geojson/stations', async (req, res, next) => {
  try {
    res.status(200).json(await mapServices.getStationsGeoJSON())
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
})

module.exports = router
