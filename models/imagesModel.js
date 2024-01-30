module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Images', {
        img_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom de l'image est déjà prise."
            },
            validate: {
                len: {
                    msg: "Le nom de l'image doit avoir un nombre de caractères compris entre 2 et 30.",
                    args: [2, 30]
                }
            },
        },
        img_url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    msg: "L'url doit avoir un nombre de caractères compris entre 11 et 300.",
                    args: [11, 300]
                }
            },
        },
    }, 
    );
}