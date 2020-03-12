import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import * as opacityWithShakeTransition from "../../../transitions/opacityTransition.module.css";
import styles from "./AddProduct.module.css";

const customStyles = {
  container: provided => ({ ...provided, borderBottom: "1px solid #e5e5e5" }),
  indicatorsContainer: provided => ({ ...provided, display: "none" }),
  control: provided => ({ ...provided, border: 0, boxShadow: "none" })
};

class AddProduct extends Component {
  state = {
    inputValue: "",
    selectedValue: "",
    quantityValue: "",
    products: [],
    product: {},
    isErrorVisible: false,
    errorMsg: ""
  };

  handleSelectChange = value => {
    this.setState({ selectedValue: value });
  };

  handleInputSelect = inputValue => {
    this.setState({ inputValue });
  };

  handleChange = e => {
    this.setState({ quantityValue: e.target.value });
  };

  // showError = (product, grams) => {
  //   let error = '';
  //   if (product === '') {

  //     // this.setState({
  //     //   errorMsg: 'Выберите продукт'
  //     // });
  //     error = 'Выберите продукт';
  //     //console.log()
  //   } else if (!grams) {
  //     this.setState({
  //       errorMsg: 'Введите количество грамм'
  //     });
  //     return;
  //   }
  // };

  componentWillUnmount() {
    this.props.showModal();
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.props.isMobile);

    if (this.props.isMobile) {
      console.log("showModal");
      this.props.showModal();
    }

    const { selectedValue, quantityValue } = this.state;
    if (!selectedValue.label) {
      this.setState({
        isErrorVisible: true,
        errorMsg: "Выберите продукт"
      });
      return;
    } else if (!quantityValue) {
      this.setState({
        isErrorVisible: true,
        errorMsg: "Выберите граммы"
      });
      return;
    } else {
      this.setState({
        isErrorVisible: false,
        product: { name: selectedValue.label, quantity: quantityValue }
      });

      const product = {
        ...selectedValue,
        weight: quantityValue,
        date: this.props.selectedDay
      };

      const headers = { Authorization: this.props.token };
      await axios.post(`/user/eats/${selectedValue.value}`, product, {
        headers
      });
      this.props.getUpdateProducts();
    }

    this.setState({
      selectedValue: "",
      quantityValue: ""
    });
  };

  getAsyncOptions = async query => {
    if (query) {
      const headers = { Authorization: this.props.token };
      const data = await axios.get(`/products?search=${query}`, { headers });
      const productsOptions = data.data.productsOptions;
      return this.filterProducts(productsOptions);
    }
  };

  filterProducts = data => {
    const products = data.filter(elem => elem.label);
    return products;
  };

  loadOptions = () => this.getAsyncOptions(this.state.inputValue);

  render() {
    const {
      selectedValue,
      quantityValue,
      isErrorVisible,
      errorMsg
    } = this.state;

    return (
      <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
        <div className={styles.search}>
          <div className={styles.searchSelect}>
            <AsyncSelect
              styles={customStyles}
              cacheOptions
              loadOptions={this.loadOptions}
              defaultOptions
              onInputChange={this.handleInputSelect}
              onChange={this.handleSelectChange}
              value={selectedValue}
              className={styles.asyncSelect}
              placeholder="Введите название продукта"
              noOptionsMessage={() => "Продукт не найден" || null}
            />
          </div>
          <div className={styles.searchInput}>
            <input
              type="text"
              name="quantityValue"
              onChange={this.handleChange}
              value={quantityValue}
              autoComplete="off"
              placeholder="граммы"
            />
          </div>
          <div className={styles.searchBtn}>
            <button type="submit" className={styles.addBtn}>
              {this.props.text === true ? "Добавить" : "+"}
            </button>
          </div>
        </div>
        <CSSTransition
          in={isErrorVisible}
          timeout={2000}
          classNames={opacityWithShakeTransition}
          unmountOnExit
        >
          <p className={styles.errorNotification}>{errorMsg}</p>
        </CSSTransition>
      </form>
    );
  }
}

export default AddProduct;
