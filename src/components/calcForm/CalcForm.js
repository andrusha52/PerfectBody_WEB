import React from "react";
import styles from "./CalcForm.module.css";
import Summary from "../summary/Summary";

const CalcForm = ({ onSubmit, onChange, location, state }) => {
  const { height, age, currentWeight, futureWeight, groupBlood } = state;
  return (
    <>
      {location === "/calculator" ? (
        <>
          <div className={styles.DashboardContainer}>
            <div className={styles.calculatorWrapper}>
              <h2 className={styles.calculatorTitle}>
                Пересчитай свою суточную норму каллорий
              </h2>
              <form className={styles.inputForm} onSubmit={onSubmit}>
                <div className={styles.innerWrapper}>
                  <div className={styles.inputFormLeft}>
                    <input
                      required
                      type="text"
                      className={styles.inputItem}
                      placeholder="Рост *"
                      name="height"
                      value={height}
                      onChange={onChange}
                      autoComplete="off"
                    />
                    <input
                      required
                      type="Text"
                      className={styles.inputItem}
                      placeholder="Возраст *"
                      name="age"
                      value={age}
                      onChange={onChange}
                      autoComplete="off"
                    />
                    <input
                      required
                      type="Text"
                      className={styles.inputItem}
                      placeholder="Текущий вес *"
                      name="currentWeight"
                      value={currentWeight}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className={styles.inputFormRight}>
                    <input
                      type="Text"
                      required
                      className={styles.inputItem}
                      placeholder="Желаемый вес *"
                      name="futureWeight"
                      value={futureWeight}
                      onChange={onChange}
                      autoComplete="off"
                    />
                    <select
                      required
                      name="groupBlood"
                      value={groupBlood}
                      className={styles.selectInput}
                      onChange={onChange}
                      autoComplete="off"
                    >
                      <option className={styles.option}>Группа крови</option>
                      <option className={styles.option}>1</option>
                      <option className={styles.option}>2</option>
                      <option className={styles.option}>3</option>
                      <option className={styles.option}>4</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className={styles.sbmtBtn}>
                  Похудеть
                </button>
              </form>
            </div>
            <Summary />
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.calkformTitle}>
            Просчитай свою суточную норму каллорий прямо сейчас
          </h2>
          <form className={styles.inputForm} onSubmit={onSubmit}>
            <div className={styles.innerWrapper}>
              <div className={styles.inputFormLeft}>
                <input
                  required
                  type="text"
                  className={styles.inputItem}
                  placeholder="Рост *"
                  name="height"
                  value={height}
                  onChange={onChange}
                  autoComplete="off"
                />
                <input
                  required
                  type="Text"
                  className={styles.inputItem}
                  placeholder="Возраст *"
                  name="age"
                  value={age}
                  onChange={onChange}
                  autoComplete="off"
                />
                <input
                  required
                  type="Text"
                  className={styles.inputItem}
                  placeholder="Текущий вес *"
                  name="currentWeight"
                  value={currentWeight}
                  onChange={onChange}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputFormRight}>
                <input
                  type="Text"
                  required
                  className={styles.inputItem}
                  placeholder="Желаемый вес *"
                  name="futureWeight"
                  value={futureWeight}
                  onChange={onChange}
                  autoComplete="off"
                />
                <select
                  required
                  name="groupBlood"
                  value={groupBlood}
                  className={styles.selectInput}
                  onChange={onChange}
                  autoComplete="off"
                >
                  <option className={styles.option}>Группа крови</option>
                  <option className={styles.option}>1</option>
                  <option className={styles.option}>2</option>
                  <option className={styles.option}>3</option>
                  <option className={styles.option}>4</option>
                </select>
              </div>
            </div>
            <button type="submit" className={styles.sbmtBtn}>
              Похудеть
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default CalcForm;
