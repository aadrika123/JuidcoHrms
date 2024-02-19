import React from "react";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- CheckBox Field
 * | Status- done
 */

interface CheckboxProps {
  label?: string;
  name: string;
  readonly?: boolean;
  placeholder?: string | "";
  value?: string | number;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Checkboxes: React.FC<CheckboxProps> = (props) => {
  const { label, name, ...rest } = props;
  const fieldId = "id_" + name;

  return (
    <div>
      <div className="flex items-center">
        <input disabled={props.readonly} checked={props.value? true: false} className="mr-1" name={name} type="checkbox" id={fieldId} 
        {...rest}
        />
        <label className="text-secondary text-sm" htmlFor={fieldId}>{label}</label>
      </div>
      {props.touched && props.error && (
        <div className="text-red-500">{props.error}</div>
      )}
    </div>
  );
};

export default Checkboxes;
