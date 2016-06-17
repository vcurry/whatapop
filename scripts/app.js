//Setter del módulo
angular.module("whatapop", [
    "ngComponentRouter",
    "dahr.ng-image-picker",
    "dahr.ng-haversine"
]);

//Configuramos el proveedor '$locationProvider'. Establecemos el
//modo de navegación HTML5 para que funcione el Single Page Application
angular.module("whatapop").config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

//En el value $routerRootComponent indicamos el componente raíz,
//es una configuración obligatoria, el router necesita tenerlo para
//construir todas las rutas de la aplicación a partir de aquí
angular.module("whatapop").value("$routerRootComponent", "raiz");