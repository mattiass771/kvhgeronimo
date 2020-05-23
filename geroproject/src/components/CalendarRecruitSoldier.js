import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'react-bootstrap';

class CalendarRecruitSoldier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soldier: "",
            refresh: false,
            recruits: [],
            button: ""
        }
    }

    componentDidMount = () => {
        this.setState({ soldier: localStorage.getItem("id") })
        this.props.calendarSoldiers.includes(localStorage.getItem("id")) ? this.setState({ button: "remove" }) : this.setState({ button: "add" })
    }    

    handleChange = () => {
        console.log( this.state.button )
        axios.get(`http://localhost:5000/calendar/${this.props.calendarID}`)
            .then(response => {
                this.setState({ recruits: response.data.soldiers })
                if (!this.state.recruits.includes(this.state.soldier)) {
                    let soldierArr = [...this.state.recruits, this.state.soldier]
                    axios.post(`http://localhost:5000/calendar/update-soldiers/${this.props.calendarID}`, { soldiers: soldierArr } )
                    .then(res => {
                        this.setState({ button: "remove" })
                        console.log(res.data)
                        this.props.refresh()
                    })
                    .catch(err => {
                        console.log(err)
                    });
                } else {
                    let soldierArr = [...this.state.recruits]
                    soldierArr.splice(soldierArr.indexOf(this.state.soldier),1)
                    axios.post(`http://localhost:5000/calendar/update-soldiers/${this.props.calendarID}`, { soldiers: soldierArr } )
                    .then(res => {
                        this.setState({ button: "add" })
                        console.log(res.data)
                        this.props.refresh()
                    })
                    .catch(err => {
                        console.log(err)
                    });
                }
                
            })
            .catch(error => {
               console.log(error)
            });
    }


    //PROPS: calendarID, soldierData

    render() {
        return (
                
                this.state.button === "add" ? 
                <Button variant="outline-dark" onClick={this.handleChange}>Recruit me!</Button> : 
                <Button variant="outline-dark" onClick={this.handleChange}>I'm a pussy...</Button>
        )
    }
}

export default CalendarRecruitSoldier;