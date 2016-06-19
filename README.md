# whatapop

**whatapop** es una aplicación de venta de artículos de segunda mano.

## Productos

La página de **Productos** muestra todos los productos que contiene la aplicación.
Permite hacer diversos filtrados:

**Por categoría** muestra los productos que pertenecen a la categoría elegida.

**Por nombre** busca por el nombre o parte del nombre que se introduzca en la caja.

**Por localización** permite localizar los productos más cercanos, se ha utilizado ng-haversine.

**Por favoritos** muestra los productos marcados como favoritos por el usuario.
Para persistir los favoritos se ha utilizado Local Storage.

## Nuevo Usuario

Permite el alta de un usuario nuevo. Se ha utilizado ng-image-picker para la subida de la imagen del avatar.
Además, se guarda la geolocalización del usuario.

## Nuevo Producto

Guarda un producto nuevo, referenciando la categoría y el usuario a los que pertenece. La categoría, el nombre de usuario y el estado de la venta se muestran en cajas de selección para que el usuario no pueda introducir opciones nuevas no disponibles.


En ambos formularios se mantiene desactivado el botón de aceptar si no están completos los campos necesarios.