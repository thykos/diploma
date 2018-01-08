import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';
import './styles.css';
import { connect } from 'react-redux';
import client from '../../helpers/ApiClient';
import { setUser } from '../../reducers/auth';

class Profile extends Component {

  static Form = reduxForm({
    form: 'userForm',
    fields: ['first_name', 'last_name', 'birth_date', 'email']
  })(({handleSubmit}) => (
    <div>
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
        <div className="text-center">
          <Button type="submit" bsStyle="primary"> Сохранить </Button>
        </div>
      </form>
    </div>
  ));

  onSubmit = (data) => {
    const { user } = this.props;
    client.put(`/users/${user.id}`, { data: {user: data}})
      .then(response => this.props.setUser(response.resource));
  };

  render() {
    return (
      <div>
        <Profile.Form onSubmit={data => this.onSubmit(data)} initialValues={this.props.user}/>
      </div>

    );
  }
}

export default connect(state => ({user: state.auth.user}), { setUser })(Profile);