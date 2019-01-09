import React from 'react';
import './MyNavbar.scss';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to='/home'><i className="fas fa-home"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/friends'><i className="fas fa-user-friends"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/messages'><i className="fas fa-comments"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/events'><i className="far fa-calendar-alt"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/articles'><i className="far fa-newspaper"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/weather'><i className="fas fa-sun"></i></NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="my-navbar sticky-top">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Nutshell</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
