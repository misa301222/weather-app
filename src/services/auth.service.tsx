import axios from "axios";
import Logout from "../Components/Login/logout";

const API_URL = "https://localhost:5001/api/User";

class AuthService {

    login(email: string, password: string) {
        const body = {
            Email: email,
            Password: password
        }

        return axios
            .post(API_URL + "/Login", body)
            .then(response => {
                /*
                console.log('a: ' + response);
                console.log('respuesta: ' + JSON.stringify(response.data));
                console.log('respuesta: ' + JSON.stringify(response.data.dataSet.email));
                console.log('respuesta: ' + JSON.stringify(response.data.responseCode));
*/
                switch (response.data.responseCode) {
                    case 1:
                        if (response.data.dataSet.token) {
                            localStorage.setItem("user", response.data.dataSet.email);
                            localStorage.setItem('fullName', response.data.dataSet.fullName);
                            localStorage.setItem('token', response.data.dataSet.token);
                            localStorage.setItem("roles", response.data.dataSet.roles);
                            console.log('Logged Succesfully as: ' + response.data.dataSet.email);
                            console.log('Roles: ' + response.data.dataSet.roles);
                        }
                        break;
                    case 2:
                        console.log(response.data.responseMessage);
                        break;
                    case 3:

                        break;
                }

                console.log('respuesta: ' + JSON.stringify(response.data));
                /*
                console.log('respuesta: ' + response.data.dataSet.roles);                
                console.log('respuesta: ' + (response.data.responseCode));
                console.log('respuesta: ' + (response.data));
                console.log('respuesta: ' + (response.data.dataSet.email));
                console.log('respuesta: ' + (response.data.dataSet.token));
                */

                return response;
            });
    }

    clearData() {

        return <Logout />
    }

    register(username: string, email: string, password: string) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    get getCurrentUser() {
        return localStorage.getItem('user');
    }

    get getRoles() {
        return localStorage.getItem('roles');
    }
}

export default new AuthService();