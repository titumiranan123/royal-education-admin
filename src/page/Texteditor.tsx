import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const TextEditor: React.FC = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const placeholder = "Start typing...";
console.log(content)
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      placeholder: placeholder,
    }),
    [placeholder]
  );

  return (
    <div className="bg-white flex max-w-[1440px] mx-auto">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}

        onBlur={(newContent) => setContent(newContent)} // optional: update on blur
        onChange={(newContent) => setContent(newContent)} // track content change in real-time
      />
      <div className="mt-4 w-1/2">
        <h3>Live Preview:</h3>
        <div
          className="p-4 border border-gray-300 bg-gray-50 rounded"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
