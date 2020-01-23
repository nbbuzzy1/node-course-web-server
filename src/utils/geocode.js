const request = require('request');

const geocode = (address, callback) => {
    const mapBoxAccessToken = 'access_token=pk.eyJ1IjoibmJidXp6eTEiLCJhIjoiY2s0N2p1dGZmMHZzOTNlbjZkN3cwMWNvNSJ9.52osqj_TwK54ghICZdat8Q';
    const mapBoxForwardGeocodingEndpoint = '/geocoding/v5/mapbox.places/';
    const mapBoxUrl = `https://api.mapbox.com${mapBoxForwardGeocodingEndpoint}${encodeURIComponent(address)}.json?${mapBoxAccessToken}`;
    request({ url: mapBoxUrl, json: true }, (error, { body }) => {
      if (error) {
        callback('Unable to connect to location service!', undefined)
      } else if (body.features.length === 0) {
        callback('Unable to find location. Try another search', undefined)
      } else {
        callback(undefined, {
          latitude:  body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        })
      }
    })
  }
  
  module.exports = geocode;