angular
    .module("whatapop")
    .service("UserService", function ($http, Propiedades) {

        //Obtenemos la colección de productos
        this.getUsers = function () {
            return $http.get(Propiedades.urlServidor + Propiedades.users);
        };

        //Obtenemos la colección de categorías
        this.getUser = function (id) {
            return $http.get(Propiedades.urlServidor + Propiedades.users + "/" + id);
        }

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
                    .post(Propiedades.urlServidor + Propiedades.imagenes,
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


                        return $http.post(Propiedades.urlServidor + Propiedades.users, user);
                    })

            }



            // En caso de no haber indicado una imagen.
            else {

                    promesa = $http.post(Propiedades.urlServidor + Propiedades.users, user);

            }

            return promesa;
        }
        

        this.getRutaImagenAbsoluta = function (rutaRelativa) {
            return rutaRelativa ? (Propiedades.urlServidor + "/" + rutaRelativa) : undefined;
        };
    });
