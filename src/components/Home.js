import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, Outlet } from 'react-router-dom';
import logo from '../blurb-logos2.png';
import UserContext from '../contexts/UserContext';

const Home = () => {

    let { user } = useContext(UserContext);

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
                    <Nav.Link href="/signin">Sign In</Nav.Link>
                    <Nav.Link href="/">All Blurbs</Nav.Link>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
};

export default Home;