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
    map.addListener('click', function(e) {
      setLocation(e.latLng);
    });
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
  if (userLoc && userDest) {
    window.alert("Please remove the current route");
  } else {
        if (userLoc) {
            userDest = new google.maps.Marker({
                position: coor,
                title: 'Destination',
                map: map});
                calcDanger(userLoc);
                calcDanger(userDest);
        } else {
            userLoc = new google.maps.Marker({
                position: coor,
                title: 'My Location',
                map: map});
        }

  }
    userDest.addListener('click', function() {
        removeLocation();
        });
    userLoc.addListener('click', function() {
        removeLocation();
        });
}
function removeLocation() {
  userLoc.setMap(null);
  userLoc = null;
  userDest.setMap(null);
  userDest = null;
  vic.setMap(null);
  vic = null;
  initMap();
}
function calcDanger(point) {
  delt_lat = 1.0/68.68637 * 2.5;
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
        center: userLoc.getPosition(),
        radius: 4023
        }); 
}
