angular
    .module("whatapop")
    .service("ProductService", function ($http) {

        //Obtenemos la colección de productos
        this.getProducts = function () {
            return $http.get("http://localhost:8000/api/products");
        };
        
        this.getRutaImagenAbsoluta = function (rutaRelativa) {
            return rutaRelativa ? ("http://localhost:8000/" + rutaRelativa) : undefined;
            
        }
    });
