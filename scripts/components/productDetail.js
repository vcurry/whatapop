angular
    .module("whatapop")
    .component("productDetail", {
        templateUrl: "views/productDetail.html",
        controller: function (ProductService, $sce) {
            var self = this;

            // Inicializamos los valores por defecto del componente
            self.$routerOnActivate = function (next) {
                var id = next.params.id;
                
                ProductService.getProduct(id).then(function (respuesta) {
                    self.product = respuesta.data;
                    self.descript = $sce.trustAsHtml(self.product.description);
                })
            };



            self.getRutaImagen = ProductService.getRutaImagenAbsoluta;
        }
    });
