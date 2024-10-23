import React from "react";
import { Box, Tooltip } from "@mui/material";

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

  function truncateString(str: string) {
    if (str?.length > 5) {
      return str.substring(0, 8) + '...';
    }
    return str;
  }

  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <div className="flex flex-col justify-end items-end w-full">
              <div className={` ${index === 0 ? '' : 'bg-gray-400 w-[25%] h-[0.5px]'} w-full`}></div>
              {/* <Tooltip title={step?.title}><p className="text-[0.8rem]">{truncateString(step?.title)}</p></Tooltip> */}
            </div>
          )}
          <div className="flex flex-col justify-center items-center">
            <p aria-disabled className="text-[0.8rem] opacity-0">a</p>
            <Box
              component={'div'}
              sx={{
                aspectRatio: 1 / 1
              }}
              className={`rounded-full w-6 flex items-center justify-center border ${index === activeStep
                ? "bg-blue-600 border-blue-600 animate-pulse"
                : "border-gray-400"
                }`}
            />
            <Tooltip title={step?.title}><p className=" text-[0.8rem] overflow-visible max-w-4 max-h-4 whitespace-nowrap">{truncateString(step?.title)}</p></Tooltip>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default HorizontalStepper;
