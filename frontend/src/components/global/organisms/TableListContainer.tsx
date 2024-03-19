import CheckBox from "@/components/Helpers/CheckBox";
import React from "react";

export interface COLUMNS {
  HEADER: string;
  ACCESSOR: string;
  WIDTH?: string;
}

interface TLContainerProps {
  columns: COLUMNS[];
  tableData: any[];
}

const Thead: React.FC<{ index: number; HEADER: string; WIDTH?: string }> = (
  props
) => {
  return (
    <>
      {props.index === 0 ? (
        <>
          <th className="px-4 w-16">
            <CheckBox
              label={""}
              name={""}
              className="border-zinc-800 w-8 h-8"
            />
          </th>
          <th
            key={props.index}
            className={`p-5 text-xl font-light w-[${props.WIDTH}]`}
          >
            <div className="flex gap-2">
              <span>{props.HEADER}</span>
            </div>
          </th>
        </>
      ) : (
        <th
          key={props.index}
          className={`p-5 text-xl font-light w-[${props.WIDTH}]`}
        >
          <div className="flex gap-2">
            <span>{props.HEADER}</span>
          </div>
        </th>
      )}
    </>
  );
};

const Tdata: React.FC<{ tdata: any; index: number }> = (props) => {
  return (
    <>
      {props.index === 0 ? (
        <>
          <td className="pl-5 py-3 text-xl text-zinc-600 font-light">
            <CheckBox label="" name="" />
          </td>
          <td className="pl-5 py-3 text-xl text-zinc-600 font-light">
            <span>{props.tdata}</span>
          </td>
        </>
      ) : (
        <td className="pl-6 py-3 text-xl text-zinc-600 font-light">
          <span>{props.tdata}</span>
        </td>
      )}
    </>
  );
};

const TableListContainer: React.FC<TLContainerProps> = (props) => {
  return (
    <div>
      <table className="mt-4 w-full">
        <thead className="  text-[1rem] border-t border-b border-zinc-400 text-[#211F35]  ">
          <tr>
            {props.columns?.map((cols, index: number) => (
              <Thead
                key={index}
                HEADER={cols.HEADER}
                WIDTH={cols.WIDTH}
                index={index}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {props.tableData?.map((data, index: number) => {
            return (
              <tr key={index}>
                {props.columns?.map((col, i: number) => {
                  return <Tdata key={i} tdata={data[col.ACCESSOR]} index={i} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableListContainer;
