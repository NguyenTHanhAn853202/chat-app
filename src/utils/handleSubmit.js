const checkEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};
const checkPhoneNumber = (value) => {
    const phoneNumberRegex = /^\d{10,}$/;
    return phoneNumberRegex.test(value);
};
const checkUsername = (value) => {
    return checkPhoneNumber(value) || checkEmail(value);
};

const checkPassword = (value) => {
    const passwordsRegex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{:"?><=-])[A-Za-z0-9!@#$%^&*()_+~`|}{:"?><=-]{7,}$/;
    return passwordsRegex.test(value);
};

const checkEqualPassword = (password, rePassword) => {
    return password === rePassword;
};

export { checkEqualPassword, checkPassword, checkEmail, checkPhoneNumber, checkUsername };
