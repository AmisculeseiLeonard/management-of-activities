import React from 'react'
import { Form, Button, FormControl, Row, Col, Container, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { DatePicker } from "react-rainbow-components";
import RoleService from '../services/RoleService';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom'
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { MdDeleteForever } from 'react-icons/md';
import { useHistory } from "react-router-dom";

function UpdateEmployeeComponent(props) {

    const row = props.location.state.row
    console.log(row)

    const history = useHistory();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: (page, sizePerPage) => {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: (page, sizePerPage) => {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }
    });

    const handleDelete = (rowId, name) => {
        console.log(rowId, name);

    };

    const columns = [
        { dataField: 'id', text: 'Id' },
        { dataField: 'name', text: 'Name', sort: true },
        { dataField: 'teamDescription', text: 'Description', sort: true },
        {
            dataField: "teamLeader.firstName",
            text: "Team leader",
            formatter: (cell, row) => {
                console.log(row);
                return <div>{`${row.teamLeader.firstName} ${row.teamLeader.lastName}`}</div>;
            }
        },
        {
            dataField: 'remove', text: 'Delete',
            formatter: (cellContent, row) => {
                return (
                    <MdDeleteForever color='red'
                        onClick={() => handleDelete(row.id, row.name)}
                    >
                    </MdDeleteForever>
                );
            }
        }
    ];

    const [roles, setRoles] = useState([]);
    const [employeeEmail, setEmployeeEmail] = useState(row.email);
    const [employeeFirstName, setEmployeeFirstName] = useState(row.firstName);
    const [employeeLastName, setEmployeeLastName] = useState(row.lastName);
    const [employeePhoneNumber, setEmployeePhoneNumber] = useState(row.phoneNumber);
    const [employeeBirthDate, setemployeeBirthDate] = useState(row.birthDate);
    const [employeeTeams, setEmployeeTeams] = useState([]);
    const [role, setRole] = useState(row.role);
    const [date, setDate] = useState(null);
    const [formDisable, setFormDisable] = useState(true);

    function onChange(date) {
        setDate(date);
        setemployeeBirthDate(date);
    }

    function toggle() {
        setFormDisable(!formDisable)
    }

    const updateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            id: row.id, firstName: employeeFirstName, lastName: employeeLastName,
            email: employeeEmail, phoneNumber: employeePhoneNumber, role: role, birthDate: employeeBirthDate
        }

        EmployeeService.updateEmployee(employee, row.id).then(res => { 
            // history.push(`/employees`)
            });

        handleShow();
    }

    const deleteEmployee = (e) => {
        e.preventDefault();

        EmployeeService.deleteEmployee(row.id).then(res => {  history.push(`/employees`)});
    }

    useEffect(() => {
        RoleService.getRoles()
            .then((res) => setRoles(res.data))
            .catch(error => console.log(error));

        EmployeeService.getTeams(row.id)
            .then((res) => { setEmployeeTeams(res.data); console.log(res.data) })
            .catch(error => console.log(error));

    }, [])

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <h2>View Details / Update employee details</h2>
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
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Enable update employee details"
                        onChange={toggle}
                    />
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>First name</Form.Label>
                                <Form.Control readOnly={formDisable} type="text" placeholder={employeeFirstName}
                                    onChange={ev => { setEmployeeFirstName(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control readOnly={formDisable} type="text" placeholder={employeeLastName}
                                    onChange={ev => { setEmployeeLastName(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control readOnly={formDisable} type="email" placeholder={employeeEmail}
                                    onChange={ev => { setEmployeeEmail(ev.target.value) }} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control readOnly={formDisable} type="text" placeholder={employeePhoneNumber}
                                    onChange={ev => { setEmployeePhoneNumber(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select role</Form.Label>
                                <Form.Select disabled={formDisable} aria-label="Default select example"
                                    onChange={ev => setRole({ id: ev.target.value, roleName: roles.find(role => role.id == ev.target.value).roleName })}
                                >
                                    {roles.map((role) => {
                                        return <option key={role.id} value={role.id}>{role.roleName}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select birth date</Form.Label>
                                <DatePicker
                                    id="datePicker-1"
                                    value={date}
                                    onChange={onChange}
                                    // label="DatePicker Label"
                                    formatStyle="large"
                                    readOnly={formDisable}
                                    placeholder={employeeBirthDate ? employeeBirthDate.toString() : ""}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                        <BootstrapTable bootstrap4 keyField='id' columns={columns} data={employeeTeams} hover bordered
                            pagination={pagination}/>
                    

                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <Link to={"/employees"} style={{ marginRight: "15%" }}>
                            <Button variant="primary" >
                                Close
                            </Button>
                        </Link>


                        <Button variant="primary" type="submit" onClick={updateEmployee} style={{ marginRight: "15%" }}>
                            Submit
                        </Button>
                       

                       <Button variant="danger" type="submit" onClick={deleteEmployee}>Delete</Button>
                    </div>




                </Form>
            </Container>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>The employee was updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Stay on page
                    </Button>
                    <Link to={"/employees"}>
                        <Button variant="primary" onClick={handleClose}>
                            Go to employees
                        </Button>
                    </Link>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateEmployeeComponent
