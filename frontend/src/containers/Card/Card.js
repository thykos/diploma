import React, { Component } from 'react';
import client from '../../helpers/ApiClient';
import { splitNumber } from '../../helpers/card';
import { Tab, Tabs, Table } from 'react-bootstrap';
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


  renderTable = (data) => {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <td>id</td>
            <td>От кого</td>
            <td>Кому</td>
            <td>Сумма</td>
            <td>Статус</td>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction, idx) =>
            <tr key={idx}>
              <td>{transaction.id}</td>
              <td>{transaction.account_from_id}</td>
              <td>{transaction.account_to_id}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.result}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  };

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
                <Tabs id="transactions-tab">
                  <Tab eventKey={1} title="Исходящие">
                    {this.renderTable(card.account.transactions_created)}
                  </Tab>
                  <Tab eventKey={2} title="Входящие">
                    {this.renderTable(card.account.transactions_received)}
                  </Tab>
                </Tabs>
              </div>
            </div>
          : <div>Такой карты не существует</div>
        }
      </div>
    );
  }
}

export default Card;
