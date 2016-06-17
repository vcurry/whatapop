angular
    .module("whatapop")
    .component("nuevoProducto", {

        bindings: {
            $router: "<"
        },
        templateUrl: "views/nuevo-producto.html",
        controller: function(ProductService) {

            // Guardamos la referencia al componente.
            var self = this;

            var name = "";
            var description=""

            var latitude = "0";
            var longitude = "0";

            self.$onInit = function () {
                if(navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(getPosition);
                }
                function getPosition(position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                };
            }


            // Guardamos el usuario
            self.guardarUsuario = function(user) {
                UserService
                    .guardarUsuario(user, latitude, longitude, imagenUsuario)
                    .then(function() {

                        self.$router.navigate(["Products"]);
                    });
            };

            // Guardamos el documento de imagen indicado para
            // almacenarlo en el servidor junto con el usuario.
            self.seleccionarImagen = function(imagen) {
                imagenUsuario = imagen;
            };

            // Eliminamos el documento de imagen que
            // hubiese seleccionado previamente.
            self.deseleccionarImagen = function() {
                imagenUsuario = undefined;
            };
        }
    });
