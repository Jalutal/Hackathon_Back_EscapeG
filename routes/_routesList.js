const express = require('express');

const defaultPath = `/api`;

const routesList = [
    // Conthroller Route
    {   
        path:`${defaultPath}/users`,
        router:'./routes/+usersRoutes'
    },
    {   
        path:`${defaultPath}/roles`,
        router:'./routes/rolesRoutes'
    },
    {   
        path:`${defaultPath}/services`,
        router:'./routes/servicesRoutes'
    },
    {   
        path:`${defaultPath}/reservations`,
        router:'./routes/reservationsRoutes'
    },
    {   
        path:`${defaultPath}/contacts`,
        router:'./routes/contactRoutes'
    },
];


module.exports = routesList;