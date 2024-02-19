import { MuncipalityTableData } from "@/utils/types/types";
import React from "react";

interface TableDataProps {
  data: MuncipalityTableData[];
}

const Table: React.FC<TableDataProps> = (props) => {
  return (
    <>
      <div className="overflow-x-auto border-[2px] border-zinc-400">
        <p className="p-4 text-[0.75rem] text-zinc-700">
          Identification Codes for ULBs at Jharkhand{" "}
        </p>

        <table className="table table-md">
          <thead className="  text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400 ">
            <tr className=" ">
              <th className="w-2 p-8 flex items-center gap-2 font-medium">
                <input
                  type="checkbox"
                  checked={false}
                  className="checkbox border-zinc-500"
                />
              </th>
              <th className="border border-zinc-400">
                <div className="flex gap-2 w-32 font-medium">
                  <span>ULBs</span>
                </div>
              </th>
              <th className="border border-zinc-400 w-[20%] font-medium">
                <div className="flex gap-2">
                  <span>DISTRICT</span>
                </div>
              </th>

              <th colSpan={2} className="border border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>State Code</span>
                </div>
              </th>

              <th className="border  border-zinc-400 font-medium" colSpan={2}>
                <div className="flex gap-2">
                  <span>District Code</span>
                </div>
              </th>

              <th colSpan={2} className="border   border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Category</span>
                </div>
              </th>

              <th colSpan={2} className="border  border-zinc-400  font-medium">
                <div className="flex gap-2">
                  <span>Code </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.data?.map((d, index: number) => (
              <tr key={index} className="border border-zinc-400 text-secondary">
                <th className="border border-zinc-400">
                  <input
                    type="checkbox"
                    checked={false}
                    className="checkbox border-zinc-400 ml-4"
                  />
                </th>
                {/* ULB'S */}
                <td className="border border-zinc-400">{d?.ulbs}</td>

                {/* DISTRICT */}
                <td className="border border-zinc-400">{d?.district} </td>

                {/* STATE CODE */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">{d?.state_code[0]}</div>
                </td>
                <td>
                  <div className="flex justify-center">{d?.state_code[1]}</div>
                </td>
                {/* STATE CODE */}

                {/* DISTRICT CODE */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    {d?.district_code[0]}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">
                    {d?.district_code[1]}
                  </div>
                </td>
                {/* DISTRICT CODE */}

                {/* CATEGORY */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">{d?.category[0]}</div>
                </td>
                <td>
                  <div className="flex justify-center">{d?.category[1]}</div>
                </td>
                {/* CATEGORY */}

                {/* CODE */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">{d?.code[0]}</div>
                </td>
                <td>
                  <div className="flex justify-center">{d?.code[1]}</div>
                </td>
                {/* CODE */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
