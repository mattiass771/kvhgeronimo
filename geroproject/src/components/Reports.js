import React, { Component } from 'react';
import axios from 'axios';

import ReportsAddModal from './ReportsAddModal';
import DeleteFromDb from './DeleteFromDB';

import { Card, Col, Image, Carousel, Row, Button, Container } from 'react-bootstrap';

class Reports extends Component {
    constructor() {
        super()
        this.state = {
            fullCardClass: "report-full",
            infoCardClass: "report-info",
            fadein: "fadein",
            fadeout: "fadeout",
            handler: [],
            reports: [],
            isOpen: [],
            refresh: true,
            popup: false,
            deleteItem: false,
            passDeleteID: ""
        }
    }
    
    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/reports/`)
        .then(response => {
            this.setState({ reports: response.data })
        })
        .catch(error => {
            console.log(error);
        });
    }

    toggleRefresh = () => {
        axios.get(`https://kvhgeronimo.herokuapp.com/reports/`)
        .then(response => {
            this.setState({ reports: response.data })
            console.log("refreshed")
        })
        .catch(error => {
            console.log(error);
        });
    }

    //POPUP HANDLERS
    togglePop = () => {
        this.setState({ popup: !this.state.popup })
    }
    
    toggleDeleteItem = (e) => {
        this.setState({ deleteItem: !this.state.deleteItem, passDeleteID: e.currentTarget.dataset.itemid })
    }

    closeDeleteItem = () => {
        this.setState({ deleteItem: !this.state.deleteItem, passDeleteID: "" })
    }
    //

    handleClass = (event) => {
        let j = event.target.dataset.key
        this.setState({ refresh: !this.state.refresh })
        this.state.isOpen.splice(j, 1, !this.state.isOpen[j])
        this.state.isOpen[j] ? this.state.handler.splice(j, 1, " ... ") : this.state.handler.splice(j, 1, "...")
    }

    getData = () => {
        for (let el of this.state.reports) {
            this.state.isOpen.push(el.isOpen)
            this.state.handler.push("...")
        }
    }

    getReports = () => {
        let output = []
        let colLeft = []
        let colRight = []
        let i = 0
        for (let report of this.state.reports) {
            let links = []
            for (let link of report.links) {
                links.push(
                    <Carousel.Item key={link}>
                        <img
                            style={{
                                maxHeight: "350px",
                                width: "auto",
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: "5px",
                                border: "4px solid whitesmoke"}}
                            className="d-block w-100"
                            alt={link}
                            src={link}
                        />
                    </Carousel.Item>
                )
            }
            output.push(
                <Card className="block-background" key={i} style={{marginBottom:"15px", borderRadius:"5px"}}>
                    {localStorage.getItem("isAdmin") &&
                    <Button onClick={this.toggleDeleteItem} data-itemid={report._id} size="sm" variant="outline-dark" style={{width: "100%", height:"20px"}}><span style={{position:"relative", top:"-4px"}}>Delete</span></Button>}
                    <Card.Header>
                        {this.state.deleteItem && <DeleteFromDb toggleRefresh={this.toggleRefresh} collectionID="reports" itemID={this.state.passDeleteID} toggleDeleteItem={this.closeDeleteItem} />}
                        <Carousel interval={null}>
                            {links}
                        </Carousel>
                        <Image style={{position: "absolute", top:"-41px"}} src="https://i.imgur.com/jawkXJV.png?3" fluid/>
                    </Card.Header>
                    <Card.Body style={{textAlign:"center"}} className={this.state.isOpen[i] ? this.state.fullCardClass : this.state.infoCardClass}>
                        <h3>{report.name}</h3>
                        <p>{report.text}</p>
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
            } else (
                colLeft.push(output[i])
            )
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
                    <Button variant="outline-dark" style={{marginBottom: "15px"}} onClick={this.togglePop}>Add Post</Button>
                </Row>}
                {this.state.popup ? <ReportsAddModal toggleRefresh={this.toggleRefresh} togglePop={this.togglePop} /> : false}
                {this.getData()}
                {this.getReports()}
            </>
        )
    }
}

export default Reports;