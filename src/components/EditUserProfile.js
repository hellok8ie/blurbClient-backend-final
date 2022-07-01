import React, { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const EditUserProfile = () => {

    let navigate = useNavigate();

    let { user, getUserProfile, editUser } = useContext(UserContext);
    let { id } = useParams();

    let [ profileUpdates, setProfileUpdates ] = useState({
        id: user.userId,
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        avatarURL: "",
        createdAt: user.createdAt
    });

    useEffect(() => {
        async function fetch() {
            await getUserProfile(id)
            .then((profile) => setProfileUpdates(profile))
        }
        fetch()
    }, [getUserProfile, id]);


    function handleChange (event) {
        setProfileUpdates((preValue) => {
            return {...preValue, [event.target.name]: event.target.value}
        })
    }

    function handleSubmit (event) {
        event.preventDefault()
        editUser(profileUpdates).then(() => {
            navigate('/');
            alert('User updated!');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    return (
        <Container>
        <br/>
        <h1>Edit {user.username}'s Profile</h1>
        <Form className="editForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label> First Name:</Form.Label>
                <Form.Control type="text" name="firstName" value={profileUpdates.firstName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" name="lastName" value={profileUpdates.lastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>city:</Form.Label>
                <Form.Control type="text" name="city" value={profileUpdates.city} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>State:</Form.Label>
                <Form.Control type="text" name="state" value={profileUpdates.state} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Profile Picture URL:</Form.Label>
                <Form.Control type="url" name="avatarURL" value={profileUpdates.avatarURL} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" className="saveBtn">Save</Button>
        </Form>
        <br/>
        </Container>
    )
}

export default EditUserProfile