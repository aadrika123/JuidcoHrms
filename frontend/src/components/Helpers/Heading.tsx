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
