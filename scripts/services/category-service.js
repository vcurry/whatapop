angular
    .module("whatapop")
    .service("CategoryService", function($http) {
        
        //Obtenemos la colección de categorías
        this.getCategories = function () {
            return $http.get("http://localhost:8000/api/categories")
        }
    })
