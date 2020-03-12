import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getTotalUsedCalories,
  getDate
} from "../../redux/calcForm/calcFormActions";
import AddProduct from "./add-product/AddProduct";
import AddProductModal from "./add-product-modal/addProductModal";
import DiaryList from "./diary-list/DiaryList";
import Summary from "../summary/Summary";
import axios from "axios";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import "moment/locale/ru";
import styles from "./DiaryBlock.module.css";
import "react-day-picker/lib/style.css";
import calendarIcon from "./baseline_date_range_black_24dp.png";
import { appContext } from "../App";
import WithAuthRedirect from "../hoc/WithAuthRedirect";

axios.defaults.baseURL = "https://slim-moms.goit.co.ua/api/v1";

const customStyles = {
  border: "none",
  fontSize: "18px",
  fontWeight: 700,
  width: "120px",
  cursor: "pointer",
  outline: "none",
  background: `url(${calendarIcon})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "20px 20px",
  backgroundPosition: "top right"
};

class DiaryBlock extends Component {
  state = {
    selectedDay: moment().toISOString(),
    products: [],
    caloriesSumm: null,
    modal: false,
    isOpen: true
  };

  getFetchData = async () => {
    const headers = { Authorization: this.props.token };
    const data = await axios.get(`/user/eats/${this.state.selectedDay}`, {
      headers
    });
    this.setState({
      products: data.data.products.reverse()
    });
    this.getCaloriesSumm();
  };

  handleDayChange = async selectedDay => {
    const date = moment(selectedDay).toISOString();
    this.setState({ selectedDay: date }, () => {
      this.getFetchData();
      this.props.getDate(this.state.selectedDay);
    });
  };

  async componentDidMount() {
    const headers = { Authorization: this.props.token };
    const data = await axios.get(`/user/eats/${moment().format()}`, {
      headers
    });
    this.setState({
      products: data.data.products.reverse()
    });
    this.getCaloriesSumm();
    const date = moment().toISOString();
    this.props.getDate(date);
  }

  deleteProduct = id => {
    const headers = { Authorization: this.props.token };
    axios
      .delete(`/user/eats/${id}`, { headers })
      .then(response => {
        if (response.data.status === "success") {
          this.setState(prev => ({
            products: prev.products.filter(elem => elem._id !== id)
          }));
          this.getCaloriesSumm();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getCaloriesSumm = () => {
    const { products } = this.state;
    const calSum = products.reduce(
      (totalCal, product) => totalCal + product.calories,
      0
    );
    this.setState({
      caloriesSumm: Math.round(calSum)
    });
    this.props.getTotalUsedCalories(this.state.caloriesSumm);
  };

  getUpdateProducts = async () => {
    const headers = { Authorization: this.props.token };
    const data = await axios.get(`/user/eats/${this.state.selectedDay}`, {
      headers
    });
    this.setState({
      products: data.data.products.reverse()
    });
    this.getCaloriesSumm();
  };

  showModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  // componentWillUnmount() {

  // }

  render() {
    const { selectedDay, products, modal } = this.state;

    return (
      <appContext.Consumer>
        {({ isMobile }) => (
          <>
            <div className={styles.DashboardContainer}>
              <div className={styles.diaryContainer}>
                {!modal && (
                  <div className={styles.dayPickerInputContainer}>
                    <DayPickerInput
                      className={styles.dayPickerInput}
                      inputProps={{ style: customStyles }}
                      value={moment(selectedDay).format("L")}
                      onDayChange={this.handleDayChange}
                      formatDate={formatDate}
                      parseDate={parseDate}
                      dayPickerProps={{
                        locale: "ru",
                        localeUtils: MomentLocaleUtils
                      }}
                    />
                  </div>
                )}
                {!isMobile && (
                  <div className={styles.addProductContainer}>
                    <AddProduct
                      getUpdateProducts={this.getUpdateProducts}
                      token={this.props.token}
                      selectedDay={selectedDay}
                      isMobile={isMobile}
                      showModal={this.showModal}
                    />
                  </div>
                )}
                {!modal && (
                  <>
                    {products.length === 0 && (
                      <p className={styles.noProducts}>
                        Здесь будет отображаться Ваш рацион
                      </p>
                    )}

                    <DiaryList
                      productsList={products}
                      deleteProduct={this.deleteProduct}
                    />
                  </>
                )}
              </div>
              {isMobile && (
                <>
                  {modal && (
                    <AddProductModal showModal={this.showModal}>
                      <AddProduct
                        stylestyle={{ backround: "red" }}
                        text={isMobile}
                        {...this.props}
                        getUpdateProducts={this.getUpdateProducts}
                        token={this.props.token}
                        selectedDay={selectedDay}
                        isMobile={isMobile}
                        showModal={this.showModal}
                      />
                    </AddProductModal>
                  )}
                  {!modal && (
                    <div className={styles.searchBtn}>
                      <button type="button" onClick={this.showModal}>
                        &#43;
                      </button>
                    </div>
                  )}
                </>
              )}
              <Summary />
            </div>
          </>
        )}
      </appContext.Consumer>
    );
  }
}
const mapStateToProps = state => ({
  token: state.session.token
});

const mapDispatchToProps = {
  getTotalUsedCalories,
  getDate
};

export default WithAuthRedirect(
  connect(mapStateToProps, mapDispatchToProps)(DiaryBlock)
);
