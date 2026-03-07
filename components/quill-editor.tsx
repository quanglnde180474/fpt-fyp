"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link"],
  ["clean"],
];

export function QuillEditor({
  name,
  initialValue = "",
  onChange,
}: {
  name: string;
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);

  function handleChange(val: string) {
    setValue(val);
    onChange?.(val);
  }

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <div className="quill-wrapper rounded-md overflow-hidden">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={{ toolbar: TOOLBAR }}
          className="min-h-70"
        />
      </div>
    </>
  );
}
