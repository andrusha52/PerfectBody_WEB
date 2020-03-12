import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './NavPage.module.css';
import { connect } from 'react-redux';
import Nickname from '../../components/header/Nickname';
import { appContext } from '../../components/App';

const NavPage = ({ auth, location }) => {
  return (
    <appContext.Consumer>
      {({ isMobile, isDesktop, openExitModal }) => (
        <nav className={styles.navigation}>
          {auth ? (
            <>
              <div className={styles.navList}>
                <NavLink
                  to='/diary'
                  className={styles.navListItem}
                  activeClassName={styles.navListItemActive}
                >
                  Дневник
                </NavLink>

                <NavLink
                  to='/calculator'
                  className={styles.navListItem}
                  activeClassName={styles.navListItemActive}
                >
                  Калькулятор
                </NavLink>

                <NavLink
                  to='/achievements'
                  className={styles.navListItem}
                  activeClassName={styles.navListItemActive}
                >
                  Достижения
                </NavLink>
                {isMobile && (
                  <p onClick={openExitModal} className={styles.navListItem}>
                    Выход
                  </p>
                )}
              </div>
              {isDesktop && <Nickname />}
            </>
          ) : (
            location.pathname !== '/login' && location.pathname !== '/signup' && (
              <>
                <div></div>
                <div className={styles.loginContainer}>
                  <NavLink
                    to='/login'
                    className={styles.navListItem}
                    activeClassName={styles.navListItemActive}
                  >
                    Вход
                  </NavLink>
                  <NavLink
                    to='/signup'
                    className={styles.navListItem}
                    activeClassName={styles.navListItemActive}
                  >
                    Регистрация
                  </NavLink>
                </div>
              </>
            )
          )}
        </nav>
      )}
    </appContext.Consumer>
  );
};

const mapStateToProps = state => ({
  auth: state.session.authenticated
});

export default withRouter(connect(mapStateToProps)(NavPage));
