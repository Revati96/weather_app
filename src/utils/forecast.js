const request = require('request');
const forecast = (latitude,longitude,callback) =>
{
  const url = 'https://api.darksky.net/forecast/6f666415732dca5f730007de40ad9ece/' + latitude + ',' + longitude;
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!',null);
        } else if (body == 'undefined' || body.error) {
            callback('Unable to find location',null);
        } else {
            callback(null, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. '+body.daily.summary);
        }
    }) 
}
module.exports = forecast;
