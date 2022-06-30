import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import UserContext from '../contexts/UserContext';
import Table from 'react-bootstrap/esm/Table';
import { Button, Card } from 'react-bootstrap';
import BlurpContext from '../contexts/BlurpContext';

const UserProfile = () => {

    let {id} = useParams();
    let navigate = useNavigate();

    let { blurps, deleteBlurp } = useContext(BlurpContext);
    let { getUserProfile, user } = useContext(UserContext);
    
    let [ userProfile, setUserProfile ] = useState("");

    useEffect(() => {
        async function fetch() {
            await getUserProfile(id)
            .then((userProfile) => setUserProfile(userProfile))
        }
        fetch()
    }, [getUserProfile, id]);

    function handleDelete(id) {

        deleteBlurp(id).then(() => {
            alert('Blurp Gone!')
            navigate('/')
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    return (
        <div>
            <h1>User Profile: {userProfile.username}</h1>
            <Table>
            <tbody>
                <tr>
                <td>Name:</td>
                <td>{userProfile.firstName}{' '}{userProfile.lastName}</td>
                </tr>
                <tr>
                <td>Location: </td>
                <td>{userProfile.city}{', '}{userProfile.state}</td>
                </tr>
                <tr>
                <td>Profile Created: </td>
                <td>{(userProfile.createdAt)}</td>
                </tr>
            </tbody>
            </Table>
            <h1>Blurbs Below:</h1>

            {blurps.map((b) => {
                            return (
                                <>
                                {userProfile.userId === b.userId &&
                                <>
                                <Card border="warning" style={{ width: '18rem' }} key={b.blurpId}>
                                    <Card.Body>
                                    <Card.Text>
                                        {b.blurp}
                                    </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        {user && user.userId === b.userId && <Link to={`/edit/${b.blurpId}`}>Edit</Link>}
                                        {user && user.userId === b.userId && <Button onClick={handleDelete.bind(this, b.blurpId)}>Delete</Button>}
                                        {b.User.username}{', '}
                                        {(b.updatedAt)}
                                    </Card.Footer>
                                </Card>
                                <br />
                                </> }
                                </>
                            )
                        })}

        </div>

    )
};

export default UserProfile;