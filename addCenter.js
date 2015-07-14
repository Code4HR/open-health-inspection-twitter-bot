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

var newCities = []

/*cities.forEach(function(city){
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
*/
newCities = cities.reduce(function(all, city) { 
    if(city.county_name) { 
      var temp = {
        name: city.name,
        center: {
          latitude: parseFloat(city.primary_latitude),
          longitude: parseFloat(city.primary_longitude)
        }
      };
      all.push(temp);
    }
    return all;
},[])

console.log(JSON.stringify(newCities, null, 2));
