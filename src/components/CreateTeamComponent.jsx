import React from 'react'
import { Form, Button, FormControl, Row, Col, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { DatePicker } from "react-rainbow-components";
import TeamService from '../services/TeamService';
import EmployeeService from '../services/EmployeeService';
import BootstrapTable from 'react-bootstrap-table-next';

function CreateTeamComponent() {

    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDesciption] = useState('');
    const [upperManagementEmployees, setUpperManagementEmployees] = useState([]);
    const [teamLeaderId, setTeamLeaderId] = useState('');
    const [teamEmployees, setEmployees] = useState([]);
    const [members, setMembers] = useState([]);

    const history = useHistory();

    useEffect(() => {
        EmployeeService.getUpperManagementEmployees()
            .then(res => { setUpperManagementEmployees(res.data);  console.log(res.data) })
            .catch(error => console.log(error));

            EmployeeService.getEmployees()
            .then(res => { setEmployees(res.data);  console.log(res.data) })
            .catch(error => console.log(error));

    }, [])

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
    }


    const saveTeam = (e) => {
        e.preventDefault();
        let team = {
            name: teamName, teamDescription: teamDescription,
            teamLeader: upperManagementEmployees.filter(employee => employee.id == teamLeaderId)[0],
            employees: members
        }
        //console.log(members);
        TeamService.createTeam(team).then(res => history.push("/teams"));
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <h2>Create a new team</h2>
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
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Team name</Form.Label>
                                <Form.Control type="text" placeholder="Enter team name"
                                    onChange={ev => { setTeamName(ev.target.value) }} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Team Leader</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={ev => setTeamLeaderId(ev.target.value)}
                                >
                                    <option>Select team leader</option>

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
                            <Form.Control as="textarea" rows={3} onChange={ev => { setTeamDesciption(ev.target.value) }} />

                        </Form.Group>
                    </Col>

                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                                <Form.Label>Select team members</Form.Label>
                                <Form.Select aria-label="Default select example"
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
                        <Button variant="primary" type="submit" onClick={saveTeam} >
                            Submit
                        </Button>
                    </div>

                </Form>
            </Container>

        </div>
    )
}

export default CreateTeamComponent
