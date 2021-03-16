export const isValidEmail = (email) => {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  const ruleUppercase = (password.match(/[A-Z]/g) || []).length >= 1;
  const ruleLowercase = (password.match(/[a-z]/g) || []).length >= 1;
  const ruleNumeric = (password.match(/[0-9]/g) || []).length >= 1;
  const rulePasswordLength = password.length >= 6;
  return ruleUppercase && ruleLowercase && ruleNumeric && rulePasswordLength;
};