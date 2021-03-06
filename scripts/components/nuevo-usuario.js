
angular
    .module("whatapop")
    .component("nuevoUsuario", {
        
        bindings: {
            $router: "<"
        },
        templateUrl: "views/nuevo-usuario.html",
        controller: function(UserService) {

            // Guardamos la referencia al componente.
            var self = this;

            var imagenUsuario;

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
                user.latitude= latitude;
                user.longitude = longitude;
                UserService
                    .guardarUsuario(user, imagenUsuario)
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

