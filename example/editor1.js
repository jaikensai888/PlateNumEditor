import React, {
  Component
} from "react";
import {
  VehicleEditor
} from "../src/index";

class Editor1 extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(params) {
    // console.log("index", params.getContent());
  }
  render() {
    return ( <
      VehicleEditor
      placeholder = "自动识别车牌号码"
      onChange = {
        this.onChange
      }
      recognizerConfig = {
        {
          车牌: true,
          车架号: false,
          新能源车牌: true,
          连号车牌: false
        }
      }/>
    );
  }
}

export default Editor1;