export const validateNickname = (nickname) => {
  const Regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return Regex.test(nickname);
};

export const validateEmail = (email) => {
  const uvcDomainRegex = /@uvc\.co\.kr$/;
  return uvcDomainRegex.test(email);
};

export const validateNumber = (number) => {
  return number.length > 7;
};

export const validatePassword = (password) => {
  return password.length > 7;
};
