const db = require("../lib/database")

const enterReading = (data, done) => {
    const sql = "INSERT INTO data (pressure, temperature, colour_temp, air_qual, humidity, luminance, nickname, date_time) VALUES (?,?,?,?,?,?,?,?)";
    let values = [data.readings.pressure, data.readings.temperature, data.readings.color_temperature, data.readings.aqi, data.readings.humidity, data.readings.luminance, data.nickname, data.timestamp]

    db.run(
        sql,
        values,
        function(err){
            if (err) return err (null, err);

            return done (null, null);
        }
    )
}

const getBigGraph = (request, done) => {

    var group;
    switch(request.group_by){
        case "day":
            group = "strftime('%F',date_time)";
            break;
        case "week":
            group = "strftime('%Y-%W',date_time)"
            break;
        case "month":
            group = "strftime('%Y-%m',date_time)";
            break;
        case "year":
            group = "strftime('%Y',date_time)";
            break;
        default:
            return done(400,null,null);
    }
    const sql = "SELECT "+ group+" bit, "+request.method+"("+request.value+") result FROM data GROUP BY bit"

    const results = [];
    db.each(
        sql,
        (err, ans) => {
            results.push({
                bit: ans.bit,
                result: ans.result
            });
        },
        (err, num) =>{
            return done(err,num,results);
        }
    )
}

const getRawGraph = (request, done) => {

    const sql = "SELECT "+request.value+" AS result, datetime(date_time) bit FROM data WHERE date(date_time) IS date('"+request.date+"')"

    const results = [];
    db.each(
        sql,
        (err, ans) => {
            results.push({
                bit: ans.bit,
                result: ans.result
            });
        },
        (err, num) =>{
            if (results.length === 0) return done(404,null, null)
            return done(err,num,results);
        }
    )
}

const deleteReadings = (request, done) => {

    const sql = "DELETE FROM data WHERE datetime(date_time) >= datetime('" + request.from +"') AND datetime(date_time) <= datetime('"+request.to+"')"

    db.run(
        sql,
        function(err){
            if (err) return err (null, err);

            return done (null, null);
        }
    )

}

module.exports = {
    enterReading : enterReading,
    getBigGraph :getBigGraph,
    getRawGraph : getRawGraph,
    deleteReadings : deleteReadings
}