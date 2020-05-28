import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button, Container } from 'react-bootstrap';

class ReportsEditModal extends Component {
    constructor() {
        super()
        this.state = {
            popup: true,
            links: [],
            actualLink: "",
            name: "",
            isOpen: false,
            text: "",
            refresh: false
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

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/reports/${this.props.itemID}`)
            .then(res => {
                this.setState({ links: res.data.links, name: res.data.name, text: res.data.text })
            })
    }

    addReport = () => {
        axios.post(`https://kvhgeronimo.herokuapp.com/update-report/${this.props.itemID}`, { name: this.state.name, text: this.state.text, links: this.state.links })
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

    deleteLink = (e) => {
        this.state.links.splice(this.state.links.indexOf(e.currentTarget.dataset.deletelink),1)
        this.setState({ refresh: !this.state.refresh })
    }

    showLinks = () => {
        let i = 0;
        let output = []
        for (let link of this.state.links) {
            i++
            output.push(
                <span key={this.state.links.indexOf(link)}>
                    <p>
                        <Button variant="outline-dark" data-deletelink={link} size="sm" onClick={this.deleteLink}>X</Button>&nbsp;&nbsp;
                        <strong>{i}.&nbsp;</strong>
                        {link}&nbsp;
                    </p>
                </span>
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
                                placeholder="Direct Link to Media"
                            />
                            <Button variant="outline-dark" style={{ top:"10px" }} size="sm" onClick={this.addLink}>Add Link</Button>
                            {this.showLinks()}
                        </form>
                        <Button variant="dark" style={{ width: "100%" }} onClick={this.addReport}>Update Report</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ReportsEditModal;