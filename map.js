var map;

function initMap() {
    
    var latitude = -23.6815315,
        longitude = -46.8754817,
        center = new google.maps.LatLng(latitude,longitude),
        mapOptions = {
            center: center,
            zoom: 9
        };
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    setMarkers();
}

function setMarkers() {
    $.getJSON("dados.json", function(json) {
        $.each(json.bicicletarias, function(key, data) {
            var latLng = new google.maps.LatLng(data.lat, data.lng); 
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data.nome
            });
        });
    });    
};