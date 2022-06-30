import axios from "axios";
import UserContext from "./UserContext";
import React, { useEffect, useState } from "react";

export const UserProvider = (props) => {

    const [user, setUser] = useState([]);
    const baseUrl = "http://localhost:3000/api/users/";

    console.log(user)

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);

    function createUser(newUser) {       

        return axios.post(baseUrl, newUser)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function signInUser(username, password) {
        let userInfo = { username, password };
    
        return axios.post(`${baseUrl}login`, userInfo)
            .then(response => {
                setUser(response.data.existingUser)
                localStorage.setItem('myBlurpToken', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.existingUser))
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function getUserProfile(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myBlurpToken')}`
        };

        return axios.get(`${baseUrl}profile/` + id, { headers: myHeaders }).then(response => {
            return new Promise(resolve => resolve(response.data));
        });
    };

    return (
        <UserContext.Provider value={{
            user,
            createUser,
            signInUser,
            getUserProfile
        }}>
            { props.children }
        </UserContext.Provider>
    )
}