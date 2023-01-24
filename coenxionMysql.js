const app = require("./app")
const conexion = require("./database/mysql/conecxion")

app.get("/mysql", (req, res) => {
    conexion.query('SELECT * FROM empleado', (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.render("../views/crudMysql.ejs", {
                datos: filas,
                nomPagina: "postgresql",
                titulo: "Datos"
            })
        }
    });

})

app.get("/mwp", async (req, res) => {
    pool.query('SELECT * FROM empleado ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
            throw error;
        }
        res.render("../views/crudPostgresq.ejs", {
            datos: results.rows,
            nomPagina: "postgresql",
            titulo: "Datos"
        })
    });
})

app.post("/agregarMysql", async (req, res) => {
    const { usuario, correo, contrasenia, nacimiento, sexo } = req.body;
    conexion.query(
        'INSERT INTO empleado (usuario, correo,contrasena,nacimiento,sexo) VALUES (?, ?, ?, ?, ?)',
        [usuario, correo, contrasenia, nacimiento, sexo],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.redirect('/mysql')
        }
    );
})

app.post("/mysqlElimina", async (req, res) => {
    const id = parseInt(req.body.id)
    conexion.query('DELETE FROM empleado WHERE id = ?', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.redirect('back')
    })

})

app.post("/mysqlActu", async (req, res) => {
    const id = parseInt(req.body.id)
    const { usuario, correo, contrasenia, nacimiento, sexo } = req.body;
    conexion.query(
        'UPDATE empleado SET usuario = ?, correo = ?, contrasena=?, nacimiento=?, sexo=? WHERE id = ?',
        [usuario, correo, contrasenia, nacimiento, sexo, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.redirect('back')
        }
    )
})

app.post("/filtroMysql", async (req, res) => {
    const nacimiento = req.body.nacimiento;
    const opcionDate = req.body.opcionDate;
    const sexo = req.body.sexo;

    if (sexo == "indefinido") {
        if (nacimiento != '' && opcionDate == 'igual') {
            sql = "SELECT * FROM empleado WHERE nacimiento ='" + nacimiento + "'";
        } else if (nacimiento != '' && opcionDate == 'mayor') {
            sql = "SELECT * FROM empleado WHERE nacimiento >='" + nacimiento + "'";
        } else if (nacimiento != '' && opcionDate == 'menor') {
            sql = "SELECT * FROM empleado WHERE nacimiento <='" + nacimiento + "'";
        } else {
            sql = "SELECT * FROM empleado";
        }
    } else {
        if (nacimiento != '' && opcionDate == 'igual') {
            sql = "SELECT * FROM empleado WHERE nacimiento ='" + nacimiento + "'" + "AND sexo ='" + sexo + "'";
        } else if (nacimiento != '' && opcionDate == 'mayor') {
            sql = "SELECT * FROM empleado WHERE nacimiento >='" + nacimiento + "'" + "AND sexo ='" + sexo + "'";
        } else if (nacimiento != '' && opcionDate == 'menor') {
            sql = "SELECT * FROM empleado WHERE nacimiento <='" + nacimiento + "'" + "AND sexo ='" + sexo + "'";
        } else if (nacimiento == '') {
            sql = "SELECT * FROM empleado WHERE sexo ='" + sexo + "'";
        } else {
            sql = "SELECT * FROM empleado";
        }
    }
    conexion.query(sql, (error, results) => {
        if (error) {
            console.log(error)
            throw error;
        }
        res.render("../views/crudMysql.ejs", {
            datos: results,
            nomPagina: "postgresql",
            titulo: "Datos"
        })
    });
})

//? Conexion mysql 2
app.get('/api/empleado', (req, res) => {
    conexion.query('SELECT * FROM empleado', (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

app.get("/mysql2", (req, res) => {
    res.render("../views/crudMysql2.ejs", {
        nomPagina: "NodeMOngo",
        titulo: "Datos"
    })
})




















module.exports = app;