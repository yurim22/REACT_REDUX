import React from "react";
import { connect } from "react-redux";
import {Palette} from "../components/Palette";
import { changeColor } from "../store/modules/counter";

// props로 넣어줄 스토어 상태값
const mapStateToProps = (state) => ({
  color: state.counter.color,
});

// props로 넣어줄 액션생성함수
const mapDispatchToProps = (dispatch) => ({
  changeColor: (color) => dispatch(changeColor(color)),
});

const PaletteContainer = (props) => {
  // 위의 두 함수를 통해 생성된 props
  const { changeColor, color } = props;
  console.log(props);
  // 결과
  // {color: "red", changeColor: ƒ changeColor()}
  const handleSelect = (color) => {
    console.log("what");
    changeColor(color);
  };

  return <Palette onSelect={handleSelect} selected={color} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(PaletteContainer);
