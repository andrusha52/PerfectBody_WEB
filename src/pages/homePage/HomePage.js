import React, { Component } from "react";
import { v1 as uuidv1 } from "uuid";
import "./HomePage.css";
import CalcForm from "../../components/calcForm/CalcFormContainer";
import ModalWindow from "../../components/modalWindow/ModalWindow";

class HomePage extends Component {
  state = {
    modalObject: {},
    isModalOpen: false
  };

  prepareObjectForModal = (calories, products) => {
    this.setState({
      modalObject: {
        calories,
        products: products[0].map(item => ({ id: uuidv1(), name: item }))
      }
    });
  };

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  closeModal = event => {
    if (event.key && event.code === "Escape") {
      this.setState({
        isModalOpen: false
      });
    }

    if (
      event.target.className === "modalBackdrop" ||
      event.target.className === "closeBtn"
    ) {
      this.setState({
        isModalOpen: false
      });
    }
  };

  render() {
    const { modalObject, isModalOpen } = this.state;
    return (
      <>
        {isModalOpen && (
          <ModalWindow data={modalObject} onCloseModal={this.closeModal} />
        )}

        <div className="homePageWrapper">
          <div className="homePageBody">
            <CalcForm
              onModalOpen={this.openModal}
              onPrepareModalObject={this.prepareObjectForModal}
              // onSubmit={this.handleSubmit}
              // onChange={this.handleChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
