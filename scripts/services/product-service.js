angular
    .module("whatapop")
    .service("ProductService", function ($http) {

        //Obtenemos la colección de productos
        this.getProducts = function () {
            return $http.get("http://localhost:8000/api/products");
        };

        this.getProduct = function (id) {
            return $http.get("http://localhost:8000/api/products/" + id);
        };

        this.guardarProducto = function (product, imagen) {

            product.published_date = new Date();
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
                        product.photos.push(ruta);


                        return $http.post("http://localhost:8000/api/products", product);
                    })

            }



            // En caso de no haber indicado una imagen.
            else {

                promesa = $http.post("http://localhost:8000/api/products", product);

            }

            return promesa;
        }


        this.getRutaImagenAbsoluta = function (rutaRelativa) {
            return rutaRelativa ? ("http://localhost:8000/" + rutaRelativa) : undefined;
            
        }
    });
