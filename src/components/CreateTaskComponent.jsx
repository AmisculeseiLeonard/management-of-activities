import React from 'react'
import { Form, Button, FormControl, Row, Col, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { DatePicker } from "react-rainbow-components";
import EmployeeService from '../services/EmployeeService';
import TaskTypeService from '../services/TaskTypeService';
import TaskStatusService from '../services/TaskStatusService';
import BuildPriorityService from '../services/BuildPriorityService';
import SeverityService from '../services/SeverityService';
import TaskService from '../services/TaskService';

function CreateTaskComponent(props) {
    const teams  = props.location.teams.selectedTeams;
    const row = props.location.row;
    const history = useHistory();

    //const [teams, setTeams] = useState();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskType, setTaskType] = useState({});
    const [taskStatus, setTaskStatus] = useState({});
    const [priority, setPriority] = useState({});
    const [severity, setSeverity] = useState({});
    const [dueDate, setDueDate] = useState('');
    const [assignedEmployee, setAssignedEmployee] = useState({});
    const [project, setProject] = useState({});
    const [employeeList, setEmployeeList] = useState([]);

    const [taskTypes, setTaskTypes] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState([]);
    const [buildPriorities, setBuildPriorities] = useState([]);
    const [severities, setSeverities] = useState([]);

    useEffect(() => {
        TaskTypeService.getTaskTypes()
            .then(res => {setTaskTypes(res.data); setTaskType(res.data[0].id) })
            .catch(error => console.log(error));

        TaskStatusService.getTaskStatuses()
            .then(res => {setTaskStatuses(res.data); setTaskStatus(res.data[0].id) })
            .catch(error => console.log(error));

        BuildPriorityService.getBuildPriorities()
            .then(res => {setBuildPriorities(res.data); setPriority(res.data[0].id) })
            .catch(error => console.log(error));

        SeverityService.getSeverity()
            .then(res => {setSeverities(res.data); setSeverity(res.data[0].id) })
            .catch(error => console.log(error));

        getEmployees();
    }, [])

    const getEmployees = () => {
        let employees = [];
        teams.map(team => {
            team.employees.map(employee => {
                if((employees.filter(e => employee.id == e.id)).length == 0){
                    employees.push(employee)
                }
            })
        })
        setEmployeeList([...employees]);
        setAssignedEmployee(employees[0].id)
    }

    const submit = (e) => {
        e.preventDefault();
       
        let task = {
            taskName: taskName, taskDescription: taskDescription, dueDate: dueDate,
            taskType: taskTypes.filter(type => type.id == taskType)[0],
            taskStatus: taskStatuses.filter(status => status.id == taskStatus)[0],
            priority: buildPriorities.filter(p => p.id == priority)[0],
            severity: severities.filter(s => s.id == severity)[0],
            assignedEmployee: employeeList.filter(employee =>employee.id == assignedEmployee)[0],
            project: row
        }

        TaskService.createTask(task).then(res =>  history.push(`/projects`));
    }


    return (
        <div>
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
                                <Form.Label>Task name</Form.Label>
                                <Form.Control type="text" placeholder="Enter task name"
                                    onChange={ev => { setTaskName(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter task description"
                                    onChange={ev => { setTaskDescription(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select Task Type</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={ev => setTaskType(ev.target.value)}
                                >
                                    {taskTypes.map((type) => {
                                        return <option key={type.id} value={type.id}>{type.taskTypeName}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select Task Status</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={ev => setTaskStatus(ev.target.value)}
                                >
                                    {taskStatuses.map((status) => {
                                        return <option key={status.id} value={status.id}>{status.taskStatusName}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select Priority</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={ev => setPriority(ev.target.value)}
                                >
                                    {buildPriorities.map((priority) => {
                                        return <option key={priority.id} value={priority.id}>{priority.priority}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select Severity</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={ev => setSeverity(ev.target.value)}
                                >
                                    {severities.map((severity) => {
                                        return <option key={severity.id} value={severity.id}>{severity.severityName}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Due Date</Form.Label>
                                <DatePicker
                                    id="datePicker-1"
                                    value={dueDate}
                                    onChange={setDueDate}
                                    // label="DatePicker Label"
                                    formatStyle="large"
                                />

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Assign an employee</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={ev => setAssignedEmployee(ev.target.value)}
                                >
                                    {employeeList.map((employee) => {
                                        return <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <Button variant="primary"  onClick={(e) => submit(e)}>
                            Submit
                        </Button>
                    </div>
                
                </Form>
            </Container>
        </div>
    )
}

export default CreateTaskComponent
