import React from 'react'
import { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import {Container} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {MdDeleteForever} from 'react-icons/md'
import TeamService from '../services/TeamService';

function ListTeamComponent() {

    const [teams, setTeams] = useState([]);
    const history = useHistory();


    const columns = [
        {dataField: 'id', text: 'Id'},
        {dataField: 'name', text: 'Name', sort: true},
        {dataField: 'teamDescription', text: 'Description',sort: true},
        {
            dataField: "teamLeader.firstName",
            text: "Team leader",
            formatter: (cell, row) => {
              console.log(row);
              return <div>{`${row.teamLeader.firstName} ${row.teamLeader.lastName}`}</div>;
            }
          },
        { dataField: 'remove', text: 'Delete', 
        formatter: (cellContent, row) => {
            return (
              <MdDeleteForever color='red' 
                onClick={() => handleDelete(row.id, row.name)}
              >
              </MdDeleteForever>
            );
          }}
    ];

    useEffect(() => {
        TeamService.getTeams()
        .then((res) =>{
            setTeams(res.data);
            console.log(res.data);
        }).catch(error => console.log(error))
    }, []);


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

    const handleDelete = (rowId, name) => {
        console.log(rowId, name);
        
      };

    

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
            <h2 className="text-center">Teams list</h2>
            {/* <Button variant="secondary" style={{margin: "15px 0px"}} onClick={addEmployee} >Add Employee</Button> */}
            <BootstrapTable bootstrap4 keyField='id' columns={columns} data={teams} hover bordered
                pagination={pagination} />
            </Container>
        </div>
    )
}

export default ListTeamComponent
