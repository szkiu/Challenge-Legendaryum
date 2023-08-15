# Challenge-Legendaryum

Este proyecto fue realizado usando Express.js, Node.js, Socket.io, Redus, Docker y Typescript.
Cuenta con un apartado hecho en Socket.io, para poder ver las monedas de la sala en la que el cliente ingresa y para poder 'agarrar' monedas y borrarlas.
Luego cuenta con una API REST, para poder hacer tres tipos de consultas.

Una para obtener una sola moneda la ruta seria asi: /api/coin/:room/:coinId

Otra para listar todas las monedas de una room, que seria asi la ruta: /api/coins/:room

Y la ultima para poder ver cuantas monedas hay por sala, solo la cantidad: /api/coins/:room/count

Tambien cuenta con un archivo 'index.html', para poder probar como funciona con Socket.io, en la que te va a mostrar en la consola, la room en la que entras, las coins de esa room, y hay un boton para borrar una coin y un input para ingresar el id, cuando se borra una coin, aparece en la consola, se puede hacer lo mismo con para cambiar de rooms.

