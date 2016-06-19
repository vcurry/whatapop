angular
    .module("whatapop")
    .component("products", {
        bindings: {
            $router: "<"
        },
        templateUrl: "views/products.html",
        controller: function ($q, ProductService, CategoryService, UserService, $haversine) {
            
            var self = this;
            
            self.filtroProductos = {name: ""};

            self.selectedCategory = {category: {
                name: ""}};

            var products = [];

            self.here;
            
            var sellers = []; 
            
            var favorito;

            
            self.$onInit = function () {
                ProductService.getProducts().then(function (respuesta) {
                    products = respuesta.data;
                    self.products = products;
                });
                
                CategoryService.getCategories().then(function (respuesta) {
                    self.categories = respuesta.data;
                });

                getPosition().then(function (position) {
                    self.here = position;
                })


                UserService.getUsers().then(function (respuesta) {
                    sellers = respuesta.data;
                });

            };

            self.filterByPosition = function () {

                if (self.radio && self.radio > 0) {

                    var reduceFn = function (alreadySelected, seller) {
                        var coords2 = {
                            latitude: seller.latitude,
                            longitude: seller.longitude
                        }
                        
                        if ($haversine.distance(self.here, coords2) < (self.radio * 1000)) {
                            alreadySelected.push(seller.id);
                        }

                        return alreadySelected;
                    };

                    var sellersNearby = sellers.reduce(reduceFn, []);

                    self.products = products.filter(function (product) {
                        return sellersNearby.indexOf(product.seller.id) > -1;
                    })
                } else {
                    self.products = products;
                }

            }

            // Obtiene la posición geográfica del usuario.
            function getPosition() {
                // Creamos un objeto diferido.
                var deferred = $q.defer();
                // Obtenemos la posición geográfica.
                navigator.geolocation.getCurrentPosition(function(data) {
                    // Resolvemos el objeto diferido solo con la información necesaria.
                    deferred.resolve({
                        latitude: data.coords.latitude,
                        longitude: data.coords.longitude
                    });
                });
                // Retornamos la promesa del objeto diferido.
                return deferred.promise;
            }


            self.getRutaImagen = ProductService.getRutaImagenAbsoluta;

        }
    })