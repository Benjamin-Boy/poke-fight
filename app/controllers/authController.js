const dataMapper = require("../dataMapper");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const { localsName } = require("ejs");

const authController = {
  loginPage: (req, res) => {
    res.render('login');
  },
  signupPage: (req, res) => {
    res.render('signup');
  },
  signup: async (req, res) => {
    const errorMessages = {
      allFields: `Tous les champs doivent être renseignés`,
      nameExists: `Ce pseudo existe déjà`,
      emailIncorrect: `L'adresse mail n'existe pas`,
      emailExists: `L'adresse mail existe déjà`,
      emailInvalid: `L'adresse mail n'est pas valide`,
      passwordInvalid: `Le mot de passe n'est pas valide`,
      passwordNotConfirm: `Les mots de passe ne correspondent pas`
    };

    if(!req.body.name || !req.body.email || !req.body.password || !req.body.passwordConfirm){
      return res.render('signup', { allfields: errorMessages.allFields });
    }

    if(!emailValidator.validate(req.body.email)) {
      return res.render('signup', { emailInvalid: errorMessages.emailInvalid });
    }

    if(req.body.password !== req.body.passwordConfirm) {
      return res.render('signup', { passwordNotConfirm: errorMessages.passwordNotConfirm });
    }

    const userEmail = await dataMapper.getUserByEmail(req.body.email);

    if(userEmail){
      return res.render('signup', { emailExists: errorMessages.emailExists });
    }

    const userName = await dataMapper.getUserByName(req.body.name);

    if(userName && userName.name === req.body.name){
      return res.render('signup', { nameExists: errorMessages.nameExists });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    await dataMapper.createNewUser(req.body); // TODO Ajouter les validations (password valide, compte déjà existant)

    res.redirect('/');
  },
  login: async (req, res) => {
    try {
      const user = await dataMapper.getUserByEmail(req.body.email);

      if(!user){
        console.log(`Cet email n'existe pas`);
        return res.redirect('/');
      }
  
      const passwordValid = await bcrypt.compare(req.body.password, user.password);
  
      if(!passwordValid){
        console.log(`Le mot de passe est erroné`);
        return res.redirect('/');
      }
      
      req.session.user = user;
    
      res.redirect('/home');
    } catch (error) {
      res.status(500).send(error.message);
    }

  },
  logout: (req, res) => {
    req.session.destroy();

    res.redirect('/');
  }
}

module.exports = authController;