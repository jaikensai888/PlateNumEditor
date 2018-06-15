import React from "react";
import {
  Editor,
  EditorState,
  DefaultDraftBlockRenderMap,
  RichUtils
} from "draft-js";
import "./style.css";
import Immutable from "immutable";
import ActionControl from "./actionControl";
import InfoControl from "./InfoControl";
import { VehicleMatch } from "../../lib/recognizer";
import Block from "./block";
import Tag from "./tag";
// const blockRenderMap = Immutable.Map({
//   recognize: {
//     element: "section",
//     wrapper: Block
//   }
// });

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  console.log("myBlockRender", type);
  if (type === type) {
    return { component: Block, editable: false };
    // props: {
    //   foo: "bar"
    // }
  }
}
// const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

class VehicleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO:EditorState Type
      editorState: EditorState.createEmpty(),
      infoState: { vehicleInfo: [] }
    };
    this.onChange = this.onChange.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
  }
  toggleBlockType(blockType) {
    console.log(blockType);
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  onChange(editorState) {
    this.state.infoState.vehicleInfo = VehicleMatch(
      editorState.getCurrentContent().getPlainText(),
      "车牌",
      "车架号"
    );
    this.state.editorState = editorState;
    this.setState(this.state);
  }
  toggleInfoTag(params) {
    console.log(params);
  }

  render() {
    return (
      <div className="RichEditor-root">
        <InfoControl
          infoState={this.state.infoState}
          onToggle={this.toggleInfoTag}
        />
        <ActionControl
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <div className="RichEditor-editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            // blockRenderMap={extendedBlockRenderMap}
            blockRendererFn={myBlockRenderer}
          />
        </div>
      </div>
    );
  }
}
export default VehicleEditor;
