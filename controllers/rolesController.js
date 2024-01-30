// Role Model
const { RoleModel } = require("../middlewares/Sequelize/sequelizeSetup")

const findAllRoles = (req, res) => {
    RoleModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des rôles ont été récupéré', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        });
};

module.exports = {findAllRoles}