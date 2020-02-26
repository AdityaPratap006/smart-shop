import React from 'react';
import './App.css';

import { Route, Switch, } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
          <Route
              exact
              path="/"
              component={Home}
          />
          <Route
            exact
            path="/sign-in"
            component={Login}
          />
      </Switch>
    </div>
  );
}

export default App;
