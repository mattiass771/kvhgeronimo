import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

class CalendarCompareModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popup: true,
            link: "",
            missions: [],
            currMission: ""
        }  
    }

    handleClose = () => {
        this.props.closePop()
        this.setState({ popup: false })
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/aboutUs/missions`)
            .then(res => {
                this.setState({ missions: res.data.links })
            })
            .catch(err => {
                console.log(err.data)
            })
    }

    submitMission = () => {
        this.state.currMission.length>2 && this.state.missions.push(this.state.currMission)
        
        axios.get(`https://kvhgeronimo.herokuapp.com/aboutUs/missions`)
            .then(resp => {
                if (!resp.data.links.includes(this.state.currMission)) {
                    axios.post(`https://kvhgeronimo.herokuapp.com/aboutUs/update-missions/missions`, { links: this.state.missions } )
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch((error) => console.log( error.response ) );

                        axios.post(`http://localhost:5000/calendar/conclude-calendar/${this.props.itemID}`, { active: false } )
                            .then(res => {
                                console.log(res.data)
                                this.props.toggleRefresh()
                            })
                            .catch((error) => console.log( error.response ) );

                        const soldArr = this.props.soldiers.split(",")
                        for (let el of soldArr) {
                            axios.get(`https://kvhgeronimo.herokuapp.com/soldier/${el}`)
                                .then(response => {
                                    console.log(response.data.action)
                                    let tempAction = response.data.action
                                    tempAction.push(this.state.currMission)
                                    axios.post(`https://kvhgeronimo.herokuapp.com/soldier/update-action/${el}`, { action: tempAction } )
                                        .then(res => {
                                            console.log(res.data)
                                        })
                                        .catch((error) => console.log( error.response ) );
                                })
                        }
                        this.handleClose()
                } else {
                    alert("Mission name already taken, must choose another one.")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    concludeOnly = () => {
        axios.post(`https://kvhgeronimo.herokuapp.com/calendar/conclude-calendar/${this.props.itemID}`, { active: false } )
            .then(res => {
                console.log(res.data)
                this.props.toggleRefresh()
            })
            .catch((error) => console.log( error.response ) );
        this.handleClose()
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {
        return (    
            <Modal size="lg" show={this.state.popup} onHide={this.handleClose}>
                <Modal.Body style={{textAlign: "center"}}>
                    <h3>Was this event a mission?</h3>
                    <form>
                        <input 
                            value={this.state.currMission}
                            name="currMission"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Mission Name"
                        />
                        &nbsp;
                        <Button variant="outline-dark" onClick={this.submitMission}>Yes</Button><br />
                        <Button style={{marginTop:"5px"}} variant="outline-dark" onClick={this.concludeOnly}>No, but still conclude.</Button><br />
                        <Button style={{marginTop:"5px"}} variant="outline-dark" onClick={this.handleClose}>Don't Conclude</Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}
  
export default CalendarCompareModal;