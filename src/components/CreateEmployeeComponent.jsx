import React from 'react'
import { Form, Button, FormControl, Row, Col, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { DatePicker } from "react-rainbow-components";
import RoleService from '../services/RoleService';
import EmployeeService from '../services/EmployeeService';



function CreateEmployeeComponent() {

    const [roles, setRoles] = useState([]);
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeFirstName, setEmployeeFirstName] = useState('');
    const [employeeLastName, setEmployeeLastName] = useState('');
    const [employeePhoneNumber, setEmployeePhoneNumber] = useState('');
    const [employeeBirthDate, setemployeeBirthDate] = useState('');
    const [role, setRole] = useState({});
    const [date, setDate] = useState(null);

    function onChange(date) {
        setDate(date);
        setemployeeBirthDate(date);
    }

    const history = useHistory();

    useEffect(() => {
        RoleService.getRoles()
            .then((res) => { setRoles(res.data); setRole(res.data[0]) })
            .catch(error => console.log(error));

    }, [])

    const saveEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName: employeeFirstName, lastName: employeeLastName,
            email: employeeEmail, phoneNumber: employeePhoneNumber, role: role, birthDate: employeeBirthDate
        }

        EmployeeService.createEmployee(employee).then(res => {
            history.push("/employees")
        })
    }



    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <h2>Create a new employee</h2>
            </div>

            <Container style={{
                width: "70%",
                marginTop: 50,
                paddingLeft: 100,
                paddingRight: 100,
                paddingTop: 30,
                paddingBottom: 30,
                border: "1px solid lightBlue",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"

            }}>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name"
                                    onChange={ev => { setEmployeeFirstName(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name"
                                    onChange={ev => { setEmployeeLastName(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={ev => { setEmployeeEmail(ev.target.value) }} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone number"
                                    onChange={ev => { setEmployeePhoneNumber(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Select aria-label="Default select example"
                                onChange={ev => setRole({ id: ev.target.value, roleName: roles.find(role => role.id == ev.target.value).roleName })}
                            >
                                {roles.map((role) => {
                                    return <option key={role.id} value={role.id}>{role.roleName}</option>
                                })}
                            </Form.Select>
                        </Col>
                        <Col>
                            <DatePicker
                                id="datePicker-1"
                                value={date}
                                onChange={onChange}
                                // label="DatePicker Label"
                                formatStyle="large"
                            />
                        </Col>
                    </Row>
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <Button variant="primary" type="submit" onClick={saveEmployee} >
                            Submit
                        </Button>
                    </div>

                </Form>
            </Container>

        </div>
    )
}

export default CreateEmployeeComponent
