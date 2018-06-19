import React from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, CompositeDecorator } from "draft-js";
import "./style.css";
import InfoControl from "./InfoControl";
import { RegMatch, RegRule, LinkRegMatch } from "../../lib/recognizer";
import { ArrayExtension } from "../../lib/arrayExtension";
import { CreateDecorator } from "../../lib/draftExtension.decoratorFactory";
const style = {};
class VehicleEditor extends React.Component {
  constructor(props) {
    super(props);
    //TODO:不能重复
    const preStrategy = [
      { regex: RegRule.vehicle.车牌, style: { color: "red" } }
      // {
      //   regex: RegRule.vehicle.连号车牌,
      //   style: { borderBottom: "1px solid red" }
      // }
    ];
    this.state = {
      editorState: EditorState.createEmpty(
        CreateDecorator("span", preStrategy)
      ),
      infoState: { vehicle: [], ignoreVehicle: [] }
    }; //所有的车辆 //需要忽略的车辆

    this.onChange = this.onChange.bind(this);
    this.onClickInfoCtrl = this.onClickInfoCtrl.bind(this);
    this.onExtraChange = this.onExtraChange.bind(this);
  }
  //外部方法
  onExtraChange() {
    let me = this;
    const object = {
      getContent: () => {
        return me.state.editorState.getCurrentContent().getPlainText();
      },
      getSelectedVehicle: () => {
        return me.state.infoState.vehicle.excludes(
          me.state.infoState.ignoreVehicle
        );
      },
      getIgnoreVehicle: () => {
        return me.state.infoState.ignoreVehicle;
      },
      getVehicle: () => {
        return me.state.infoState.vehicle;
      }
    };
    this.props.onChange(object);
  }
  //editor内容修改
  onChange(editorState) {
    this.state.infoState.vehicle = RegMatch(
      editorState.getCurrentContent().getPlainText(),
      RegRule.vehicle.车牌,
      RegRule.vehicle.车架号
    ).distinctConcat(
      LinkRegMatch(
        editorState.getCurrentContent().getPlainText(),
        RegRule.vehicle.连号车牌
      )
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
            placeholder={this.props.placeholder}
          />
        </div>
      </div>
    );
  }
}
VehicleEditor.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default VehicleEditor;
