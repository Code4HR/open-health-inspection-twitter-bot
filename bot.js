var Twit = require('twit');
var http = require('http');
var request = require('request');
var cities = require('./libs/cityReference.json');
var _ = require('underscore');

var selectedCity = cities[_.random(0, cities.length)];

var restaurants;
var selectedRestaurant;
var message;
var api = 'http://api.openhealthinspection.com/vendors';
var url = api + '?lat=' + selectedCity.center.latitude +
                '&lng=' + selectedCity.center.longitude +
                '&dist=1500';

var T = new Twit({
	consumer_key: 'usMjc1LEL3IYckyUdttr4deCa',
  consumer_secret: 'HAbM2cBoOHXQ5fczXdTzmsXGCLi4nF4T60vkWJm0QrQpACCKHb',
  access_token: '2663087029-IbzQFeaS3VmSVs0rWmvvRFbgEYyQsbIHpTKemqM',
  access_token_secret: 'nlGP1D7hFZ1a1tbw4BYMaiMZdLgQLQBD1DakXWVyEU1Lf'
});

request.get({
  url: url,
  json: true,
  }, function (err, res, body) {
  if (err) {
    console.log('Error:', err);
  }
  if (res.statusCode == '200') {
    
    restaurants = _.filter(_.values(body), function(el) {
      return el.category == 'Restaurant';
    });

    selectedRestaurant = restaurants[_.random(0, restaurants.length)];

    message = 'Hey, check out the health inspection reports for ' +
              selectedRestaurant.name +
              ' in ' +
              selectedRestaurant.city + '!\n' +
              'http://openhealthinspection.com/#' + selectedRestaurant.url;

    console.log(message);

    T.post('statuses/update', {status:message}, function(err, response){
      if (err) {
        console.log('Error tweeting: ' + err);
      } else {
        console.log('Quote Tweeted Tweet ID: ' + tweet.id_str);
      }
    });

  }
});

