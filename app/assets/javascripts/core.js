'use strict'

// "flood" represents the global namespace for
// client-side javascript across all our pages
if (!window.flood) {
  window.flood = {}
}

// Flood utilities
window.flood.utils = {
  xhr: (url, callback, responseType) => {
    const xmlhttp = new window.XMLHttpRequest()
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        // ie11 doesnt respect json responseType, parsing string instead
        const xmlhttpResponse = responseType === 'json' ? JSON.parse(xmlhttp.response) : xmlhttp.response
        try {
          callback(null, xmlhttpResponse)
        } catch (err) {
          callback(err)
        }
      }
    }
    xmlhttp.open('GET', url, true)
    // ie11 doesn't respect json responseType
    if (responseType !== 'json') xmlhttp.responseType = responseType
    xmlhttp.send()
  },
  forEach: (items, callback) => {
    for (let i = 0; i < items.length; i++) {
      callback.call(items, items[i], i)
    }
  },
  addOrUpdateParameter: (uri, key, value) => {
    // Temporariliy remove fragment
    const i = uri.indexOf('#')
    const hash = i === -1 ? '' : uri.substr(i)
    uri = i === -1 ? uri : uri.substr(0, i)
    const re = new RegExp('([?&])' + key + '=[^&#]*', 'i')
    // Delete parameter and value
    if (value === '') {
      uri = uri.replace(re, '')
    } else if (re.test(uri)) {
      // Replace parameter value
      uri = uri.replace(re, '$1' + key + '=' + value)
      // Add parameter and value
    } else {
      const separator = /\?/.test(uri) ? '&' : '?'
      uri = uri + separator + key + '=' + value
    }
    return uri + hash
  },
  getParameterByName: (name) => {
    const v = window.location.search.match(new RegExp('(?:[?&]' + name + '=)([^&]+)'))
    return v ? v[1] : null
  }
}
