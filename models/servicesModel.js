module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Services', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom du service est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom du service doit avoir un nombre de caractères compris entre 3 et 15.",
                    args: [3, 15]
                }
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    msg: "La description doit avoir un nombre de caractères compris entre 3 et 50.",
                    args: [3, 50]
                }
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    msg: "Le prix  nombre de caractères compris entre 1 et 50.",
                    args: [1, 50]
                }
            },
        },
        ispublished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, 
    );
}