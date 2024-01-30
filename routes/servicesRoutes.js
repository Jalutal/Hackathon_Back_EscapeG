// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const authCtr = require('../controllers/authController');
const servCtr = require('../controllers/servicesController')

// Router Set
router
    .route('/')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), servCtr.findAllService)


// Export Module
module.exports = router;