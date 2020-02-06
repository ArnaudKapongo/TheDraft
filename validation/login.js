const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Votre adresse email est invalide.';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Le champs email est requit.';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Le champs mot de passe est requit.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
