export const ValidateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
export const ValidateName = (name) => /^[a-zA-Z]{2,}$/.test(name.trim());
export const ValidatePhone = (phone) => phone.trim() === '' || /^\d{10,}$/.test(phone);
