import React, { ReactNode } from "react";

interface TheadProps {
  children: ReactNode;
  key?: string | number;
  className?: string;
  scrollable?: boolean;
}

const Trow: React.FC<TheadProps> = (props) => {
  const {key, className, scrollable} = props;

  return (
    <tr
      key={`row-${key}`}
      className={`${className} ${scrollable && "flex"}`}
    >
        {props.children}
    </tr>
  );
};

export default Trow;
