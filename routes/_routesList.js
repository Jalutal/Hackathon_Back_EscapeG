const express = require('express');

const defaultPath = `/api`;

const routesList = [
    // Conthroller Route
    {   
        path:`${defaultPath}/users`,
        router:'./routes/userRoutes'
    },
    {   
        path:`${defaultPath}/roles`,
        router:'./routes/roleRoutes'
    }
];


module.exports = routesList;