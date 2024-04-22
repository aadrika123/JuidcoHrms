import React from "react";
import { Heading } from "../atoms/Heading";
import Button from "../atoms/Button";

interface PopupProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactHTMLElement<HTMLSpanElement>;
  closeModal?: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, title, closeModal }) => {
  return (
    <div className=" w-full rounded-lg h-auto backdrop-blur-lg bg-white border shadow-lg flex flex-col  p-5">
      <Heading>{title}</Heading>
      <div className="flex flex-col w-full gap-5 mt-5">{children}</div>
      {closeModal && (
        <div className="w-full mt-4 flex items-center justify-end gap-2">
          <Button onClick={closeModal} variant={"cancel"} className={"w-24"}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default Popup;
