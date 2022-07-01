import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import UserContext from '../contexts/UserContext';
import Table from 'react-bootstrap/esm/Table';
import { Button, Card } from 'react-bootstrap';
import BlurpContext from '../contexts/BlurpContext';
import '../styles/UserProfile.css';

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
            .catch(error => {
                console.log(error);
                navigate('/signin');
            })
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
            {user.userId && userProfile.userId === user.userId && 
                <Link id='editProfileLink' to={`/profile/edit/${user.userId}`}>Edit Profile</Link>}
            <table id='firstTable'>
            <tbody>
                <tr id='firstTableRow'>
                        <td id='imgCell'>
                        <img id='profilePic' src={`${userProfile.avatarURL}`} alt='lucky cat'/>
                        </td>
                    <td>
                    <table style={{width:'50%'}}>
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
                </table>
                </td>
                </tr>
            </tbody>
            </table>

            <h1>Blurbs Below:</h1>
            <br></br>
            {blurps.map((b) => {
                            return (
                                <>
                                {userProfile.userId === b.userId &&
                                <>
                                <Card id='blurpCard' key={b.blurpId}>
                                    <Card.Body>
                                    <Card.Text>
                                        {b.blurp}
                                        <br></br>
                                        <br></br>
                                        <>
                                            <div id='userControls'>
                                            {user && user.userId === b.userId && <Link id='editLink' to={`/edit/${b.blurpId}`}>Edit</Link>}{' '}
                                            {user && user.userId === b.userId && <Button id='deleteBtn' onClick={handleDelete.bind(this, b.blurpId)}>Delete</Button>}
                                            </div>
                                        </>
                                    </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
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