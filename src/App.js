import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Bhome from "./Bhome";
import Ahome from "./Ahome";
import History from "./History";
import LinkAnalytics from "./LinkAnalytics";

import "./styles.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Bhome} />
            <Route exact path="/analytics" component={Ahome} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/history" component={History} />
            <Route path="/linkanalytics" component={LinkAnalytics} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
