import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function NavBar(props) {
    const location = useLocation();

    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand as={Link} to='/'>
                E Commerce
            </Navbar.Brand>
            <Nav className='mr-auto'>
                <Nav.Link
                    as={Link}
                    to='/products'
                    active={location.pathname === '/products'}
                >
                    Products
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to='/user/info'
                    active={location.pathname === '/user/info'}
                >
                    Info
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to='/user/selling'
                    active={location.pathname === '/user/selling'}
                >
                    Selling
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to='/user/sold'
                    active={location.pathname === '/user/sold'}
                >
                    Sold
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to='/user/purchase'
                    active={location.pathname === '/user/puchase'}
                >
                    Purchase
                </Nav.Link>
                <Nav.Link as={Link} to='/logout'>
                    Log out
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
