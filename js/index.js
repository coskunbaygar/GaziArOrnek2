document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	screen.lockOrientation('portrait');
	QRScanner.prepare(onDone);
	window.powermanagement.acquire();
}

function onDone(err, status){
  if (err) {
   alert("Tanımsız bir hata oluştu:" + JSON.stringify(err));
  }
  
  if (status.authorized) {
	QRScanner.show();
  } else {
	  alert("Kamera için izin vermediniz. Lütfen uygulama ayarlarından gerekli izinleri veriniz.");
  }
}
