import React, { Component } from 'react';
import axios from 'axios'

import { Container, Row, Col, Image } from 'react-bootstrap';

class ShowProfileInModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myStory: ""
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/soldier/${this.props.soldierID}`)
            .then(res => {
                this.setState({ myStory: res.data.story })
            })
            .catch(err => {
                this.props.close()
                console.log(err)
            });
    }
    
    getSoldierInfo = () => {
        return (
             <>
                {this.props.soldierData.completeName ? <p style={{fontSize:"150%"}}>{this.props.soldierData.rank} {this.props.soldierData.completeName}</p> : false}
                {this.props.soldierData.func ? <p style={{fontSize:"125%", marginTop:"-15px"}}>{this.props.soldierData.squad}, {this.props.soldierData.func}</p> : false}
                {this.props.soldierData._id ? <p style={{fontSize:"105%", marginTop:"-15px"}}>{this.props.soldierData._id}</p> : false}
                {this.props.soldierData.birth ? <p>Date of Birth: {this.props.soldierData.birth}</p> : false}
                {this.props.soldierData.state ? <p>State: {this.props.soldierData.state}</p> : false}
                {this.props.soldierData.height ? <p>Height:  {this.props.soldierData.height} ft., Weight: {this.props.soldierData.weight} lbs.</p> : false}
                {this.props.soldierData.hair ? <p>Hair: {this.props.soldierData.hair}, Eyes: {this.props.soldierData.eyes}</p> : false}
             </>
        ) 
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg={{span:4, offset:2}} style={{textAlign:"center"}}>
                        <Image style={{ marginTop: "40px" }} src={this.props.soldierData.imageURL ? this.props.soldierData.imageURL : 
                            "https://i.ibb.co/RYtTKY1/emptypicture.jpg"} thumbnail fluid />
                    </Col>
                    <Col lg={4} style={{textAlign:"center"}}>
                        {this.getSoldierInfo()}
                    </Col>
                </Row>
                {this.state.myStory ?
                <Row>
                    <Col style={{ whiteSpace: "pre-line" }} sm={{span: 10, offset: 1}} md={{span: 8, offset: 2}}> 
                        <h4 style={{textAlign:"center"}}>My Story</h4>
                        {this.state.myStory} 
                    </Col>
                </Row> :
                false}
            </Container>
        )
    }
}

export default ShowProfileInModal;