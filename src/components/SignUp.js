import React, { useContext, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    let [ newUser, setNewUser] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        avatarURL: ''
    })

    // const [username, setUserName] = useState("");
    // const [password, setPassword] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [city, setCity] = useState("");
    // const [state, setUsState] = useState("");
    // const [avatarURL, setAvatarURL] = useState("");

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
         event.preventDefault();
         createUser(newUser)
         .then(() => {
            navigate('/');
         }).catch(error => {
            console.log(error);
            window.alert('Failed registration: User not created');
         });
    }
    
    return (
        <Container>
        <br/>
        <h1>Sign Up Here!</h1>
        <Form className="newForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" name="username" value={newUser.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={newUser.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="string" name="firstName" value={newUser.firstName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" name="lastName" value={newUser.lastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" value={newUser.city} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name="state" value={newUser.state} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Profile Picture URL:</Form.Label>
                <Form.Control type="url" name="avatarURL" value={newUser.avatarURL} onChange={handleChange} />
                <Form.Text className="text-muted">Optional</Form.Text>
            </Form.Group>
          <Button type="submit" className="saveBtn">Save</Button>
        </Form>
        <br/>
        </Container>
    )
};

export default SignUp;