// Import & Init
const express = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors');
const routes = require('./routes/_routesList');
// Listen Port (Default)
const listen = {
    host: process.env.host || `localhost`,
    port: process.env.port || 8010
}

// Init Sequelize
sequelize.initDb();

// Run Middleware

// Init App
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Init & Set Route
routes.forEach((route)=>{
    const routepath = require(route.router);
    app.use(route.path, routepath);
});


// default Request
app.get("*", (req, res) => {
    // Request Not Found
    res.status(404).json({ message: `L'url demandé n'existe pas.`});
})

// Connect App from listen Port
app.listen(listen.port, (err) =>{
    if (err) {return console.log("Erreur de démarage du serveur", err)}
    console.log(`Connecté sur le port ${listen.port}`);
});
