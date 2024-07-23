const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dataCont = require("./controllers/data.controllers")
const auth = require("./lib/auth.js")

const app = express();
const port = 1025;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors())


app.listen(port, () =>{
    console.log("Server up on port " + port)
});

app.post("/data", (req, res, next) =>{
    console.log(req.body);
    if (auth.authenticateDevice(req,res)){
        dataCont.makeReading(req,res)
    }else{
        res.sendStatus(401);
    }
});

app.get("/data", (req, res, next) =>{
    console.log(req.headers.request);
    if (auth.authenticateFrontend(req,res)){
        dataCont.getData(req,res)
    }else{
        res.sendStatus(401);
    }
});

app.delete("/data", (req, res, next) =>{
    console.log(req.body);
    if (auth.authenticateFrontend(req,res)){
        dataCont.deleteData(req,res)
    }else{
        res.sendStatus(401);
    }
})

app.use(function(req, res){
    res.sendStatus(404);
})