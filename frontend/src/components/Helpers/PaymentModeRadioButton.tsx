import React from "react";
import RadioButton from "./RadioButton";

interface RadioButtonProps {
  label: React.ReactNode;
  name: string;
  value: number | string;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const PaymentModeRadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    <div>
      <div className="flex gap-5">
        {/* <RadioButton name={props.name} label="Cash" id="radio1" />
      <RadioButton name={props.name} label="Cheque" id="radio2" />
      <RadioButton name={props.name} label="NFT/RTGS" id="radio3" /> */}
        <RadioButton
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          error={props.error}
          touched={props.touched}
          name={props.name}
          label="Cash"
          id="radio1"
        />
        <RadioButton
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          error={props.error}
          touched={props.touched}
          name={props.name}
          label="Cheque"
          id="radio2"
        />
        <RadioButton
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          error={props.error}
          touched={props.touched}
          name={props.name}
          label="NFT/RTGS"
          id="radio3"
        />
      </div>
      {props.touched && props.error && (
        <div className="text-red-500">{props.error}</div>
      )}
    </div>
  );
};

export default PaymentModeRadioButton;
