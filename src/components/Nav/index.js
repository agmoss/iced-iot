import React from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

class Navig extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Navbar collapseOnSelect expand="lg">
                
                <a class="navbar-brand" href="/">
                    <span className="logo">Iced IoT </span>
                    <img src={process.env.PUBLIC_URL + '/ice-tea.png'}></img>
                </a>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <NavDropdown title="Source" drop="left" className="logo-small">
                            <NavDropdown.Item href="https://github.com/agmoss/iot-simulation">IoT Devices</NavDropdown.Item>
                            <NavDropdown.Item href="https://github.com/agmoss/IotHub_EventHub_MongoDB">Azure Function App</NavDropdown.Item>
                            <NavDropdown.Item href="https://github.com/agmoss/iotsimbackend">Express API's</NavDropdown.Item>
                            <NavDropdown.Item href="https://github.com/agmoss/iot-dashboard">React.js Web App</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://github.com/agmoss">Profile</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link className="logo-small" href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default Navig; 