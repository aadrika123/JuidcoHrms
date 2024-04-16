import React, { useState } from "react";

/**
 * | Author- Anjali Singh
 * | Created On- 10-04-2024
 * | Created for- Universal input box
 * | Status- open
 */

interface InputBoxWithFileUploadProps {
  label: React.ReactNode;
  name?: string;
  type?: string;
  isReadOnly?: boolean | false;
  placeholder?: string | "";
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
  // pattern?: string;
  onKeyPress?: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
  // onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFileChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBoxWithFileUpload: React.FC<InputBoxWithFileUploadProps> = (props) => {
  const fieldId = "id_" + props.name;
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }

    if (props.onFileChange) {
      props.onFileChange(e);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1 relative">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
        <input
          readOnly={props.isReadOnly}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onBlur={props.onBlur}
          type={props.type || "text"}
          value={props.value}
          className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
          // pattern={props.pattern || "[0-9]*"}
          maxLength={props.maxLength}
          // onKeyPress={(e) => props.onKeyPress && props.onKeyPress(e)}
          onKeyPress={(e) => props.onKeyPress && props.onKeyPress(e)}
          // onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
          disabled={props.disabled}
        />
          <input className="hidden" type="file" id={`${fieldId}__${props.name}`} name={props.name} onChange={handleFileChange} />
        <label htmlFor={`${fieldId}__${props.name}`} className="absolute top-8 right-3">
          <div style={{backgroundColor: "#969393", width: "2px", height: "25px", position: "absolute"}}></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 14 14" fill="none" style={{marginLeft: "10px", cursor: "pointer"}}>
            <path d="M6.41658 9.3335V4.57933L4.89992 6.096L4.08325 5.25016L6.99992 2.3335L9.91658 5.25016L9.09992 6.096L7.58325 4.57933V9.3335H6.41658ZM3.49992 11.6668C3.17909 11.6668 2.90453 11.5527 2.67625 11.3244C2.44797 11.0961 2.33364 10.8214 2.33325 10.5002V8.75016H3.49992V10.5002H10.4999V8.75016H11.6666V10.5002C11.6666 10.821 11.5524 11.0957 11.3242 11.3244C11.0959 11.5531 10.8211 11.6672 10.4999 11.6668H3.49992Z" fill="#969393"/>
          </svg>
        </label>
        {selectedFileName && (
          <div className="text-right"> {selectedFileName}</div>
        )}
        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default InputBoxWithFileUpload;
