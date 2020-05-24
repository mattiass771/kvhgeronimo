import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';
import ShowProfileInModal from './ShowProfileInModal';

class ProfileModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popup: true,
            soldierData: {}
        }  
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/soldier/${this.props.soldierID}`)
        .then(response => {
            this.setState({ soldierData: response.data })
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleClose = () => {
        this.props.fadePop()
        this.setState({ popup: false, soldierData: {} })
    }

    render() {
        return (    
            <Modal size="lg" show={this.state.popup} onHide={this.handleClose}>
                <Modal.Body className="block-background">
                    {this.state.soldierData && <ShowProfileInModal close={this.handleClose} soldierID={this.props.soldierID} soldierData={this.state.soldierData} />}
                </Modal.Body>
                <Modal.Footer className="block-background">
                    <Button variant="outline-dark" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
  
export default ProfileModal;