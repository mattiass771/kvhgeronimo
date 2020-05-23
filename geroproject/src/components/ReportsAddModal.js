import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button, Container } from 'react-bootstrap';

class ReportsAddModal extends Component {
    constructor() {
        super()
        this.state = {
            popup: true,
            links: [],
            actualLink: "",
            name: "",
            isOpen: false,
            text: ""
        }
    }

    handleClose = () => {
        this.props.togglePop()
        this.setState({ popup: false })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    addReport = () => {
        axios.post(`http://localhost:5000/reports/add`, { links: this.state.links, name: this.state.name, isOpen: this.state.isOpen, text: this.state.text })
            .then(res => {
                console.log(res.data)
                this.props.toggleRefresh()
            })
            .catch((error) => console.log( error.response ) );
            this.handleClose()
    }

    addLink = () => {
        this.state.links.push(this.state.actualLink)
        this.setState({ actualLink: "" })
    }

    showLinks = () => {
        let i = 0;
        let output = []
        for (let link of this.state.links) {
            i++
            output.push(
                <span key={this.state.links.indexOf(link)}><strong>{i}.&nbsp;</strong>{link}&nbsp;</span>
            )
        }
        return output
    }

    handleOnHide = () => {
        console.log("Use Button to hide.")
    }

    render() {
        return (
            <Modal size="lg" show={this.state.popup} onHide={this.handleOnHide}>
                <Modal.Header className="justify-content-end">
                    <Button size="sm" variant="outline-secondary" onClick={this.handleClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body style={{ whiteSpace: "pre-line" }}>
                    <Container>
                        <form>
                            <input
                                style={{ borderRadius: "10px", width:"100%", textAlign: "center", marginBottom: "15px" }}
                                onChange={this.handleChange}
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder="Header"
                            />
                            <textarea
                                style={{ borderRadius: "10px", width: "100%", height: "300px" }} 
                                onChange={this.handleChange}
                                name="text"
                                value={this.state.text}
                                placeholder="Start writing..."
                            />
                            <br />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px" }}
                                onChange={this.handleChange}
                                type="text"
                                name="actualLink"
                                value={this.state.actualLink}
                                placeholder="Direct Link to Image"
                            />
                            <Button variant="outline-dark" style={{ top:"10px" }} size="sm" onClick={this.addLink}>Add Link</Button>
                            <p>{this.showLinks()}</p>
                        </form>
                        <Button variant="dark" style={{ width: "100%" }} onClick={this.addReport}>Upload Post</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ReportsAddModal;