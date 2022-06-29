import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignIn = () => {

    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");

    let { signInUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInUser(username, password).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
            window.alert('User Not Found');
            navigate('/signup');
        });
    };

    return (
            <Form onSubmit={handleSubmit}>
                <h1>Sign In Here</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
    )
};

export default SignIn;