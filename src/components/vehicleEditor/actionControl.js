import React from "react";
import PropTypes from "prop-types";
import StyleButton from "./styleButton";

const ActionStyleControl = props => {
  const BLOCK_TYPES = [{ label: "识别", style: "recognize" }];
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  // console.log(blockType);

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

ActionStyleControl.propTypes = {
  editorState: PropTypes.object,
  onToggle: PropTypes.func
};

export default ActionStyleControl;
