import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../Helpers/data/connection';
import authRequests from '../Helpers/data/authRequests';
import Auth from '../Components/Auth/Auth';
import MyNavbar from '../Components/MyNavbar/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends Component {
  state = {
    authed: false,
    currentUid: '',
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUid = authRequests.getCurrentUid();
        this.setState({ authed: true, currentUid });
      } else {
        this.setState({ authed: false, currentUid: '' });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  logoutClickEvent = () => {
    authRequests.logoutUser();
    this.setState({ authed: false, currentUid: '' });
  }


  render() {
    const { authed } = this.state;
    if (!authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={authed} logoutClickEvent={this.logoutClickEvent}/>
          <Auth isAuthenticated={this.isAuthenticated} />
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={this.logoutClickEvent}/>
      </div>
    );
  }
}

export default App;
