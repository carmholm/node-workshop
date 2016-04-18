// write a simple node program that will output the latitude and longitude of the International Space Station.

var request = require('request');
var address = "http://api.open-notify.org/iss-now.json"

request(address, function(err, result){
    var resultObject = JSON.parse(result.body);
    console.log("The current latitude of the ISS is " + resultObject.iss_position.latitude.toFixed(2));
    console.log("The current longitude of the ISS is " + resultObject.iss_position.longitude.toFixed(2));
})
