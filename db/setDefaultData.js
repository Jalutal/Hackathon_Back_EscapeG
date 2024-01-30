// Cet fonction permer de créer créer les données par défaut au démarage de Sequelize

// Import
const bcrypt = require('bcrypt');
const { Op, ValidationError } = require('sequelize');

// Import Data
const roles = require("./data/roles.json");

// SetDefaultData
module.exports = () =>{
    // set Roles
    const rolePromises = roles.map(role => {
        return RoleModel.create({
            label: role
        });
    })
    // If Role is Generated
    Promise.all(rolePromises)
    .then(async () => {

    })
    .catch(error =>{ // Is Error, return status error
        if (error instanceof ValidationError){
            return console.error({Error : error.message}, 400)
        }
        // Error servor
        console.error({Error : error.message}, 500)
    });
}