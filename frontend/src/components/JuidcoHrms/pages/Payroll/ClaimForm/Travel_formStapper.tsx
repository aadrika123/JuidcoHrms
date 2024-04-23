import HorizontalStepper from "@/components/Helpers/Widgets/Stepper";
import React from "react";

const Travel_form = (props: any) => {
  const { steps, trackClaim, statusBodyTemplate } = props;

  return (
    <>
      <div className="md:w-[99.9%] m-1 flex flex-col relative p-5 max-w-5px">
        <div className="mt-12">
          <HorizontalStepper steps={steps} activeStep={trackClaim?.status} />
          <div className="mt-2 px-2 flex items-center justify-between texy-xs text-secondary">
            <h2>Employee</h2>
            <h2>Manager-1</h2>
            <h2>Manager-2</h2>
            <h2>Manager-3</h2>
          </div>
        </div>
        <br />
        <span className="text-sm">Type of Claim- {trackClaim?.claimType}</span>
        <span className="text-sm">Date of Claim- {trackClaim?.createdAt}</span>
        <span className="text-sm">
          Total amount of Claim- {trackClaim?.totalAmount}
        </span>
        <span className="text-sm">
          Status of Claim- {statusBodyTemplate(trackClaim)}
        </span>
      </div>
    </>
  );
};

export default Travel_form;
