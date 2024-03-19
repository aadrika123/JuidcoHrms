import React from "react";
import Image from "next/image";
import PrimaryButton from "../Button";
import goBack from "@/utils/helper";
const BackButton = () => {
  return (
    <div className="flex items-center">
      <PrimaryButton
        buttonType="button"
        variant={"cancel"}
        onClick={goBack}
        className="border-0 bg-transparent hover:bg-transparent hover:text-[#3592FF] flex items-center"
      >
        <i>
          <Image
            src="/svg/icons/back-arrow.svg"
            alt="back-arrow"
            width={25}
            height={22}
          />
        </i>
        Back
      </PrimaryButton>
    </div>
  );
};

export default BackButton;
