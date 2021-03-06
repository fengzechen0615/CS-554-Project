import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './navBar.css';

export default function NavBar(props) {
    const location = useLocation();

    return (
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Navbar.Brand as={Link} to='/'>
                E Commerce
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link
                        as={Link}
                        to='/admin/users'
                        active={location.pathname === '/admin/users'}
                    >
                        Users
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to='/admin/products'
                        active={location.pathname === '/admin/products'}
                    >
                        Products
                    </Nav.Link>
                    <Nav.Link as={Link} to='/logout'>
                        Log out
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
