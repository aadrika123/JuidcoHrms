import React, { ReactElement } from "react";

interface TheadProps {
  cellValue: string | ReactElement;
  key?: string | number;
  className?: string;
  center?: boolean;
  color?: string;
  width?: string;
}

const Thead: React.FC<TheadProps> = (props) => {
  const { cellValue, key, className, center, color, width} = props;

  return (
    <th
      key={`headCell-${key}`}
      className={`border-l border-zinc-400 ${width} ${className} ${color}`}
    >
      <div
        className={`flex gap-2 font-medium text-center ${
          center && "justify-center"
        }`}
      >
        {cellValue}
      </div>
    </th>
  );
};

export default Thead;
