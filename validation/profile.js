const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.sport = !isEmpty(data.sport) ? data.sport : '';

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Un nom d\'équipe est requit.';
  }

  if (Validator.isEmpty(data.sport)) {
    errors.sport = 'Le champs sport est requit';
  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
