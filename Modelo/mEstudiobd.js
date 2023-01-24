const { Schema, model } = require("mongoose");

const schemaUsers = new Schema(
{
    usuario: { type: String, require: true },
    correo: { type: String, require: true },
    contrasena: { type: String, require: true },
    nacimiento: { type: Date, require: true },
    sexo: { type: String, require: true },

},
{
    timestamps: true
});

module.exports = model("empleado",schemaUsers)
