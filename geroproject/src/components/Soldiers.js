import React, { Component } from 'react';
import axios from 'axios';
import GetSoldier from './GetSoldier';

import MyModal from './MyModal';

import { Container, Col, Row } from 'react-bootstrap';

class Soldiers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            army: "all",
            soldier: localStorage.getItem("username"),
            isChecked: false,
            soldierName: [],
            soldiers: [],
            equipment: [],
            joinData: [],
            moreSoldiers: [],
            popup: false,
            actualItem: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/equipment')
            .then(response => {
                this.setState({ equipment: response.data })
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('http://localhost:5000/soldier')
            .then(response => {
                this.setState({ soldiers: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    getUpdate = () => {
        axios.get('http://localhost:5000/soldier')
            .then(response => {
                this.setState({ soldiers: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    //POPUP HANDLERS (1,2)
    //1
    togglePop = (e) => {
        let header = e.currentTarget.dataset.header
        let short = e.currentTarget.dataset.short
        this.setState({ popup: !this.state.popup, soldier: "", actualItem: [header, short] })
    }
    //2
    fadePop = () => {
        this.setState({ popup: !this.state.popup })
    }

    updateSoldier = (e) => {
        let who = e.currentTarget.dataset.pass
        this.state.moreSoldiers.splice(this.state.moreSoldiers.indexOf(who),2)
        let arr = this.state.moreSoldiers
        this.setState({ moreSoldiers: arr, soldier: "remove" })  
    }

    handleChange = (event) => {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? 
        this.setState({ [name]: checked }) : 
        this.setState({ [name]: value, joinData: [] })
    }

    render() { 
        // DECLARE STATE VARS INTO VARS
        const equipData = this.state.equipment;
        const soldier = this.state.soldier;
        const soldiers = this.state.soldiers;
        const joinData = this.state.joinData;
        const soldierName = this.state.soldierName;
        const moreSoldiers = this.state.moreSoldiers;
        
        // STORE SOLDIER DATA IN ARRAY METHOD
        const getItems = (obj) => {
            let arr = []
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    arr.push([key, obj[key]])
                }
            }
            return arr;
        }
        
        //GET SOLDIER DATA VIA getItems METHOD FROM MONGODB
        const getData = () => {
            soldiers.map(el => {
                const arr = getItems(el.equip)
                return (
                    (el.name===soldier) ?
                        ( !soldierName.includes(el.name) && soldierName.push(el.name, el.nameFull),
                        arr.map((val) => {
                            return (
                                //GET EQUIPMENT DATA FROM MONGODB AND COMPARE BY "short" TO SOLDIER DATA, RENDER NAME: BOOLEAN
                                equipData.map((elem) => {
                                return (
                                    elem.short===val[0] ?
                                    joinData.push({ type: elem.type, name: elem.name, army: [elem.army], short: val[0] , val: val[1], sold: el.nameFull, soldShort: el.name, id:el._id }):
                                    false
                                )
                            })
                            )
                        }), !moreSoldiers.includes(el.name) && moreSoldiers.push(el.name, joinData)) : false
                )
            });
        }

        return ( 
            <Container>
                {getData()}
                <Row>
                    <Col sm={3}>
                        <form>
                            <select 
                                value={this.state.soldier}
                                onChange={this.handleChange}
                                name="soldier"
                            >   
                                <option value=""></option>
                                <option value="johnfdavis">John F. Davis</option>
                                <option value="matthewoconnor">Matthew O' Connor</option>
                                <option value="peterjnash">Peter J. Nash</option>
                                <option value="lucaswurfl">Lucas Wurfl</option>
                                <option value="thomasjholes">Thomas J. Holes</option>
                            </select>
                        </form>
                    </Col>  
                    <Col sm={2}> 
                        <form>   
                            <select 
                                value={this.state.army}
                                onChange={this.handleChange}
                                name="army"
                            >
                                <option value="all">Complete</option>
                                <option value="509">509th</option>
                                <option value="101">101st</option>
                                <option value="armored">Armored</option>
                                <option value="aclass">A-Class</option>
                                <option value="bclass">B-Class</option>
                                <option value="cclass">C-Class</option>
                            </select>
                        </form>
                    </Col>
                </Row>
                
                <br />
                {this.state.popup ? <MyModal item={this.state.actualItem} popup={this.state.popup} fadePop={this.fadePop} /> : null}
                <Container>
                    <Row>    
                        <GetSoldier armyType={this.state.army} obj={moreSoldiers} updateSoldier={this.updateSoldier} togglePop={this.togglePop} />
                    </Row>
                </Container>
            </Container>
        );
    }
}
 
export default Soldiers;