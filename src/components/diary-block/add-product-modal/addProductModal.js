import React from "react";
import styles from "./addProductModal.module.css";

const addProductModal = ({ children, showModal }) => {
  return (
    <div className={styles.modal}>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={showModal}
      ></button>
      {children}
    </div>
  );
};

export default addProductModal;
