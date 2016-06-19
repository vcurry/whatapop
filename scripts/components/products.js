angular
    .module("whatapop")
    .component("products", {
        bindings: {
            $router: "<"
        },
        templateUrl: "views/products.html",
        controller: function ($q, ProductService, CategoryService, UserService, $haversine, localStorageService) {
            
            var self = this;
            
            self.filtroProductos = {name: ""};
            
            var products = [];

            self.here;
            
            var sellers = []; 
            
            var favoritos = [];

            var savedFavs = localStorageService.get("favs");

            if (savedFavs) {
                favoritos = savedFavs;
            }
            
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

            //Tratamos los checkbox de favorito de los productos

            //Comprobamos que el producto ya está marcado como favorito
            //y devolvemos su índice
            function esProducto (product) {
                return favoritos.indexOf(product) > -1;
            };

            //Si se marca el producto como favorito, lo añadimos
            //Si se desmarca, lo eliminamos del array
            self.toggle = function (product) {
                var idx = favoritos.indexOf(product);
                if (idx > -1) {
                    favoritos.splice(idx, 1);
                    localStorageService.set("favs", favoritos);
                    if (favoritos.length === 0)
                        self.products = products;
                } else {
                    if(!esProducto(product)) {
                        favoritos.push(product);
                        localStorageService.set("favs", favoritos);
                    }
                   // console.log(favoritos);
                }
            }

            //Implementamos un filtro de favoritos
            self.mostrarFavoritos = function () {
                if (favoritos.length > 0)
                    self.products = favoritos;

                else
                    self.products = products;
            }

            //Obtenemos la ruta completa de la imagen
            self.getRutaImagen = ProductService.getRutaImagenAbsoluta;

        }
    })