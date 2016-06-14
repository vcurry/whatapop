angular
    .module("whatapop")
    .service("UserService", function ($http) {

        this.guardarUsuario = function (user, imagen) {

            var promesa;

            // Si la imagen viene dada.
            if (imagen) {

                // Montamos un 'FormData' con la imagen.
                var datos = new FormData();
                datos.append("img", imagen);

                // Configuramos el 'Content-Type' de la petición.
                // Tenemos que indicarlo como 'undefined' para que
                // AngularJS infiera el tipo de la petición.
                var configuracion = {
                    "headers": {
                        "Content-Type": undefined
                    }
                };

                // Subimos la imagen al servidor.
                promesa = $http
                    .post("http://localhost:8000/upload",
                        datos,
                        configuracion
                    )
                    .then(function (respuesta) {

                        // En la propiedad 'path' me viene dada
                        // la ruta relativa de la imagen subida.
                        var ruta = respuesta.data.path;

                        // Establecemos la ruta de la imagen en
                        // el objeto receta antes de guardarla.
                        user.avatar = ruta;

                     //   return $http.post("http://localhost:8000/api/users", user);
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                var lat = position.coords.latitude;
                                var lng = position.coords.longitude;
                                var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
                                $http.get(url)
                                    .then(function (result) {
                                        user.latitude =  lat;
                                        user.longitude = lng;
                                        return $http.post("http://localhost:8000/api/users", user);
                                })
                            })
                        } else{
                            return $http.post("http://localhost:8000/api/users", user);

                        }
                  /*  .then(navigator.geolocation.getCurrentPosition(function (position) {
                        var lat = position.coords.latitude;
                        var lng = position.coords.longitude;
                        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
                        $http.get(url)
                            .then(function (result) {
                                user.latitude =  lat;
                                user.longitude = lng;
                            return $http.post("http://localhost:8000/api/users", user);
                        });*/
                 })
            }



            // En caso de no haber indicado una imagen.
            else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var lat = position.coords.latitude;
                        var lng = position.coords.longitude;
                        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
                        $http.get(url)
                            .then(function (result) {
                                user.latitude =  lat;
                                user.longitude = lng;
                                return $http.post("http://localhost:8000/api/users", user);
                            })
                    })
                } else {

                    promesa = $http.post("http://localhost:8000/api/users", user);
                }
            }

            return promesa;
        }
        

        this.getRutaImagenAbsoluta = function (rutaRelativa) {
            return rutaRelativa ? ("http://localhost:8000/" + rutaRelativa) : undefined;
        };
    });
