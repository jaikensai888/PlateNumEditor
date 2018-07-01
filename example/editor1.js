import React, { Component } from "react";
import { VehicleEditor } from "../index";

class Editor1 extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(params) {
    console.log("index", params.getContent());
  }
  render() {
    return (
      <VehicleEditor
        defaultContent="粤x12345"
        selectedVehicle={["粤x12345"]}
        onChange={this.onChange}
        recognizerConfig={{
          车牌: true,
          车架号: true,
          新能源车牌: false,
          连号车牌: false
        }}
      />
    );
  }
}

export default Editor1;
