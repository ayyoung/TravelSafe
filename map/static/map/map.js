var map;
var crimes = [];
var userLoc = null;
var userDest = null;
var nearby = [];
var vic;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.8298 , lng: -87.6298},
        zoom: 9                 });
}

function addPoints(coor, typ) {
    var marker = new google.maps.Marker({
        position: {lat: coor.lat, lng: coor.lng},
        title: typ,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 1,
          fillColor: 'red'
          },
        map: null });
    crimes.push(marker);
}

function setLocation(coor) {
  userDest = new google.maps.Marker({
      position: {lat: coor.coords.latitude, lng: coor.coords.longitude},
      title: 'Current Location',
      map: map});
  calcDanger(userDest);
}

function removeLocation() {
  userLoc.setMap(null);
  userLoc = null;
  userDest.setMap(null);
  userDest = null;
  vic.setMap(null);
  vic = null;
}
function calcDanger(point) {
  delt_lat = 1.0/68.68637 * 2.5;
  console.log(point);
  user_loc = point.getPosition();
  for (i=0; i < crimes.length; i++) {
    curr_crime_loc = crimes[i].getPosition();
    distance = Math.sqrt(Math.pow(user_loc.lat()-curr_crime_loc.lat(), 2) + Math.pow(user_loc.lng() - curr_crime_loc.lng(), 2));
      if (distance < delt_lat) {
        crimes[i].setMap(map);
        nearby.push(crimes[i]);        
      }
  }  
    vic = new google.maps.Circle({
        fillColor: '#FF0000',
        fillOpacity: (nearby.length / crimes.length).toFixed(100),
        strokeOpacity: 0,
        map: map,
        center: user_loc,
        radius: 4023
        }); 
}

if (window.navigator.geolocation) {
  window.navigator.geolocation
  .getCurrentPosition(setLocation, console.log);
 } 