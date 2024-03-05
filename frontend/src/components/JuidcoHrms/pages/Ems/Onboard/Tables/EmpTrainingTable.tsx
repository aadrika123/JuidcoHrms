/***
 * Author: Krish
 * Status: Open
 * Uses: EMployee promotion details is a section of Emp Service details
 */

import React, { useEffect, useState } from "react";
import Button from "../../../../../global/atoms/Button";
import {
  EmployeeEducation,
  EmployeeEducationDetailsType,
} from "@/utils/types/employee.type";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import toast, { Toaster } from "react-hot-toast";
import { removeObj } from "@/utils/helper";
import { SubHeading } from "@/components/Helpers/Heading";

interface TableFormProps {
  setData: (key: string, values: any, index?: number | undefined) => void;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
  return (
    <>
      <input
        className={`w-full h-full p-2 bg-transparent outline-none rounded-xl ${isRequired && "placeholder-zinc-400"}`}
        type="text"
        {...props}
      />
    </>
  );
};

const EmployeeTrainingTable: React.FC<TableFormProps> = (props) => {
  const getInitialFormData: any = () => ({
    name_of_training: "",
    training_type: "",
    name_of_inst: "",
    starting_from: "",
    end_to: "",
    tot_day_training: "",
  });
  const [addedRows, setAddedRows] = useState<number>(0);
  const [tableData, setTableData] = useState<EmployeeEducationDetailsType[]>([
    getInitialFormData(),
  ]);

  console.log(tableData, "tdata");
  console.log(tableData, "table data");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("emp_training");
      if (storedData !== null)
        setTableData(storedData ? JSON.parse(storedData) : [{}]);
    }
  }, []);

  function setDataSesson() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_training", JSON.stringify(tableData));
    }
  }

  const COLUMNS_FOR_EMP_TRNG_INFRM: COLUMNS[] = [
    {
      HEADER: "Name of Training",
      ACCESSOR: "name_of_training",
      isRequired: true,
    },
    {
      HEADER: "Training Type",
      ACCESSOR: "training_type",
      isRequired: true,
    },

    {
      HEADER: "Name of Institution",
      ACCESSOR: "name_of_institution",
      isRequired: true,
    },

    {
      HEADER: "Starting From",
      ACCESSOR: "starting_from",
      isRequired: true,
    },

    {
      HEADER: "End To",
      ACCESSOR: "end_to",
      isRequired: true,
    },

    {
      HEADER: "Total Days of Training",
      ACCESSOR: "total_days_of_train",
      isRequired: true,
    },
  ];

  const handleInputChange = (
    fieldName: string,
    value: string | number,
    nestedKey?: string,
    rowIndex?: number | string
  ) => {
    setTableData((prevFormData) => {
      const updatedData = [...prevFormData];
      if (nestedKey !== undefined && rowIndex !== undefined) {
        if (typeof updatedData[rowIndex][fieldName] !== "object") {
          updatedData[rowIndex][fieldName] = { [nestedKey]: value };
        } else {
          updatedData[rowIndex][fieldName][nestedKey] = value;
        }
      } else {
        updatedData[rowIndex][fieldName] = value;
      }
      return updatedData;
    });
  };
  const addRow = () => {
    setDataSesson();
    if (addedRows < 6) {
      setTableData((prevData) => [...prevData, getInitialFormData()]);
      setAddedRows((prevRows) => prevRows + 1);
    }
  };

  useEffect(() => {
    if (props.setData) {
      const filterTableData = removeObj(tableData);
      props.setData("emp_training", filterTableData);
    }
  }, [tableData]);

  return (
    <>
      <Toaster />
      <SubHeading className="text-[20px] pt-4 mt-10 mb-4">
        Employee Training Information
      </SubHeading>

      <table className="w-full">
        <thead className="text-[1rem] bg-primary_green text-white  ">
          <tr>
            {COLUMNS_FOR_EMP_TRNG_INFRM?.map((cols, index: number) => (
              <>
                <th
                  key={index}
                  className={`border  border-zinc-400 p-3 font-medium w-auto`}
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
          {tableData?.map((rowData: any, rowIndex) => (
            <tr key={rowIndex} className="border py-2 px-4 ">
              {/* <td className="border py-3 px-10 text-center ">
                  <span>{rowIndex + 1}</span>
                </td> */}
              {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, colIndex) => {
                const stateKey: any =
                  Object.keys(getInitialFormData())[colIndex];
                return (
                  <td key={colIndex} className="border">
                    {colIndex === 0 ? (
                      <input
                        type="text"
                        className="w-full h-full bg-transparent outline-none"
                        placeholder={`Enter ${column.HEADER}`}
                        value={rowData[stateKey]}
                        onChange={(e) =>
                          handleInputChange(
                            stateKey,
                            e.target.value,
                            undefined,
                            rowIndex
                          )
                        }
                      />
                    ) : null}

                    {colIndex === 1 ? (
                      <select
                        className="bg-white border p-1 mx-2"
                        value={rowData[stateKey]}
                        onChange={(e) =>
                          handleInputChange(
                            stateKey,
                            e.target.value,
                            undefined,
                            rowIndex
                          )
                        }
                      >
                        <option>Please Select Option</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advance">Advance</option>
                      </select>
                    ) : null}

                    {colIndex === 2 ? (
                      <input
                        type="text"
                        className="w-full h-full bg-transparent outline-none"
                        placeholder={`Enter ${column.HEADER}`}
                        value={rowData[stateKey]}
                        onChange={(e) =>
                          handleInputChange(
                            stateKey,
                            e.target.value,
                            undefined,
                            rowIndex
                          )
                        }
                      />
                    ) : null}

                    {colIndex === 3 ? (
                      <div className=" inline-flex items-center pt-1 pb-1 mx-2 my-2">
                        <React.Fragment>
                          <p className="mr-2">From:</p>
                          <input
                            type="date"
                            className="w-full h-full p-2 bg-transparent border border-gray-300"
                            placeholder="Enter Starting From"
                            onChange={(e) =>
                              handleInputChange(
                                stateKey,
                                e.target.value,
                                "from",
                                rowIndex
                              )
                            }
                            value={rowData[stateKey]?.from || ""}
                          />
                        </React.Fragment>
                      </div>
                    ) : null}

                    {colIndex === 4 ? (
                      <div className=" inline-flex items-center pt-1 pb-1 mx-2 my-2">
                        <React.Fragment>
                          <p className="ml-2 mr-2">To:</p>
                          <input
                            type="date"
                            className="w-full h-full p-2 bg-transparent border border-gray-300"
                            placeholder="Enter End To"
                            onChange={(e) =>
                              handleInputChange(
                                stateKey,
                                e.target.value,
                                "to",
                                rowIndex
                              )
                            }
                            value={rowData[stateKey]?.to || ""}
                          />
                        </React.Fragment>
                      </div>
                    ) : null}

                    {colIndex === 5 ? (
                      <input
                        type="text"
                        className="w-full h-full bg-transparent outline-none"
                        placeholder={`Enter ${column.HEADER}`}
                        value={rowData[stateKey]}
                        onChange={(e) =>
                          handleInputChange(
                            stateKey,
                            e.target.value,
                            undefined,
                            rowIndex
                          )
                        }
                      />
                    ) : null}
                  </td>

                  // : (
                  // <input
                  //   type="text"
                  //   className="w-full h-full bg-transparent outline-none"
                  //   placeholder={`Enter ${column.placeholder}`}
                  //   value={colIndex === 0 ? rowIndex + 1 : rowData[stateKey]}
                  //   onChange={(e) => handleInputChange(stateKey, e.target.value, undefined, rowIndex)}
                  // />
                );
              })}
            </tr>
          ))}
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

export default EmployeeTrainingTable;