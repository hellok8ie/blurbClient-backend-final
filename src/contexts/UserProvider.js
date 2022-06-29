import axios from "axios";
import UserContext from "./UserContext";
import React from "react";

export const UserProvider = (props) => {

    const baseUrl = "http://localhost:3000/api/users/";

    function createUser(newUser) {       

        return axios.post(baseUrl, newUser)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function signInUser(username, password) {
        let user = { username, password };
    
        return axios.post(`${baseUrl}login`, user)
            .then(response => {
                localStorage.setItem('myBlurbToken', response.data.token)
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function getUser(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myBlurbToken')}`
        };

        return axios.get(`${baseUrl}profile/` + id, { headers: myHeaders }).then(response => {
            return new Promise(resolve => resolve(response.data));
        });
    };

    return (
        <UserContext.Provider value={{
            createUser,
            signInUser,
            getUser
        }}>
            { props.children }
        </UserContext.Provider>
    )
}