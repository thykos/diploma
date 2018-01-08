import React, { Component } from 'react';
import client from '../../helpers/ApiClient';
import { splitNumber } from '../../helpers/card';
import moment from 'moment';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {}
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { match } = this.props;
    client.get(`cards/${match.params.id}`)
      .then(response => this.setState({
        card: response.resource
      }));
  }

  render() {
    const { card } = this.state;
    return (
      <div>
        {card.id
        ? <div>
            <div className="cardAccountInfo">
              <div className="cardWrapper">
                <span className="removeCard" onClick={() => this.onRemove(card)}>&times;</span>
                <div className="cardNumber">{splitNumber(card.number)}</div>
                <div className="cardDate">{moment(card.expiry_date).format('MM/YY')}</div>
              </div>
              <div className="accountInfo">
                <div className="accountField">
                  <div className="accountFieldTitle">Баланс:</div>
                  <div className="accountFieldContent">{card.account.amount}</div>
                </div>
              </div>
            </div>

            <div>
              <h5>История транзакций</h5>
            </div>
          </div>
        : <div>Такой карты не существует</div>
        }
      </div>
    );
  }
}

export default Card;
