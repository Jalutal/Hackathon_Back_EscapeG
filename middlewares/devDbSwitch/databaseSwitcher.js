// Database Switch - for select production or devellopement database
const { dbInfo } = require("../../configs/databaseConfig");

// Switch database with environnement App and return database result
const selectEnvDb = (ProcessNodeEnvName) =>{
    const db ={
        dialect:dbInfo.dialect,
        logging:dbInfo.logging
    };
    // Select database environnement
    if (ProcessNodeEnvName === 'production'){
        db.host = dbInfo.production.host;
        db.port = dbInfo.production.port;
        db.database = dbInfo.production.database;
        db.user = dbInfo.production.user;
        db.password = dbInfo.production.password;
    } else {
        db.host = dbInfo.default.host;
        db.port = dbInfo.default.port;
        db.database = dbInfo.default.database;
        db.user = dbInfo.default.user;
        db.password = dbInfo.default.password;
    }
    // return final dbInfo
    return db
}
// Export
module.exports ={ selectEnvDb };