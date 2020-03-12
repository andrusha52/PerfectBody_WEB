import React from 'react';
import styles from './Header.module.css';
import Burger from './Burger';
import NavPage from '../../pages/navPage/NavPage';
import { connect } from 'react-redux';
import ModalLogout from '../modalLogout/modalLogout';
import { Link } from 'react-router-dom';
import Nickname from './Nickname';
import { appContext } from '../App';

const burgerIcon = styles.hrdBurger;
const closeIcon = styles.hrdBurgerClose;

const Header = ({ auth }) => (
  <appContext.Consumer>
    {({ isMobile, isTablet, isDesktop, showExitModal }) => (
      <>
        <div className={styles.hdrContainer}>
          <Link to='/' className={styles.hdrLogo}>
            Perfect<span>Body</span>
          </Link>
          {isMobile && <Burger burgerIcon={burgerIcon} closeIcon={closeIcon} />}
          {isTablet && (
            <>
              <div className={styles.hdrAuthList}>
                {auth ? (
                  <Nickname />
                ) : (
                  <>
                    <Link
                      to='/login'
                      className={[
                        styles.hdrAuthListItem,
                        styles.hdrAuthListItemLink
                      ].join(' ')}
                    >
                      Вход
                    </Link>
                    <Link
                      to='/signup'
                      className={[
                        styles.hdrAuthListItem,
                        styles.hdrAuthListItemLink
                      ].join(' ')}
                    >
                      Регистрация
                    </Link>
                  </>
                )}
              </div>
              {auth && <Burger burgerIcon={burgerIcon} closeIcon={closeIcon} />}
            </>
          )}
          {isDesktop && <NavPage />}
        </div>
        {showExitModal && (<ModalLogout />)}
      </>
    )}
  </appContext.Consumer>
);

const mapStateToProps = state => ({
  auth: state.session.authenticated
});

export default connect(mapStateToProps)(Header);