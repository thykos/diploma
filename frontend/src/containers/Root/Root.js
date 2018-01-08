import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import App from '../App/App';
import Auth from '../Auth/Auth';
import client from '../../helpers/ApiClient';
import { setUser } from '../../reducers/auth';
import { setCards } from '../../reducers/cards';
import { Route } from 'react-router-dom';

class Root extends Component {

  componentWillMount() {
    client.get('/auth/validate_token')
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(() => {
        const { history } = this.props;
        if (!history.location.pathname.includes('login', 'signup')) {
          this.props.history.push('/login');
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    const { history } = this.props;
    if (get(user, 'id') && history.location.pathname.includes('login', 'signup')) {
      this.props.history.push('/');
    }
    if (!get(user, 'id') && !history.location.pathname.includes('login', 'signup')) {
      this.props.history.push('/login');
    }
  }


  render() {
    const { user } = this.props;
    return (
      <div className="App">
        {get(user, 'id')
          ? <Route component={App}/>
          : <Route component={Auth}/>
        }
      </div>
    );
  }
}

export default connect(state => ({user: state.auth.user}), { setUser, setCards })(Root);
