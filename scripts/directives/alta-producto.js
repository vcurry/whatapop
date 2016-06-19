angular
    .module("whatapop")
    .directive("altaProducto", function () {
        return {
            restrict: "EA",
            templateUrl: "views/alta-producto.html",
            scope: {
                alHacerClick: "&"
            },
            link: function (scope) {

                scope.product = {
                    name: "",
                    description: "",
                    category: "",
                    seller: "",
                    published_date: "",
                    state: "",
                    price: "",
                    photos: []
                };

                scope.notificarTexto = function () {
                    scope.alHacerClick({ product: scope.product});
                }


                scope.puedoGuardar = function () {
                    return scope.product.name;
                }
            }
        };
    });
