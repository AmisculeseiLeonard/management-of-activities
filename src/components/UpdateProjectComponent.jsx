import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import { Form, Button, FormControl, Row, Col, Container, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap'
import paginationFactory from 'react-bootstrap-table2-paginator';
import BuildPriorityService from '../services/BuildPriorityService';
import ProductService from '../services/ProductService';
import TeamService from '../services/TeamService';
import ProjectService from '../services/ProjectService';
import ReleaseService from '../services/ReleaseService';
import { DatePicker } from "react-rainbow-components";
import CreateTaskComponent from './CreateTaskComponent';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


function UpdateProjectComponent(props) {
    const row = props.location.state.row
    const history = useHistory();
    const { SearchBar } = Search;

    const [projectName, setProjectName] = useState(row.projectName);
    const [product, setProduct] = useState(row.product.id);
    const [description, setDescription] = useState(row.description);
    const [buildPriority, setBuildPriority] = useState(row.buildPriority.id);
    const [selectedTeams, setSelectedTeams] = useState(row.teams);
    const [buildRelease, setBuildRelease] = useState(row.buildRelease.id);
    const [finishRelease, setFinishRelease] = useState();
    const [finishDevelop, setFinishDevelop] = useState(row.finishDevelop);
    const [releaseForTesting, setReleaseForTesting] = useState(row.releaseForTesting);
    const [customerTestDelivery, setCustomerTestDelivery] = useState(row.customerTestDelivery);
    const [productionDelivery, setProductionDelivery] = useState(row.productionDelivery);

    const [buildPriorityToggle, setBuildPriorityToggle] = useState(false);
    const [productToggle, setProductToggle] = useState(false);
    const [buildReleaseToggle, setBuildReleaseToggle] = useState(false);

    //initial states from useEffect
    const [buildPriorities, setBuildPriorities] = useState([]);
    const [products, setProducts] = useState([]);
    const [releases, setReleases] = useState([]);
    const [teams, setTeams] = useState([]);

    const [formDisable, setFormDisable] = useState(true);

    function toggle() {
        setFormDisable(!formDisable)
    }

    const columns = [
        { dataField: 'id', text: 'Id' },
        { dataField: 'name', text: 'Name', sort: true },
        { dataField: 'teamDescription', text: 'Description', sort: true },
        {
            dataField: "teamLeader.firstName",
            text: "Team leader",
            formatter: (cell, row) => {
                return <div>{`${row.teamLeader.firstName} ${row.teamLeader.lastName}`}</div>;
            }
        },
    ];

    const columnsForTasks = [
        { dataField: 'id', text: 'Id' },
        { dataField: 'taskName', text: 'Task Name', sort: true },
        { dataField: 'taskDescription', text: 'Description', sort: true },
        { dataField: 'taskType.taskTypeName', text: 'Task type', sort: true },
        { dataField: 'taskStatus.taskStatusName', text: 'Task type', sort: true }

    ];

    useEffect(() => {
        BuildPriorityService.getBuildPriorities()
            .then(res => { setBuildPriorities(res.data); console.log(res.data) })
            .catch(error => console.log(error));

        ProductService.getProducts()
            .then(res => { setProducts(res.data); console.log(res.data) })
            .catch(error => console.log(error));

        // TeamService.getTeams()
        //     .then(res => { setTeams(res.data); console.log(res.data) })
        //     .catch(error => console.log(error));

        console.log(row)

        ReleaseService.getReleasesByProductId(row.product.id)
            .then(res => { setReleases(res.data); console.log(res.data) })
            .catch(error => console.log(error));
    }, [])

    const getReleasesForProduct = (id) => {
        ReleaseService.getReleasesByProductId(id)
            .then(res => { setReleases(res.data); console.log(res.data) })
            .catch(error => console.log(error));
    }

    const rowEvents = {
        onClick: (e, row) => {
            //setLgShow(true);
            history.push({
                pathname: `/update-task/${row.id}`,
                state: { row: row, selectedTeams: selectedTeams }
            });
        },
    }

    const updateProject = (e) => {
        e.preventDefault();

        let project = {
            projectName: projectName, description: description,
            buildPriority: buildPriorities.filter(p => p.id == buildPriority)[0],
            buildRelease: releases.filter(release => release.id == buildRelease)[0],
            finishRelease: releases.filter(release => release.id == finishRelease)[0],
            product: products.filter(p => p.id == product)[0],
            finishDevelop: finishDevelop, releaseForTesting: releaseForTesting,
            customerTestDelivery: customerTestDelivery, productionDelivery: productionDelivery
        }

        ProjectService.updateProject(project, row.id).then(res => history.push("/projects"))
    }

    return (
        <div>
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
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Enable update employee details"
                            onChange={toggle}
                        />
                        <Link to={{
                            pathname: "/create-task",
                            teams: { selectedTeams },
                            row: row
                        }} >
                            <Button style={{ margin: 10 }}>Create task</Button>
                        </Link>

                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Project name</Form.Label>
                                <Form.Control type="text" placeholder={projectName} readOnly={formDisable}
                                    onChange={ev => { setProjectName(ev.target.value) }} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Build Priority</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable}
                                    onChange={ev => setBuildPriority(ev.target.value)}
                                    onClick={() => setBuildPriorityToggle(true)}
                                >
                                    {buildPriorityToggle ? buildPriorities.map((buildPriority) => {
                                        return <option key={buildPriority.id} value={buildPriority.id}>{buildPriority.priority} </option>
                                    }) : <option>{row.buildPriority.priority}</option>}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder={description} readOnly={formDisable}
                                    onChange={ev => { setDescription(ev.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Product</Form.Label>
                            <Form.Select aria-label="Default select example" disabled={formDisable}
                                onChange={ev => { setProduct(ev.target.value); getReleasesForProduct(ev.target.value) }}
                                onClick={() => setProductToggle(true)}
                            >
                                {productToggle ? products.map((product) => {
                                    return <option key={product.id} value={product.id}>{product.productName} </option>
                                }) : <option> {row.product.productName} </option>}
                            </Form.Select>
                        </Col>

                        <Col>
                            <Form.Label>Build Release</Form.Label>
                            <Form.Select aria-label="Default select example" disabled={formDisable}
                                onChange={ev => setBuildRelease(ev.target.value)}
                                onClick={() => setBuildReleaseToggle(true)}
                            >


                                {buildReleaseToggle ? releases.map((release) => {
                                    return <option key={release.id} value={release.id}>
                                        {`${release.version}.${release.servicePack}`}
                                    </option>
                                }) : <option> {`${row.buildRelease.version}.${row.buildRelease.servicePack}`}</option>}
                            </Form.Select>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Finish Release</Form.Label>
                                <Form.Select aria-label="Default select example" disabled={formDisable}
                                    onChange={ev => setFinishRelease(ev.target.value)}
                                >
                                    <option>Select finish release</option>

                                    {releases.map((release) => {
                                        return <option key={release.id} value={release.id}>{`${release.version}.${release.servicePack}`}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 25 }}>
                        <Form.Label>Teams selected</Form.Label>
                        <BootstrapTable bootstrap4 keyField='id' columns={columns} data={selectedTeams} hover bordered />
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Finish Develop Date</Form.Label>
                                <DatePicker
                                    id="datePicker-1"
                                    value={finishDevelop}
                                    onChange={setFinishDevelop}
                                    // label="DatePicker Label"
                                    formatStyle="large"
                                    disabled={formDisable}
                                />

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Release For Testing Date</Form.Label>
                                <DatePicker
                                    id="datePicker-1"
                                    value={releaseForTesting}
                                    onChange={setReleaseForTesting}
                                    // label="DatePicker Label"
                                    formatStyle="large"
                                    disabled={formDisable}
                                />

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Customer Test Delivery Date</Form.Label>
                                <DatePicker
                                    id="datePicker-1"
                                    value={customerTestDelivery}
                                    onChange={setCustomerTestDelivery}
                                    // label="DatePicker Label"
                                    formatStyle="large"
                                    disabled={formDisable}
                                />

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Production Delivery Date</Form.Label>
                                <DatePicker
                                    id="datePicker-1"
                                    value={productionDelivery}
                                    onChange={setProductionDelivery}
                                    // label="DatePicker Label"
                                    formatStyle="large"
                                    disabled={formDisable}
                                />

                            </Form.Group>
                        </Col>
                    </Row>

                    {/* <Row style={{ marginTop: 25 }}>
                        <Form.Label>Tasks</Form.Label>
                        <BootstrapTable bootstrap4 keyField='id' columns={columnsForTasks} data={row.tasks} hover bordered
                            rowEvents={rowEvents} />
                    </Row> */}

                    <Row>
                        <ToolkitProvider
                            keyField="id"
                            data={row.tasks}
                            columns={columnsForTasks}
                            search
                            hover bordered
                            rowEvents={rowEvents}
                        >
                            {
                                props => (
                                    <div>
                                      
                                        <SearchBar {...props.searchProps} />
                                        <hr />
                                        <BootstrapTable bootstrap4 keyField='id' columns={columnsForTasks} data={row.tasks} hover bordered
                            rowEvents={rowEvents}
                                            {...props.baseProps}
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </Row>

                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <Button variant="primary" type="submit" onClick={(e) => updateProject(e)}>
                            Submit
                        </Button>
                    </div>



                </Form>
            </Container>

        </div>
    )
}

export default UpdateProjectComponent
