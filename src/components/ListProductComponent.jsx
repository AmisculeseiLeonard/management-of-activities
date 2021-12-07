import React from 'react'
import { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import {Container, Modal} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {MdDeleteForever} from 'react-icons/md'
import ProductService from '../services/ProductService';


function ListProductComponent() {

    const [products, setProducts] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const history = useHistory();


    const columns = [
        {dataField: 'id', text: 'Id'},
        {dataField: 'productName', text: 'Product name', sort: true},
        {dataField: 'description', text: 'Description',sort: true},
        // {dataField: "latestRelease.version",
        //     text: "Latest Release",
        //     formatter: (cell, row) => {
               
        //       return <div>{`${row.latestRelease.version} ${row.latestRelease.servicePack}`}</div>;
        //     }
        // },
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
            //setLgShow(true);
            history.push({
                pathname: `/update-products/${row.id}`,
                state: {row: row, modal: true}
            });
        },
    }

    const handleDelete = (rowId, name) => {
        console.log(rowId, name);
        
      };


    

    useEffect(() => {
        ProductService.getProducts()
        .then((res) =>{ setProducts(res.data) })
        .catch(error => console.log(error));

        // let productsLatestRelease = products.map(product => {
        //     ProductService.getLatestRelease(product.id).then(res => product['latestRelease'] = res.data);
        //     return product;
        // });

        // setProducts(productsLatestRelease);
        // console.log(productsLatestRelease);
    }, []);

    return (
        <div >
            <Container style={{
                paddingTop:20,
                border: "1px solid lightGrey",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                backgroundColor: "#F4F7F9"
            }}>
           
            
            <BootstrapTable bootstrap4 keyField='id' columns={columns} data={products} hover bordered
                pagination={pagination} rowEvents={rowEvents}/>
            </Container>

            
        </div>
    )
}

export default ListProductComponent
