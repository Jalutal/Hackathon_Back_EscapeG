// Database Conexion Configs

// Databases
const dbInfo = {
    dialect: 'mysql', // Dialect Type
    logging:false,
    default:{
        host:'localhost',
        port:3306,
        database:'escape_green',
        user:'root',
        password:''
    },
    production:{
        host:'',
        port:3306,
        database:'',
        user:'',
        password:``
    }
}

// Export
module.exports ={
    dbInfo
}
