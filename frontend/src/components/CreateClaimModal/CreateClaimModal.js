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
    width                      : '400px',
    left                       : '50%',
    transform                  : 'translateX(-50%)',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    height                     : '380px',
    outline                    : 'none',
    padding                    : '20px'

  }
};

class CreateClaimModal extends Component {

  static Form = reduxForm({
    form: 'addClaimForm',
    fields: ['description']
  })(({handleSubmit}) => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label >Описание жалобы</label>
          <Field
            name="description"
            className="form-control"
            component="textarea"
            placeholder="Введите текст жалобы"
          />
        </div>
        <div className="text-center">
          <Button type="submit" bsStyle="primary"> Отправить </Button>
        </div>
      </form>
    </div>
  ));

  render() {
    const { isOpen, onSubmit, onClose } = this.props;
    return (
      <Modal isOpen={isOpen} style={styles} onRequestClose={onClose}>
        <h4>Создать жалобу</h4>
        <CreateClaimModal.Form onSubmit={onSubmit}/>
      </Modal>
    )
  }
}

export default CreateClaimModal;
