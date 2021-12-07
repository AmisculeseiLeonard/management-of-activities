import React from 'react'
import {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import ProjectService from '../services/ProjectService';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import {Container} from 'react-bootstrap';

function ListProjectComponent() {
    const [projects, setProjects] = useState([]);
    const history = useHistory();

    const columns = [
        {dataField: 'id', text: 'Id'},
        {dataField: 'projectName', text: 'Project name', sort: true},
        {dataField: 'description', text: 'Description',sort: true},
        {dataField: 'product.productName', text: 'Product',sort: true},
        {dataField: 'buildPriority.priority', text: 'Priority'}
        
    ];

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

    const rowEvents = {
        onClick: (e,row) => {
            //console.log(row)
            history.push({
                pathname: `/update-project/${row.id}`,
                state: {row: row}
            });
        },
    }

    useEffect(() => {
        ProjectService.getProjects()
         .then(res => setProjects(res.data))
         .catch(error => console.log(error));
    },[]);

    const addProject = () => {
        history.push("/create-project");
      }

    return (
        <div>
             <Container style={{
                width: "100%",
                marginTop: 50,
                paddingLeft: 75,
                paddingRight: 75,
                paddingTop: 30,
                paddingBottom: 30,
                border: "1px solid lightGrey",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                backgroundColor: "#F4F7F9"
            }}>
            <h2 className="text-center">Projects list</h2>
           
            <Button variant="secondary" style={{margin: "15px 0px"}} onClick={addProject} >Create Project</Button>
            <BootstrapTable bootstrap4 keyField='id' columns={columns} data={projects} hover bordered
                pagination={pagination} rowEvents={rowEvents}/>
            </Container>
        </div>
    )
}

export default ListProjectComponent
