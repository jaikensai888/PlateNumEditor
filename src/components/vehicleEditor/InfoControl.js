import React from "react";
import PropTypes from "prop-types";
import Tag from "./tag";

const InfoControl = props => {
  let vehicle = props.infoState.vehicle;
  let ignoreVehicle = props.infoState.ignoreVehicle;
  return (
    <div className="RichEditor_InfoControl">
      {vehicle.map(item => {
        return (
          <Tag
            ignore={ignoreVehicle.length > 0 && ignoreVehicle.includes(item)}
            key={"tag_" + item}
            onClick={toIgnore => {
              const actionName = toIgnore ? "ignoreVehicle" : "unIgnoreVehicle";
              props.onClick(actionName, item);
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
  onClick: PropTypes.func
};

export default InfoControl;
