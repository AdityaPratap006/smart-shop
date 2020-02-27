import React, { useEffect } from 'react';
import './App.css';

import { Route, Switch, } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import { auth } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';

function App({ currentUser, setCurrentUser }) {

  
  useEffect(() => {

   let unsubscribeFromAuth =  auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log('Hello! ', {user});
    })

    return () => {
      
      unsubscribeFromAuth();
    }

  }, [setCurrentUser])

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

const mapStateToProps = (state) => ({
   currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser : user => dispatch(setCurrentUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
