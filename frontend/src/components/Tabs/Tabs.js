import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tabs extends Component {
  render() {
    const { tabs, history } = this.props;
    return (
      <div className="tabsWrapper">
        <ul className="nav nav-tabs">
          {tabs.map((tab, idx) =>
            <li key={idx} className={history.location.pathname.includes(tab.link) ? 'active' : ''}>
              <Link to={tab.link}>{tab.label}</Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Tabs;