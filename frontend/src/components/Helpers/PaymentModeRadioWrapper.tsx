import React from "react";
interface PaymentModeRadioWrapperProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

const PaymentModeRadioWrapper: React.FC<PaymentModeRadioWrapperProps> = ({
  children,
  label,
  className,
}) => {
  return (
    <>
      <label
        className={`mb-2 text-secondary text-sm ${className}`}
        htmlFor="browser"
      >
        {label}
      </label>
      {children}
    </>
  );
};

export default PaymentModeRadioWrapper;
