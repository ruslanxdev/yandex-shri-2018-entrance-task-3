import React, { Component } from 'react';
import { createBlock } from '../../helpers/BEMHelper';
import emoji2 from './../../images/emoji2.svg';

import Button from './../Button/Button';
import EventItem from './../EventItem/EventItem';
import Modal from './../Modal/Modal';

class ModalEventCreated extends Component {
  render() {
    const { block, elem } = createBlock(this.props);
    const { event, mods, onModalButtonCloseClick, clearEvent } = this.props;

    const modalProps = {
      ...this.props,
      mods: { center: true, ...mods }
    };
    const buttonProps = {
      mods: { type: 'primary', size: 'md' },
      mix: 'grid__item',
      onClick: () => {
        onModalButtonCloseClick();
        clearEvent();
      }
    };

    return (
      <Modal className={block('modal')} {...modalProps}>
        <img className={elem('image')} src={emoji2} width="40" height="40" alt="Встреча создана!"/>
        <h3 className={elem('title')}>Встреча создана!</h3>
        <EventItem mods={{ type: 'short' }} {...event} />
        <div className={elem('footer', {}, 'grid grid--margin-true grid--center')}>
          <Button {...buttonProps}>Хорошо</Button>
        </div>
      </Modal>
    );
  }
}

export default ModalEventCreated;
