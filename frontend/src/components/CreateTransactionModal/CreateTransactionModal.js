import React, { Component } from 'react';
import Modal from 'react-modal';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

const styles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.85)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    width                      : '400px',
    left                       : '50%',
    transform                  : 'translateX(-50%)',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    height                     : '400px',
    outline                    : 'none',
    padding                    : '20px'

  }
};

class CreateTransactionModal extends Component {

  static Form = reduxForm({
    form: 'addCardForm',
    fields: ['card_id', 'card_to_number', 'amount']
  })(({handleSubmit, cards}) => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label >Выберите карту</label>
          <Field
            name="card_id"
            className="form-control"
            component="select"
            type="text"
            placeholder="Номер"
          >
            {cards.map((card, idx) => <option key={idx} value={card.id}>{card.number}</option>)}
          </Field>
        </div>
        <div className="form-group">
          <label >Сумма</label>
          <Field
            name="amount"
            className="form-control"
            component="input"
            type="text"
          />
        </div>
        <div className="form-group">
          <label >Номер карты получателя</label>
          <Field
            name="card_to_number"
            className="form-control"
            component="input"
            placeholder="4242424242424242"
            type="text"
          />
        </div>
        <div className="text-center">
          <Button type="submit" bsStyle="primary"> Создать </Button>
        </div>
      </form>
    </div>
  ));

  render() {
    const { isOpen, onSubmit, onClose, cards } = this.props;
    return (
      <Modal isOpen={isOpen} style={styles} onRequestClose={onClose}>
        <h4>Создать транзакцию</h4>
        <CreateTransactionModal.Form cards={cards} onSubmit={onSubmit}/>
      </Modal>
    )
  }
}

export default connect(state => ({cards: state.cards}))(CreateTransactionModal);
