import React, { Component } from 'react';
import axios from 'axios';

import { Modal } from 'react-bootstrap';
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
        axios.get(`https://geronimoprojectwebsite.herokuapp.com/soldier/${this.props.soldierID}`)
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
                <Modal.Body className="soldier-background">
                    {this.state.soldierData && <ShowProfileInModal close={this.handleClose} soldierID={this.props.soldierID} soldierData={this.state.soldierData} />}
                </Modal.Body>
            </Modal>
        );
    }
}
  
export default ProfileModal;