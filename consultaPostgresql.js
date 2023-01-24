const app = require("./app")
const study = require("./Modelo/mEstudiobd")
const pool = require("./database/postgresql/conexion")

app.get("/postgre", async (req, res) => {
    pool.query('SELECT * FROM empleado ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
            throw error;
        }
        console.log(results.rows)
        res.render("../views/crudPostgresql.ejs", {
            datos: results.rows,
            nomPagina: "postgresql",
            titulo: "Datos"
        }) 
    });
}) 

app.post("/agregarPostgrsql", async (req, res) => {
    console.log(req.body)
    const { usuario, correo, contrasena, nacimiento, sexo } = req.body;
    pool.query(
        'INSERT INTO empleado (usuario, correo,contrasena,nacimiento,sexo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [usuario, correo, contrasena, nacimiento, sexo],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.redirect('/postgre')
        }
    );
})

app.post("/postgreElimina", async (req, res) => {
    console.log("--------------")
    const id = parseInt(req.body.id)
    console.log(id)
    pool.query('DELETE FROM empleado WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.redirect('back')
    })
})

app.post("/postgreActu", async (req, res) => {
    console.log("----------")
    console.log(req.body)
    const id = parseInt(req.body.id)
    const { usuario, correo, contrasena, nacimiento, sexo } = req.body;
    pool.query(
        'UPDATE empleado SET usuario = $2, correo = $3, contrasena=$4, nacimiento=$5, sexo=$6 WHERE id = $1',
        [id, usuario, correo, contrasena, nacimiento, sexo],
        (error, results) => {
            if (error) {
                throw error
            }
            res.redirect('back')
        }
    )
})

app.post("/filtroPostgr", async (req, res) => {
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
    console.log(sql)
    pool.query(sql, (error, results) => {
        if (error) {
            console.log(error)
            throw error;
        }
        console.log(results.rows)
        res.render("../views/crudPostgresql.ejs", {
            datos: results.rows,
            nomPagina: "postgresql",
            titulo: "Datos"
        })
    });

})




module.exports = app;

