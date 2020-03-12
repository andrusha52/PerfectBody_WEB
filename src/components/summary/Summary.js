import React from "react";
import { connect } from "react-redux";
import css from "./Summary.module.css";
import moment from "moment";

// const data = {
//   consumed: 722
// };

const Summary = ({ calcForm }) => {
  const { calories, usedCalories, dangerProducts } = calcForm;
  return (
    <>
      <div className={css.sectionSummary}>
        <div className={css.blockSummary}>
          <div className={css.blockProgres}>
            <p className={css.title}>
              Сводка за <span>{moment(calcForm.date).format("L")}</span>
            </p>
            <ul className={css.listProgress}>
              <li className={css.progressItem}>
                {calories ? (
                  calories - usedCalories >= 0 ? (
                    <span>Осталось</span>
                  ) : (
                    <span>Перебор</span>
                  )
                ) : (
                  <span>Осталось</span>
                )}
                {calories ? (
                  calories - usedCalories >= 0 ? (
                    <span> {calories - usedCalories} ккал</span>
                  ) : (
                    <span style={{ color: "#e70a0a94" }}>
                      {Math.abs((calories - usedCalories).toFixed(0))} ккал
                    </span>
                  )
                ) : (
                  <span> {calories - usedCalories} ккал</span>
                )}
              </li>
              <li className={css.progressItem}>
                <span>Употреблено</span>
                <span>{usedCalories} ккал</span>
              </li>
              <li className={css.progressItem}>
                <span>Дневная норма</span>
                <span>{calories} ккал</span>
              </li>
              <li className={css.progressItem}>
                <span>n% от нормы</span>
                {calories ? (
                  <span>{(usedCalories * (100 / calories)).toFixed(0)} %</span>
                ) : (
                  <span>0 %</span>
                )}
              </li>
            </ul>
          </div>
          <div className={css.blockProducts}>
            <p className={css.title}>Не рекомендуемые продукты :</p>
            <p className={css.products}>
              {dangerProducts ? dangerProducts[0].join(", ") : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  calcForm: state.calcForm
});

export default connect(mapStateToProps)(Summary);
