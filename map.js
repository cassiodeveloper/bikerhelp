var map;
var marker;
var infoWindow;

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
    
    configureMapActions(infoWindow, map);  
}

function configureMapActions(infoWindow, map) {
    var html = "<table>" +
                    "<tr><td>Nome da bicicletaria:</td> <td><input type='text' id='nomeBicicletaria'/> </td> </tr>" +
                    "<tr><td>Endereço:</td> <td><input type='text' id='address'/></td> </tr>" +
                    "<tr><td>Type:</td> <td><select id='type'>" +
                    "<tr><td></td><td><input type='button' value='Salvar' onclick='saveData()'/></td></tr>";

    infoWindow = new google.maps.InfoWindow({
        content: html
    });

    google.maps.event.addListener(map, "click", function(event) {
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        google.maps.event.addListener(marker, "click", function() {
            infowindow.open(map, marker);
        });
    });
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

function saveData() {
    //Fazer o post para a API aqui.
}