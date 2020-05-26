import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";

import Main from './components/Main';
import Navibar from './components/Navibar';
import Soldiers from './components/Soldiers';
import Login from './components/Login';
import User from './components/User';
import Platoon from './components/Platoon';
import Gallery from './components/Gallery';
import OpenGallery from './components/OpenGallery';
import Reports from './components/Reports';
import Calendar from './components/Calendar';

import './App.css';

// TODOS //
/*
   1. Create reusable Component with axios calls
   2. Reduce axios calls and pass unnecessary per props
   3. EditItems.js - add state for icon handler (to reduce wait time for check / uncheck)
   4. Check Inputs in Add Modals - create dropdowns and formating to avoid passing unusable attributes to mongodb
   5. Create Manual for Admins on DB-Attributes and how to handle inputs
   6. Check Add Modal positioning in Components (background not always in same transparency)
*/

class App extends Component {
   constructor() {
      super()
      this.state = {
         loggedOn: false
      }
   }

   handleLogin = () => {
      this.setState(
         { loggedOn: localStorage.getItem("logged") }
      )
   }

   render() {
      if (localStorage.getItem("logged")) {
         return (
            <Router> 
               <Container>
                  <Navibar />
                  <br/>
                  <Route path="/" exact component={Main} />
                  <Route path="/platoon" exact component={Platoon} />
                  <Route path="/gallerycli" exact component={Gallery} />
                  <Route path="/reportscli" exact component={Reports} />
                  <Route path="/calendarcli" exact component={Calendar} />
                  <Route path="/opengallery" exact component={OpenGallery} />
                  <Route path="/soldiers" exact component={Soldiers} />
                  <Route path="/user" exact component={User} />
               </Container> 
            </Router>
         );
      }
      else {
         return (
            <Login loggingOn={this.handleLogin} />
         )
      } 
   }
}

export default App;
