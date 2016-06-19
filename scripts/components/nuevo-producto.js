angular
    .module("whatapop")
    .component("nuevoProducto", {

        bindings: {
            $router: "<"
            
        },
        templateUrl: "views/nuevo-producto.html",
        controller: function(ProductService, CategoryService, UserService) {

            // Guardamos la referencia al componente.
            var self = this;
            
            self.selectedCategory= {category: {
                id: ""}};
            
            self.selectedUser= {user:
                {id:""}};
            
            self.$onInit = function () {
                CategoryService.getCategories().then(function (respuesta) {
                    self.categories = respuesta.data;
                });

                UserService.getUsers().then(function (respuesta) {
                    self.users = respuesta.data;
                });
            }
/*
            for(var i =0; i< self.categories.length; i++) {
                if (self.categories[i].name === self.selectedCategory){
                    product.category = self.categories[i];
                }
            }
            
            for(var i =0; i< self.users.length; i++) {
                if (self.user[i].id === self.seller){
                    product.user = self.user[i];
                }
            }*/

            // Guardamos el usuario
            self.guardarProducto = function(product) {
                console.log(self.selectedCategory);
                CategoryService
                    .getCategory(self.selectedCategory)
                    .then(function (respuesta) {
                        product.category = respuesta.data;
                });

                UserService
                    .getUser(self.selectedUser)
                    .then(function (respuesta) {
                        var productUser = {
                            id: respuesta.data.id,
                            nick: respuesta.data.nick,
                            avatar: respuesta.data.avatar
                        }
                        product.seller = productUser;
                    });

                ProductService
                    .guardarProducto(product, imagenProducto)
                    .then(function() {

                        self.$router.navigate(["Products"]);
                    });
            };

            // Guardamos el documento de imagen indicado para
            // almacenarlo en el servidor junto con el usuario.
            self.seleccionarImagen = function(imagen) {
                imagenProducto = imagen;
            };

            // Eliminamos el documento de imagen que
            // hubiese seleccionado previamente.
            self.deseleccionarImagen = function() {
                imagenProducto = undefined;
            };
        }
    });
