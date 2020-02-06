const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateDetection(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.surname = !isEmpty(data.surname) ? data.surname : '';

  if (Validator.isEmpty(data.surname)) {
    errors.surname = 'Le champs nom est requit';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Le champs prénom est requit';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
