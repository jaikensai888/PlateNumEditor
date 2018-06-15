import React from "react";
import PropTypes from "prop-types";
import "./style.css";
const Tag = props => {
  return (
    <div className="RichEditor-tag">
      {props.children}
      {props.closable ? (
        <i className="RichEditor-closeIcon" onClick={props.onClose} />
      ) : null}
    </div>
  );
};

Tag.propTypes = {
  closable: PropTypes.bool,
  onClose: PropTypes.func
};

export default Tag;
