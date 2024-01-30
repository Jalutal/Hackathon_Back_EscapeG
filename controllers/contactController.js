const { ValidationError } = require('sequelize');
const { ContactModel } = require('../db/sequelizeSetup');
const bcrypt = require('bcrypt');

// Find Contact
const findAllContacts = (req, res) => {
    ContactModel
        .findAll()//{ include: ReviewModel })
        .then(result => {
            res.json({ message: 'La liste des Messages de contact a bien été récupérée.', data: result });
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
};

const findContactByPk = (req, res) => {
    ContactModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: `L'élément ayant pour id ${req.params.id} n'existe pas.` });
            } else {
                res.json({ message: `L'élément a bien été récupéré.`, data: result });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Une erreur est survenue : ${error}` });
        });
};
// Create Contact Ticket
const createContactTicket = (req, res) => {
    
    const newContactForm = {...req.body}
    ContactModel.create(newContactForm)
        .then(contact =>{
            res.status(201).json({message: `Le ticket de contact a bien été crée`, data:contact});
        })
        .catch(error =>{
        // Redirect Error
        if (error instanceof ValidationError) { 
            // Return Error 400
            return res.status(400).json({ message: `${error.message}` });
          }
          res.status(500).json({ message: `une erreur est survenue`, data: error.message });
      });
};
// Update Contact Ticket
const updateContactTicket = (req, res) => {
    ContactModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: `Le Ticket N°${req.params.id} n'a pas été trouvé` })
            } else {
                // "statusState": "Progress"
                return result
                    .update(req.body)
                    .then(() => {
                        res.json({ message: `Ticket modifié : ${result.dataValues.id} `, data: result })
                    });
            };
        })
        .catch(error => {
            // Redirect Error
            if (error instanceof ValidationError) {
                // check and rename if Default Error Message
                 
                // Return Error 400
                return res.status(400).json({ message: `${error.message}` });
            }
            // Internal Error
            res.status(500).json({ message: error.message });
        });
};

// Delete Contact Ticket
const deleteContactTicket = (req, res) =>{
    ContactModel
    .findByPk(req.params.id)
    .then(result => {
        if (!result) {
            //throw new Error('Aucun coworking trouvé')
            res.status(404).json({ message: `le ticket de contact n'existe pas` })
        } else {
            return result
                .destroy()
                .then(() => {
                    res.json({ message: `ticket de contact supprimé : ${result.dataValues.id} `, data: result })
                })
        }
    })
    .catch(error => {
        res.status(500).json({ message: `${error}` })
    })
}

// Export
module.exports = {findAllContacts, findContactByPk, createContactTicket, updateContactTicket, deleteContactTicket};
