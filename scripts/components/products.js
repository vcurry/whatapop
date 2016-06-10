angular
    .module("whatapop")
    .component("products", {
        templateUrl: "views/products.html",
        controller: function (ProductService) {
            var self = this;

            self.$onInit = function () {
                ProductService.getProducts().then(function (respuesta) {
                    self.products = respuesta.data;
                });
            };

            self.getRutaImagen = ProductService.getRutaImagenAbsoluta();
        }
    })