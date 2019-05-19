window.lat = 16.4602 //37.090240
window.lng = 102.823 //-95.712891

var prevLat
var prevLng
var count = 0
var markCount = 0
var mark2Count = 0

var posiChange = false

var customerLat = parseFloat(getParameterByName('lat'));
var customerLng = parseFloat(getParameterByName('lng'));

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
    }    
    return null;
};

function updatePosition(position) {
    if (position) {
      count++
      prevLat = window.lat
      prevLng = window.lng
      window.lat = position.coords.latitude;
      window.lng = position.coords.longitude;
      posiChange = true

      //console.log(count + ';' + prevLat + ' ' + prevLng + ' : ' + window.lat + ' ' + window.lng + ' ' +posiChange)
    }
}

setInterval(function(){updatePosition(getLocation());}, 10000);
function currentLocation() {
    return {lat:window.lat, lng:window.lng};
};

var map;
var mark;

var initialize = function() {
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    map  = new google.maps.Map(document.getElementById('map-canvas'), {
        center:{lat:lat,lng:lng},
        zoom:14
    });
    directionsDisplay.setMap(map);

    mark = new google.maps.Marker({
        position: {lat:lat, lng:lng}, 
        map: map,
        animation: google.maps.Animation.DROP
    });
    var markIW = new google.maps.InfoWindow({content: 'กำลังประมวลผลตำแหน่งของคุณ...'});
    var markIW2 = new google.maps.InfoWindow({content: 'ตำแหน่งปัจจุบันของคุณ'});

    customerMark = new google.maps.Marker({
        position: new google.maps.LatLng(customerLat, customerLng),
        map: map,
        animation: google.maps.Animation.DROP,
        icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
    });
    var customerIW = new google.maps.InfoWindow({content: 'ตำแหน่งลูกค้า'});

    Toommark = new google.maps.Marker({
        position: new google.maps.LatLng(16.464330, 102.829071),
        map: map,
        animation: google.maps.Animation.DROP,
        icon: {url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
    });
    var toomIW = new google.maps.InfoWindow(
      {content: '<div><table><tr>' + 
                '<td><img src="https://www.toombike.com/images/toomview1.jpg" class="img-responsive img-circle" style="display:inline" alt="Toom" width="150" height="150"></td>' + 
                '<td><h4>ร้านตุ่มมอไซต์</h4>' + 
                '<p>56/65 ถนนกัลปพฤกษ์ ตำบลในเมือง อำเภอเมือง จังหวัดขอนแก่น. 40000</p>' + 
                '<p>facebook : <a href="https://www.facebook.com/%E0%B8%95%E0%B8%B8%E0%B9%88%E0%B8%A1-%E0%B8%A1%E0%B8%AD%E0%B9%84%E0%B8%8B%E0%B8%84%E0%B9%8C-1714442265300257/">ตุ่ม มอไซค์</a></p>' +
                '<p>เบอร์โทรศัพท์ : 064-1751965</p>' +
                '</td></tr></table></div>'}
    );

    customerIW.open(map, customerMark);
    toomIW.open(map, Toommark);

    mark.addListener('click', function() {geocodeLatLng(geocoder, map, infowindow, markIW2)});
    customerMark.addListener('click', function() {geocodeLatLng(geocoder, map, infowindow, customerMark)});
    Toommark.addListener('click', function() {toomIW.open(map, Toommark);});


    if (posiChange == true) {
      /*console.log(posiChange)
      calculateAndDisplayRoute(directionsService, directionsDisplay);*/
      var start = new google.maps.LatLng(lat, lng);
      var end = new google.maps.LatLng(customerLat, customerLng);
      console.log(start + ',' + end)
    }
};

/*function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = new google.maps.LatLng(lat, lng);
    var end = new google.maps.LatLng(customerLat, customerLng);
    console.log(start + ',' + end)
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }*/

  function geocodeLatLng(geocoder, map, infowindow, marker) {
    var pos = marker.getPosition();
    geocoder.geocode({'location': pos}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

window.initialize = initialize;

var redraw = function(payload) {
    lat = payload.message.lat;
    lng = payload.message.lng;

    var markIW = new google.maps.InfoWindow({content: 'ตำแหน่งปัจจุบันของคุณ'});
    var markIW2 = new google.maps.InfoWindow({content: 'กำลังประมวลผลตำแหน่งของคุณ...'});

    if (posiChange == true) {
      if (markCount == 0) {
        markIW.open(map, mark);
      }
      markCount++
      //console.log(lat + ',' + lng)
    } else {
      if (mark2Count == 0) {
        markIW2.open(map, mark);
      }
      mark2Count++
      map.setCenter({lat:lat, lng:lng, alt:0});
      //console.log(lat + ',' + lng)
    }
    mark.setPosition({lat:lat, lng:lng, alt:0});
};

var pnChannel = "map2-channel";
var pubnub = new PubNub({
    publishKey:   'pub-c-b0552106-364f-42a7-8f9b-ecace3ee5d09',
    subscribeKey: 'sub-c-c022337c-4673-11e9-a315-2a8110fea232'
});
pubnub.subscribe({channels: [pnChannel]});
pubnub.addListener({message:redraw});

setInterval(function() {
    pubnub.publish({channel:pnChannel, message:currentLocation()});
}, 5000);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}