angular
    .module("whatapop")
    .service("LocalizationService", function () {

        //Obtenemos la colección de productos
        this.getLocalization = function () {
            var actualcoords = {
                "latitude": "0",
                "longitude": "0"
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition)
            }
            function getPosition(position) {
                actualcoords = {
                    "latitude": position.coords.latitude,
                    "longitude": position.coords.longitude
                }
            };

            return actualcoords;

        }
    });
        
