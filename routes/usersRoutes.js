// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const userCtr = require('../controllers/userController');
const authCtr = require('../controllers/authController');
// Import Sequelize Model & Middleware for restrict
const { UserModel } = require('../db/sequelizeSetup');

// Router Set
router
    .route('/')
    .get(authCtr.protect, authCtr.restrictTo("Admin"), userCtr.findAllUsers)

router
    .route('/login')
    .post(authCtr.login)
    
router
    .route('/signup')
    .post(authCtr.signUp)

router
    .route('/:id')
    .get(authCtr.restrictToOwnUser(UserModel), userCtr.findUserByPk)
    .put(authCtr.protect, authCtr.restrictToOwnUser(UserModel), userCtr.updateUser)
    .delete(authCtr.protect, authCtr.restrictTo("Admin"), userCtr.deleteUser)

// Export Module
module.exports = router;