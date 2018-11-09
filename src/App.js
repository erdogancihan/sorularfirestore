import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout//navbar/Navbar";
import Questions from "./components/main/exam/Questions";
import AdminPanel from "./components/main/admin/AdminPanel";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/questions" component={Questions} />
            <Route path="/adminpanel" component={AdminPanel}/>
          </Switch>
          
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
