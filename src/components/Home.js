import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import logo from '../blurb-logos2.png';

const Home = () => {

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
                    <Nav.Link href="/about">Sign Up</Nav.Link>
                    <Nav.Link href="/products">Sign In</Nav.Link>
                    <Nav.Link href="/products/add">All Blurbs</Nav.Link>
                </Container>
            </Navbar>
            <Outlet/>
        </>

    )
};

export default Home;