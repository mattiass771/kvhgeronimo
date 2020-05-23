import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Container, Row } from 'react-bootstrap';

class CalendarCompareModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popup: true,
            soldierMissing: [],
            soldierInfo: [],
            equipData: [],
            finalMissing: [],
            refresh: false
        }  
    }

    // PROPS: army, soldierID

    componentDidMount() {
        let sold = this.props.soldierID.split(",")
        let soldID = []
        for (let i = 0; i<sold.length ; i+=3) {
            soldID.push(sold[i])
        }
        for (let soldier of soldID) {
            axios.get(`http://localhost:5000/soldier/${soldier}`)
                .then(response => {
                    let obj = response.data.equip
                    let tempArr = []
                    for (let key in obj) {
                        if (!obj[key]) tempArr.push(key)
                    }
                    this.state.soldierMissing.push(soldier ,tempArr)
                    this.state.soldierInfo.push([response.data._id, response.data.rank, response.data.completeName, response.data.squad])
                    this.setState({ refresh: !this.state.refresh })
                })
                .catch(error => {
                    console.log(error);
                });
        }
        axios.get(`http://localhost:5000/equipment`)
            .then(response => {
                for (let missing of this.state.soldierMissing) {
                    let tempArrTwo = []
                    for (let elem of response.data) {
                        if (elem.army.includes(this.props.army) && missing.includes(elem.short)) tempArrTwo.push(elem.name)
                        else if (!isNaN(missing) && !tempArrTwo.includes(missing)) tempArrTwo.push(missing)
                    }
                    this.state.finalMissing.push(tempArrTwo)
                }
                this.setState({ refresh: !this.state.refresh })
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClose = () => {
        this.props.closeItems()
        this.setState({ popup: false })
    }

    showMissingItems = () => {
        let output = []
        if (this.state.finalMissing[0]) {
            for (let soldierOut of this.state.soldierInfo) {
                for (let finalMiss of this.state.finalMissing) {
                    if (soldierOut[0] === finalMiss[0] && this.state.finalMissing[this.state.finalMissing.indexOf(finalMiss)+1].length>0) {
                        const arr = this.state.finalMissing[this.state.finalMissing.indexOf(finalMiss)+1]
                        output.push(
                            <span key={soldierOut[0]}>
                                <Row>
                                    <h5>{soldierOut[1]} {soldierOut[2]}, {soldierOut[3]}</h5>
                                </Row>
                                <Row style={{marginBottom:"5px"}} xs={2} md={2} lg={4} xl={5}>
                                    {arr.map((val, ix) => {
                                        return <span key={ix} style={{color:"#CC4240"}}>{val}</span>
                                    })}
                                </Row>
                            </span>
                        )
                    }
                }
            }
        }
        return output
    }

    render() {
        return (    
            <Modal size="xl" show={this.state.popup} onHide={this.handleClose}>
                <Modal.Header className="justify-content-center">
                    <h1>Missing Items by Soldier</h1>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {this.showMissingItems()}
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }
}
  
export default CalendarCompareModal;