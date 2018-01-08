import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tabs from '../../components/Tabs/Tabs';
import Cards from './Cards';
import Profile from './Profile';
import './styles.css';

class Settings extends Component {
  render() {
    const { history } = this.props;
    const tabs = [
      {
        label: 'Мои счета',
        link: '/settings/cards'
      },
      {
        label: 'Профиль',
        link: '/settings/profile'
      }
    ];
    return (
      <div>
        <h2>Настройки</h2>
        <div className="container">
          <Tabs tabs={tabs} history={history}/>
          <div className="settingsContent">
            <Switch>
              <Route path="/settings/cards" component={Cards}/>
              <Route path="/settings/profile" component={Profile}/>
            </Switch>
          </div>
        </div>
      </div>

    );
  }
}

export default Settings;