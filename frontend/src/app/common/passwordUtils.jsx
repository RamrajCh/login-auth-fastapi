import zxcvbn from 'zxcvbn';

const checkPasswordValidity = (password, confirmPassword) => {
  // Check if password has at least 8 characters
  if (password.length < 8) {
    return [false, "Password should have at least 8 characters"];
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return [false, "Password should contain at least one lowercase letter"];
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return [false, "Password should contain at least one uppercase letter"];
  }

  // Check if password contains at least one digit
  if (!/\d/.test(password)) {
    return [false, "Password should contain at least one digit"];
  }

  // Check if password contains at least one symbol
  if (!/\W/.test(password)) {
    return [false, "Password should contain at least one symbol (@$!%*?&)"];
  }

  // All validations passed
  return [true, "All validations passed"];
}

const getPasswordStrength = (password) => {
	const result = zxcvbn(password);
	return result.score * 25;
}

const passwordUtils = {
	checkPasswordValidity: checkPasswordValidity,
	getPasswordStrength: getPasswordStrength
}

export default passwordUtils;