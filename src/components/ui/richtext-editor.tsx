"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] w-full animate-pulse rounded-md border bg-muted" />
  ),
});

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "link",
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập nội dung...",
  className,
  disabled = false,
}: RichTextEditorProps) {
  const quillModules = useMemo(() => modules, []);

  return (
    <div
      className={cn(
        "richtext-editor",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        modules={quillModules}
        formats={formats}
        readOnly={disabled}
      />
    </div>
  );
}
