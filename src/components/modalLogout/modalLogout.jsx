import React from "react";
import styles from "./modalLogout.module.css";
import { Link } from "react-router-dom";
import { appContext } from "../App";
import { connect } from "react-redux";
import { logOut } from "../../redux/auth/authActions";

const modalLogout = ({ logOut }) => (
  <appContext.Consumer>
    {({ closeModal, closeOnBackdrop }) => (
      <div onClick={e => closeOnBackdrop(e)} className={styles.centerCase}>
        <div className={styles.moduleCase}>
          <img
            alt="close"
            onClick={() => closeModal()}
            className={styles.btnClose}
            src="https://avatanplus.com/files/resources/mid/5968a2c8f2ed115d40bbe123.png"
          />
          <p className={styles.text}>Ты дейсвительно хочешь выйти?</p>
          <hr className={styles.line}></hr>
          <div className={styles.btnCase}>
            <Link
              to="/"
              onClick={() => {
                logOut();
                closeModal();
              }}
              className={styles.btnYes}
            >
              Да
            </Link>
            <button onClick={() => closeModal()} className={styles.btnNo}>
              Нет, я хочу остаться
            </button>
          </div>
        </div>
      </div>
    )}
  </appContext.Consumer>
);

export default connect(null, { logOut })(modalLogout);
