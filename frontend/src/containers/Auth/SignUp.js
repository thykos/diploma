import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';
import client from '../../helpers/ApiClient';
import { setUser } from '../../reducers/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

class SignUp extends Component {

  static Form = reduxForm({
    form: 'signUpForm',
    fields: ['email', 'password', 'first_name', 'last_name', 'birth_date', 'password_confirmation']
  })(({handleSubmit}) => (
    <div className="formWrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label >Имя</label>
          <Field
            name="first_name"
            className="form-control"
            component="input"
            type="text"
            placeholder="Имя"
          />
        </div>
        <div className="form-group">
          <label >Фамилия</label>
          <Field
            name="last_name"
            className="form-control"
            component="input"
            type="text"
            placeholder="Фамилия"
          />
        </div>
        <div className="form-group">
          <label >Дата рождения</label>
          <Field
            name="birth_date"
            className="form-control"
            component="input"
            type="date"
          />
        </div>
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
        <div className="form-group">
          <label>Подтвердите пароль</label>
          <Field
            name="password_confirmation"
            className="form-control"
            component="input"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="text-center">
          <Button type="submit" bsStyle="primary"> Зарегистрироваться </Button>
        </div>
      </form>
    </div>
  ));

  onSubmit = (data) => {
    client.post('/auth', { data: data })
      .then(response => {
        this.props.setUser(response.data);
        this.props.history.push('/');
      });
  };

  render() {
    return (
      <div className="container">
        <SignUp.Form onSubmit={this.onSubmit}/>
        <div className="text-center">
          <Link to="/login">Войти</Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { setUser })(SignUp);

// {
//   type: 'auth/SET_USER',
//     payload: {id: 1}
// }