import React from "react";
import PropTypes from "prop-types";
import {
  Editor,
  EditorState,
  CompositeDecorator,
  ContentState
} from "draft-js";
import "./style.css";
import InfoControl from "./InfoControl";
import { RegMatch, RegRule, LinkRegMatch } from "../../lib/recognizer";
import { ArrayExtension } from "../../lib/arrayExtension";
import { CreateDecorator } from "../../lib/draftExtension.decoratorFactory";
const style = {};
class VehicleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.initRegRule = this.initRegRule.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickInfoCtrl = this.onClickInfoCtrl.bind(this);
    this.onExtraChange = this.onExtraChange.bind(this);

    this.initRegRule();

    let me = this;
    let defaultVehicle = RegMatch(
      props.defaultContent,
      ...me.regRule
    ).distinctConcat(
      props.recognizerConfig.连号车牌
        ? LinkRegMatch(
            editorState.getCurrentContent().getPlainText(),
            RegRule.vehicle.连号车牌
          )
        : []
    );
    let defaultIgnoreVehicle = defaultVehicle.excludes(props.selectedVehicle);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(props.defaultContent),
        CreateDecorator("span", me.preStrategy)
      ),
      infoState: {
        vehicle: defaultVehicle,
        ignoreVehicle: defaultIgnoreVehicle
      }
    }; //所有的车辆 //需要忽略的车辆
  }
  initRegRule() {
    let me = this,
      config = this.props.recognizerConfig;
    me.preStrategy = [];
    me.regRule = [];
    for (const key in config) {
      if (config[key]) {
        if (!RegRule.vehicle[key]) {
          return;
        }
        let regex = RegRule.vehicle[key];
        me.regRule.push(regex);
        const reg = me.preStrategy.push({
          regex: regex,
          style: { color: "red" }
        });
      }
    }
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
    let me = this;
    this.state.infoState.vehicle = RegMatch(
      editorState.getCurrentContent().getPlainText(),
      ...me.regRule
    ).distinctConcat(
      me.props.recognizerConfig.连号车牌
        ? LinkRegMatch(
            editorState.getCurrentContent().getPlainText(),
            RegRule.vehicle.连号车牌
          )
        : []
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
  selectedVehicle: PropTypes.array,
  defaultContent: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};
VehicleEditor.defaultProps = {
  selectedVehicle: [],
  defaultContent: "",
  recognizerConfig: {
    车牌: true,
    车架号: true,
    新能源车牌: false,
    连号车牌: false
  }
};
export default VehicleEditor;
