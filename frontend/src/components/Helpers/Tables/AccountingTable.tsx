import { AccountingTableData } from "@/utils/types/types";
import React from "react";

interface AccoutingTableProps {
  data: AccountingTableData[];
}

const AccountingTable: React.FC<AccoutingTableProps> = (props) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead className=" text-white text-[1rem] border border-t-2 border-zinc-400 ">
            <tr className=" w-full">
              <th className="w-12 py-8 pl-8 flex items-center gap-2 font-medium">
                <input
                  type="checkbox"
                  checked={false}
                  className="checkbox border-zinc-500 mr-12"
                />
              </th>
              <th
                className="border w-[20%] border-zinc-400 bg-[#285343]"
                colSpan={3}
              >
                <div className="flex gap-2 w-32 font-medium ">
                  <span>Major Head</span>
                </div>
              </th>
              <th
                className="border  w-[15%] border-zinc-400 bg-[#285343] font-medium"
                colSpan={2}
              >
                <div className="flex gap-2">
                  <span>Minor Head</span>
                </div>
              </th>

              <th
                className="border  w-[15%] bg-[#285343] text-white border-zinc-400 font-medium"
                colSpan={2}
              >
                <div className="flex gap-2">
                  <span>Detail Head</span>
                </div>
              </th>

              <th className="border w-[50%] bg-[#12743B] text-white border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Descriptions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.data?.map((d, index: number) => (
              <tr key={index} className="border border-zinc-400 text-secondary">
                <th className="border border-zinc-400">
                  <div className="flex pr-5 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={false}
                      className="checkbox border-zinc-400 ml-4"
                    />
                  </div>
                </th>

                {/* MAJOR HEAD */}
                <td className="border border-l-2 border-zinc-400 ">
                  <div className="flex justify-center">{d?.major_head[0]}</div>
                </td>
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">{d?.major_head[1]}</div>
                </td>
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">{d?.major_head[2]}</div>
                </td>
                {/* MAJOR HEAD */}

                {/* MINOR HEAD */}
                <td className="border-l-2 border border-zinc-400 ">
                  <div className="flex justify-center">{d?.minor_head[0]}</div>
                </td>
                <td className="border-r-2 border-zinc-400 ">
                  <div className="flex justify-center">{d?.minor_head[1]}</div>
                </td>
                {/* MINOR HEAD */}

                {/* DETAILS HEAD */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">{d?.detail_code[0]}</div>
                </td>
                <td className="border-r-2 border-zinc-400">
                  <div className="flex justify-center">{d?.detail_code[1]}</div>
                </td>
                {/* DETAILS HEAD */}

                {/* DESCRIPTION */}
                <td className="border border-zinc-400 ">{d?.description}</td>
                {/* DESCRIPTION */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountingTable;
