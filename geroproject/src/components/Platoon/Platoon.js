import React, { Component } from 'react';
import axios from 'axios';

import ProfileModal from './ProfileModal';
import DeleteFromDb from '../DeleteFromDB';
import PlatoonEditSoldierModal from './PlatoonEditSoldierModal';
import PlatoonAddSoldierModal from './PlatoonAddSoldierModal';
import { Image, Container, Row, Col, Button } from 'react-bootstrap';

class Platoon extends Component {
    constructor() {
        super()
        this.state = {
            popup: false,
            soldierID: "",
            soldierData: {},
            addSoldier: false,
            deleteItem: false,
            editItem: false,
            passID: "",
            missions: [],
            missionData: []
        }
    }

    toggleRefresh = () => {
        axios.get(`https://kvhgeronimo.herokuapp.com/soldier/`)
            .then(response => {
                this.setState({ soldierData: response.data })
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`https://kvhgeronimo.herokuapp.com/aboutUs/missions`)
            .then(response => {
                this.setState({ missions: response.data.links, missionData: response.data.text })
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.toggleRefresh()
    }

    handleClick = (e) => {
        this.setState({ soldierID: e.currentTarget.dataset.id })
        this.togglePop()
    }

    //POPUP HANDLERS 
    togglePop = () => {
        this.setState({ popup: !this.state.popup })
    }

    fadePop = () => {
        this.setState({ popup: !this.state.popup })
    }
    
    toggleAddSoldier = () => {
        this.setState({ addSoldier: !this.state.addSoldier })
    }
    
    toggleDeleteItem = (e) => {
        this.setState({ deleteItem: !this.state.deleteItem, passID: e.currentTarget.dataset.itemid })
    }

    closeDeleteItem = () => {
        this.setState({ deleteItem: !this.state.deleteItem, passID: "" })
    }
    
    toggleEditItem = (e) => {
        this.setState({ editItem: !this.state.editItem, passID: e.currentTarget.dataset.itemid })
    }

    closeEditItem = () => {
        this.setState({ editItem: !this.state.editItem, passID: "" })
    }
    //

    getPoints = (action) => {
        let result = 0
        action.map((val) => {
            const tempPoints = this.state.missionData.map(el => val === el.name && el.points)
            const number = tempPoints.reduce((a,b)=>a+b)
            result += parseInt(number)
        })

        return result
    }

    getSoldiers = () => {
        let squads = ["HQ", "WAC"]
        let onShow = []
        let final = []
        for (let el in this.state.soldierData) {
            let tempSoldier = this.state.soldierData[el]
            if (!squads.includes(tempSoldier.squad) && tempSoldier.squad !== "test") squads.push(tempSoldier.squad)
        }
        for (let el of squads) {
            onShow.push(el)
            for (let sold in this.state.soldierData) {
                let tempData = this.state.soldierData[sold]
                if (tempData.squad === el) {
                    onShow.push(
                        <span key={tempData._id} ref={tempData.func}>
                            <Row>
                                {localStorage.getItem("isAdmin") &&
                                <Button onClick={this.toggleDeleteItem} data-itemid={tempData._id} size="sm" variant="outline-dark" style={{marginLeft:"20px", marginBottom: "1px" ,width: "80%", height:"15px"}}><span style={{position:"relative", top:"-7px"}}>Delete</span></Button>}
                                {localStorage.getItem("isAdmin") &&
                                <Button onClick={this.toggleEditItem} data-itemid={tempData._id} size="sm" variant="outline-dark" style={{marginLeft:"20px" ,width: "80%", height:"15px"}}><span style={{position:"relative", top:"-7px"}}>Edit</span></Button>}
                                <Col xs={4}>
                                    <Image style={{marginLeft:"5px"}} src={tempData.imageURL ? tempData.imageURL : 
"https://i.ibb.co/RYtTKY1/emptypicture.jpg"} thumbnail fluid/>
                                </Col>
                                <Col className="para" onClick={this.handleClick} data-id={tempData._id} xs={8}>
                                    {tempData.completeName}
                                    <br />
                                    {tempData.func}
                                    <br />
                                    Exp: {this.getPoints(tempData.action)}
                                </Col>
                            </Row>
                            <br />
                        </span>                        
                    )
                }
            }
            for (let j = 0; j<onShow.length; j++) {
                let obj = onShow[j]
                let i = onShow.indexOf(obj)
                if (obj.ref && (obj.ref === "Squad Leader")) {
                    let temp = onShow.splice(i,1)
                    onShow.splice(1,0,temp)
                    j--
                }
                if (obj.ref && (obj.ref === "2nd in Charge")) {
                    let temp = onShow.splice(i,1)
                    onShow.splice(2,0,temp)
                    j--
                }
                if (obj.ref && (obj.ref === "Assistant SQ Leader")) {
                    let temp = onShow.splice(i,1)
                    onShow.splice(3,0,temp)
                    j--
                }
                if (obj.ref && (obj.ref === "2nd Assistant SQ Leader")) {
                    let temp = onShow.splice(i,1)
                    onShow.splice(4,0,temp)
                    j--
                }
                if (obj.ref && (obj.ref === "Rifle Man")) {
                    let temp = onShow.splice(i,1)
                    onShow.push(temp)
                    j--
                }
            }
            for (let j = 0; j<onShow.length; j++) {
                let obj = onShow[j]
                let i = onShow.indexOf(obj)
                if (obj.ref && (obj.ref === "Missing in Action")) {
                    let temp = onShow.splice(i,1)
                    console.log(temp)
                    onShow.push(temp)
                    j--
                }
            }
            for (let j = 0; j<onShow.length; j++) {
                let obj = onShow[j]
                let i = onShow.indexOf(obj)
                if (obj.ref && (obj.ref === "Killed in Action")) {
                    let temp = onShow.splice(i,1)
                    console.log(temp)
                    onShow.push(temp)
                    j--
                }
            }
            final.push(
                <Container className="block-background" style={{borderRadius: "5px", marginBottom: "15px"}} key={squads.indexOf(el)}>
                    <h3>{onShow.splice(0,1)}</h3>
                    <Row xl={4} md={3} sm={2} xs={1}>
                        {onShow}
                    </Row>
                </Container>
            )
            onShow = []
        }
        return final
    }

    render() {
        return (
            <Container>
                {localStorage.getItem("isAdmin") &&
                <Row className="justify-content-center">
                    <Button variant="outline-dark" style={{marginBottom: "15px"}} onClick={this.toggleAddSoldier}>Add Soldier</Button>
                </Row>}
                {this.state.deleteItem && <DeleteFromDb toggleRefresh={this.toggleRefresh} collectionID="soldier" itemID={this.state.passID} toggleDeleteItem={this.closeDeleteItem} />}
                {this.state.editItem && <PlatoonEditSoldierModal missionses={this.state.missions} itemID={this.state.passID} toggleRefresh={this.toggleRefresh} togglePop={this.closeEditItem} />}
                {this.state.addSoldier && <PlatoonAddSoldierModal missionses={this.state.missions} toggleRefresh={this.toggleRefresh} toggleAddSoldier={this.toggleAddSoldier} />}
                {this.getSoldiers()}
                {this.state.popup && <ProfileModal missionData={this.state.missionData} popup={this.state.popup} fadePop={this.fadePop} soldierID={this.state.soldierID} />}
            </Container>
        )
    }
}

export default Platoon;