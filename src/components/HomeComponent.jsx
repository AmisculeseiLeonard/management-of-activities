import React from 'react'
import team from "../menu-icons/teamwork.png";
import projects from "../menu-icons/checklist.png";
import product from "../menu-icons/flowchart.png";
import employees from "../menu-icons/employee.png";
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function HomeComponent() {
    return (
        <div>
            <Container style={{
                width: "85%",
                marginTop: 50,
                paddingTop: 30,
                paddingBottom: 30,
                border: "1px solid grey",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"

            }}>
                <Row>
                <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={employees} />
                            <Card.Body>
                                <Card.Title>Employees</Card.Title>
                                <Card.Text>
                                    Add employees to create teams. 
                                    You can see the list of all employees 
                                    and also update them at any time
                                </Card.Text>
                                <Link to={"/employees"} style={{marginRight:10}}>
                                <Button variant="primary">View </Button>
                                </Link>

                                <Link to={"/add-employee"}>
                                <Button variant="primary">Add Employee</Button>
                                </Link>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={team} />
                            <Card.Body>
                                <Card.Title>Teams</Card.Title>
                                <Card.Text>
                                    Create teams to work on projects. 
                                    You can see the list of teams 
                                    and also update them at any time
                                </Card.Text>
                                <Link to={"/teams"} style={{marginRight:20}}>
                                <Button variant="primary">View </Button>
                                </Link>

                                <Link to={"/create-team"}>
                                <Button variant="primary">Create Team</Button>
                                </Link>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={projects} />
                            <Card.Body>
                                <Card.Title>Projects</Card.Title>
                                <Card.Text>
                                    Create projects, 
                                    add tasks and open bugs.
                                    Here you can see a list with projects and tasks
                                </Card.Text>
                                <Link to={"/projects"} style={{marginRight:20}}>
                                <Button variant="primary">View </Button>
                                </Link>

                                <Link to={"/create-project"}>
                                <Button variant="primary">Create Project</Button>
                                </Link>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product} />
                            <Card.Body>
                                <Card.Title>Products</Card.Title>
                                <Card.Text>
                                    Create products and releases. 
                                    You can see the list of products 
                                    and also update them at any time
                                </Card.Text>
                                <Link to={"/products"} style={{marginRight:20}}>
                                <Button variant="primary">View </Button>
                                </Link>

                                <Link to={"/products"}>
                                <Button variant="primary">Create product</Button>
                                </Link>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomeComponent
