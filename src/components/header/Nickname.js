import React from 'react';
import { connect } from 'react-redux';
import styles from './Header.module.css';
import { appContext } from '../App';

const Nickname = ({nickname}) => (
  <appContext.Consumer>
    {
      ({ openExitModal }) => (
        <div className={styles.nickNameContainer}>
        <p
          className={[styles.hdrAuthListItem, styles.hdrAuthListItemBold].join(' ')}
        >
          {nickname}
        </p>
        <p
          onClick={openExitModal}
          className={[styles.hdrAuthListItem, styles.hdrAuthListItemLink].join(' ')}
        >
          Выйти
        </p>
      </div>
      )
    }
  </appContext.Consumer>
);

const mapStateToProps = state => ({
  nickname: state.session.user
});

export default connect(mapStateToProps)(Nickname);
