import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand as={Link} to='/products'>
                Navbar
            </Navbar.Brand>
            <Nav className='mr-auto'>
                <Nav.Link as={Link} to='/products'>
                    Products
                </Nav.Link>
                <Nav.Link as={Link} to='/user/info'>
                    Info
                </Nav.Link>
                <Nav.Link as={Link} to='/user/selling'>
                    Selling
                </Nav.Link>
                <Nav.Link as={Link} to='/user/purchase'>
                    Pruchase
                </Nav.Link>
                <Nav.Link as={Link} to='/logout'>
                    Log out
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
