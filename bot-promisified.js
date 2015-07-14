/*
   Copyright 2014 Code for Hampton Roads contributors.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

var Twit = require('twit');
var http = require('http');
var rp = require('request-promise');
var cities = require('./libs/cityReference.json');
var config = require('./config.json');
var _ = require('underscore');

var selectedCity = cities[_.random(0, cities.length)];

var restaurants;
var selectedRestaurant;
var message;
var api = 'http://api.openhealthinspection.com/vendors';
var url = api + '?lat=' + selectedCity.center.latitude +
                '&lng=' + selectedCity.center.longitude +
                '&dist=1500';

var T = new Twit(config);

rp(url)
      .then(function(body) { 

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

  })
    .catch(console.error);