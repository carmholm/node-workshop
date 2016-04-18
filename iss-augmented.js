// Augment your ISS application to tell the user how “far” the ISS is from them

Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
}

function LatLon(lat, lon) {
    if (!(this instanceof LatLon))
        return new LatLon(lat, lon);

    this.lat = Number(lat);
    this.lon = Number(lon);
}

LatLon.prototype.distanceTo = function(point, radius) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    var R = radius;
    var φ1 = this.lat.toRadians(),
        λ1 = this.lon.toRadians();
    var φ2 = point.lat.toRadians(),
        λ2 = point.lon.toRadians();
    var Δφ = φ2 - φ1;
    var Δλ = λ2 - λ1;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
};

var request = require('request');

var prompt = require('prompt');
prompt.start();

prompt.get(['city'], function(err, result) {
    var address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + result.city.toLowerCase();

    request(address, function(err, result) {
        var locationResult = JSON.parse(result.body);
        var currentLocationLat = locationResult.results[0].geometry.location.lat.toFixed(2);
        var currentLocationLon = locationResult.results[0].geometry.location.lng.toFixed(2);

        var url = "http://api.open-notify.org/iss-now.json";

        request(url, function(err, result) {
            var resultObject = JSON.parse(result.body);
            var issLat = resultObject.iss_position.latitude.toFixed(2);
            var issLon = resultObject.iss_position.longitude.toFixed(2);

            var currentCoords = new LatLon(currentLocationLat, currentLocationLon);
            var issCoords = new LatLon(issLat, issLon);

            console.log("The current distance between you and the ISS is " + currentCoords.distanceTo(issCoords).toFixed(2) + "km");
        });
    });
});
