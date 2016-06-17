angular
    .module("whatapop")
    .directive("altaUsuarios", function () {
        return {
            restrict: "EA",
            templateUrl: "views/alta-usuarios.html",
            scope: {
                alHacerClick: "&"
            },
            link: function (scope) {
                
                scope.user = {
                    name: "",
                    nick: "",
                    email: "",
                    latitude: "",
                    longitude: ""
                };

                scope.notificarTexto = function () {
                        scope.alHacerClick({ user: scope.user});
                }

                
                scope.puedoGuardar = function () {
                    return scope.user.name;
                }
            }
        };
    });
