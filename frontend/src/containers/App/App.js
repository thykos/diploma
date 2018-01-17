import React, { Component } from 'react';
import Routes from '../../routes';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import './styles.css';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { logout } from '../../reducers/auth';
import { setCards } from '../../reducers/cards';
import { Link } from 'react-router-dom';
import client from '../../helpers/ApiClient';

class App extends Component {

  componentDidMount() {
    client.get('/cards')
      .then(response => this.props.setCards(response.resources))
  }

  render() {
    const { user, history: { push } } = this.props;
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">The payments</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={() => push('/transactions')}>
              Мои транзакции
            </NavItem>
            <NavItem eventKey={2} href="#" onClick={() => push('/claims')}>
              Мои жалобы
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={3} title={get(user, 'first_name') || 'Пользователь'} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onClick={() => push('/settings/cards')}>Настройки</MenuItem>
              <MenuItem eventKey={3.2} onClick={this.props.logout}>Выйти</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className="container">
          <Routes/>
        </div>
      </div>
    );
  }
}

export default connect(state => ({user: state.auth.user}), { logout, setCards })(App);
