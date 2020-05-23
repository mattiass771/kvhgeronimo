import React, { Component } from 'react';
import axios from 'axios';

class CalendarRecruitSoldiersAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soldier: "",
            refresh: false,
            recruits: []
        }
    }

    //[17051191, 22011920, 11041292 ]

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
        console.log(this.props.calendarID)
        axios.get(`https://kvhgeronimo.herokuapp.com/calendar/${this.props.calendarID}`)
            .then(response => {
                this.setState({ recruits: response.data.soldiers })
                let soldierArr = [...this.state.recruits, value]
                console.log(soldierArr)
                axios.post(`https://kvhgeronimo.herokuapp.com/calendar/update-soldiers/${this.props.calendarID}`, { soldiers: soldierArr } )
                    .then(res => {
                        console.log(res.data)
                        this.props.refresh()
                        this.setState({ [name]: "" })
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
            .catch(error => {
               console.log(error)
            });
    }


    //PROPS: calendarID, soldierData

    getFormSelect = () => {
        let output = [<option key={0} value=""></option>]
        for (let soldier of this.props.soldierData) {
            if (!this.props.calendarSoldiers.includes(soldier._id)) {
                output.push(
                    <option key={soldier._id} value={soldier._id}>{soldier.nameFull}</option>
                )
            }
        }
        return output
    }

    render() {
        return (
            <form>
                <select 
                    value={this.state.soldier}
                    onChange={this.handleChange}
                    name="soldier"
                >
                    {this.getFormSelect()}
                </select>
            </form>
        )
    }
}

export default CalendarRecruitSoldiersAdmin;