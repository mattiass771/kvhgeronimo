import React, { Component } from 'react';
import axios from 'axios'

import { Container, Row, Col, Image, Button } from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            myStory: ""
        }
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/soldier/${localStorage.getItem("id")}`)
            .then(res => {
                this.setState({ myStory: res.data.story })
            })
            .catch(err => {
                console.log(err)
            });
    }

    cancelEdit = () => {
        this.setState({ edit: !this.state.edit })
    }

    setEdit = () => {
        this.setState({ edit: !this.state.edit })
        if (this.state.edit) {
            axios.post(`https://kvhgeronimo.herokuapp.com/soldier/update-story/${localStorage.getItem("id")}`, { story: this.state.myStory } )
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => console.log( error.response ) );
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
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
            <Container style={{marginTop:"-24px", borderRadius: "5px"}}>
                <Row style={{paddingTop:"25px"}}>
                    <Col lg={{span:4, offset:2}} sm={6} style={{textAlign:"center"}}>
                        <Image style={{ marginBottom:"25px" }} src={this.props.soldierData.imageURL ? this.props.soldierData.imageURL : 
                            "https://i.ibb.co/RYtTKY1/emptypicture.jpg"} thumbnail fluid />
                    </Col>
                    <Col lg={4} sm={6} style={{textAlign:"center"}}>
                        {this.getSoldierInfo()}
                    </Col>
                </Row>
                <Row>
                    <Col md={10} style={{ textAlign: "right" }}>
                        {!this.state.edit ?
                        <Button className="edit-story" variant="outline-light" onClick={this.setEdit}>Edit Story</Button> :
                        <>
                        <Button className="edit-story" variant="outline-light" onClick={this.setEdit}>Save</Button>
                        <Button className="edit-story" variant="outline-light" onClick={this.cancelEdit}>Cancel</Button>
                        </>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col style={{ whiteSpace: "pre-line", marginBottom: "75px" }} sm={{span: 10, offset: 1}} md={{span: 8, offset: 2}}> 
                        <h4 style={{textAlign:"center"}}>My Story</h4>
                        {!this.state.edit ? this.state.myStory : 
                        <textarea
                            onChange={this.handleChange} 
                            name="myStory" 
                            value={this.state.myStory} 
                            style={{ borderRadius: "10px", width: "105%", height: "300%" }} 
                        />}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Profile;