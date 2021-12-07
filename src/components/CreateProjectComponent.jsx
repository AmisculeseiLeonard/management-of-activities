import React from 'react'
import { Form, Button, FormControl, Row, Col, Container, Tooltip, OverlayTrigger } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import { useState, useEffect } from 'react'
import { FcInfo } from 'react-icons/fc'
import { useHistory } from "react-router-dom";
import BuildPriorityService from '../services/BuildPriorityService';
import ProductService from '../services/ProductService';
import ReleaseService from '../services/ReleaseService';
import TeamService from '../services/TeamService';
import ProjectService from '../services/ProjectService';


function CreateProjectComponent() {
    const history = useHistory();

    //filled in form
    const [projectName, setProjectName] = useState('');
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [buildPriority, setBuildPriority] = useState('');
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [buildRelease, setBuildRelease] = useState('');
    //const [finishRelease, setFinishRelease] = useState({});

    //initial states from useEffect
    const [buildPriorities, setBuildPriorities] = useState([]);
    const [products, setProducts] = useState([]);
    const [releases, setReleases] = useState([]);
    const [teams, setTeams] = useState([]);

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

    useEffect(() => {
        BuildPriorityService.getBuildPriorities()
            .then(res => { setBuildPriorities(res.data); console.log(res.data) })
            .catch(error => console.log(error));

        ProductService.getProducts()
            .then(res => { setProducts(res.data); console.log(res.data) })
            .catch(error => console.log(error));

        TeamService.getTeams()
            .then(res => { setTeams(res.data); console.log(res.data) })
            .catch(error => console.log(error));
    }, [])

    const getReleasesForProduct = (id) => {
        ReleaseService.getReleasesByProductId(id)
            .then(res => { setReleases(res.data); console.log(res.data) })
            .catch(error => console.log(error));
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Pick a product first in order to see the releases
        </Tooltip>
    );

    const selectTeams = (id) => {
        setSelectedTeams([...selectedTeams, teams.find(team => team.id == id)]);
        let updatedTeamsList = teams.filter(team => team.id != id);
        setTeams(updatedTeamsList);

    }

    const saveProject = (e) => {
        e.preventDefault();
        let project = {
            projectName: projectName, description: description, teams: selectedTeams,
            buildPriority: buildPriorities.filter(p => p.id == buildPriority)[0],
            buildRelease: releases.filter(release => release.id == buildRelease)[0],
            product: products.filter(p => p.id == product)[0]
        }
        ProjectService.createProject(project).then(res => history.push("/projects"));
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <h2>Create a new project</h2>
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
                                <Form.Label>Project name</Form.Label>
                                <Form.Control type="text" placeholder="Enter team name"
                                    onChange={ev => { setProjectName(ev.target.value) }} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Build Priority</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    onChange={ev => setBuildPriority(ev.target.value)}
                                >
                                    <option>Select build priority</option>

                                    {buildPriorities.map((buildPriority) => {
                                        return <option key={buildPriority.id} value={buildPriority.id}>{buildPriority.priority} </option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={ev => { setDescription(ev.target.value) }} />

                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Product</Form.Label>
                            <Form.Select aria-label="Default select example"
                                onChange={ev => { setProduct(ev.target.value); getReleasesForProduct(ev.target.value) }}
                                
                            >
                                <option>Select product</option>
                                {products.map((product) => {
                                    return <option key={product.id} value={product.id}>{product.productName} </option>
                                })}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Teams</Form.Label>
                            <Form.Select aria-label="Default select example"
                                onChange={ev => selectTeams(ev.target.value)}
                            >
                                <option>Select team</option>

                                {teams.map((team) => {
                                    return <option key={team.id} value={team.id}>
                                        {`${team.name}: ${team.teamLeader.firstName} ${team.teamLeader.lastName}`}
                                    </option>
                                })}
                            </Form.Select>
                        </Col>

                        <Col>
                            <Form.Label>Build Release</Form.Label>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <Button style={{ backgroundColor: 'white', border: 'none' }}>
                                    <FcInfo style={{ marginBottom: '6px' }} />
                                </Button>
                            </OverlayTrigger>
                            <Form.Select aria-label="Default select example"
                                onChange={ev => setBuildRelease(ev.target.value)}
                            >
                                <option>Select release</option>

                                {releases !== [] ? releases.map((release) => {
                                    return <option key={release.id} value={release.id}>
                                        {`${release.version}.${release.servicePack}`}
                                    </option>
                                }) : <option>Pick a product first</option>}
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 25 }}>
                        <Form.Label>Teams selected</Form.Label>
                        <BootstrapTable bootstrap4 keyField='id' columns={columns} data={selectedTeams} hover bordered />
                    </Row>

                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <Button variant="primary" type="submit" onClick={saveProject}>
                            Submit
                        </Button>
                    </div>

                </Form>
            </Container>
        </div>
    )
}

export default CreateProjectComponent
