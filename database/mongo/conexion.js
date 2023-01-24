const mongoose = require("mongoose")
uri="mongodb://127.0.0.1:3001/login"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos de mongodb'))
  .catch(e => console.log('error de conexión', e))
let se = true 

