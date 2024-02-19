import React from "react";

interface CheckBoxProps {
  label: string;
  name: string;
  value?: string | boolean;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const fieldId = "id_" + props.name;
  return (
    <div className="flex items-center">
      <input
        onChange={props.onChange}
        onBlur={props.onBlur}
        // value={props.value}
        className={`mr-1 bg-white ${props.className}`}
        name={props.name}
        id={fieldId}
        type="checkbox"
      />
      <label htmlFor={fieldId}>{props.label}</label>
      {props.touched && props.error && (
        <div className="text-red-500">{props.error}</div>
      )}
    </div>
  );
};

export default CheckBox;
