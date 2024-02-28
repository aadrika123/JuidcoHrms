import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const SubHeading: React.FC<HeadingProps> = (props) => {
  return (
    <h2
      className={`text-secondary text-mid_head font-medium flex items-center gap-2 ${props.className}`}
    >
      {props.children}
    </h2>
  );
};

export const InnerHeading: React.FC<HeadingProps> = (props) => {
  return (
    <h3
      className={`text-secondary text-xl flex items-center gap-2 ${props.className}`}
      // className={`flex items-center gap-2 text-black-100  ${props.className}`}
    >
      {props.children}
    </h3>
  );
};

export const InnerTextHeading: React.FC<HeadingProps> = (props) => {
  return (
    <h3
      className={`flex items-center gap-2 text-black-100 text-[13px] ${props.className}`}
    >
      {props.children}
    </h3>
  );
};
