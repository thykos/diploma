import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';
import client from '../../helpers/ApiClient';
import { setUser } from '../../reducers/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

class SignIn extends Component {

  static Form = reduxForm({
    form: 'loginForm',
    fields: ['email', 'password']
  })(({handleSubmit}) => (
    <div className="formWrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label >Email</label>
          <Field
            name="email"
            className="form-control"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <Field
            name="password"
            className="form-control"
            component="input"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="text-center">
          <Button type="submit" bsStyle="primary"> Войти </Button>
        </div>
      </form>
    </div>
  ));

  onSubmit = (data) => {
    client.post('/auth/sign_in', { data: data })
      .then(response => {
        this.props.history.push('/');
        this.props.setUser(response.data)
      });
  };

  render() {
    return (
      <div className="container">
        <SignIn.Form onSubmit={this.onSubmit}/>
        <div className="text-center">
          <Link to="/signup">Зарегистрироваться</Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { setUser })(SignIn);

// {
//   type: 'auth/SET_USER',
//     payload: {id: 1}
// }