import React from "react";

interface RadioButtonSetProps {
  label: React.ReactNode;
  name: string;
  value: string | number;
  error?: string | undefined;
  touched?: boolean | undefined;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const PaymentModeRadioButtonSet: React.FC<RadioButtonSetProps> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor="browser">
          {props.label}
        </label>
        <div className="grid grid-cols-4 gap-x-6 gap-4 ">
        <div>
          <input
            type="radio"
            placeholder="text"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            className="text-primary p-3 rounded-lg border bg-transparent border-zinc-400"
            list="browsers"
            name={props.name}
            id="radio1"
          />
          <label htmlFor="radio1"> Cash</label>
        </div>
        <div>
          <input
            type="radio"
            placeholder="text"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            className="text-primary p-3 rounded-lg border bg-transparent border-zinc-400"
            list="browsers"
            name={props.name}
            id="radio2"
          />
          <label htmlFor="radio1"> Cheque</label>
        
        </div>
        <div>
          <input
            type="radio"
            placeholder="text"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            className="text-primary p-3 rounded-lg border bg-transparent border-zinc-400"
            list="browsers"
            name={props.name}
            id="radio3"
          />
          <label htmlFor="radio1"> Direct Bank</label>
        
        </div>
        <div>
          <input
            type="radio"
            placeholder="text"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            className="text-primary p-3 rounded-lg border bg-transparent border-zinc-400"
            list="browsers"
            name={props.name}
            id="radio4"
          />
          <label htmlFor="radio1"> DD</label>
        
        </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModeRadioButtonSet;
