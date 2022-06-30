import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import logo from '../blurb-logos2.png';
import UserContext from '../contexts/UserContext';

const Home = () => {

    let { user } = useContext(UserContext);
    let navigate = useNavigate();

    if (user.username) {
       var isLoggedIn = true
    } else {
        isLoggedIn = false
    }

    function handleLogOff () {
        localStorage.clear();
        navigate('/');
        window.location.reload(true);
        return 
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">
                    <img
                    alt=""
                    src={logo}
                    width="110"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Text>
                    Hello there{' '}
                    {user.userId && <Link to={`/profile/${user.userId}`}> {user.username}</Link>}!
                </Navbar.Text>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                    <Nav.Link href="/signin" hidden={isLoggedIn}>Sign In</Nav.Link>
                    <Nav.Link href="/">All Blurbs</Nav.Link>
                    {user.userId && <Button onClick={handleLogOff}>Log Off</Button>}
                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
};

export default Home;