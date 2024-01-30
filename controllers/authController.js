// Import & Init
    // Sequelize & Error
const { ValidationError } = require("sequelize");
const { UserModel, RoleModel } = require("../middlewares/Sequelize/sequelizeSetup");
    // Bcrypt / Token
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Bcrypt SaltRound
const defaultSaltRound = 11 ;
// Config Token (Secretkey, Expiration)
const jwtToken = {
    key:"SECRET_KEY",
    expiresIn: 60 * 60 // Data Shema : Minutes * Seconds
};
const SECRET_KEY = jwtToken.key;

// Login Connexion
const login = (req, res) =>{
    // check login exist into database
    UserModel.scope('withPassword').findOne({where: { username:req.body.username }})
    .then((user) => {
        // check user exist and valid pasword, return jwt with data if valid or return error
        if (!user) return res.status(404).json({ message: `L'utilisateur n'existe pas` });
        bcrypt.compare(req.body.password, user.password).then((isValid) => {
            if (isValid) {
              const token = jwt.sign(
                {
                  data: {
                    email: req.body.identifiant,
                    id: user.id,
                    role: user.RoleId,
                    username:user.username,
                    name:user.firstname
                  },
                },
                SECRET_KEY,
                { expiresIn: jwtToken.expiresIn }
              );
              return res.json({ message: "login réussi", data: token});
            } else {
              return res.status(406).json({ message: `Le mot de passe n'est pas correct` });
            }
          }); 
    })
    .catch((error) => {
        return res.status(500).json({ message: error.message });
    });
};

// SignUp
const signUp = (req, res) => {  
    bcrypt
      .hash(req.body.password, defaultSaltRound)
      .then((hash) => {
          // Get Req Data
          const dataUser = { ...req.body, password: hash };
          // console.log(dataUser)
          // Check Role - If Role is a Admin Role or undefined, set value into Default Value
          if (!dataUser.RoleId || dataUser.RoleId > 5) {dataUser.RoleId = 1}
          return UserModel.create(dataUser).then((result) => {
              res.status(201).json({ message: "Un utilisateur a bien été créé.", 
              data: { ...result, password: null } });
          });
      })
      .catch((error) => {
        // Redirect Error
        if (error instanceof ValidationError) {
          // check and rename if Default Error Message
          if (error instanceof UniqueConstraintError || error.message === "Validation error"){
            error.message = `${error.message}: ${error.original.sqlMessage}`;
          }
          // Return Error 400
          return res.status(400).json({ message: `${error.message}` });
        }
        // Default Error
        res.status(500).json({ message: error });
      });
  };

// protect
const protect = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: `Vous n'êtes pas authentifié` });
    }
    // Get Token
    const token = req.headers.authorization.split(" ")[1];
    // if Token valid, go next controllers
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.username = decoded.data.username;
        // if Token Valid, Next into request
        next();
      } catch (error) {
        res.status(403).json({ message: `Le jeton n'est pas valide` });
      }
    } else {
      res.status(401).json({ message: `Vous n'êtes pas authentifié.` });
    }
  };

// Auth Restrict (By role)
const restrictTo = (roleParam) => {
  return (req, res, next) => {
    return UserModel.findOne({ where: { username: req.username } })
      .then((user) => {
        if (!user) return res.status(401).json({ message: `Le jeton a expiré` }); //Old Token exist but Expired
        return RoleModel.findByPk(user.RoleId).then(role => {
          // Check if Loggin User Role can bypass in RoleParam
          if (rolesHierarchy[role.label].includes(roleParam)) {
            // console.log("UserId",user.id)
            req.UserId = user.id;
            return next();
          } else {
            return res.status(403).json({ message: `Vous n'avez pas les droits suffisants` });
          }
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  };
};

// Auth Restrict (By model)
const restrictToOwnUser = (modelParam) => {
  return (req, res, next) => {
    modelParam
      .findByPk(parseInt(req.params.id))
      .then((result) => {
        if (!result) {
          const message = `La ressource n°${req.params.id} n'existe pas`;
          return res.status(404).json({ message });
        } 
        return UserModel.findOne({ where: { email: req.email } }).then((user) => {
          // Only same user or a Admin User (RoleId = 5) can pass next
          if (!user) return res.status(401).json({ message: `Le jeton a expiré` }); //Old Token exist but Expired
          if (result.id !== user.id && (user.RoleId !== 5)) {
            const message = "Tu n'as pas l'autorisation d'accéder à cette ressource";
            return res.status(403).json({ message });
          }
          return next();
        });
      })
      .catch((err) => {
        const message = "Erreur lors de l'autorisation";
        res.status(500).json({ message, data: err.message  });
      });
  };
};

// Export
module.exports = {login, signUp, protect, restrictTo, restrictToOwnUser}