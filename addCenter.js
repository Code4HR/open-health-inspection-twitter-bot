/*
 *  Takes cities objects from libs/va.json file
 *  and converts them to the format needed for
 *  libs/cityReference.json, mainly adding a
 *  center object inside of the city
 *
 *  To create libs/cityReference, output of this
 *  file piped into libs/cityReference.json
 *
 *  node addCenter.js > libs/cityReference.json
 * */

var cities = require('./libs/va.json');

var newCities = new Array();

cities.forEach(function(city){
  if(city.county_name) {
    var temp = {
      name: city.name,
      center: {
        latitude: parseFloat(city.primary_latitude),
        longitude: parseFloat(city.primary_longitude)
      }
    };

    newCities.push(temp);
  }
});

console.log(JSON.stringify(newCities));
