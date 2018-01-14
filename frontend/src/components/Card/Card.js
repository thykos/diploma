import React, { Component } from 'react';
import { splitNumber } from '../../helpers/card';
import moment from 'moment';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

export default class CardPreview extends Component {
  render() {
    const { card, onRemove, withLink } = this.props;
    return (
      <div className="cardAccountInfo">
        <div className="cardWrapper">
          { onRemove && <span className="removeCard" onClick={onRemove}>&times;</span>}
          <div className="cardNumber">{splitNumber(card.number)}</div>
          <div className="cardDate">{moment(card.expiry_date).format('MM/YY')}</div>
        </div>
        <div className="accountInfo">
          <div className="accountField">
            <div className="accountFieldTitle">Баланс:</div>
            <div className="accountFieldContent">{get(card, 'account.ammount') || 0}</div>
          </div>
          {withLink &&
            <div className="accountField">
              <Link to={`/cards/${card.id}`}>Транзакции</Link>
            </div>
          }
        </div>
      </div>
    )
  }
}
