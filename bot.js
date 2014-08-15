var Twit = require('twit');
var http = require('http');
var cities = require('./libs/cityReference.json');
var _ = require('underscore');

// api.openhealthinspection.com/vendors?lat=36&lng=-76&dist=200

var selectedCity = cities[_.random(0, cities.length)];

console.log(selectedCity);

var api = 'http://api.openhealthinspection.com/vendors';
var url = api + '?lat=' + selectedCity.center.latitude +
                '&lng=' + selectedCity.center.longitude;

var T = new Twit({
	consumer_key: 'LGQ1D4UMadd5kEgozln4fqDBm',
  consumer_secret: 'ZfmLkNKTm06LdNcD0wGijkS9akhT0obgeS2PlM1BDajS9rUtOB',
  access_token: '2663087029-IbzQFeaS3VmSVs0rWmvvRFbgEYyQsbIHpTKemqM',
  access_token_secret: 'nlGP1D7hFZ1a1tbw4BYMaiMZdLgQLQBD1DakXWVyEU1Lf'
});


http.get(url, function(res){
  console.log('got response', res.statusCode);
}).on('error', function(e) {
  console.log('got response: ' + e.message);
});