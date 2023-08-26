import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './style.css';

const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Navbar.Brand href="#home" className="custom-margin-left">E-commerce App</Navbar.Brand>
            <Nav className="custom-margin-right">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#cart">Cart</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;