module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Sponsors', {
        sponsors_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom du sponsor est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom du sponsor doit avoir un nombre de caractères compris entre 2 et 15.",
                    args: [2, 15]
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
        sponsor_img: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    msg: "Le nombre de caractères doit être compris entre 1 et 50.",
                    args: [1, 50]
                }
            },
        },
    }, 
    );
}