import React from "react";

interface Step {
  title: string;
}

interface HorizontalStepperProps {
  steps: Step[];
  activeStep: number;
}

const HorizontalStepperPension: React.FC<HorizontalStepperProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className=" bg-gray-400 w-[25%] h-[0.5px]"></div>}
          <div
            className={`rounded-full h-6 w-10 flex items-center justify-center border ${
              index === activeStep
                ? "bg-primary_blue border-primary_blue animate-pulse"
                : "border-primary_blue"
            }`}
          ></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default HorizontalStepperPension;
