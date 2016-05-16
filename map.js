var map;

function initMap() {
    
    var latitude = -23.6815315,
        longitude = -46.8754817,
        center = new google.maps.LatLng(latitude,longitude),
        mapOptions = {
            center: center,
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true
        };
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    setMarkers();
}

function setMarkers() {
    $.getJSON("dados.json", function(json) {
        console.log(json);
        // $.each(json.bicicletarias, function(key, data) {
        //     var latLng = new google.maps.LatLng(data.lat, data.lng); 
        //     // Creating a marker and putting it on the map
        //     var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: data.nome
        //     });
        // });
    });    
};