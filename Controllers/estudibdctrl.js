const miStudy = {}
const study = require("../Modelo/mEstudiobd")

miStudy.consultar_todo = async (req, res) => {
    console.log("-------estoy consultando get")

    resultado_study = await study.find()
    
    //res.send(resultado_study[0].nombre)
    
    res.json(resultado_study)

}


miStudy.guardar_estudiante = async (req, res) => {
    console.log("------------------------")
    const nuevoEstudiante = new study(
        {
            usuario: req.body.nombre,
            correo: req.body.edad,
            contrasena: req.body.materia,
            nacimiento: req.body.nacimiento,
            sexo: req.body.sexo
        }
    )
    await nuevoEstudiante.save();
    res.json({ status: "usuario creado" })
}

miStudy.actualiza_datos = async (req, res) => {
    const miide = req.body.id

    console.log("updateddddd")
    console.log(miide)
    await study.findByIdAndUpdate(miide, req.body);
    res.json({ status: "Datos actualizados satisfactoriamente" })
}


miStudy.elimina_es = async (req, res) => {
    const miide = req.body.id
    console.log(req.path)
    await study.findByIdAndDelete(miide)
    res.json({ status: "Registro eliminado" })
}



module.exports = miStudy;