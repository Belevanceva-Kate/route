$(document).ready(function() {
	
});	


function initMap() {
	var map;

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 49.578017, lng: 32.056120},
		zoom: 7
	});

	geocoder = new google.maps.Geocoder();

	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	directionsDisplay.setMap(map);
	directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );

	google.maps.event.addDomListener(window, "resize", function(){
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.getCenter(center);
	})

	$(".btn").on("click", function(e) {
		e.preventDefault();

		var startPoint 	= $("#input-from").val(),
			finishPoint = $("#input-to").val(),

			startCoord = new Object(),
			startLat,
			startLng,
			finishCoord = new Object(),
			finishLat,
			finishLng,

			infoWindow;

		geocoder.geocode( { 'address': startPoint}, function(results, status) {
			if (status == 'OK') {
				map.setCenter(results[0].geometry.location);
				var markerA = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					label: "A",
					animation: google.maps.Animation.DROP
				});
				infoWindow = new google.maps.InfoWindow({
					content: startPoint
				});
					infoWindow.open(map, markerA);
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
			
			startLat = results[0].geometry.location.lat();
			startLng = results[0].geometry.location.lng();
			startCoord = {
				lat: startLat,
				lng: startLng
			}

		});

		geocoder.geocode( { 'address': finishPoint}, function(results, status) {
			if (status == 'OK') {
				map.setCenter(results[0].geometry.location);
				var markerB = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					label: "B",
					animation: google.maps.Animation.DROP
				});
				infoWindow = new google.maps.InfoWindow({
					content: finishPoint
				});
					infoWindow.open(map, markerB);
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}

			finishLat = results[0].geometry.location.lat();
			finishLng = results[0].geometry.location.lng();
			finishCoord = {
				lat: finishLat,
				lng: finishLng
			}

			calculateAndDisplayRoute(directionsService, directionsDisplay, startCoord, finishCoord);

		});


		function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    		directionsService.route({
    		    origin: pointA,
    		    destination: pointB,
    		    avoidTolls: true,
    		    avoidHighways: false,
    		    travelMode: google.maps.TravelMode.DRIVING
    		}, function (response, status) {
    		    if (status == google.maps.DirectionsStatus.OK) {
    		        directionsDisplay.setDirections(response);
    		    } else {
    		        window.alert('Directions request failed due to ' + status);
    		    }
    		});
		}


    


	});

}