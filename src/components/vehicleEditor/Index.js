import React from "react";
import PropTypes from "prop-types";
import { Editor, EditorState } from "draft-js";
import "./style.css";
import InfoControl from "./InfoControl";
import { RegMatch, RegRule } from "../../lib/recognizer";
import { ArrayExtension } from "../../lib/arrayExtension";
class VehicleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      infoState: {
        vehicle: [], //所有的车辆
        ignoreVehicle: [] //需要忽略的车辆
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onClickInfoCtrl = this.onClickInfoCtrl.bind(this);
    this.onExtraChange = this.onExtraChange.bind(this);
  }
  //外部方法
  onExtraChange() {
    const object = {
      content: this.state.editorState.getCurrentContent().getPlainText(),
      vehicle: this.state.infoState.vehicle.excludes(
        this.state.infoState.ignoreVehicle
      )
    };
    this.props.onChange(object);
  }
  onChange(editorState) {
    this.state.infoState.vehicle = RegMatch(
      editorState.getCurrentContent().getPlainText(),
      RegRule.vehicle.车牌,
      RegRule.vehicle.车架号
    );
    this.state.editorState = editorState;
    this.setState(this.state);
    this.onExtraChange();
  }
  onClickInfoCtrl(actionName, params) {
    switch (actionName) {
      case "ignoreVehicle":
        this.state.infoState.ignoreVehicle = [
          ...this.state.infoState.ignoreVehicle,
          params
        ];
        break;
      case "unIgnoreVehicle":
        var index = this.state.infoState.ignoreVehicle.findIndex(x => {
          return x == params;
        });
        this.state.infoState.ignoreVehicle.splice(index, 1);
        break;
      default:
        console.log(actionName + " handler is not define ");
        break;
    }
    this.setState(this.state);
    this.onExtraChange();
  }

  render() {
    return (
      <div className="RichEditor-root">
        <InfoControl
          infoState={this.state.infoState}
          onClick={this.onClickInfoCtrl}
        />
        <div className="RichEditor-editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
VehicleEditor.propTypes = {
  onChange: PropTypes.func
};

export default VehicleEditor;
