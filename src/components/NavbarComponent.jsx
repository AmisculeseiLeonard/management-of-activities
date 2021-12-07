import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import {Container, Nav, NavDropdown} from 'react-bootstrap';
import ListEmployeeComponent from './ListEmployeeComponent';
import { Link } from 'react-router-dom'

function NavbarComponent() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to={"/"}  style={{ textDecoration: 'none', color:'rgba(255,255,255,.55)'}}>Management of Activities</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link ><Link to={"/"}  style={{ textDecoration: 'none', color:'rgba(255,255,255,.55)'}}>Home</Link></Nav.Link>
                            
                            <NavDropdown title="Employees" id="collasible-nav-dropdown">
                                <NavDropdown.Item><Link to={"/employees"}>View Employees</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item ><Link to={"/add-employee"}>Add Employee</Link></NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Teams" id="collasible-nav-dropdown">
                                <NavDropdown.Item><Link to={"/teams"}>View Teams</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item ><Link to={"/create-team"}>Create Team</Link></NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Projects" id="collasible-nav-dropdown">
                                <NavDropdown.Item><Link to={"/projects"}>View Projects</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item ><Link to={"/create-project"}>Create project</Link></NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link ><Link to={"/products"}  style={{ textDecoration: 'none', color:'rgba(255,255,255,.55)'}}>
                                Products</Link></Nav.Link>
                            
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent
