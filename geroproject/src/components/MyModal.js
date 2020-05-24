import React, { Component } from 'react';
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
                return (
                    <Col key={i}><Button target='_blank' style={{fontSize: 20}} variant="light" href={val[1]}>{val[0]}</Button></Col>
                )
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
            <Modal show={this.state.popup} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>{this.props.item[0]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="show-grid">
                            <Col md={6}>
                                {this.state.missingImageError ? 
                                <Image src="https://cdn2.vectorstock.com/i/thumb-large/47/66/
ww2-soldier-warriors-theme-vector-2674766.jpg" fluid/> : 
                                <Image src={this.state.itemImage} fluid/>}
                            </Col>
                            <Col md={6}>
                                Toto je popisok k obrazku a tento popisok este 
                                nieje napisany do databazy takze tu je zatial len tato jedna veta ako placeholder.
                            </Col>
                        </Row>
                        <br />
                        <h5>Recommended Models:</h5>
                        <Row>
                            <this.ShowSellers />
                        </Row>
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