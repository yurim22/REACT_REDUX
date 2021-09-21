import React from "react";
import { connect } from "react-redux";
import { Counter } from "../components/Counter";
import { bindActionCreators } from "redux";
import { increment, decrement } from '../store/modules/counter';

const CounterContainer = (props) => {
  const { color, number, increment, decrement } = props;

  const handleIncrement = () => {
    increment();
  };
  const handleDecrement = () => {
    decrement();
  };
  return (
    <Counter
      color={color}
      number={number}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
};

const mapStateToProps = ({ counter }) => ({
  color: counter.color,
  number: counter.number,
});

// const mapDispatchToProps = { increment, decrement };
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ increment, decrement }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
