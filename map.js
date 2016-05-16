var map;

function initMap() {
    
    var latitude = -23.6815315,
        longitude = -46.8754817,
        radius = 8000,
        center = new google.maps.LatLng(latitude,longitude),
        bounds = new google.maps.Circle({center: center, radius: radius}).getBounds(),
        mapOptions = {
            center: center,
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true
        };
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    setMarkers(center, radius, map);
}

function setMarkers(center, radius, map) {
    var json = (function () { 
        var json = null; 
        $.ajax({ 
            'async': false, 
            'global': false, 
            'url': "dados.json", 
            'dataType': "json", 
            'success': function (data) {
                    json = data; 
                }
        });
        return json;
    })();

    var circle = new google.maps.Circle({
            strokeColor: '#000000',
            strokeOpacity: 0.25,
            strokeWeight: 1.0,
            fillColor: '#ffffff',
            fillOpacity: 0.1,
            clickable: false,
            map: map,
            center: center,
            radius: radius
        });
    var bounds = circle.getBounds();

    //loop between each of the json elements
    for (var i = 0, length = json.length; i < length; i++) {
        var data = json[i],
        latLng = new google.maps.LatLng(data.lat, data.lng); 



        if(bounds.contains(latLng)) {
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data.nome
            });
            infoBox(map, marker, data);
        }
    }

    circle.bindTo('center', marker, 'position');
}

function infoBox(map, marker, data) {
    var infoWindow = new google.maps.InfoWindow();
    // Attaching a click event to the current marker
    google.maps.event.addListener(marker, "click", function(e) {
        infoWindow.setContent(data.nome);
        infoWindow.open(map, marker);
    });

    // Creating a closure to retain the correct data 
    // Note how I pass the current data in the loop into the closure (marker, data)
    (function(marker, data) {
        // Attaching a click event to the current marker
        google.maps.event.addListener(marker, "click", function(e) {
        infoWindow.setContent(data.nome);
        infoWindow.open(map, marker);
        });
    })(marker, data);
}

google.maps.event.addDomListener(window, 'load', initMap);