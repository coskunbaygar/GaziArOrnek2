var device_latitude = 0;
var device_longitude = 0;
var inonu_stadi_latitude=41.039632;
var inonu_stadi_longitude=28.995056;
var currentHeading;
var prevHeading;
var prevCompassErrorCode;
		

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	$("#deviceaddress").hide();
	$("#arrow").hide();
	screen.lockOrientation('landscape');
	QRScanner.prepare(onDone);
	window.powermanagement.acquire();
}

function onDone(err, status){
  if (err) {
   alert("Tanımsız bir hata oluştu:" + JSON.stringify(err));
  }
  
  if (status.authorized) {
	QRScanner.show();
	navigator.geolocation.watchPosition(onSuccessGEOWatch, onErrorWatch,{ enableHighAccuracy: false,   timeout: 1000,  maxiumumAge: 0});
	navigator.compass.watchHeading(compassSuccess, compassError, {frequency: 100 });
  } else {
	  alert("Kamera için izin vermediniz. Lütfen uygulama ayarlarından gerekli izinleri veriniz.");
  }
}

var onSuccessGEOWatch = function (position) {
    device_latitude = position.coords.latitude;
    device_longitude = position.coords.longitude;
	rotateImage();
	
		var tmp_latlng=device_latitude.toFixed(8) + ',' + device_longitude.toFixed(8);
		
	   $.ajax({
			type: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=' + tmp_latlng,
			data: '',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				$("#deviceaddress").html(response.results[0].formatted_address);
				$("#deviceaddress").show();
			},
			error: function (error) {
				$("#deviceaddress").hide();
			}
		});
	

};

function onErrorWatch(error) {
	$("#deviceaddress").html("Konumunuza ulaşılamıyor. Konum servisinizi açınız veya zaten açıksa lütfen bekleyiniz.");
}

function compassSuccess(heading) {
    prevHeading = currentHeading;
	currentHeading = heading.trueHeading >= 0 ? Math.round(heading.trueHeading) : Math.round(heading.magneticHeading);

	if(currentHeading == prevHeading) return;
	rotateImage();
}

function compassError(error) {
    alert("Yönünüze ulaşılamıyor. Konum servisinizi açtıktan sonra uygulamayı tekrar başlatın");
}

function rotateImage() {
	if (device_longitude==0 || device_latitude==0) return;
	var destinationPosition = new LatLon(inonu_stadi_latitude, inonu_stadi_longitude);
	var currentPosition = new LatLon(device_latitude, device_longitude);
	var destinationBearing = Math.round(currentPosition.bearingTo(destinationPosition)); 
	var image_rotation = destinationBearing - currentHeading;	
	$("#arrow").show();
	$("#arrow").rotate(image_rotation);	
}



