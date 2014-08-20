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
	consumer_key: 'ybbjpGDn1nFDfpROkIc8dLgI4',
  consumer_secret: 'UZJAA0Ff2KLAwaW1rstE3dGYD87Q46ScPdlj0UoHAUXpFOo9A2',
  access_token: '2663087029-O0M0UQNW0TvOq9GnPmf3EUYKuIkXJ7VuSvTCk6K',
  access_token_secret: 'oT6V1kX4RrrXLtJM9nNKPPKgRp76xtKkqSGfyJGBupWJt'
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

