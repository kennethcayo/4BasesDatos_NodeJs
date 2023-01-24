const app = require("./app")
const users = require("./Modelo/mEstudiobd")

app.get("/mongo", async (req, res) => {
    resultao_study = await users.find()
    res.render("../views/crudMongo.ejs", {
        datosMongo: resultao_study,
        nomPagina: "NodeMOngo",
        titulo: "Datos"
    })
})

app.post("/con", async (req, res) => {
    console.log("la fecha es---------" + String(req.body.nacimiento))
    const nuevoEstudiante = new users(
        {
            usuario: req.body.usuario,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            nacimiento: new Date(req.body.nacimiento),
            sexo: req.body.sexo
        }
    )
    await nuevoEstudiante.save();
    console.log("------------");
    console.log(String(nuevoEstudiante.nacimiento))
    strignDate = String(nuevoEstudiante.nacimiento);
    var fecha;
    fecha = nuevoEstudiante.nacimiento;
    res.redirect('/mongo')
})

app.post("/conelimina", async (req, res) => {
    const miide = req.body.id
    await users.findByIdAndDelete(miide)
    console.log(req.body.id)
    res.redirect('back')
})

app.post("/actu", async (req, res) => {
    const miide = req.body.id
    await users.findByIdAndUpdate(miide, req.body);
    console.log(req.body)
    res.redirect('back')
})


//? Filtro de datos 
app.post("/filtroMongo", async (req, res) => {
    const nacimiento = req.body.nacimiento;
    const opcionDate = req.body.opcionDate;
    const sexo = req.body.sexo;
    if (sexo == "indefinido") {
        if (nacimiento != '' && opcionDate == 'igual') {
            Filtre_study = await users.find({ nacimiento: { "$eq": nacimiento } });
        } else if (nacimiento != '' && opcionDate == 'mayor') {
            Filtre_study = await users.find({ nacimiento: { "$gte": nacimiento } });
        } else if (nacimiento != '' && opcionDate == 'menor') {
            Filtre_study = await users.find({ nacimiento: { "$lte": new Date(nacimiento) } });
        } else {
            Filtre_study = await users.find();
        }
    } else {
        if (nacimiento != '' && opcionDate == 'igual') {
            Filtre_study = await users.find({ nacimiento: { "$eq": nacimiento }, sexo: sexo });
        } else if (nacimiento != '' && opcionDate == 'mayor') {
            Filtre_study = await users.find({ nacimiento: { "$gte": nacimiento }, sexo: sexo });
        } else if (nacimiento != '' && opcionDate == 'menor') {
            Filtre_study = await users.find({ nacimiento: { "$lte": new Date(nacimiento) }, sexo: sexo });
        } else if (nacimiento == '') {
            Filtre_study = await users.find({ sexo: { "$eq": sexo } });
        } else {
            Filtre_study = await users.find();
        }
    }

    res.render("../views/crudMongo.ejs", {
        datosMongo: Filtre_study,
        nomPagina: "NodeMOngo",
        titulo: "Datos"
    })

})































module.exports = app;

