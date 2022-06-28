import React, { useContext, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [state, setUsState] = useState("");
    const [avatarURL, setAvatarURL] = useState("")

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
         event.preventDefault();
         createUser(username, password).then(() => {
            navigate('/signIn');
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
                <Form.Control type="text" name="username" value={username} onChange={e => setUserName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="string" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name="state" value={state} onChange={e => setUsState(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Profile Picture URL:</Form.Label>
                <Form.Control type="url" name="avatarURL" value={avatarURL} onChange={e => setAvatarURL(e.target.value)} />
                <Form.Text className="text-muted">Optional</Form.Text>
            </Form.Group>
          <Button type="submit" className="saveBtn">Save</Button>
        </Form>
        <br/>
        </Container>
    )
};

export default SignUp;