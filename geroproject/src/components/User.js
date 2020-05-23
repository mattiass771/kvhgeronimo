import React, { Component } from 'react';
import axios from 'axios';

import EditItems from './EditItems';
import MyModal from './MyModal';
import Profile from './Profile';

import { Tab, Tabs, Container, Button } from 'react-bootstrap';

class UpdateItems extends Component {
    constructor() {
        super()
        this.state = {
            equipment: [],
            soldier: {},
            popup: false,
            actualItem: [],
            toggleRefresh: false,
            soldierData: {}
        }
    }

    componentDidMount() {
        axios.get('https://geronimoprojectwebsite.herokuapp.com/equipment')
            .then(response => {
                this.setState({ equipment: response.data })
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(`https://geronimoprojectwebsite.herokuapp.com/soldier/${localStorage.getItem("id")}`)
            .then(response => {
                this.setState({ soldier: response.data.equip, soldierData: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    refreshProps = () => {
        axios.get(`https://geronimoprojectwebsite.herokuapp.com/soldier/${localStorage.getItem("id")}`)
        .then(res => {
            this.setState({ soldier: res.data.equip })
            axios.get(`https://geronimoprojectwebsite.herokuapp.com/soldier/${localStorage.getItem("id")}`)
                .then(response => {
                    this.setState({ soldier: response.data.equip })
                })
        })
    }

    //POPUP HANDLERS (1,2)
    //1
    togglePop = (e) => {
        let header = e.target.dataset.header
        let short = e.target.dataset.short
        this.setState({ popup: !this.state.popup, actualItem: [header, short] })
    }
    //2
    fadePop = () => {
        this.setState({ popup: !this.state.popup })
    }

    removeAdmin = () => {
        localStorage.removeItem("isAdmin")
        this.setState({ toggleRefresh: !this.state.toggleRefresh })
    }

    addAdmin = () => {
        localStorage.setItem("isAdmin", true)
        this.setState({ toggleRefresh: !this.state.toggleRefresh })
    }

    render() {
        return (
            <Container>
                {console.log(this.state.soldierData.isAdmin)}
                {this.state.popup ? <MyModal item={this.state.actualItem} popup={this.state.popup} fadePop={this.fadePop} /> : null}
                {this.state.soldierData.isAdmin && 
                (localStorage.getItem("isAdmin") ? <Button style={{position:"relative", float:"right"}} onClick={this.removeAdmin} variant="outline-dark">Admin Mode: ON</Button> : <Button style={{position:"relative", float:"right"}} onClick={this.addAdmin} variant="outline-dark">Admin Mode: OFF</Button>)}
                <Tabs className="color-tab" defaultActiveKey="profile">
                    <Tab className="soldier-background" eventKey="profile" title="Profile">
                        <br />
                        <Profile refresh={this.refreshProps} soldierData={this.state.soldierData} />
                    </Tab>
                    <Tab className="soldier-background" eventKey="itemList" title="List of Items">
                        <br />
                        <EditItems refresh={this.refreshProps} togglePop={this.togglePop} equip={this.state.equipment} soldier={this.state.soldier} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default UpdateItems;