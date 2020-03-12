import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Diary from "../../components/diary-block/DiaryBlock";
import CalcForm from "../../components/calcForm/CalcFormContainer";
import Achievements from "../../components/achievements/Achievements";
import styles from "./DashboardPage.module.css";
import Summary from "../../components/summary/Summary"

class DashboardContainer extends Component {
  render() {
    return (
      <>
        <div className={styles.DashboardContainer}>
          <Switch>
            <Route path="/diary" component={Diary} />
            <Route path="/calculator" component={CalcForm} />
            <Route path="/achievements" component={Achievements} />
          </Switch>
        </div>
      </>
    );
  }
}

export default DashboardContainer;
