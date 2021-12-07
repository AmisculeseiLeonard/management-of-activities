import React from 'react';
import { Modal, Button, Form, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ProductService from '../services/ProductService';
import ReleaseService from '../services/ReleaseService';


function UpdateProductComponent(props) {

    const row = props.location.state.row;
    const history = useHistory();

    const [lgShow, setLgShow] = useState(props.location.state.modal);
    const [formDisable, setFormDisable] = useState(true);

    const [name, setName] = useState(row.productName);
    const [productDescription, setProductDescription] = useState(row.description);
    const [releaseDescription, setReleaseDescription] = useState('');
    const [releases, setReleases] = useState(row.releases);
    const [latestRelease, setLatestRelease] = useState({});

    const backToProducts = () => history.push('/products');

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }
    function toggle() {
        setFormDisable(!formDisable)
    }


    useEffect(() => {
        ProductService.getLatestRelease(row.id)
            .then(res => { setLatestRelease(res.data); console.log(res.data) })
            .then(error => console.log(error));

    }, [])

    const createNewVersion = () => {
        console.log(row.id);
        let newRelease = { version: latestRelease['version'] + 1, servicePack: 0, description: releaseDescription }
        ReleaseService.createReleaseForSpecificProduct(newRelease, row.id);
        window.location.reload(false);
    }

    const incrementServicePack = () => {
        let newRelease = {
            version: latestRelease['version'],
            servicePack: latestRelease['servicePack'] + 1,
            description: releaseDescription
        }
        ReleaseService.createReleaseForSpecificProduct(newRelease, row.id);
        window.location.reload(false);
    }

    const updateProduct = () => {
        console.log(row)
        let newProduct = {id: row.id, productName: name, description: productDescription, releases: []}
        ProductService.updateProduct(newProduct, row.id).then(res => history.push(`/products`));

    }

    return (
        <div>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton onClick={backToProducts}>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Product Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Enable update employee details"
                                    onChange={toggle}
                                />
                            </Col>
                            <Col>
                                <Button style={{margin:'auto'}} onClick={updateProduct}>Update</Button>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" readOnly={formDisable} placeholder={name}
                                onChange={ev => { setName(ev.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control as="textarea" rows={3} readOnly={formDisable} placeholder={productDescription}
                                onChange={ev => { setProductDescription(ev.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Latest release</Form.Label>
                            <Form.Control type="text" readOnly={true}
                                placeholder={`${latestRelease['version']}.${latestRelease['servicePack']} - ${latestRelease['description']}`} />
                        </Form.Group>

                        <ListGroup readOnly={true} >
                            <Form.Label>Releases</Form.Label>
                            <div style={{ maxHeight: 150, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                {releases.map(release => {
                                    return (
                                        <ListGroup.Item key={release.id}>{`${release['version']}.${release['servicePack']} - ${release['description']}`}</ListGroup.Item>
                                    )
                                })}
                            </div>
                        </ListGroup>
                    </Form>

                    <Container style={{
                        marginTop: 20,
                        paddingTop: 20,
                        border: "1px solid lightGrey",
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        backgroundColor: "#F4F7F9"
                    }}>
                        <h4 className="text-center">Create a new release for this product</h4>
                        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                            <Button variant="primary" type="submit" style={{ marginRight: "25%" }} onClick={createNewVersion}>
                                Create new version
                            </Button>

                            <Button variant="primary" type="submit" onClick={incrementServicePack}>
                                Increment service pack
                            </Button>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>Set a description for the new release</Form.Label>
                            <Form.Control type="text" placeholder='Set description'
                                onChange={ev => { setReleaseDescription(ev.target.value) }} 
                                />
                        </Form.Group>

                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UpdateProductComponent
