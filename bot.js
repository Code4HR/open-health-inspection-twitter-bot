var Twit = require('twit');
var http = require('http');
var request = require('request');
var cities = require('./libs/cityReference.json');
var _ = require('underscore');

var selectedCity = cities[_.random(0, cities.length)];

var api = 'http://api.openhealthinspection.com/vendors';
var url = api + '?lat=' + selectedCity.center.latitude +
                '&lng=' + selectedCity.center.longitude +
                '&dist=1500';

var T = new Twit({
	consumer_key: 'LGQ1D4UMadd5kEgozln4fqDBm',
  consumer_secret: 'ZfmLkNKTm06LdNcD0wGijkS9akhT0obgeS2PlM1BDajS9rUtOB',
  access_token: '2663087029-IbzQFeaS3VmSVs0rWmvvRFbgEYyQsbIHpTKemqM',
  access_token_secret: 'nlGP1D7hFZ1a1tbw4BYMaiMZdLgQLQBD1DakXWVyEU1Lf'
});

request.get(url, function (err, res, body) {
  if (err) {
    console.log('Error:', err);
  }
  if (res.statusCode == '200') {
    console.log(body);
  }

});

