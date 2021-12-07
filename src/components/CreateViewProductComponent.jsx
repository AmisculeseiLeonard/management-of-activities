import React from 'react';
import { Form, Button, FormControl, Row, Col, Container, Overlay, Tooltip, Image, OverlayTrigger } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { DatePicker } from "react-rainbow-components";
import { FcInfo } from 'react-icons/fc'
import ProductService from '../services/ProductService';
import ListProductComponent from './ListProductComponent';
import UpdateProductComponent from './UpdateProductComponent';

function CreateProductComponent() {

    const [name, setName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [releaseDescription, setReleaseDescription] = useState('');
    //const [release, setRelease] = useState({});

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Since you're creating a new product the release will be automatically set to 1.0
        </Tooltip>
    );

    const saveProduct = (e) => {
       
        let product = {productName: name, description: productDescription, releases: [ {
            version: 1, servicePack: 0, description: releaseDescription
        }]}

        ProductService.createProduct(product).then(res => {
            
        })
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <h2> Create a new product / Check existing ones</h2>
            </div>

            <Container style={{
                display: 'grid',
                marginTop: 50,
                
            }}
            >
                <Row >
                    <Col style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 20,
                        paddingBottom: 20,
                        border: "1px solid lightBlue",
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"

                    }}>
                        <Form>


                            <Form.Group className="mb-3">
                                <Form.Label>Product name</Form.Label>
                                <Form.Control type="text" placeholder="Enter product name"
                                    onChange={ev => { setName(ev.target.value) }} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={ev => { setProductDescription(ev.target.value) }} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Release</Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <Button style={{backgroundColor:'white', border:'none'}}>
                                        <FcInfo  style={{marginBottom:'6px'}}/>
                                    </Button>
                                </OverlayTrigger>
                                
                                <Form.Control type="text" placeholder="1.0" readOnly={true} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Release Description</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={ev => { setReleaseDescription(ev.target.value) }} />
                            </Form.Group>


                            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                                <Button variant="primary" type="submit" onClick={saveProduct} >
                                    Submit
                                </Button>
                            </div>

                        </Form>
                    </Col>
                   

                    <Col>
                        <ListProductComponent></ListProductComponent>
                    </Col>
                </Row>

                


            </Container>
        </div>
    )
}

export default CreateProductComponent
