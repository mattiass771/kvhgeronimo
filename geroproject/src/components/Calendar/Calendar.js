import React, { Component } from 'react';
import axios from 'axios';

import CalendarAddModal from './CalendarAddModal';
import CalendarEditModal from './CalendarEditModal';
import CalendarCompareModal from './CalendarCompareModal';
import CalendarLocationModal from './CalendarLocationModal';
import CalendarRecruitSoldier from './CalendarRecruitSoldier';
import CalendarRecruitSoldiersAdmin from './CalendarRecruitSoldiersAdmin';
import CalendarRemoveSoldiersAdmin from './CalendarRemoveSoldiersAdmin';
import WasThisAMissionModal from './WasThisAMissionModal';
import DeleteFromDb from '../DeleteFromDB';

import { Card, Col,  Row, Button, Image, Container } from 'react-bootstrap';

class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            fullCardClass: "report-full",
            infoCardClass: "report-info",
            fadein: "fadein",
            fadeout: "fadeout",
            handler: [],
            calendar: [],
            isOpen: [],
            refresh: true,
            popup: false,
            addEvent: false,
            soldierData: [],
            items: false,
            passSoldID: [],
            passArmy: [],
            passMapLink: "",
            deleteItem: false,
            passID: "",
            editItem: false,
            concludeItem: false,
            passSoldiers: ""
        }
    }

    toggleRefresh = () => {
        axios.get(`https://kvhgeronimo.herokuapp.com/calendar/`)
            .then(response => {
                this.setState({ calendar: response.data })
                this.sortCalendar()
                this.setState({ calendar: this.state.calendar.reverse() })
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    componentDidMount() {
        this.toggleRefresh()
        axios.get(`https://kvhgeronimo.herokuapp.com/soldier/`)
            .then(response => {
                this.setState({ soldierData: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    sortCalendar = () => {
        let temp = this.state.calendar.splice(74, 1)
        this.state.calendar.splice(1,0,temp[0])
        temp = this.state.calendar.splice(77, 1)
        this.state.calendar.splice(33,0,temp[0])
        temp = this.state.calendar.splice(76, 1)
        this.state.calendar.splice(34,0,temp[0])
        temp = this.state.calendar.splice(77, 1)
        this.state.calendar.splice(53,0,temp[0])
    }

    //POPUP HANDLERS
    togglePop = (e) => {
        this.setState({ popup: !this.state.popup, passMapLink: e.target.dataset.link })
    }

    closePop = () => {
        this.setState({ popup: !this.state.popup, passMapLink: "" })
    }

    openItems = (e) => {
        this.setState({ items: !this.state.items, passArmy: e.target.dataset.army, passSoldID: e.target.dataset.id })
    }

    closeItems = () => {
        this.setState({ items: !this.state.items, passArmy: [], passSoldID: [] })
    }
    
    toggleAddEvent = () => {
        this.setState({ addEvent: !this.state.addEvent })
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

    openConclude = (e) => {
        this.setState({ concludeItem: !this.state.concludeItem, passID: e.currentTarget.dataset.itemid, passSoldiers: e.currentTarget.dataset.soldiers })
    }

    closeConclude = () => {
        this.setState({ concludeItem: !this.state.concludeItem, passID: "", passSoldiers: "" })
    }
    //

    handleClass = (event) => {
        let j = event.target.dataset.key
        this.setState({ refresh: !this.state.refresh })
        this.state.isOpen.splice(j, 1, !this.state.isOpen[j])
        this.state.isOpen[j] ? this.state.handler.splice(j, 1, " ... ") : this.state.handler.splice(j, 1, "...")
    }

    getData = () => {
        for (let el of this.state.calendar) {
            this.state.isOpen.push(el.isOpen)
            this.state.handler.push("...")
        }
    }

    activateEvent = (e) => {
        const itemIde = e.currentTarget.dataset.itemid
        axios.post(`https://kvhgeronimo.herokuapp.com/calendar/conclude-calendar/${itemIde}`, { active: true } )
            .then(res => {
                this.toggleRefresh()
                console.log(res.data)
            })
            .catch((error) => console.log( error.response ) );
    }

    getCalendar = () => {
        let output = []
        let colLeft = []
        let colRight = []
        let i = 0
        for (let calendar of this.state.calendar) {

            let sold = []

            for (let soldier of calendar.soldiers) {
                this.state.soldierData.filter(elem => {
                    elem._id === soldier && sold.push([soldier, elem.rank, elem.nameFull])
                })
            }

            const showSoldiers = () => {
                let out = []
                for (let el of sold) {
                    out.push(
                        <span key={el[0]} style={{width: "45%", display:"inline-block", padding:"3px 8px 4px 8px", marginBottom:"5px", marginRight: "5px", border: "1px solid", borderRadius: "3px"}}>{el[1]} {el[2]}</span>
                    )
                }
                return out
            }

            output.push(
                <Card className="block-background" key={i} style={{ marginBottom:"15px", borderRadius:"5px"}}>
                    {localStorage.getItem("isAdmin") &&
                    <Button onClick={this.toggleDeleteItem} data-itemid={calendar._id} size="sm" variant="outline-dark" style={{width: "100%", marginBottom: "1px", height:"20px"}}><span style={{position:"relative", top:"-4px"}}>Delete</span></Button>}
                    {localStorage.getItem("isAdmin") &&
                    <Button onClick={this.toggleEditItem} data-itemid={calendar._id} size="sm" variant="outline-dark" style={{width: "100%", height:"20px"}}><span style={{position:"relative", top:"-4px"}}>Edit</span></Button>}
                    <Card.Header style={{textAlign:"center", height: "350px"}}>
                        <Image style={{position: "absolute", top:"-41px"}} src="https://i.imgur.com/jawkXJV.png?3" fluid/>
                        <Image style={{
                                height: "325px",
                                width: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: "5px",
                                border: "0.5px solid whitesmoke"}} src={calendar.link} thumbnail fluid/>
                    </Card.Header>
                    <Card.Body style={{textAlign:"center", whiteSpace: "pre-line"}} className={this.state.isOpen[i] ? this.state.fullCardClass : this.state.infoCardClass}>
                        <h4>{calendar.name}</h4>
                        <h5>When: {calendar.date}</h5>
                        {calendar.place.length > 0 &&
                        <h5 className="para" data-link={calendar.mapLink.length > 0 ? calendar.mapLink : false} onClick={this.togglePop}>Where: {calendar.place}</h5>}
                        {calendar.army.length > 0 &&
                        <h5>Unit: {isNaN(calendar.army) ? calendar.army.toUpperCase() : calendar.army[calendar.army.length-1] === '1' ? `${calendar.army}st` : calendar.army[calendar.army.length-1] === '2' ? `${calendar.army}nd` : calendar.army[calendar.army.length-1] === '3' ? `${calendar.army}rd` : `${calendar.army}th`}</h5>}
                        <p>{calendar.text}</p>
                        {(localStorage.getItem("isAdmin") && calendar.active) &&
                        <span>
                            Add: <CalendarRecruitSoldiersAdmin refresh={this.toggleRefresh} calendarSoldiers={calendar.soldiers} soldierData={this.state.soldierData} calendarID={calendar._id} />
                            {calendar.soldiers.length > 0 &&
                            <span>Remove: <CalendarRemoveSoldiersAdmin refresh={this.toggleRefresh} calendarSoldiers={calendar.soldiers} soldierData={this.state.soldierData} calendarID={calendar._id} /></span>}
                        </span>} 
                        {calendar.active &&
                        <p style={{marginTop:"15px"}}><CalendarRecruitSoldier refresh={this.toggleRefresh} calendarSoldiers={calendar.soldiers} soldierData={this.state.soldierData} calendarID={calendar._id} /></p>}
                        <h5>Recruited: </h5>
                        <p>{showSoldiers()}</p>
                        {calendar.army.length > 0 &&
                        <Button onClick={this.openItems} data-id={sold} data-army={calendar.army} variant="outline-dark" style={{marginRight: "5px"}}>Show Missing Items</Button>}
                        <br />
                        <br />
                        {(localStorage.getItem("isAdmin") && calendar.active) &&
                        <Button data-itemid={calendar._id} data-soldiers={calendar.soldiers} onClick={this.openConclude} variant="danger" style={{marginRight: "5px"}}>Conclude Event</Button>}
                        {(localStorage.getItem("isAdmin") && !calendar.active) &&
                        <Button data-itemid={calendar._id} variant="success" onClick={this.activateEvent}>Activate Event</Button>}
                    </Card.Body>
                    <Card.Footer style={{textAlign:"center", height: "20px", fontSize: "180%"}}>
                        <span data-key={i} className="pointer-on-hover card-footer-span" onClick={this.handleClass}>{this.state.handler[i]}</span>
                    </Card.Footer>
                </Card>
            )
            i++
        } 
        for (let i = 0; i<output.length; i++) {
            if (i%2!==0) {
                colRight.push(output[i])
            } else {
                colLeft.push(output[i])
            }
        }
        return (
            <Container>
                <Row>
                    <Col lg={6}>{colLeft}</Col>
                    <Col lg={6}>{colRight}</Col>
                </Row>
            </Container>
        )
    }

    render() {
        return(
            <>
                {localStorage.getItem("isAdmin") &&
                <Row className="justify-content-center">
                    <Button variant="outline-dark" style={{marginBottom: "15px"}} onClick={this.toggleAddEvent}>Add Event</Button>
                </Row>}
                {this.state.deleteItem && <DeleteFromDb toggleRefresh={this.toggleRefresh} collectionID="calendar" itemID={this.state.passID} toggleDeleteItem={this.closeDeleteItem} />}
                {this.state.editItem && <CalendarEditModal itemID={this.state.passID} toggleRefresh={this.toggleRefresh} togglePop={this.closeEditItem} />}
                {this.state.addEvent && <CalendarAddModal toggleRefresh={this.toggleRefresh} toggleAddEvent={this.toggleAddEvent} />}
                {this.state.popup && <CalendarLocationModal mapLink={this.state.passMapLink} closePop={this.closePop} togglePop={this.togglePop} />}
                {this.state.items && <CalendarCompareModal army={this.state.passArmy} soldierID={this.state.passSoldID} closeItems={this.closeItems} openItems={this.openItems} />}
                {this.state.concludeItem && <WasThisAMissionModal soldiers={this.state.passSoldiers} itemID={this.state.passID} toggleRefresh={this.toggleRefresh} closePop={this.closeConclude} />}
                {this.getData()}
                {this.getCalendar()}
            </>
        )
    }
}

export default Calendar;