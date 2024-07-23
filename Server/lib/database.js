const sqlite = require("sqlite3");
const crypto = require("crypto")

const dbfile = "db.sqlite";

let db = new sqlite.Database(dbfile, (err) =>{
    if (err){
        console.error(error.message);
        throw err;
    }else{
        console.log('Database running');

        db.run(`CREATE TABLE data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pressure REAL,
            temperature REAL,
            colour_temp INTEGER,
            air_qual REAL,
            humidity REAL,
            luminance INTEGER,
            nickname TEXT,
            date_time TEXT
            )`,
            (err) => {
                if (err){
                    console.log("data table already made");
                }else{
                    console.log("data table created");
                }
            }
        )
    }
})

module.exports = db;