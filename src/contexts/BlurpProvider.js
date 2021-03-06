import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import BlurpContext from "./BlurpContext";

export const BlurpProvider = (props) => {

    const [ blurps, setBlurps ] = useState([]);

    const baseUrl = "http://localhost:3000/api/blurps/";

    useEffect(() => {
        async function fetchData() {
            await getAllBlurps();
        }
        fetchData();
    }, []);

    function getAllBlurps() {
        return axios.get(baseUrl).then(response => setBlurps(response.data));
    };

    function getBlurp(id) {
        return axios.get(baseUrl + id).then(response => {
            return new Promise(resolve => resolve(response.data));
        });
    };

    function newBlurp(newBlurpPost) {        
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myBlurpToken')}`
        };
    
        return axios.post(baseUrl, newBlurpPost, { headers: myHeaders })
            .then(response => {
                getAllBlurps();
                return new Promise(resolve => resolve(response.data));
            }
        );
    };

    function editBlurp(blurp) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myBlurpToken')}`
        };

        return axios.put(baseUrl + blurp.blurpId, blurp, { headers: myHeaders })
            .then(response => {
                getAllBlurps();
                return new Promise(resolve => resolve(response.data));
            }
        );
    };

    function deleteBlurp(id) {

        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myBlurpToken')}`
        };

        return axios.delete(baseUrl + id, { headers: myHeaders }).then(response => {
            getAllBlurps();
            return new Promise(resolve => resolve(response.data));
        });
    };

    return (
        <BlurpContext.Provider value={{
            blurps,
            getBlurp,
            newBlurp,
            editBlurp,
            deleteBlurp
        }}>
            {props.children}
        </BlurpContext.Provider>
    )
}

