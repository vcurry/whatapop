//Creamos el componente raís de Single Page Application
angular
    .module("whatapop")
    .component("raiz", {
        $routeConfig: [{
            name: "Products",
            path: "/products",
            component: "products"
        }],
        templateUrl: "views/raiz.html"
    });