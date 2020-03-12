import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ModalWindow.css";

class ModalWindow extends Component {
  componentDidMount() {
    document.onkeydown = this.props.onCloseModal;
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }
  render() {
    const {
      data: { products, calories },
      onCloseModal
    } = this.props;
    return (
      <div className="modalBackdrop" onClick={onCloseModal}>
        <div className="modalWindow">
          <div className="modalHeader">
            <button
              type="button"
              className="closeBtn"
              onClick={onCloseModal}
            ></button>
            <h2 className="title">
              Ваша рекомендуемая суточная норма калорий составляет:
            </h2>
          </div>
          <div className="modalBody">
            <p className="resultText">
              {calories}
              <span className="resultUnits">ккал</span>
            </p>

            <h3 className="productDescription">
              Продукты, которые Вам
              <br />
              не рекомендуется употреблять:
            </h3>
            {products.length > 0 && (
              <ol className="list">
                {products.map(product => (
                  <li key={product.id}>
                    <p>{product.name}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className="modalFooter">
            <Link to="/login">
              <button type="button" className="startLoosingWeight">
                Начать худеть
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWindow;
