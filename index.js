require("./database/mongo/conexion")
require("./consultaMongo")
require("./consultaPostgresql")
require("./coenxionMysql")
require("./consultaCassandra")

const app = require("./app")

app.listen(app.get("port"));
console.log("Servidor ejecutandose en el puerto http://192.168.0.102:3015 ", app.get("port")) 