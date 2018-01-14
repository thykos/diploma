import React, { Component } from 'react';
import client from '../../helpers/ApiClient';
import { Table, Button } from 'react-bootstrap';
import CreateClaimModal from '../../components/CreateClaimModal/CreateClaimModal';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: {
        meta: {
          total: 0
        }
      },
      showModal: false
    };
  }

  componentDidMount() {
    client.get('/transactions')
      .then(response => this.setState({
        transactions: response
      }));
  }


  onShowModal = () => {
    this.setState({
      showModal: true
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  onCreateClaim = (data) => {
    console.log(data);
  };

  render() {
    const { transactions, showModal } = this.state;
    return (
      <div>
        <h3>Мои тразакции({transactions.meta.total})</h3>
        {transactions.meta.total > 0 &&
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
            {transactions.resources.map((transaction, idx) =>
              <tr key={idx}>
                <td>{transaction.id}</td>
                <td>{transaction.account_from_id}</td>
                <td>{transaction.account_to_id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.result}</td>
                <td>
                  <div className="text-center">
                    <Button bsStyle="danger" onClick={this.onShowModal}> Подать жалобу </Button>
                  </div>
                </td>
              </tr>
            )}
            </tbody>
          </Table>
        }
        <CreateClaimModal isOpen={showModal} onSubmit={this.onCreateClaim} onClose={this.onCloseModal}/>
      </div>
    );
  }
}
