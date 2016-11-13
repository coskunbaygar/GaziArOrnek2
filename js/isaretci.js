document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	$("#info").hide();
	$("#infotext").hide();
	
	screen.lockOrientation('portrait');
	window.powermanagement.acquire();
	
	QRScanner.scan(displayContents);
}


function displayContents(err, text){
  if(err){
	alert(JSON.stringify(err));
	QRScanner.scan(displayContents);
  } else {
	$("#infotext").html(text);
	$("#infotext").fadeIn("slow");
	$("#info").fadeIn("slow");

	setTimeout(function(){ 
			$("#infotext").fadeOut("slow");
			$("#info").fadeOut("slow");
			QRScanner.scan(displayContents);
	}, 8000);


  }
}
