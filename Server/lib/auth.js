const config = require('config');

const getBasicAuth = (req) =>{ // courtesy https://stackoverflow.com/a/5957629
    var header = req.headers.authorization || ''; 
    var token = header.split(/\s+/).pop() || '';
    var auth = Buffer.from(token, 'base64').toString();
    var parts = auth.split(/:/); 
    var username = parts.shift(); 
    var password = parts.join(':'); 

    return [username, password]
}

const authenticateDevice = function(req,res){
    if(!req.headers.authorization){
        return false
    }
    const [username, password] = getBasicAuth(req)

    const devices = config.get('deviceAuth');

    var authorized = false;
    devices.forEach(element => {
        if ((element.username == username)&&(element.password == password)){
            authorized = true;
        }
    });

    if (authorized){
        return true
    }else{
        return false
    }
}

const authenticateFrontend = function(req,res){
    if(!req.headers.authorization){
        return false
    }
    const [username, password] = getBasicAuth(req)

    const devices = config.get('frontendAuth');

    var authorized = false;
    devices.forEach(element => {
        if ((element.username == username)&&(element.password == password)){
            authorized = true;
        }
    });

    if (authorized){
        return true
    }else{
        return false
    }
}

module.exports ={
    authenticateDevice:authenticateDevice,
    authenticateFrontend:authenticateFrontend
}