import axios from 'axios';

const url = 'http://localhost:5000/api/users/';

class AuthService {

    static register(newUser) {
        return axios.post(`${url}register`, {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        });
    }
    
    static login(user) {
        return axios.post(`${url}login`, {
            email: user.email,
            password: user.password,
        });
    }
    
    static profile() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}profile`);
                resolve(res);
            } catch(error) {
                reject(error);
            }
        });
    }
}

export default AuthService;
