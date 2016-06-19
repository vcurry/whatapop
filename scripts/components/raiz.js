//Creamos el componente raíz de Single Page Application
angular
    .module("whatapop")
    .component("raiz", {
        $routeConfig: [{
            name: "Products",
            path: "/products",
            component: "products"
        },{
            name: "ProductDetail",
            path: "/productDetail/:id",
            component: "productDetail"
        },{
            name: "Users",
            path: "/nuevo-usuario",
            component: "nuevoUsuario"
        },{
            name: "AltaProducto",
            path: "/nuevo-producto",
            component: "nuevoProducto"
        }],
        templateUrl: "views/raiz.html"
    });