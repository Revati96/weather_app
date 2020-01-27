const request = require('request');
const geoCoding = (address,callback)=>
{

 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmV2YXRpOTAiLCJhIjoiY2szZHpoMWY5MDMxMTNtcHR3ZTljOTFzNiJ9.6lZlPYnPN27kTgwY4zH5kw&limit=1';
    request({  url, json: true }, (error, {body}) => {
       if (error) 
       {
           callback('Unable to connect to location service!', null);
       }
        else if ( body == 'undefined' || body.features == 'undefinde' || body.features.length === 0) {
           callback('Unable to find location. Try another search.',null);
       } 
       else {
           var data = {};
               data .latitude = body.features[0].center[1]; 
               data . longitude =  body.features[0].center[0];
               data. location = body.features[0].place_name;
               callback(null, data);
             
       }
   })
 
}
module.exports = geoCoding;