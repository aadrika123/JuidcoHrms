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
      className={`text-secondary font-sm flex items-center gap-2 ${props.className}`}
    >
      {props.children}
    </h3>
  );
};
