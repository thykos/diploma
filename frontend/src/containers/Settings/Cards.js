import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './styles.css';
import client from '../../helpers/ApiClient';
import { splitNumber } from '../../helpers/card';
import { get } from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeCard, addCard } from '../../reducers/cards';
import AddCardModal from '../../components/AddCardModal/AddCardModal';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
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

  onCreateCard = (data) => {
    const { user } = this.props;
    client.post('cards', { data: { card: {...data, user_id: user.id } }})
      .then(response => {
        this.props.addCard(response.resource);
        this.onCloseModal();
      });
  };


  onRemove = (card) => {
    client.del(`cards/${card.id}`)
      .then(() => this.props.removeCard(card));
  };

  render() {
    const { cards } = this.props;
    const { showModal } = this.state;
    return (
      <div>
        <div className="text-right addCardBtnWrapper">
          <Button type="submit" bsStyle="primary" onClick={this.onShowModal}> Добавить карту </Button>
        </div>
        {cards.map((card, idx) =>
          <div className="cardAccountInfo" key={idx}>
            <div className="cardWrapper">
              <span className="removeCard" onClick={() => this.onRemove(card)}>&times;</span>
              <div className="cardNumber">{splitNumber(card.number)}</div>
              <div className="cardDate">{moment(card.expiry_date).format('MM/YY')}</div>
            </div>
            <div className="accountInfo">
              <div className="accountField">
                <div className="accountFieldTitle">Баланс:</div>
                <div className="accountFieldContent">{get(card, 'account.ammount') || 0}</div>
              </div>
              <div className="accountField">
                <Link to={`/cards/${card.id}`}>Транзакции</Link>
              </div>
            </div>
          </div>
        )}
        <AddCardModal isOpen={showModal} onSubmit={this.onCreateCard} onClose={this.onCloseModal} />
      </div>
    );
  }
}

export default connect(state => ({
  user: state.auth.user,
  cards: state.cards
}), { removeCard, addCard })(Cards);
