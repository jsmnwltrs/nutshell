import React from 'react';
import { Button } from 'reactstrap';
import authRequests from '../../../Helpers/data/authRequests';
import logo from '../../../Styles/images/logo.png';
import './Auth.scss';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/home');
    }).catch(error => console.error('error with auth', error));
  }

  render() {
    return (
      <div className="Auth">
        <Button className="btn btn-dark mt-4" onClick={this.authenticateUser}>Login <img className="logo" alt="logo" src={logo}></img></Button>
      </div>
    );
  }
}

export default Auth;
