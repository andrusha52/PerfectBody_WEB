import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Burger = ({location: { pathname },burgerIcon,closeIcon,location}) => (
  <Link
    to={{
      pathname: pathname === '/nav' ? location.state.from : '/nav',
      state: {
        from: pathname
      }
    }}
    className={pathname !== '/nav' ? burgerIcon : closeIcon}
  ></Link>
);

export default withRouter(Burger);