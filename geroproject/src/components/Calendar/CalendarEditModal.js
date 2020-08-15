import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button, Container } from 'react-bootstrap';

class CalendarEditModal extends Component {
    constructor() {
        super()
        this.state = {
            popup: true,
            link: "",
            name: "",
            isOpen: false,
            text: "",
            date: "",
            place: "",
            mapLink: "",
            soldiers: [],
            army: ""
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
        axios.get(`https://kvhgeronimo.herokuapp.com/calendar/${this.props.itemID}`)
            .then(res => {
                this.setState({ link: res.data.link, name: res.data.name, text: res.data.text,
                army: res.data.army, date: res.data.date, place: res.data.place, mapLink: res.data.mapLink })
            })
            .catch(err => {
                console.log(err)
            })
    }

    addReport = () => {
        axios.post(`https://kvhgeronimo.herokuapp.com/calendar/update-calendar/${this.props.itemID}`, { 
                link: this.state.link, 
                name: this.state.name, 
                text: this.state.text,
                army: this.state.army,
                date: this.state.date,
                place: this.state.place,
                mapLink: this.state.mapLink
            })
            .then(res => {
                console.log(res.data)
                this.props.toggleRefresh()
            })
            .catch((error) => console.log( error.response ) );
        this.handleClose()
    }

    handleOnHide = () => {
        console.log("Use Button to hide.")
    }

    //name, isOpen, date, place, mapLink, link, text, army, soldiers

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
                                name="place"
                                value={this.state.place}
                                placeholder="Place of the Event"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"100%", textAlign: "center", marginBottom: "15px" }}
                                onChange={this.handleChange}
                                type="text"
                                name="mapLink"
                                value={this.state.mapLink}
                                placeholder="Address (read below!)"
                            />
                            <p style={{textAlign:"center", fontSize:"90%", fontStyle:"italic"}}>(Address must be in following format: trnavske+myto+1,bratislava )</p>
                            <p style={{textAlign:"center"}}>
                                What uniform should we wear?
                                <br />
                                <select 
                                    value={this.state.army}
                                    onChange={this.handleChange}
                                    name="army"
                                >
                                    <option value="">None</option>
                                    <option value="509">509th</option>
                                    <option value="101">101st</option>
                                    <option value="armored">Armored</option>
                                    <option value="aclass">A-Class</option>
                                    <option value="bclass">B-Class</option>
                                    <option value="cclass">C-Class</option>
                                </select>
                            </p>
                            <textarea
                                style={{ borderRadius: "10px", width: "100%", height: "300px" }} 
                                onChange={this.handleChange}
                                name="text"
                                value={this.state.text}
                                placeholder="Start writing description..."
                            />
                            <input
                                style={{ borderRadius: "10px", width:"100%", textAlign: "center", marginBottom: "15px" }}
                                onChange={this.handleChange}
                                type="text"
                                name="link"
                                value={this.state.link}
                                placeholder="Image Link"
                            />
                        </form>
                        <Button variant="dark" style={{ width: "100%" }} onClick={this.addReport}>Update Event</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default CalendarEditModal;