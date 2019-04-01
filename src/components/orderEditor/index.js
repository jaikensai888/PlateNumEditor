import React from 'react';
import {
    Editor,
    EditorState
} from 'draft-js';

class OrderEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(editorState) {
        console.log(editorState.currentContent);
        this.setState({
            editorState
        })
    }
    render() {
        return (<Editor editorState={
            this.state.editorState
        }
            onChange={
                this.onChange
            }
        />
        );
    }
}

export default OrderEditor;