"use client";

/***
 * Author: Krish
 * Status: Open
 * Date: 23/02/2024
 */

import { InnerHeading } from "@/components/Helpers/Heading";
import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";

type OptionProps = {
  id: number;
  name: string;
};

export interface COLUMNS {
  HEADER: string;
  ACCESSOR: string;
  isRequired: boolean;
  type?: "radio" | "select" | "text";
  select_options?: OptionProps[];
  placeholder?: string;
  sl_no?: boolean;
}

interface TableFormProps {
  columns: COLUMNS[];
  getData: [];
  addRows?: () => void;
  session_key: string;
  subHeading: string;
  isRequired?: boolean;
  setData: (key: string, values: any, index?: number | undefined) => void;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
  return (
    <>
      <input
        className={`w-full h-full p-2 bg-transparent outline-none ${isRequired && "placeholder-zinc-400"}`}
        type="text"
        {...props}
      />
    </>
  );
};

const TableFormContainer: React.FC<TableFormProps> = (props) => {
  const [tableData, setTableData] = useState([{}]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem(`${props.session_key}`);
      setTableData(storedData ? JSON.parse(storedData) : [{}]);
    }
  }, [props.session_key]);

  function setDataSesson() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`${props.session_key}`, JSON.stringify(tableData));
    }
  }

  useEffect(() => {
    props.setData("emp_inc_details", tableData);
  }, [tableData]);

  function onChangeTableDataHandler(id: number, value: string, key: string) {
    setTableData((prev: any) => {
      const updatedData = [...prev];
      const row: any = { ...updatedData[id] };
      row[key as keyof typeof row] = value;
      updatedData[id] = row;
      return updatedData;
    });
  }

  function addRow() {
    setDataSesson();
    const lastRow = tableData[tableData.length - 1];
    const isLastRowEmpty =
      Object.keys(lastRow).length === 0 ||
      props.columns.some(
        (col) =>
          col.isRequired && !lastRow[col.ACCESSOR as keyof typeof lastRow]
      );

    if (!isLastRowEmpty) {
      setTableData((prev: any) => [...prev, {}]);
    }
  }

  const options = [
    {
      key: "yes",
      value: "Yes",
    },
    {
      key: "no",
      value: "No",
    },
  ];

  const header = <InnerHeading>{props.subHeading}</InnerHeading>;
  return (
    <>
      {header}
      <table className="table table-md">
        <thead className="  text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400 ">
          <tr>
            {props.columns?.map((cols, index: number) => (
              <>
                <th
                  key={index}
                  className={`border  border-zinc-400  font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
                >
                  <div className="flex gap-2">
                    <span>{cols.HEADER}</span>
                  </div>
                </th>
              </>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData?.map((row: any, index: number) => {
            return (
              <tr key={index} className="border border-zinc-400 text-secondary">
                {props.columns?.map((col) => {
                  return (
                    <React.Fragment key={col.ACCESSOR}>
                      <td className="border border-zinc-400">
                        {!col.type ? (
                          <InputField
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              onChangeTableDataHandler(
                                index,
                                e.target.value,
                                col.ACCESSOR
                              )
                            }
                            value={
                              col.sl_no
                                ? index + 1
                                : (tableData[index] as Record<string, string>)[
                                    col.ACCESSOR
                                  ] || ""
                            }
                            name={col.ACCESSOR}
                            placeholder={"Enter " + col.HEADER}
                            isRequired={col.isRequired}
                          />
                        ) : col.type === "radio" ? (
                          <div className="flex flex-col gap-3 pl-5 items-start">
                            {options.map((option) => (
                              <div
                                className="flex items-center mr-3 gap-2"
                                key={option.key}
                              >
                                <input
                                  className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-primary_green checked:text-white  checked:border-transparent"
                                  type="radio"
                                  id={option.value}
                                  value={option.value}
                                  onChange={() =>
                                    onChangeTableDataHandler(
                                      index,
                                      option.value,
                                      col.ACCESSOR
                                    )
                                  }
                                  checked={
                                    (
                                      tableData[index] as Record<string, string>
                                    )?.[col.ACCESSOR] === option.value
                                  }
                                />
                                <label
                                  className="text-secondary text-sm"
                                  htmlFor={option.key}
                                >
                                  {option.key}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : col.type === "select" ? (
                          <select
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              onChangeTableDataHandler(
                                index,
                                e.target.value,
                                col.ACCESSOR
                              )
                            }
                            value={
                              (tableData[index] as Record<string, string>)?.[
                                col.ACCESSOR
                              ]
                            }
                            name={col.ACCESSOR}
                            className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400`}
                          >
                            <option selected value="">
                              {col.placeholder}
                            </option>
                            {col?.select_options?.map((d: OptionProps) => (
                              <option key={d?.id} value={d?.id}>
                                {d?.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <></>
                        )}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-end mt-3">
        <Button onClick={addRow} buttontype="button" variant="primary_rounded">
          Add
        </Button>
      </div>
    </>
  );
};

export default TableFormContainer;