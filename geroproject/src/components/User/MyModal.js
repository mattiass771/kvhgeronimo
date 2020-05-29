import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { Modal, Button, Image, Row, Col, Container } from 'react-bootstrap';

class MyModal extends Component {
    constructor() {
        super()
        this.state = {
            popup: true,
            itemImage: null,
            itemLinks: {},
            missingImageError: false
        }  
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/equipInfo/${this.props.item[1]}`)
            .then(response => {
                this.setState({ itemImage: response.data.image, itemLinks: response.data.links })
            })
            .catch(error => {
                if (error.toString().includes("Cannot read property")) this.setState({ missingImageError: true })
                else console.log(error);
            })
    }

    componentWillUnmount() {
        this.setState({ itemImage: null, itemId: null })
    }

    handleClose = () => {
        this.props.fadePop()
        this.setState({ popup: false })
    }

    ShowSellers = () => {
        let arr = this.getItems(this.state.itemLinks)
        return (
            arr.map((val, i) => {
                console.log(val)
                if (val[1].length) {
                    return (
                        <Row style={{height:"35px", marginBottom:"5px", textAlign: "center"}} key={i} >
                                {val[0] === "bestLink" ? <Button target='_blank' variant="light" href={val[1]} style={{ marginLeft:"10%", marginRight:"10%", height:"100%", width: "80%", backgroundColor: "green"}}>Best Option</Button> : 
                                val[0] === "fairLink" ? <Button target='_blank' variant="light" href={val[1]} style={{ marginLeft:"10%", marginRight:"10%", height:"100%", width: "80%", backgroundColor: "yellow"}}>Fair Option</Button> : 
                                val[0] === "goodLink" ? <Button target='_blank' variant="light" href={val[1]} style={{ marginLeft:"10%", marginRight:"10%", height:"100%", width: "80%", backgroundColor: "lightgreen"}}>Good Option</Button> : 
                                val[0] === "notRecLink" ? <Button target='_blank' variant="light" href={val[1]} style={{ marginLeft:"10%", marginRight:"10%", height:"100%", width: "80%", backgroundColor: "orange"}}>Not Recommended</Button> : 
                                val[0] === "dontBuyLink" ? <Button target='_blank' variant="light" href={val[1]} style={{ marginLeft:"10%", marginRight:"10%", height:"100%", width: "80%", backgroundColor: "red"}}>Dont Buy</Button> : false}
                        </Row>
                    )
                }
            })
        )
    }

    getItems = (obj) => {
        let arr = []
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push([key, obj[key]])
            }
        }
        return arr;
    }

    render() {
        return (    
            <Modal size="md" show={this.state.popup} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>{this.props.item[0]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="show-grid" style={{textAlign: "center"}}>
                            <Col>
                                {this.state.missingImageError ? 
                                <Image src="https://cdn2.vectorstock.com/i/thumb-large/47/66/
ww2-soldier-warriors-theme-vector-2674766.jpg" fluid/> : 
                                <Image src={this.state.itemImage} fluid/>}
                            </Col>
                        </Row>
                        <br />
                        <h5 style={{textAlign: "center"}}>ORIGINAL PIECE IS ALWAYS THE BEST CHOICE!</h5>
                            {this.ShowSellers()}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
  
export default MyModal;