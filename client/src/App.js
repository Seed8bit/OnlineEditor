import React from 'react';
import './App.css';
import Home from './pages/Home';
import {StateProvider} from './StateContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <StateProvider>
      <React.Fragment>
        <Router>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/register">
              <Register/>
            </Route>
        </Router>
      </React.Fragment>
    </StateProvider>
  )
}

export default App;