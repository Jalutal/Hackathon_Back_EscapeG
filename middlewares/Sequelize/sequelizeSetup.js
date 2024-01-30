// Sequelize ORM Setup

//Import
const { Sequelize, DataTypes, ConnectionError } = require('sequelize');
const { selectEnvDb } = require('../devDbSwitch/databaseSwitcher');
const setDefaultData = require('../../db/setDefaultData');

// Database Init (Switch into dev db or product db)
const ProcessNodeEnvName = process.env.NODE_ENV || 'devellopement';
const db = selectEnvDb(ProcessNodeEnvName); 

// Sequelize Init - Loggin:boolean = Sequelize Log activate
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    port: db.port? db.port : 3306,
    dialect: db.dialect,
    logging:false
});

// Authenticate & Connect Database
sequelize.authenticate()
    .then(() => console.log(
        'La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(
        `Impossible de se connecter à la base de données: ${error}`));

// Table Model defenition


// Define Table Database with Sequelize Model


// Table Jointure

// Database Initialisation
const initDb = () => {
    sequelize
        .sync({
            // Sequelize Synchronise la base de données connecté en fonction de l'initialisation des modèles de table et des jointures définis dans le fichier sequelizeSetup
            // force: true => force la base de donées à créer la base de données avec les données dans le fichiers js
            // force: true
        }) // Sync Data config
        .then(()=>{   
            // Initialise les données et enregistre les données par défaut au démarage de sequelize grâce à la fonction setDefaultData()
            setDefaultData(
                    
                );
            console.log('Sequelize ON');
        })
        .catch(error => {
            if( error instanceof ConnectionError){
                console.log("Le serveur n'est pas démaré. Veuillez le connecter")
            }
            else {
                console.log("Sequelize a retourner une erreur :", error)
            }
        });
    };

// Export Module
module.exports = {
    initDb, sequelize
};