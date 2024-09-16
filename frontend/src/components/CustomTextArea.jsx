import React, { useState, useRef, useEffect } from "react";

export default function CustomTextArea({
  contentType,
  placeholder,
  className,
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        adjustHeight();
      }}
      placeholder={placeholder}
      className={`write-blog-textarea ${contentType} ${className}`}
    />
  );
}
