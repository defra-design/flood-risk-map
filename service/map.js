const heightFlow = require('./data/stations.json')

module.exports = {
    getStationsGeoJSON: async () => {
      return heightFlow
    }
}