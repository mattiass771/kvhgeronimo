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
            currMission: "",
            moreMissionInfo: "",
            points: "",
            missionsArray: [],
            conclude: Boolean
        }  
    }

    handleClose = () => {
        this.props.closePop()
        this.setState({ popup: false })
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/aboutUs/missions`)
            .then(res => {
                this.setState({ missions: res.data.links, missionsArray: res.data.text })
            })
            .catch(err => {
                console.log(err.data)
            })
        axios.get(`https://kvhgeronimo.herokuapp.com/calendar/${this.props.itemID}`)
            .then(response => {
                this.setState({ conclude: response.data.missionConclude, currMission: response.data.name })
                console.log(response.data.missionConclude, this.state.conclude, this.state.currMission, response.data.currMission)
            })
            .catch(error => {
                console.log(error.data)
            })
    }

    submitMission = () => {
        this.state.currMission.length>2 && this.state.missions.push(this.state.currMission)

        this.state.currMission.length>2 && this.state.missionsArray.push({ name: this.state.currMission, type: this.state.moreMissionInfo, points: parseInt(this.state.points) })
        console.log(this.state.missionsArray)
        
        axios.get(`https://kvhgeronimo.herokuapp.com/aboutUs/missions`)
            .then(resp => {
                if (!resp.data.links.includes(this.state.currMission)) {
                    axios.post(`https://kvhgeronimo.herokuapp.com/aboutUs/update-missions/missions`, { links: this.state.missions, text: this.state.missionsArray } )
                        .then(res => {
                            console.log(res.data, this.state.missionsArray)
                        })
                        .catch((error) => console.log( error.response ) );

                        axios.post(`https://kvhgeronimo.herokuapp.com/calendar/conclude-calendar/${this.props.itemID}`, { active: false, missionConclude: true } )
                            .then(res => {
                                console.log(res.data)
                                this.props.toggleRefresh()
                            })
                            .catch((error) => console.log( error.response ) );

                        const soldArr = this.props.soldiers.split(",")
                        for (let el of soldArr) {
                            axios.get(`https://kvhgeronimo.herokuapp.com/soldier/${el}`)
                                .then(response => {
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

        const soldArr = this.props.soldiers.split(",")
        for (let el of soldArr) {
            axios.get(`https://kvhgeronimo.herokuapp.com/soldier/${el}`)
                .then(response => {
                    let tempAction = response.data.action
                    if (!tempAction.includes(this.state.currMission)) {
                        tempAction.push(this.state.currMission)
                        axios.post(`https://kvhgeronimo.herokuapp.com/soldier/update-action/${el}`, { action: tempAction } )
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch((error) => console.log( error.response ) );
                    } 
                })
        }
        
        this.handleClose()
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })

        if (name === "moreMissionInfo") {
            this.setState({ points: 
                value === "other" ? "5" :
                value === "otherInt" ? "10" :
                value === "airsoft" ? "15" :
                value === "airsoftMulti" ? "30" :
                value === "bootcamp" ? "50" :
                value === "livingHistory" ? "100" :
                value === "paraTraining" && "250" 
            })
        }
    }

    render() {
        return (    
            <Modal size="lg" show={this.state.popup} onHide={this.handleClose}>
                <Modal.Body style={{textAlign: "center"}}>
                    <h3>Was this event a mission?</h3>
                    <form>
                        {!this.state.conclude && 
                        <h5 style={{display:"inline"}}>{this.state.currMission} : </h5> 
                        }
                        {!this.state.conclude && 
                        <select 
                            value={this.state.moreMissionInfo}
                            onChange={this.handleChange}
                            name="moreMissionInfo"
                        >
                            <option value="notSelected">Vyber Typ Akcie</option>
                            <option value="other">Other, 5p</option>
                            <option value="otherInt">Other (International), 10p</option>
                            <option value="airsoft">Airsoft (One Day), 15p</option>
                            <option value="airsoftMulti">Airsoft (More Days), 30p</option>
                            <option value="bootcamp">Bootcamp / March, 50p</option>
                            <option value="livingHistory">Living History, 100p</option>
                            <option value="paraTraining">Para Training, 250p</option>
                        </select>}
                        &nbsp;
                        {!this.state.conclude && 
                        <Button variant="outline-dark" onClick={this.submitMission}>Yes</Button>}
                        {this.state.conclude && <p>This mission has already been concluded, clicking on "No, but still conclude" will save the changes you made to the existing mission in the database. AIRBORNE, ALL THE WAY!</p>}
                        <br />
                        <Button style={{marginTop:"5px"}} variant="outline-dark" onClick={this.concludeOnly}>No, but still conclude.</Button><br />
                        <Button style={{marginTop:"5px"}} variant="outline-dark" onClick={this.handleClose}>Don't Conclude</Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}
  
export default CalendarCompareModal;