import Validator from 'validator';
import isEmpty from './is-empty';

const validateProfileInput = (data) => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';

  if (!Validator.isLength(data.handle, {min: 2, max: 40})) {
    errors.handle = 'Handle needs to be between 2 and 20 characters';
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateProfileInput;
