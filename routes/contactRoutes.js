// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const contactCtr = require('../controllers/contactController');
const authCtr = require('../controllers/authController');
const { ContactModel, UserModel } = require('../db/sequelizeSetup');

// Router Set
router
    .route('/')
    .get(authCtr.protect, authCtr.restrictTo("Admin"), contactCtr.findAllContacts)
    .post(contactCtr.createContactTicket)

router
    .route('/:id')
    .get(authCtr.protect, authCtr.restrictTo("Admin"), contactCtr.findContactByPk)
    // .put(authCtr.protect, authCtr.restrictTo("Admin"), contactCtr.updateContactTicket)
    .delete(authCtr.protect, authCtr.restrictTo("Admin"), contactCtr.deleteContactTicket)

// Export Module
module.exports = router;