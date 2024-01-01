import api from './api';

const signup = (users) => {
    return api.post("api/signup/", users,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const usersApi = {
    signup: signup
}

export default usersApi;