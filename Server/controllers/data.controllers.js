const Joi = require("joi");
const dataModel = require("../models/data.models");
const { response } = require("express");

const makeReading = (req, res) => {//response to POST /data
    const schema = Joi.object().keys({
        "readings": Joi.object().keys({
            "pressure": Joi.number().required(),
            "temperature": Joi.number().required(),
            "color_temperature": Joi.number().required(),
            "gas_resistance": Joi.number().required(),
            "aqi": Joi.number().required(),
            "humidity": Joi.number().required(),
            "luminance": Joi.number().required()
        }).required(),
        "nickname": Joi.string().required(),
        "model": Joi.string().required(),
        "uid": Joi.string().required(),
        "timestamp": Joi.date().required()
    })

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let data = Object.assign({}, req.body)

    dataModel.enterReading(data, err => {
        if (err) return res.sendStatus(500);

        return res.sendStatus(201);
    })
}

const getData = (req, res) => { //response to GET /data
    const schema = Joi.object().keys({ 
        "type": Joi.number().required().valid(1,2), //1 for large graphs, 2 for small graphs that include raw data
        "value": Joi.string().required().valid("pressure", "temperature", "colour_temp", "air_qual", "humidity", "luminance"),
        "group_by": Joi.alternatives().conditional("type", {is: 1, then: Joi.string().required().valid("day","week","month","year")}),
        "method": Joi.alternatives().conditional("type", {is: 1, then: Joi.string().required().valid("min","max","avg")}),
        "date": Joi.alternatives().conditional("type", {is: 2, then: Joi.date().iso().required()})
    })
    
    let data = JSON.parse(req.headers.request)
    const {error} = schema.validate(data,{allowUnknown: true});
    if (error) return res.status(400).send(error.details[0].message);

    let request = Object.assign({}, data);

    
    if (request.type == 1){ //seperates out the kinds of request
        dataModel.getBigGraph(request, (err, num, response) => {
            if(err == 400) return res.sendStatus(400);
            if(err) return res.sendStatus(500);

            return res.status(200).send(response);
        })
    }else if (request.type == 2){
        dataModel.getRawGraph(request, (err,num, response) =>{
            if (err == 404) return res.sendStatus(404);
            if(err) return res.sendStatus(500);

            return res.status(200).send(response);
        })
    }else {
        return res.status(500).send();
    }
    
}

const deleteData = (req, res) =>{
    const schema = Joi.object().keys({
        "from": Joi.date().iso().required(),
        "to": Joi.date().iso().required()
    })

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let request = Object.assign({}, req.body);

    dataModel.deleteReadings(request, (err, numChanges) => {
        if (err) return res.sendStatus(500);

        return res.status(200).send(numChanges);
    })
}


module.exports = {
    makeReading : makeReading,
    getData : getData,
    deleteData : deleteData
}