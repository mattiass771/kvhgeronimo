import React, { Component } from 'react';
import axios from 'axios';
import equipObject from '../../equipobject.json';
import equipObjectWAC from '../../equipobjectWAC.json';

import { Modal, Button, Container } from 'react-bootstrap';

class CalendarAddModal extends Component {
    constructor() {
        super()
        this.state = {
            popup: true,
            _id: "",
            nameFull: "",
            completeName: "",
            name: "",
            rank: "",
            state: "",
            birth: "",
            eyes: "",
            hair: "",
            weight: "",
            height: "",
            story: "",
            action: "",
            squad: "",
            func: "",
            imageURL: "",
            equip: {}
        }
    }

    handleClose = () => {
        this.props.toggleAddSoldier()
        this.setState({ popup: false })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    addReport = () => {
        this.state.squad === "WAC" ? this.setState({ equip: equipObjectWAC }) : this.setState({ equip: equipObject })
        axios.post(`https://kvhgeronimo.herokuapp.com/soldier/add`, { 
                _id: this.state._id, 
                password: this.state._id, 
                nameFull: this.state.nameFull, 
                completeName: this.state.completeName,
                name: this.state.name,
                rank: this.state.rank,
                state: this.state.state,
                birth: this.state.birth,
                eyes: this.state.eyes,
                hair: this.state.hair,
                weight: this.state.weight,
                height: this.state.height,
                story: this.state.story,
                action: this.state.action,
                squad: this.state.squad,
                func: this.state.func,
                imageURL: this.state.imageURL,
                equip: this.state.equip
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
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="_id"
                                value={this.state._id}
                                placeholder="Army Serial Number"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="nameFull"
                                value={this.state.nameFull}
                                placeholder="Full Last Name: M. O' Connor"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="completeName"
                                value={this.state.completeName}
                                placeholder="Full Name: Matthew O' Connor"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder="Username: matthewoconnor"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="password"
                                value={this.state._id}
                                placeholder="Password (currently the same as ASN)"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="rank"
                                value={this.state.rank}
                                placeholder="Army Rank"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="state"
                                value={this.state.state}
                                placeholder="State"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="birth"
                                value={this.state.birth}
                                placeholder="Date of Birth"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="eyes"
                                value={this.state.eyes}
                                placeholder="Eye Color"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="hair"
                                value={this.state.hair}
                                placeholder="Hair Color"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="weight"
                                value={this.state.weight}
                                placeholder="Weight"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="height"
                                value={this.state.height}
                                placeholder="Height"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="action"
                                value={this.state.action}
                                placeholder="Deployed in Missions"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="squad"
                                value={this.state.squad}
                                placeholder="Squad"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="func"
                                value={this.state.func}
                                placeholder="Function"
                            />
                            <input
                                style={{ borderRadius: "10px", width:"50%", textAlign: "center", marginBottom: "15px", display:"inline-block" }}
                                onChange={this.handleChange}
                                type="text"
                                name="imageURL"
                                value={this.state.imageURL}
                                placeholder="URL to Image (leave empty if none)"
                            />
                            <textarea
                                style={{ borderRadius: "10px", width: "100%", height: "300px" }} 
                                onChange={this.handleChange}
                                name="story"
                                value={this.state.story}
                                placeholder="Start writing story..."
                            />
                        </form>
                        <Button variant="dark" style={{ width: "100%" }} onClick={this.addReport}>Upload New Soldier</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default CalendarAddModal;