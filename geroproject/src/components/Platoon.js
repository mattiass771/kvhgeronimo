import React, { Component } from 'react';
import axios from 'axios';

import ProfileModal from './ProfileModal';
import DeleteFromDb from './DeleteFromDB';
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
            passDeleteID: ""
        }
    }

    toggleRefresh = () => {
        axios.get(`https://kvhgeronimo.herokuapp.com/soldier/`)
            .then(response => {
                this.setState({ soldierData: response.data })
                console.log("refreshed")
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/soldier/`)
        .then(response => {
            this.setState({ soldierData: response.data })
        })
        .catch(error => {
            console.log(error);
        });
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
        this.setState({ deleteItem: !this.state.deleteItem, passDeleteID: e.currentTarget.dataset.itemid })
    }

    closeDeleteItem = () => {
        this.setState({ deleteItem: !this.state.deleteItem, passDeleteID: "" })
    }
    //

    getSoldiers = () => {
        let squads = ["HQ"]
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
                        <span key={tempData._id}>
                            <Row>
                                {localStorage.getItem("isAdmin") &&
                                <Button onClick={this.toggleDeleteItem} data-itemid={tempData._id} size="sm" variant="outline-dark" style={{marginLeft:"20px" ,width: "80%", height:"15px"}}><span style={{position:"relative", top:"-7px"}}>Delete</span></Button>}
                                <Col xs={4}>
                                    <Image style={{marginLeft:"5px"}} src={tempData.imageURL ? tempData.imageURL : 
"https://i.ibb.co/RYtTKY1/emptypicture.jpg"} thumbnail fluid/>
                                </Col>
                                <Col className="para" onClick={this.handleClick} data-id={tempData._id} xs={8}>
                                    {tempData.completeName}
                                    <br />
                                    {tempData.func}
                                </Col>
                            </Row>
                            <br />
                        </span>                        
                    )
                }
            }
            for (let obj of onShow) {
                let i = onShow.indexOf(obj)
                if (obj.ref && obj.ref.includes("Squad Leader")) {
                    onShow.splice(i,1)
                    onShow.splice(1,0,obj)
                }
                if (obj.ref && (obj.ref.includes("2nd") || obj.ref.includes("Assi"))) {
                    onShow.splice(i,1)
                    onShow.splice(2,0,obj)
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
                {this.state.deleteItem && <DeleteFromDb toggleRefresh={this.toggleRefresh} collectionID="soldier" itemID={this.state.passDeleteID} toggleDeleteItem={this.closeDeleteItem} />}
                {this.state.addSoldier ? <PlatoonAddSoldierModal toggleRefresh={this.toggleRefresh} toggleAddSoldier={this.toggleAddSoldier} /> : false}
                {this.getSoldiers()}
                {this.state.popup ? <ProfileModal popup={this.state.popup} fadePop={this.fadePop} soldierID={this.state.soldierID} /> : null}
            </Container>
        )
    }
}

export default Platoon;