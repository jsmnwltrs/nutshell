import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import authRequests from '../../Helpers/data/authRequests';
import logo from '../../Styles/images/logo.png';
import './Auth.scss';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      // const user = result.additionalUserInfo.username;
      this.props.isAuthenticated();
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
