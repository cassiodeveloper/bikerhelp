var map;

function initMap() {
    
    var center = new google.maps.LatLng(-23.6815315, -46.8754817),
        mapOptions = {
            center: center,
            zoom: 14,
            zoomControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true ,            
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds: [
                    google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.TERRAIN,
                    google.maps.MapTypeId.SATELLITE,
                    google.maps.MapTypeId.HYBRID 
                ]
            }           
        };
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    
    getBrowserLocation(map);    
    
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

function getBrowserLocation(map){ 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        }, function() {
                handleLocationError(true, map.getCenter());
            });
    } else {
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    var infoWindow = new google.maps.InfoWindow({map: map});
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Erro: O serviço de Geolocation falhou.' : 'Erro: Seu browser não suporta geolocation.');
}