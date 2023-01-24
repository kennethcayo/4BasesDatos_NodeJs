const express = require("express")
const morgan = require("morgan")
var cors = require('cors');
const app = express()

app.use(express.json());

app.use(cors());

app.use(morgan("dev"))
app.set("port",3015)
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static("./public"))
app.use("/pagina",express.static("./pagina.html"))
app.get("/pagi",(req,res)=>(res.render("pagi.ejs")))
app.get("/pag",(req,res)=>{
    res.send("<h1>hola<h1>")
})
app.get("/",(req,res)=>(res.render("index.ejs", {
    nomPagina: "NodeMOngo"
})))
module.exports = app;
