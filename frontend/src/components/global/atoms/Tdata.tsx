"use client";

import React, { ReactNode } from "react";

interface TdataProps {
  value: ReactNode;
  key?: string | number;
  className?: string;
  colSpan?: number;
  scrollable?: boolean;
  width?: string;
}

const Tdata: React.FC<TdataProps> = (props) => {
  const { className, key, value, scrollable, ...rest } = props;
  return (
    <td
      {...rest}
      key={`cell-${key}`}
      className={`border-l border-zinc-400 ${className} ${scrollable && `${props.width}`}`}
    >
      <div className="flex justify-center text-start">{value}</div>
    </td>
  );
};

export default Tdata;

