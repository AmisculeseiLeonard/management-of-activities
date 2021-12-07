import React from 'react'
import { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import {Container} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {MdDeleteForever} from 'react-icons/md'

function ListEmployeeComponent() {

    const [employees, setEmployees] = useState([]);
    const history = useHistory();

    function addEmployee() {
        history.push('/add-employee');
    }

    const columns = [
        {dataField: 'id', text: 'Id'},
        {dataField: 'firstName', text: 'First name', sort: true},
        {dataField: 'lastName', text: 'Last name',sort: true},
        {dataField: 'role.roleName', text: 'Role'}
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
                pathname: `/update-employee/${row.id}`,
                state: {row: row}
            });
        },
    }

    const handleDelete = (rowId, name) => {
        console.log(rowId, name);
        
      };

    useEffect(() => {
        EmployeeService.getEmployees()
        .then((res) =>{
            setEmployees(res.data);
        }).catch(error => console.log(error))
    }, []);

    return (
        <div >
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
            <h2 className="text-center">Employee list</h2>
            <Button variant="secondary" style={{margin: "15px 0px"}} onClick={addEmployee} >Add Employee</Button>
            <BootstrapTable bootstrap4 keyField='id' columns={columns} data={employees} hover bordered
                pagination={pagination} rowEvents={rowEvents}/>
            </Container>
        </div>
    )
}

export default ListEmployeeComponent
