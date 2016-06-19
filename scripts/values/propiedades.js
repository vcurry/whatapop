angular
    .module("whatapop")
    .value("Propiedades", {
        urlServidor: "http://localhost:8000",
        products: "/api/products",
        users: "/api/users",
        categories: "/api/categories",
        imagenes: "/upload"
    })
