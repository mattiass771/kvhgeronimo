//unversal deleter popup

//Are you sure you want to delete this?

//1. pass href through props

//2. delete item method

import React, { Component } from 'react';
import axios from 'axios';

import { Button, Modal } from 'react-bootstrap';

class DeleteFromDb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popup: true
        }
    }

    //PROPS: collectionID, itemID, toggleDeleteItem

    handleDelete = () => {
        axios.delete(`https://kvhgeronimo.herokuapp.com/${this.props.collectionID}/${this.props.itemID}`)
            .then(res => {
                console.log(res.data)
                this.props.toggleRefresh()
            })
            .catch(err => {
                console.log(err)
            })
            this.handleClose()
    }

    handleClose = () => {
        this.props.toggleDeleteItem()
        this.setState({ popup: false })
    }

    render() {
        return (
            <Modal show={this.state.popup} onHide={this.handleClose}>
                {console.log(this.props.collectionID, this.props.itemID)}
                <Modal.Body style={{textAlign:"center"}}>
                    <p>Are you sure you want to delete this item?</p>
                    <p><Button onClick={this.handleDelete} variant="outline-dark">Yes</Button><Button variant="outline-dark" onClick={this.handleClose}>No</Button></p>
                </Modal.Body>
            </Modal>
        )
    }
}

export default DeleteFromDb;