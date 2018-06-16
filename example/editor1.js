import React, { Component } from "react";
import VehicleEditor from "../lib/components/vehicleEditor";

class Editor1 extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(params) {
    console.log("index", params);
  }
  render() {
    return <VehicleEditor onChange={this.onChange} />;
  }
}

export default Editor1;
