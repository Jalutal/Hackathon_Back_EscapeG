module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom d'utilisateur est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 3 et 15.",
                    args: [3, 15]
                }
            },
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    msg: "Le mot de passe doit avoir un nombre de caractères compris entre 8 et 20.",
                    args: [8, 20]
                }
            },
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    msg: "Le rôle doit être 1 (admin) ou 2 (sponsor).",
                    args: [1, 2]
                }
            },
        },
    }, 
    );
}