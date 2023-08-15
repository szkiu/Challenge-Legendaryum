# Challenge-Legendaryum

Este proyecto fue realizado usando Express.js, Node.js, Socket.io, Redus, Docker y Typescript.
Cuenta con un apartado hecho en Socket.io, para poder ver las monedas de la sala en la que el cliente ingresa y para poder 'agarrar' monedas y borrarlas.
Luego cuenta con una API REST, para poder hacer tres tipos de consultas.

Una para obtener una sola moneda la ruta seria asi: /api/coin/room/coinId

Otra para listar todas las monedas de una room, que seria asi la ruta: /api/coins/room1

Y la ultima para poder ver cuantas monedas hay por sala, solo la cantidad: /api/coins/room1/count

