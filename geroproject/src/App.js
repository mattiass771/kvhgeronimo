import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from './components/Main/Main';
import Navibar from './components/Navibar';
import Soldiers from './components/Compare Equip/Soldiers';
import Login from './components/Login';
import User from './components/User/User';
import Platoon from './components/Platoon/Platoon';
import Gallery from './components/Gallery/Gallery';
import OpenGallery from './components/Gallery/OpenGallery';
import Reports from './components/Reports/Reports';
import Calendar from './components/Calendar/Calendar';
import Footer from './components/Footer';
import Library from './components/Library/Library';
import Information from './components/Information/Information';

import './App.css';

// TODOS //
/*
   1. pridat do databazy atributy vojakov (function, rank a tak)
   2. Reduce axios calls and pass unnecessary per props
   3. EditItems.js - add state for icon handler (to reduce wait time for check / uncheck)
   6. Obsah prerobit do slovenciny
   8. Support Us Route / Important Info Tab - komponenta pred loginom ako Support Us na navbare a za loginom ako Important Info sucastou profilu v Tabe 
   10. pre adminov pridavanie a vymazavanie akcii len tak
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
      return (
         <Router> 
               <Navibar />
               <br/>
               <Route path="/" exact component={Main} />
               <Route path="/platoon" exact component={Platoon} />
               <Route path="/gallerycli" exact component={Gallery} />
               <Route path="/reportscli" exact component={Reports} />
               <Route path="/librarycli" exact component={Library} />
               <Route path="/calendarcli" exact component={Calendar} />
               <Route path="/opengallery" exact component={OpenGallery} />
               <Route path="/soldiers" exact component={Soldiers} />
               <Route path="/info" exact component={Information} />
               <Route path="/user" exact component={User} />
               <Route path="/login" render={(props) => <Login {...props} loggingOn={this.handleLogin} /> } />
               <Footer />
         </Router>
      );
   }
}

export default App;
