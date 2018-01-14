import React, { Component } from 'react';
import './styles.css';
import client from '../../helpers/ApiClient';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeCard, addCard } from '../../reducers/cards';
import AddCardModal from '../../components/AddCardModal/AddCardModal';
import Card from '../../components/Card/Card';

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
          <Card key={idx} withLink card={card} onRemove={() => this.onRemove(card)}/>
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
