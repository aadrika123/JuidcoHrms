"use client";

/***
 * Author: Krish
 * Status: Open
 * Date: 23/02/2024
 */

import { InnerHeading } from "@/components/Helpers/Heading";
import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { removeObj } from "@/utils/helper";

type OptionProps = {
  id: number;
  name: string;
};

export interface COLUMNS {
  HEADER: string;
  ACCESSOR: string;
  isRequired: boolean;
  type?: "radio" | "select" | "text" | "number" | "date";
  select_options?: OptionProps[];
  placeholder?: string;
  sl_no?: boolean;
  max_number?: number;
  max_text?: number;
}

interface TableFormProps {
  columns: COLUMNS[];
  getData: [];
  addRows?: () => void;
  session_key: string;
  subHeading: string;
  isRequired?: boolean;
  setData: (key: string, values: any, index?: number | undefined) => void;
  labels?: string[];
  setSession: number;
  // resetTable: number;
  validate: (value: boolean) => void;
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
  const [tableData, setTableData] = useState<any[]>([{}]);
  const [tableLabels] = useState(props.labels || []);
  // const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const filterData = removeObj(tableData);
  // const [isObjectEmpty, setIsObjectEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem(`${props.session_key}`);
      setTableData(
        storedData
          ? JSON.parse(storedData)
          : Array.from({ length: tableLabels?.length || 1 }, () => ({}))
      );
    }
  }, [props.session_key]);

  // function setDataSesson() {
  //   if (global?.window && typeof window !== "undefined") {
  //     sessionStorage.setItem(
  //       `${props.session_key}`,
  //       JSON.stringify(filterData)
  //     );
  //   }
  // }

  function setDataSesson() {
    if (typeof window !== "undefined") {
      const filteredData = tableData.filter((row) => {
        // Check if any field in the row is non-empty (excluding sl_no)
        const isEmptyRow = Object.values(row).every((value, index) => {
          const key = Object.keys(row)[index];
          return (
            key !== "sl_no" &&
            (value === null || value === undefined || value === "")
          );
        });
        return !isEmptyRow;
      });

      sessionStorage.setItem(
        `${props.session_key}`,
        JSON.stringify(filteredData)
      );
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem(`${props.session_key}`);
      const parsedData = storedData ? JSON.parse(storedData) : [];

      // Filter out any empty rows before setting tableData
      const filteredParsedData = parsedData.filter((row: any) => {
        const isEmptyRow = Object.values(row).every(
          (value) => value === null || value === undefined || value === ""
        );
        return !isEmptyRow;
      });

      setTableData(
        filteredParsedData.length > 0
          ? filteredParsedData
          : Array.from({ length: tableLabels?.length || 1 }, () => ({}))
      );
    }
  }, [props.session_key]);

  useEffect(() => {
    // if (isObjectEmpty)
    if (props.setSession === 1) setDataSesson();
  }, [props.setSession]);

  // useEffect(() => {
  //   if (props.resetTable !== 0) {
  //     setTableData([{}]);
  //     props.validate(true);
  //   }
  // }, [props.resetTable]);

  useEffect(() => {
    // if (isObjectEmpty)
    props.setData(`${props.session_key}`, filterData, tableLabels as any);
  }, [tableData, tableLabels]);

  function onChangeTableDataHandler(
    id: number,
    value: string | number,
    key: string
  ) {
    setTableData((prev: any) => {
      const updatedData = [...prev];
      const row: any = { ...updatedData[id] };

      // if (Object.values(row).every((value) => value !== "")) {
      //   setIsObjectEmpty(true);
      // }

      row[key as keyof typeof row] = value;

      // ------------ VALIDATION ----------------------//
      props.columns?.forEach((key) => {
        if (Object.keys(row).includes(key.ACCESSOR)) {
          if (Object.values(row).every((value) => value !== ""))
            props.validate(true);
        } else if (Object.values(row).every((value) => value === "")) {
          props.validate(true);
        } else {
          props.validate(false);
        }
      });
      // ------------ VALIDATION ----------------------//

      updatedData[id] = row;
      return updatedData;
    });
  }

  function addRow() {
    setDataSesson();

    if (tableData && tableData.length > 0) {
      const lastRow = tableData[tableData.length - 1];
      const isLastRowEmpty =
        Object.keys(lastRow).length === 0 ||
        props.columns.some(
          (col) =>
            col.isRequired && !lastRow[col.ACCESSOR as keyof typeof lastRow]
        );

      if (!isLastRowEmpty) {
        const newRow = props.columns.reduce(
          (acc: { [key: string]: string }, col) => {
            if (col.ACCESSOR !== "sl_no") {
              acc[col.ACCESSOR] = "";
            }

            return acc;
          },
          {}
        );

        setTableData((prev: any) => [...prev, newRow]);
        // setTableLabels((prevLabels) => [...prevLabels, ""]);
      }
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
      <table className="table table-md mt-4">
        <thead className="  text-[1rem] bg-primary_green text-[#211F35]  ">
          <tr>
            {/* {props.labels && props.labels.length > 0 && (
              <th className=" font-medium w-[5%]">
                <div className="flex gap-2">
                  <span>Education Level</span>
                </div>
              </th>
            )} */}

            {props.columns?.map((cols, index: number) => (
              <>
                <th
                  key={index}
                  className={`border-b border-zinc-50 font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
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
              <tr
                key={index}
                className=" text-secondary border-b border-zinc-300"
              >
                {props.labels && props.labels.length > 0 && (
                  <td className="">
                    {props.labels[index] || `Label ${index + 1}`}
                  </td>
                )}
                {props.columns?.map((col, i: number) => {
                  return (
                    <React.Fragment key={col.ACCESSOR}>
                      <td className="">
                        {!col.type ? (
                          col.sl_no && i === 0 ? (
                            <span>{index + 1}</span>
                          ) : (
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
                                (tableData[index] as Record<string, string>)[
                                  col.ACCESSOR
                                ] || ""
                              }
                              name={col.ACCESSOR}
                              placeholder={"Enter " + col.HEADER}
                              isRequired={col.isRequired}
                              maxLength={col.max_text}
                              onKeyPress={(e: any) => {
                                if (col.max_text)
                                  if (
                                    !(
                                      (e.key >= "a" && e.key <= "z") ||
                                      (e.key >= "A" && e.key <= "Z") ||
                                      (e.key >= "0" && e.key <= "9") ||
                                      e.key === " "
                                    )
                                  ) {
                                    e.preventDefault();
                                  }
                              }}
                            />
                          )
                        ) : col.type === "number" ? (
                          <InputField
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              onChangeTableDataHandler(
                                index,
                                Number(e.target.value),
                                col.ACCESSOR
                              )
                            }
                            value={
                              (tableData[index] as Record<string, string>)[
                                col.ACCESSOR
                              ] || ""
                            }
                            name={col.ACCESSOR}
                            type="number"
                            placeholder={"Enter " + col.HEADER}
                            isRequired={col.isRequired}
                            onKeyDown={(e: any) => {
                              if (col.max_number) {
                                if (
                                  e.key.length === 1 &&
                                  e.key !== "Backspace" &&
                                  e.target.value.length >= col.max_number
                                ) {
                                  e.preventDefault();
                                }
                              }
                            }}
                          />
                        ) : col.type === "radio" ? (
                          <div className="flex flex-col gap-3 pl-5 items-start">
                            {options.map((option) => (
                              <div
                                className="flex items-center mr-3 gap-2"
                                key={option.key}
                              >
                                <input
                                  className="mr-1 appearance-none border-2 border-zinc-400  rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent cursor-pointer"
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
                                  {option.value}
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
                            className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 w-full`}
                          >
                            <option selected value="">
                              {col.placeholder}
                            </option>
                            {/* tableData[0]?.name ? col?.select_options?.filter((item) => tableData[0]?.name !== item.name) */}
                            {/* {col?.select_options?.map((d: OptionProps) => (
                              <option key={d?.id} value={d?.name}>
                                {d?.name}
                              </option>
                            )): col?.select_options?.map((d: OptionProps) => (
                              <option key={d?.id} value={d?.name}>
                                {d?.name}
                              </option>
                            ))} */}

                            {col?.select_options?.map((d: OptionProps) => (
                              <option key={d?.id} value={d?.name}>
                                {d?.name}
                              </option>
                            ))}
                          </select>
                        ) : col.type === "date" ? (
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
                              (tableData[index] as Record<string, string>)[
                                col.ACCESSOR
                              ] || ""
                            }
                            name={col.ACCESSOR}
                            type="date"
                            isRequired={col.isRequired}
                          />
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
