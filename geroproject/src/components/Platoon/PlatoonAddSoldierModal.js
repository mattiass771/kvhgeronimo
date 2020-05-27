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
                                readOnly
                                type="text"
                                name="password"
                                value={this.state._id}
                                placeholder="Password (currently the same as ASN)"
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
                                name="imageURL"
                                value={this.state.imageURL}
                                placeholder="URL to Image (leave empty if none)"
                            />
                            <p style={{borderRadius: "10px", textAlign:"center", width:"50%", display:"inline-block"}}>
                                Rank:
                                <br />
                                <select 
                                    value={this.state.rank}
                                    onChange={this.handleChange}
                                    name="rank"
                                    style={{width: "95%"}}
                                >
                                    <option value=""></option>
                                    <option value="Pvt.">Private</option>
                                    <option value="Pfc.">Private 1st Class</option>
                                    <option value="Cpl.">Corporal</option>
                                    <option value="Sgt.">Sergeant</option>
                                    <option value="T/5">Technician 5th Grade</option>
                                    <option value="Lt.">Lieutenant</option>
                                    <option value="Cpt.">Captain</option>
                                </select>
                            </p>
                            <p style={{borderRadius: "10px", textAlign:"center", width:"50%", display:"inline-block"}}>
                                Function:
                                <br />
                                <select 
                                    value={this.state.func}
                                    onChange={this.handleChange}
                                    name="func"
                                    style={{width: "95%"}}
                                >
                                    <option value=""></option>
                                    <option value="Rifle Man">Rifle Man</option>
                                    <option value="2nd Assistant SQ Leader">2nd Assistant SQ Leader</option>
                                    <option value="2nd in Charge">2nd in Charge</option>
                                    <option value="Squad Leader">Squad Leader</option>
                                    <option value="Technician Fifth Grade">Technician Fifth Grade</option>
                                    <option value="1st Lieutenant">1st Lieutenant</option>
                                    <option value="Platoon Leader Assistant">Platoon Leader Assistant</option>
                                    <option value="Platoon Leader">Platoon Leader</option>
                                </select>
                            </p>
                            <p style={{borderRadius: "10px", textAlign:"center", width:"50%", display:"inline-block"}}>
                                Squad:
                                <br />
                                <select 
                                    value={this.state.squad}
                                    onChange={this.handleChange}
                                    name="squad"
                                    style={{width: "95%"}}
                                >
                                    <option value=""></option>
                                    <option value="HQ">Headquarters</option>
                                    <option value="WAC">Women's Army Corps</option>
                                    <option value="1st Squad">First Squad</option>
                                    <option value="2nd Squad">Second Squad</option>
                                </select>
                            </p>
                            <p style={{borderRadius: "10px", textAlign:"center", width:"50%", display:"inline-block"}}>
                                Missions:
                                <br />
                                <select 
                                    value={this.state.action}
                                    onChange={this.handleChange}
                                    name="action"
                                    style={{width: "95%"}}
                                >
                                    <option value=""></option>
                                    <option value="Bootcamp I.">Bootcamp I.</option>
                                    <option value="Bootcamp II.">Bootcamp II.</option>
                                    <option value="Bootcamp III.">Bootcamp III.</option>
                                </select>
                            </p>
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