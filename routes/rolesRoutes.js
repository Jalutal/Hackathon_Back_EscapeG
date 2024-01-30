// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const roleCtr = require('../controllers/roleController');
const authCtr = require('../controllers/authController');

// Router Set
router
    .route('/')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), roleCtr.findAllRoles)


// Export Module
module.exports = router;