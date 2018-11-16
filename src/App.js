import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout//navbar/Navbar";
import Exam from "./components/main/exam/Exam";
import AdminPanel from "./components/main/admin/AdminPanel";
import SignUp from "./components/main/sign/signUp"
import LogIn from "./components/main/sign/login"
import HomePage from "./components/main/homePage/HomePage"; 

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/exam/:topic" component={Exam} />
            <Route path="/adminpanel" component={AdminPanel}/>
            <Route path="/login" component={LogIn}/>
            <Route path="/signup" component={SignUp}/>
          </Switch>
          
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
