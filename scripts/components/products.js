angular
    .module("whatapop")
    .component("products", {
        bindings: {
            $router: "<"
        },
        templateUrl: "views/products.html",
        controller: function (ProductService, CategoryService, UserService, $haversine, $scope) {
            var self = this;

            var radio = $scope.radio;
            self.filtroProductos = {name: ""};

            self.selectedCategory = {category: {
                name: ""}};

            self.filtroRadio = {radio:""};

            var actualcoords = {"latitude" : 0, "longitude":0};
            
            self.$onInit = function () {
                ProductService.getProducts().then(function (respuesta) {
                    self.products = respuesta.data;
                });
                
                CategoryService.getCategories().then(function (respuesta) {
                    self.categories = respuesta.data;
                });

                if(navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(getPosition);
                }
                function getPosition(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    actualcoords = {"latitude": latitude, "longitude": longitude};
                    console.log(actualcoords);
                };


                UserService.getUsers().then(function (respuesta) {
                    var nearUsers = [];
                    var coleccion = [];


                    for (var i = 0; i < respuesta.data.length; i++) {
                        var coords2 = {
                            "latitude": respuesta.data[i].latitude,
                            "longitude": respuesta.data[i].longitude
                        };
                        
                        if ($haversine.distance(actualcoords, coords2) < (radio * 1000)) {
                            nearUsers.push(respuesta.data[i].id);
                            console.log("radio " + radio + " distancia " + $haversine.distance(actualcoords, coords2));
                        }
                    }
                    if (respuesta.data.length > 0) {
                        for (var i = 0; i < self.products.length; i++) {
                            if (self.products[i].seller.id in nearUsers) {
                                coleccion.push(self.products[i]);
                            }
                        }
                    }

                    self.users = nearUsers;
                });
               
            };

            self.getRutaImagen = ProductService.getRutaImagenAbsoluta;

        }
    })