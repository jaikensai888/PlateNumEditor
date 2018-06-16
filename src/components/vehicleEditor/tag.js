import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import check from "./images/check-blue.png";
import uncheck from "./images/check-grep.png";
const Tag = props => {
  return (
    <div
      className="RichEditor-tag"
      onClick={() => props.onClick(!props.ignore)}
    >
      <span className="RichEditor-span">{props.children}</span>
      <img className="RichEditor-img" src={props.ignore ? uncheck : check} />
    </div>
  );
};

Tag.propTypes = {
  ignore: PropTypes.bool,
  onClick: PropTypes.func
};

export default Tag;
