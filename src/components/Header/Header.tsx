import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Navbar.Brand as={Link} to={"/"} className="custom-margin-left">E-commerce App</Navbar.Brand>
            <Nav className="custom-margin-right">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;
