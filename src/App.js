import React from 'react';
import './App.css';

import { Route, Switch, } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';


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
      </Switch>
    </div>
  );
}

export default App;
