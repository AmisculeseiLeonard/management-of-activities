import React from 'react';
import { Form, Button, FormControl, Row, Col, Container, Overlay, Tooltip, Image, OverlayTrigger } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { DatePicker } from "react-rainbow-components";
import BuildPriorityService from '../services/BuildPriorityService';
import TaskService from '../services/TaskService';
import SeverityService from '../services/SeverityService';
import TaskTypeService from '../services/TaskTypeService';
import TaskStatusService from '../services/TaskStatusService';

function UpdateTaskComponent(props) {
    const row = props.location.state.row;
    const teams = props.location.state.selectedTeams;

    const history = useHistory();

    //const [teams, setTeams] = useState();
    const [taskName, setTaskName] = useState(row.taskName);
    const [taskDescription, setTaskDescription] = useState(row.taskDescription);
    const [taskType, setTaskType] = useState(row.taskType.id);
    const [taskStatus, setTaskStatus] = useState(row.taskStatus.id);
    const [priority, setPriority] = useState(row.priority.id);
    const [severity, setSeverity] = useState(row.severity.id);
    const [dueDate, setDueDate] = useState(row.dueDate);
    const [assignedEmployee, setAssignedEmployee] = useState(row.assignedEmployee.id);
    const [employeeList, setEmployeeList] = useState([]);

    const [taskTypeToggle, setTaskTypeToggle] = useState(false);
    const [taskStatusToggle, setTaskStatusToggle] = useState(false);
    const [priorityToggle, setPriorityToggle] = useState(false);
    const [severityToggle, setseverityToggle] = useState(false);
    const [assignedEmployeeToggle, setAssignedEmployeeToggle] = useState(false);

    const [taskTypes, setTaskTypes] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState([]);
    const [buildPriorities, setBuildPriorities] = useState([]);
    const [severities, setSeverities] = useState([]);

    const [formDisable, setFormDisable] = useState(true);

    function toggle() {
        setFormDisable(!formDisable)
    }

    useEffect(() => {
        TaskTypeService.getTaskTypes()
            .then(res => {setTaskTypes(res.data) })
            .catch(error => console.log(error));

        TaskStatusService.getTaskStatuses()
            .then(res => {setTaskStatuses(res.data) })
            .catch(error => console.log(error));

        BuildPriorityService.getBuildPriorities()
            .then(res => {setBuildPriorities(res.data) })
            .catch(error => console.log(error));

        SeverityService.getSeverity()
            .then(res => {setSeverities(res.data) })
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
        }

        TaskService.updateTask(task, row.id).then(res =>  history.push(`/projects`));
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
                <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Enable update employee details"
                        onChange={toggle}
                    />
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Task name</Form.Label>
                                <Form.Control type="text" placeholder={taskName} readOnly={formDisable}
                                    onChange={ev => { setTaskName(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder={taskDescription}readOnly={formDisable}
                                    onChange={ev => { setTaskDescription(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select Task Type</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable}
                                    onChange={ev => setTaskType(ev.target.value)}
                                    onClick={()=> setTaskTypeToggle(true)}
                                >
                                    {taskTypeToggle ?  taskTypes.map((type) => {
                                        return <option key={type.id} value={type.id}>{type.taskTypeName}</option>
                                    }): <option>{row.taskType.taskTypeName}</option>}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select Task Status</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable}
                                    onChange={ev => setTaskStatus(ev.target.value)}
                                    onClick={() => setTaskStatusToggle(true)}
                                >
                                    {taskStatusToggle ?  taskStatuses.map((status) => {
                                        return <option key={status.id} value={status.id}>{status.taskStatusName}</option>
                                    }): <option>{row.taskStatus.taskStatusName}</option>}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select Priority</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable}
                                    onChange={ev => setPriority(ev.target.value)}
                                    onClick={() => setPriorityToggle(true)}
                                >
                                    {priorityToggle ? buildPriorities.map((priority) => {
                                        return <option key={priority.id} value={priority.id}>{priority.priority}</option>
                                    }) : <option>{row.priority.priority}</option>}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select Severity</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable}
                                    onChange={ev => setSeverity(ev.target.value)}
                                    onClick={() => setseverityToggle(true)}
                                >
                                    {severityToggle ? severities.map((severity) => {
                                        return <option key={severity.id} value={severity.id}>{severity.severityName}</option>
                                    }): <option>{row.severity.severityName}</option>}
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
                                    disabled={formDisable}
                                />

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Assign an employee</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable}
                                    onChange={ev => setAssignedEmployee(ev.target.value)}
                                    onClick={ev => setAssignedEmployeeToggle(true)}
                                >
                                    {assignedEmployeeToggle ?  employeeList.map((employee) => {
                                        return <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                                    }): <option>{`${row.assignedEmployee.firstName} ${row.assignedEmployee.lastName}`}</option>}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <Button variant="primary" onClick={submit}>
                            Submit
                        </Button>
                    </div>
                
                </Form>
            </Container>
        </div>
    )
}

export default UpdateTaskComponent
