import Image from "next/image";
import React from "react";

interface Step {
  image: any;
  title: string;
  status: number;
}

interface HorizontalThirtPartyStepperProps {
  steps: Step[];
  activeStep: number;
}

const ThirdPartyStepper: React.FC<HorizontalThirtPartyStepperProps> = ({
  steps,
  activeStep,
}) => {
  console.log("steps", steps);
  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* {index > 0 && <div className=" bg-gray-400 w-[90%] h-2 absolute"></div>}
        <div>
        <Image
            src={step.image} // Render the image
            alt={`Step ${index + 1}`}
            className="h-8 w-8 mr-2"
        />
        <div
            className={`rounded-full h-6 w-6 flex items-center justify-center border ${
            index === activeStep
                ? "bg-blue-600 border-blue-600 animate-pulse"
                : "border-gray-400"
            }`}
        ></div>
        </div> */}

          {index > 0 && <div className=" bg-gray-400 w-[100%] h-2"></div>}
          <div className="mb-8 relative">
            <Image
              src={step.image} // Render the image
              alt={`Step ${index + 1}`}
              className="h-8 w-14"
            />
            <div
              className={`rounded-full h-6 w-6 flex items-center justify-center border absolute top-5 ${
                index === activeStep
                  ? "bg-blue-600 border-blue-600 animate-pulse"
                  : "border-gray-400 bg-white"
              }`}
            ></div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ThirdPartyStepper;
