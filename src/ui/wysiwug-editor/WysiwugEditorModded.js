import React, { forwardRef, useState, useImperativeHandle } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
//css
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./WysiwugEditorModded.module.css";

const WysiwugEditorModded = forwardRef((props, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (value) => {
    setEditorState(value);
  };

  const onContentStateChange = (value) => {
    const editor = {
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      hasText: editorState.getCurrentContent().hasText(),
    };
    props.onContentStateChange(editor);
  };

  useImperativeHandle(ref, () => ({
    onResetHandler() {
      setEditorState(EditorState.createEmpty());
    },
    onContentPresent(description) {
      var initState = EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(description))
      );
      setEditorState(initState);
    },
    onGetEditor() {
      const editor = {
        content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        hasText: editorState.getCurrentContent().hasText(),
      };
      return editor;
    },
  }));

  return (
    <div className={classes.wrapper}>
      <Editor
        editorState={editorState}
        wrapperClassName={classes["wrapper-class"]}
        toolbarClassName={classes["toolbar-class"]}
        editorClassName={classes["editor-class"]}
        onEditorStateChange={onEditorStateChange}
        onContentStateChange={onContentStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "remove",
            "history",
          ],
        }}
      />
    </div>
  );
});

export default WysiwugEditorModded;
