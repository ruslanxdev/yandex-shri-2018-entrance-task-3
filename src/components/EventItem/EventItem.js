import React, { Component } from 'react';
import { createBlock } from '../../helpers/BEMHelper';
import { createPluralTemplate } from '../../helpers/pluralHelper';

import UserItem from './../UserItem/UserItem';

class EventItem extends Component {
  render() {
    const { block, elem } = createBlock(this.props);
    const plural = createPluralTemplate('ru');
    const dateStart = new Date(this.props.dateStart);
    const dateEnd = new Date(this.props.dateEnd);
    const dateStartString = dateStart
      .toLocaleString('ru', { month: 'long', day: 'numeric' });
    const timeStartString = dateStart
      .toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });
    const timeEndString = dateEnd
      .toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });
    const timeRangeString = `${timeStartString}-${timeEndString}`;
    const n1 = this.props.users ? this.props.users.length - 1 : '';
    // TODO: Fix it, add padding and remove text space '\u00A0'
    const userContent = this.props.users && this.props.users.length > 1 ?
      plural`\u00A0и ${n1} {участник, участника, участников}` : '';
    const n2 = this.props.room ? this.props.room.floor : '';
    const floor = this.props.room ? plural`${n2} {этаж, этаж, этаж}` : '';
    const type = (this.props.mods && this.props.mods.type) || '';
    const roomTitle = this.props.room ? this.props.room.title : '';

    return (
      <div className={block('event-item')}>
        <div className={elem('title')}>{this.props.title}</div>
        <div className={elem('text')}>
          <span className={elem('date')}>{dateStartString}</span>
          <span>, </span>
          <span className={elem('time')}>{timeRangeString}</span>
          <span className={elem('text-separator')}>·</span>
          <span className={elem('room')}>{roomTitle}</span>
          <span>, </span>
          <span className={elem('floor')}>{floor}</span>
        </div>
        {type !== 'short' && this.props.users && this.props.users[0] ? (
          <UserItem
            mods={{ button: false, transparent: true }}
            content={userContent}
            {...this.props.users[0]}
          />
        ) : ''}
      </div>
    );
  }
}

export default EventItem;
