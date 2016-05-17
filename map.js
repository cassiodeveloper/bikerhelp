var map;

function initMap() {
    
    var latitude = -23.6815315,
        longitude = -46.8754817,
        center = new google.maps.LatLng(latitude,longitude),
        mapOptions = {
            center: center,
            zoom: 13
        };
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    var infoWindow = new google.maps.InfoWindow({map: map});    
    
    getBrowserLocation(infoWindow, map);    
    
    setMarkers(map);
}

function setMarkers(map) {
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

function getBrowserLocation(infoWindow, map){
    
    var loc = {};
    var geocoder = new google.maps.Geocoder();
    if(google.loader.ClientLocation) {
        loc.lat = google.loader.ClientLocation.latitude;
        loc.lng = google.loader.ClientLocation.longitude;

        var latlng = new google.maps.LatLng(loc.lat, loc.lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if(status == google.maps.GeocoderStatus.OK) {
                alert(results[0]['formatted_address']);
            };
        });
    }    
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         map.setCenter(pos);
    //     }, function() {
    //             handleLocationError(true, infoWindow, map.getCenter());
    //         });
    // } else {
    //     handleLocationError(false, infoWindow, map.getCenter());
    // }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Erro: O serviço de Geolocation falhou.' : 'Erro: Seu browser não suporta geolocation.');
}