//pubnub Geolocation
window.lat = 37.090240 //16.4602 //
window.lng = -95.712891 //102.823 //

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
    }
    return null;
};
function updatePosition(position) {
    if (position) {
        window.lat = position.coords.latitude;
        window.lng = position.coords.longitude;
        console.log(window.lat + ',' + window.lng + ':' + userLogin)
        firebase.database().ref('currentlocation/' + userLogin).update({
            user: userLogin,
            lat: window.lat,
            lng: window.lng
        });
    }
}
setInterval(function(){updatePosition(getLocation());}, 10000);
function currentLocation() {
  return {lat:window.lat, lng:window.lng};
};

var initialize = function() {
   
};
window.initialize = initialize;

var redraw = function(payload) {
    lat = payload.message.lat;
    lng = payload.message.lng;
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