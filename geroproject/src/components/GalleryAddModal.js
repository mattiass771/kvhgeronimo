import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button, Container } from 'react-bootstrap';

class GalleryAddModal extends Component {
    constructor() {
        super()
        this.state = {
            popup: true,
            links: [],
            actualLink: "",
            name: "",
            about: "",
            date: "",
            showLink: ""
        }
    }

    //({ name, date, about, links, showLink })

    handleClose = () => {
        this.props.togglePop()
        this.setState({ popup: false })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    addGallery = () => {
        axios.post(`https://kvhgeronimo.herokuapp.com/gallery/add`, { 
                links: this.state.links, 
                name: this.state.name, 
                about: this.state.about,
                date: this.state.date,
                showLink: this.state.showLink
            })
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
                            <input
                                style={{ borderRadius: "10px", width:"100%", textAlign: "center", marginBottom: "15px" }}
                                onChange={this.handleChange}
                                type="text"
                                name="date"
                                value={this.state.date}
                                placeholder="Date of the Event"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"100%", textAlign: "center", marginBottom: "15px" }}
                                onChange={this.handleChange}
                                type="text"
                                name="showLink"
                                value={this.state.showLink}
                                placeholder="Link of the shown Image"
                            />
                            <textarea
                                style={{ borderRadius: "10px", width: "100%", height: "300px" }} 
                                onChange={this.handleChange}
                                name="about"
                                value={this.state.about}
                                placeholder="Start writing description..."
                            />
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
                        <Button variant="dark" style={{ width: "100%" }} onClick={this.addGallery}>Upload Gallery</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default GalleryAddModal;