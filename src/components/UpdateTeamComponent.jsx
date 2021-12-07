import React from 'react';
import { Form, Button, FormControl, Row, Col, Container, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom'
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { MdDeleteForever } from 'react-icons/md';
import TeamService from '../services/TeamService';


function UpdateTeamComponent(props) {

    const row = props.location.state.row
    //console.log(row)

    const history = useHistory();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const [teamEmployees, setEmployees] = useState([]);
    const [name, setName] = useState(row.name);
    const [description, setDescription] = useState(row.teamDescription);
    const [projects, setProjects] = useState(row.projects);
    const [teamLeaderId, setTeamLeaderId] = useState(row.teamLeader.id);
    const [upperManagementEmployees, setUpperManagementEmployees] = useState([]);
    const [members, setMembers] = useState(row.employees);
    const [formDisable, setFormDisable] = useState(true);

    function toggle() {
        setFormDisable(!formDisable)
    }

    const columns = [
        {dataField: 'id', text: 'Id'},
        {dataField: 'firstName', text: 'First name', sort: true},
        {dataField: 'lastName', text: 'Last name',sort: true},
        {dataField: 'role.roleName', text: 'Role'}
    ];


    const selectMembers = (id) => {
        setMembers([...members, teamEmployees.find(employee => employee.id == id)]);
        let updatedEmployeeList = teamEmployees.filter(employee => employee.id != id);
        setEmployees(updatedEmployeeList);
        // console.log('Employees')
        // console.log(teamEmployees);
        // console.log('Members')
        // console.log(members)
    }

    useEffect(() => {
        EmployeeService.getUpperManagementEmployees()
            .then(res => { setUpperManagementEmployees(res.data); })
            .catch(error => console.log(error));

            EmployeeService.getEmployees()
            .then(res => {
                let unselectedEmployees = res.data.filter(employee => { members.forEach(em => employee.id != em.id) });
                 setEmployees(unselectedEmployees); 
                })
            .catch(error => console.log(error));
            
    }, [])

    const updateTeam = (e) => {
        e.preventDefault();
        let team = {
            id: row.id, name: name, teamDescription: description, employees: members,
            teamLeader: upperManagementEmployees.filter(employee => employee.id == teamLeaderId)[0]
        }

        TeamService.updateTeam(team, row.id).then(res => {
            //window.history.push("/employees")
        });
        console.log(teamLeaderId);
        console.log(upperManagementEmployees.filter(employee => employee.id == teamLeaderId)[0]);
        handleShow();
    }

    const deleteTeam = (e) => {
        e.preventDefault();

        TeamService.deleteTeam(row.id).then(res => history.push(`/teams`));
    }

    return (
        <div>
             <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <h2>View Details / Update team details</h2>
            </div>

           

            <Container style={{
                width: "80%",
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
                                <Form.Label>Team name</Form.Label>
                                <Form.Control readOnly={formDisable} type="text" placeholder={name}
                                    onChange={ev => { setName(ev.target.value) }} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Team Leader</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable} 
                                    onChange={ev => setTeamLeaderId(ev.target.value)}
                                >

                                    {upperManagementEmployees.map((employee) => {
                                        return <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} readOnly={formDisable}  placeholder={description}
                            onChange={ev => { setDescription(ev.target.value) }} />

                        </Form.Group>
                    </Col>

                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                                <Form.Label>Select team members</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable}
                                    onChange={ev => selectMembers(ev.target.value)}
                                >     <option>Add a member to team</option>
                                    {teamEmployees.map((employee) => {
                                        return <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                        <Form.Label>Members selected</Form.Label>
                        <BootstrapTable bootstrap4 keyField='id' columns={columns} data={members} hover bordered/>

                        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <Link to={"/employees"} style={{ marginRight: "15%" }}>
                            <Button variant="primary" >
                                Close
                            </Button>
                        </Link>


                        <Button variant="primary" type="submit" onClick={updateTeam} style={{ marginRight: "15%" }}>
                            Submit
                        </Button>

                        <Button variant="danger" type="submit" onClick={(e) => deleteTeam(e)}>
                            Delete
                        </Button>
                        </div>
                </Form>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Team Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>The team was updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Stay on page
                    </Button>
                    <Link to={"/teams"}>
                        <Button variant="primary" onClick={handleClose}>
                            Go to teams
                        </Button>
                    </Link>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default UpdateTeamComponent
