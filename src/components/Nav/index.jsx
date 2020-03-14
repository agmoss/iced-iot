import React, { Component } from 'react';

// Bootstrap
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

/**
 * **Navig Class**
 *
 * Navigation Bar
 *
 */
class Navig extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg">
        <a className="navbar-brand" href="/">
          <span className="logo">Iced IoT </span>
          <img
            src={`${process.env.PUBLIC_URL}/ice-tea.png`}
            alt="ice-tea"
          />
        </a>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <NavDropdown
              title="Source"
              drop="left"
              className="logo-small"
            >
              <NavDropdown.Item href="https://github.com/agmoss/iot-simulation">
                IoT Devices
              </NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/agmoss/IotHub_EventHub_MongoDB">
                Azure Function App
              </NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/agmoss/iotsimbackend">
                Express API's
              </NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/agmoss/iot-dashboard">
                React.js Web App
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/agmoss">
                Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link className="logo-small" href="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navig;
