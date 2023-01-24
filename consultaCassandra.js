const app = require("./app")
const client = require("./database/cassandra/conexion")
const uuid = require('cassandra-driver').types.Uuid;

app.get("/Cassandra", (req, res) => {
    client.connect()
        .then(() => {
            return client.execute('SELECT id,usuario,correo,contrasena,nacimiento,sexo, correo FROM empleado', { prepare: true });
        })
        .catch(err => console.error(err))
        .then(result => {
            res.render("../views/crudCassandra.ejs", {
                datos: result.rows,
                nomPagina: "postgresql",
                titulo: "Datos"
            })
        });

})

app.post("/agregarCassandra", async (req, res) => {
    const id = uuid.random();
    const { usuario, correo, contrasena, nacimiento, sexo } = req.body;

    const query = "INSERT INTO empleado (id, usuario, correo, contrasena, nacimiento, sexo) VALUES (?,?, ? ,? ,? ,?)";
    const params = [id.toString(), usuario, correo, contrasena, nacimiento, sexo];

    client.execute(query, params, { prepare: true })
        .then(result => console.log("Data inserted"))
        .catch(err => console.error(err));
    res.redirect("/Cassandra")

})

//? eliminar Cassandra
app.post("/CassandraElimina", async (req, res) => {
    const id = req.body.id
    const query = "DELETE FROM empleado WHERE id = ?";
    const params = [id];

    client.execute(query, params, { prepare: true })
        .catch(err => console.error(err))
        .then(result => {
            console.log("Data deleted")
            res.redirect('back')
        });
})

//? actualizar posgresql
app.post("/cassandraActu", async (req, res) => {
    const id = req.body.id
    const { usuario, correo, contrasena, nacimiento, sexo } = req.body;
    const query = "UPDATE empleado SET usuario = ?, correo = ? , contrasena = ? , nacimiento = ?, sexo = ? WHERE id = ?";
    const params = [usuario, correo, contrasena, nacimiento, sexo, id];
    client.execute(query, params, { prepare: true })
        .catch(err => console.error(err))
        .then(result => {
            console.log("Data updated")
            res.redirect('back')
        });
})

app.post("/filtroCassandra", async (req, res) => {
    const nacimiento = req.body.nacimiento;
    const opcionDate = req.body.opcionDate;
    const sexo = req.body.sexo;
    var params = [sexo];
    if (sexo == "indefinido") {
        if (nacimiento != '' && opcionDate == 'igual') {
            sql = "SELECT * FROM empleado WHERE nacimiento = ? ALLOW FILTERING";
            params = [nacimiento];
        } else if (nacimiento != '' && opcionDate == 'mayor') {
            sql = "SELECT * FROM empleado WHERE token(nacimiento) >= token(?) ALLOW FILTERING";
            params = [nacimiento];

        } else if (nacimiento != '' && opcionDate == 'menor') {
            sql = "SELECT * FROM empleado WHERE token(nacimiento) <= token(?) ALLOW FILTERING";
            params = [nacimiento];
        } else {
            sql = "SELECT * FROM empleado ALLOW FILTERING"; 
        }
    } else {
        if (nacimiento != '' && opcionDate == 'igual') {
            sql = "SELECT * FROM empleado WHERE token(nacimiento) = token(?) ALLOW FILTERING ? AND sexo = ? ALLOW FILTERING";
            params = [nacimiento,sexo];
        } else if (nacimiento != '' && opcionDate == 'mayor') {
            sql = "SELECT * FROM empleado WHERE token(nacimiento) >=token(?) ALLOW FILTERING AND sexo = ? ALLOW FILTERING";
            params = [nacimiento,sexo];
        } else if (nacimiento != '' && opcionDate == 'menor') {
            sql = "SELECT * FROM empleado WHERE token(nacimiento) <= token(?) ALLOW FILTERING AND sexo = ? ALLOW FILTERING";
            params = [nacimiento,sexo];
        } else if (nacimiento == '') {
            sql = "SELECT * FROM empleado WHERE sexo = ? ALLOW FILTERING";
            params = [nacimiento,sexo];
        } else {
            sql = "SELECT * FROM empleado ALLOW FILTERING";
        }
    }
    client.execute(sql,params, { prepare: true })
        .catch(err => console.error(err))
        .then(result => {
            res.render("../views/crudCassandra.ejs", {
                datos: result.rows,
                nomPagina: "postgresql",
                titulo: "Datos"
            })
        });
})















module.exports = app;