import React from "react";
import PropTypes from "prop-types";
import Tag from "./tag";

const InfoControl = props => {
  let vehicleInfo = props.infoState.vehicleInfo;
  return (
    <div className="RichEditor_InfoControl">
      {vehicleInfo.map(item => {
        return (
          <Tag
            key={"tag_" + item}
            closable
            onClose={e => {
              props.onToggle(item);
            }}
          >
            {item}
          </Tag>
        );
      })}
    </div>
  );
};

InfoControl.propTypes = {
  infoState: PropTypes.object,
  onToggle: PropTypes.func
};

export default InfoControl;
