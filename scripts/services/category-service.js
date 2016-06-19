angular
    .module("whatapop")
    .service("CategoryService", function($http, Propiedades) {
        
        //Obtenemos la colección de categorías
        this.getCategories = function () {
            return $http.get(Propiedades.urlServidor + Propiedades.categories);
        }
        
        //Obtenemos la colección de categorías
        this.getCategory = function (id) {
            return $http.get(Propiedades.urlServidor + Propiedades.categories + "/" + id);
        }
    })
