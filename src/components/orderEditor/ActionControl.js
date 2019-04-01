import React from "react";
import PropTypes from "prop-types";
import StyleButton from "./styleButton";

const ActionControl = props => {
  const BLOCK_TYPES = [
    { label: "公司", style: "company" },
    { label: "客户", style: "client" },
    { label: "联系人", style: "content" },
    { label: "服务时长", style: "recognize" },
];
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

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

ActionControl.propTypes = {
  editorState: PropTypes.object,
  onToggle: PropTypes.func
};

export default ActionControl;
