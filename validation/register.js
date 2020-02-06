const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Le prénom doit être compris entre 2 et 30 caractères.';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Le champs prénom est requit.';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Le champs email est requit.';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'l\'Email est invalide';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Un mot de passe est requit.';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Le mot de passe doit être compris entre 6 et 30 caractères.';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Veuillez confirmer votre mot de passe.';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Les mots doivent être identiques sur les deux champs.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
