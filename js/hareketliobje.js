
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	screen.lockOrientation('landscape');
	window.powermanagement.acquire();
	
}



