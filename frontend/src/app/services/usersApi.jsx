import api from './api';

const test = () => {
    return api.get("api/test");
}

const usersApi = {
    test : test
}

export default usersApi;