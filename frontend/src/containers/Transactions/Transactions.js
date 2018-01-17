import React, { Component } from 'react';
import client from '../../helpers/ApiClient';
import { Table, Button, Tabs, Tab } from 'react-bootstrap';
import CreateClaimModal from '../../components/CreateClaimModal/CreateClaimModal';
import { get } from 'lodash';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: {
        meta: {
          total: 0
        }
      },
      transaction: null
    };
  }

  componentDidMount() {
    client.get('/transactions')
      .then(response => this.setState({
        transactions: response
      }));
  }


  onShowModal = (transaction) => {
    this.setState({
      transaction: transaction
    });
  };

  onCloseModal = () => {
    this.setState({
      transaction: null
    });
  };

  onCreateClaim = (data) => {
    console.log(data);
    // const { transaction } = this.state;
    client.post('/claims', { data: {
      resource: {
        // account_ids: [transaction.]
      }
    }})
  };

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
          <td>Жалоба</td>
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
            <td>
              <div className="text-center">
                <Button bsStyle="danger" onClick={() => this.onShowModal(transaction)}> Подать жалобу </Button>
              </div>
            </td>
          </tr>
        )}
        </tbody>
      </Table>
    )
  };

  render() {
    const { transactions, transaction } = this.state;
    return (
      <div>
        <h3>Мои тразакции({transactions.meta.total})</h3>
        <Tabs id="transactions-tab">
          <Tab eventKey={1} title="Исходящие">
            {get(transactions, 'resources.created') && this.renderTable(transactions.resources.created)}
          </Tab>
          <Tab eventKey={2} title="Входящие">
              {get(transactions, 'resources.received') && this.renderTable(transactions.resources.received)}
          </Tab>
        </Tabs>
        <CreateClaimModal isOpen={transaction} transaction={transaction} onSubmit={this.onCreateClaim} onClose={this.onCloseModal}/>
      </div>
    );
  }
}
