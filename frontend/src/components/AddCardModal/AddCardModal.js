import React, { Component } from 'react';
import Modal from 'react-modal';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';

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
    left                       : '40px',
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

class AddCardModal extends Component {

  static Form = reduxForm({
    form: 'addCardForm',
    fields: ['number', 'expiry_date', 'cvv2']
  })(({handleSubmit}) => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label >Номер</label>
          <Field
            name="number"
            className="form-control"
            component="input"
            type="text"
            placeholder="Номер"
          />
        </div>
        <div className="form-group">
          <label >CVV2</label>
          <Field
            name="cvv2"
            className="form-control"
            component="input"
            type="text"
            placeholder="cvv2"
          />
        </div>
        <div className="form-group">
          <label >Expiry date</label>
          <Field
            name="expiry_date"
            className="form-control"
            component="input"
            type="date"
          />
        </div>
        <div className="text-center">
          <Button type="submit" bsStyle="primary"> Добавить </Button>
        </div>
      </form>
    </div>
  ));

  render() {
    const { isOpen, onSubmit, onClose } = this.props;
    return (
      <Modal isOpen={isOpen} style={styles} onRequestClose={onClose}>
        <h4>Добавить карту</h4>
        <AddCardModal.Form onSubmit={onSubmit}/>
      </Modal>
    )
  }
}

export default AddCardModal;