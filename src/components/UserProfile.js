import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import UserContext from '../contexts/UserContext';
import Table from 'react-bootstrap/esm/Table';

const UserProfile = () => {

    let {id} = useParams();

    let { getUser } = useContext(UserContext);
    let [ user, setUser ] = useState("");

    useEffect(() => {
        async function fetch() {
            await getUser(id)
            .then((user) => setUser(user))
        }
        fetch()
    }, [getUser, id]);

    return (
        <div>
            <h1>User Profile: {user.username}</h1>
            <Table>
            <tbody>
                <tr>
                <td>Name:</td>
                <td>{user.firstName}{' '}{user.lastName}</td>
                </tr>
                <tr>
                <td>Location: </td>
                <td>{user.city}{', '}{user.state}</td>
                </tr>
                <tr>
                <td>Profile Created: </td>
                <td>{(user.createdAt)}</td>
                </tr>
            </tbody>
            </Table>
        </div>

    )
};

export default UserProfile;