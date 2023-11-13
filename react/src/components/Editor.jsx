import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorT = ({ value, onChange }) => {
  const handleEditorChange = (content, editor) => {
    onChange(content);
  };

  return (
    <Editor
      initialValue={value}
      apiKey="ugd03c161mxv60iszvsmvwzlc6qklpuka0vhpf57zz6ncf2u"
      init={{
        height: 500,
        language: "es",
        autoresize_bottom_margin: 20,
        setup: (editor) => {
          editor.on("change", () => {
            handleEditorChange(editor.getContent(), editor);
          });
        },
      }}
    />
  );
};

export default EditorT;
