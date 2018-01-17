import React, { Component } from 'react';
import client from '../../helpers/ApiClient';
import { Button } from 'react-bootstrap';
import './styles.css';
import { connect } from 'react-redux';
import { removeCard, addCard } from '../../reducers/cards';
import AddCardModal from '../../components/AddCardModal/AddCardModal';
import Card from '../../components/Card/Card';
import { get } from 'lodash';
import CreateTransactionModal from '../../components/CreateTransactionModal/CreateTransactionModal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showTransactionModal: false
    };
  }

  onShowModal = () => {
    this.setState({
      showModal: true
    });
  };

  onShowTransactionModal = () => {
    this.setState({
      showTransactionModal: true
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  onCloseTransactionModal = () => {
    this.setState({
      showTransactionModal: false
    });
  };

  onCreateCard = (data) => {
    const { user } = this.props;
    client.post('cards', { data: { card: {...data, user_id: user.id } }})
      .then(response => {
        this.props.addCard(response.resource);
        this.onCloseModal();
      });
  };

  onCreateTransaction = (data) => {
    fetch(`${window.location.protocol}//ipinfo.io/json`)
      .then(response => response.json())
      .then(location_data => {
        client.post('transactions', { data: { resource: {...data, ...location_data} }})
          .then(response => {
            if (get(response, 'errors.account_to_id')) alert(response.errors.account_to_id);
          });
      });
  };

  render() {
    const { showModal, showTransactionModal } = this.state;
    const { cards } = this.props;
    return (
      <div className="App">
        {cards.length < 1 &&
          <div className="dummyWrapper">
            <h3 className="text-center">Добро пожаловать в систему электронных платежей <div>The payments</div></h3>
            <div className="text-center addCardBtnWrapper">
              <Button type="submit" bsStyle="primary" onClick={this.onShowModal}> Добавить карту </Button>
              <AddCardModal isOpen={showModal} onSubmit={this.onCreateCard} onClose={this.onCloseModal} />
            </div>
          </div>
        }
        {cards.length > 0 &&
          <div>
            <h3>Мои карты</h3>
            <div className="text-right addCardBtnWrapper">
              <Button type="submit" bsStyle="primary" onClick={this.onShowTransactionModal}> Создать транзакцию </Button>
            </div>
            {cards.map((card, idx) => <Card key={idx} withLink card={card}/>)}
            <CreateTransactionModal isOpen={showTransactionModal} onSubmit={this.onCreateTransaction} onClose={this.onCloseTransactionModal} />
          </div>
        }
      </div>
    );
  }
}

export default connect(state => ({
  user: state.auth.user,
  cards: state.cards
}), { removeCard, addCard })(Home);
