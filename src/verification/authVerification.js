// testing

const test = {
    isLatin: value => new RegExp("^[a-zA-Z0-9]+$").test(value), // regLatin = new RegExp('^[a-zA-Z0-9]+$');
    isTrueSimbols: value => new RegExp(`^[0-9]`).test(value) // regFirstNum = new RegExp(`^[0-9]`);
};

export const getLoginError = login => {
    if (login.length >= 0 && login.length < 5)
        return "Логин должен состоять минимум из 5 знаков.";
    else if (test.isTrueSimbols(login) && login.length >= 0)
        return "Логин не может начинаться с цифры.";
    else if (!test.isLatin(login) && login.length >= 0)
        return "Логин не может содержать кириллицу и спец символы.";
    else if (login.length >= 0 && login.length > 16)
        return "Логин должен состоять максимум из 16 символов.";
    else return null;
};

export const getPasswordError = password => {
    if (password.length >= 0 && password.length < 5)
        return "Пароль должен состоять минимум из 5 знаков.";
    else if (test.isTrueSimbols(password) && password.length >= 0)
        return "Пароль не может начинаться с цифры.";
    else if (!test.isLatin(password) && password.length >= 0)
        return "Пароль не может содержать кириллицу и спец символы.";
    else if (password.length >= 0 && password.length > 16)
        return "Пароль должен состоять максимум из 16 символов.";
    else return null;
};

export const getRequestError = (action, error, {login, signup}) => {
    if (action === login && error !== null && error.status === 400)
        return (
            (error.data.err === "User doesnt exist" ||
                error.data.err === "Password is invalid") &&
            "Неправильный пароль или логин!"
        );

    if (action === signup && error !== null && error.status === 400)
        return (
            error.data.message === "nickname already exist" &&
            "Этот логин уже используеться!"
        );
};