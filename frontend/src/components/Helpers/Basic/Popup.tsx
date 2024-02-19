import React from "react";
import { SubHeading } from "../Heading";

interface PopupProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactHTMLElement<HTMLSpanElement>;
  closeModal: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, title }) => {
  return (
    <div className=" w-full rounded-lg h-auto backdrop-blur-lg bg-white border shadow-lg flex flex-col  p-5">
      <SubHeading>{title}</SubHeading>
      <div className="flex flex-col w-full gap-5 mt-5">{children}</div>
      <div className="w-full mt-4 flex items-center justify-end gap-2"></div>
    </div>
  );
};

export default Popup;
