var mysql = require('mysql')
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("Conexion a la base de dato mysql");
    };
});

module.exports= conexion;