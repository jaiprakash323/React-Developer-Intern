export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return '';
};

export const validateNumberInRange = (value, min, max, fieldName) => {
  const num = Number(value);
  if (isNaN(num)) return `${fieldName} must be a number`;
  if (num < min) return `${fieldName} must be at least ${min}`;
  if (num > max) return `${fieldName} must be at most ${max}`;
  return '';
};

export const validateForm = (formData) => {
  const errors = {};
  
  errors.name = validateRequired(formData.name, 'Name');
  errors.email = validateEmail(formData.email);
  errors.id = validateRequired(formData.id, 'ID');
  errors.password = validatePassword(formData.password);
  
  return {
    isValid: Object.values(errors).every(error => error === ''),
    errors
  };
};