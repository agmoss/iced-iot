import React from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

class Navig extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Navbar collapseOnSelect expand="lg">
                <Navbar.Brand className="logo" href="/">Dam</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        
                    </Nav>
                    <Nav>
                        <Nav.Link className="logo-small" href="/about">About</Nav.Link>
                        <Nav.Link className="logo-small" href="/source">Source</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default Navig; 