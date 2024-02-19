import React from "react";

interface RadioButtonProps {
  label: string;
  id: string;
  name: string;
  value: number | string;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const fieldId = "id_" + props.id;

  return (
    <div className="flex items-center">
      <input
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.label}
        className={`mr-1 bg-white ${props.className}`}
        name={props.name}
        id={fieldId}
        type="radio"
      />
      <label htmlFor={fieldId}>{props.label}</label>
    </div>
  );
};

export default RadioButton;
