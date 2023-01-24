const { Router } = require('express')
const router = Router()
const mistudy = require("../Controllers/estudibdctrl")

router.get("/",mistudy.consultar_todo)
router.post("/",mistudy.guardar_estudiante)
router.put("/",mistudy.actualiza_datos)
router.delete("/",mistudy.elimina_es)

module.exports = router;

