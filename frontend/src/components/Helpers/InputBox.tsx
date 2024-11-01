import React, { useEffect } from "react";

/**
 * | Author- Sanjiv git
 * | Created On- 24-01-2025
 * | Created for- Universal input box
 * | Status- open
 */

interface InputBoxProps {
  label: React.ReactNode;
  name?: string;
  type?: string;
  isReadOnly?: boolean | false;
  placeholder?: string | "";
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void | any;
  onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
  // pattern?: string;
  onKeyPress?: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
  // onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  regEx?: RegExp;
  customError?: string,
  setFieldError?: (field: string, message: string) => void;
}

const InputBox: React.FC<InputBoxProps> = (props) => {
  const fieldId = "id_" + props.name;

  let errorMessage: string | undefined = props.error


  useEffect(() => {
    if (props.regEx) {
      const isInvalid = props.value && !RegExp(props.regEx).test(props.value as string);
      if (isInvalid) {
        errorMessage = props.customError;
        if (props.setFieldError && props.name) {
          props.setFieldError(props.name, props.customError || "Invalid input format");
        }
      }
    }
  }, [props.value, props.regEx, props.customError, props.setFieldError, props.name]);
  // if (props?.regEx) {
  //   const isValid = props.value && !props?.regEx.test(props.value as string);
  //   errorMessage = isValid ? props?.customError : props.error;
  // }

  return (
    <>
      <div className="flex flex-col gap-1">
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
          className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400 ${props.className} ${props.disabled && 'cursor-not-allowed'}`}
          name={props.name}
          id={fieldId}
          // pattern={props.pattern || "[0-9]*"}
          maxLength={props.maxLength}
          // onKeyPress={(e) => props.onKeyPress && props.onKeyPress(e)}
          onKeyPress={(e) => props.onKeyPress && props.onKeyPress(e)}
          // onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
          disabled={props.disabled}
        />

        {props.touched && props.error && (
          <div className="text-red-500">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

export default InputBox;
