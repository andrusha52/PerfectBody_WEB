import React, { Component } from "react";
import data from "./quotesData";
import styles from "./Quote.module.css";
import { CSSTransition } from "react-transition-group";
import animation from "./quoteAnimation.module.css";

class Quote extends Component {
  carouselID = 0;

  state = {
    idx: 0,
    currentQuote: data[0],
    visible: false
  };

  componentDidMount() {
    const { idx } = this.state;
    this.setState({ currentQuote: data[idx + data.length - 1] });
    this.openNextQuote(data);
  }

  componentWillUnmount() {
    clearInterval(this.carouselID);
  }

  openNextQuote = arr => {
    this.carouselID = setInterval(() => {
      const { idx } = this.state;
      this.setState(prev => ({
        idx: prev.idx + 1,
        visible: true
      }));

      setTimeout(() => {
        this.setState(prev => ({
          visible: false,
          currentQuote: arr[idx]
        }));
      }, 1000);

      if (idx === arr.length - 1) {
        this.setState({ idx: 0 });
      }
    }, 7000);
  };

  render() {
    const { currentQuote, visible } = this.state;
    return (
      <CSSTransition in={visible} timeout={1000} classNames={animation}>
        <figure className={styles.quoteContainer}>
          <blockquote className={styles.quoteText}>
            <p>{`"${currentQuote.text}"`}</p>
          </blockquote>
          <figcaption className={styles.quoteAuthor}>
            {`(${currentQuote.autor})`}
          </figcaption>
        </figure>
      </CSSTransition>
    );
  }
}

export default Quote;
