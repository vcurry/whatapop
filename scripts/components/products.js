angular
    .module("whatapop")
    .component("products", {
        templateUrl: "views/products.html",
        controller: function (ProductService, CategoryService) {
            var self = this;

            self.filtroProductos = {name: ""};

            self.selectedCategory = {category: {
                name: ""}};
            
            self.$onInit = function () {
                ProductService.getProducts().then(function (respuesta) {
                    self.products = respuesta.data;
                });
                
                CategoryService.getCategories().then(function (respuesta) {
                    self.categories = respuesta.data;
                })
            };

            self.getRutaImagen = ProductService.getRutaImagenAbsoluta;
        }
    })