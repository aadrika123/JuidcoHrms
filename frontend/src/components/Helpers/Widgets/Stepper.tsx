import React from "react";

interface Step {
  title: string;
}

interface HorizontalStepperProps {
  steps: Step[];
  activeStep: number;
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className=" bg-gray-400 w-[25%] h-[0.5px]"></div>}
          <div
            className={`rounded-full h-6 w-6 flex items-center justify-center border ${
              index === activeStep
                ? "bg-blue-600 border-blue-600 animate-pulse"
                : "border-gray-400"
            }`}
          ></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default HorizontalStepper;
