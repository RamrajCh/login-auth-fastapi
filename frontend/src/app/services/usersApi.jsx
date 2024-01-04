import api from './api';

const signup = (users) => {
    return api.post("api/signup/", users,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const signin = (req_body) => {
    return api.post("api/signin/", req_body);
}

const verifyCaptcha = (captchaToken) => {
    return api.post("api/verify-captcha/", captchaToken);
}

const getUserByToken = (token) => {
    return api.post("api/user-by-token/", token);
}

const usersApi = {
    signup: signup,
    signin: signin,
    verifyCaptcha: verifyCaptcha,
    getUserByToken: getUserByToken
}

export default usersApi;