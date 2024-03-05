/***
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Time Bound details - Employee Time Bound Promotion/ACP/MACP details page
 */

"use client";

import React, { useState } from "react";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import { SubHeading } from "@/components/Helpers/Heading";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import PrimaryButton from "@/components/Helpers/Button";
import goBack, { removeObj } from "@/utils/helper";
import Button from "@/components/global/atoms/Button";
import {
  EmployeeTimeBoundDetailType,
  EmployeeDetailsProps,
} from "@/utils/types/employee.type";
import { usePathname, useRouter } from "next/navigation";

export const EmpTimeBound: React.FC<
  EmployeeDetailsProps<EmployeeTimeBoundDetailType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();

  const COLUMNS_FOR_EMP_TRNG_INFRM = [
    {
      HEADER: "Sl. No.",
    },
    {
      HEADER: "Pay Scale",
      placeholder: "Increment Amount",
    },

    {
      HEADER: "Increment Amount",
      placeholder: "B.Pay After Increment",
      type: "number",
    },

    {
      HEADER: "B.Pay After Increment",
      type: "number",
      placeholder: "Vide Order No",
    },

    {
      HEADER: "Vide Order No",
      placeholder: "Vide Order Date",
    },

    {
      HEADER: "Vide Order Date",
      placeholder: "Remarks",
    },
    {
      HEADER: "Remarks",
    },
  ];

  const getInitialFormData: any = () => ({
    pay_scale: {
      from: "",
      to: "",
    },
    inc_amount: "",
    bpay_aft_inc: "",
    vide_ord_no: "",
    vide_ord_date: "",
    remarks: "",
  });

  const [tableData, setTableData] = useState<EmployeeTimeBoundDetailType[]>([
    getInitialFormData(),
  ]);

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

  const saveDataToSessionStorage = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "emp_timebound_details",
        JSON.stringify(tableData)
      );

      if (props.setData) {
        const filterTableData = removeObj(tableData);
        props.setData("emp_timebound_details", filterTableData as any);
      }
    }
  };

  const addRow = () => {
    saveDataToSessionStorage();
    setTableData((prevData) => [...prevData, getInitialFormData()]);
  };

  return (
    <>
      <SubHeading className="text-[20px] pt-4 mt-10 mb-4">
        Time Bound Promotion/ACP/MACP details
      </SubHeading>
      <div>
        <table>
          <thead className="text-[1rem] bg-primary_green text-white ">
            <tr>
              {COLUMNS_FOR_EMP_TRNG_INFRM?.map((cols, index: number) => (
                <>
                  <th
                    key={index}
                    className={`border  border-zinc-400 p-3 font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
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
            {tableData.map((rowData: any, rowIndex) => (
              <tr key={rowIndex} className="border py-2 px-4 ">
                <td className="border py-3 px-10 text-center ">
                  <span>{rowIndex + 1}</span>
                </td>
                {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, colIndex) => {
                  const stateKey: any =
                    Object.keys(getInitialFormData())[colIndex];
                  return (
                    <td key={colIndex} className="border">
                      {colIndex === 0 ? (
                        <div className=" inline-flex items-center pt-1 pb-1 mx-2 my-2">
                          <React.Fragment>
                            <p className="mr-2">From:</p>
                            <input
                              type="text"
                              className="w-full h-full p-2 bg-transparent border border-gray-300"
                              placeholder="Enter Increment Amount"
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
                            <p className="ml-2 mr-2">To:</p>
                            <input
                              type="text"
                              className="w-full h-full p-2 bg-transparent border border-gray-300"
                              placeholder="Enter Increment Amount"
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
                      ) : (
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder={`Enter ${column.placeholder}`}
                          value={
                            colIndex === 0 ? rowIndex + 1 : rowData[stateKey]
                          }
                          onChange={(e) =>
                            handleInputChange(
                              stateKey,
                              e.target.value,
                              undefined,
                              rowIndex
                            )
                          }
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          {/* <tbody>
                        {employeeTrainig.map((rowData: any, rowIndex) => (
                            <tr key={rowIndex} className="border py-2 px-4 ">
                                <td className="border py-2 px-4 text-center ">
                                    <span>{rowIndex + 2}</span>
                                </td>
                                {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, colIndex) => {
                                    const stateKey: any = Object.keys(defaultRowValuesEmployees)[colIndex];
                                    return (
                                        <td key={colIndex} className="border">
                                            {colIndex === 0 ? (
                                                <div className=' inline-flex items-center pt-1 pb-1 mx-2 my-2'>
                                                    <React.Fragment>
                                                    <p className="mr-2">From:</p>
                                                    <input
                                                        type="text"
                                                        className="w-full h-full p-2 bg-transparent border border-gray-300"
                                                        placeholder="Enter Increment Amount"
                                                        onChange={(e) => handleInputChange(stateKey, e.target.value, "from")}
                                                        value={rowData[stateKey]?.from || ''}
                                                    />
                                                    <p className="ml-2 mr-2">To:</p>
                                                    <input
                                                        type="text"
                                                        className="w-full h-full p-2 bg-transparent border border-gray-300"
                                                        placeholder="Enter Increment Amount"
                                                        onChange={(e) => handleInputChange(stateKey, e.target.value, "to")}
                                                        value={rowData[stateKey]?.to || ''}
                                                    />
                                                </React.Fragment>
                                                </div>
                                                
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="w-full h-full bg-transparent outline-none"
                                                    // placeholder={`Enter ${column.HEADER}`}
                                                    // placeholder={colIndex === 1 ? `Enter ${column.HEADER}` : ""}
                                                    placeholder={colIndex === 1 ? `Enter Increment Amount` : colIndex === 2 ? `Enter B.Pay After Increment` : colIndex === 3 ? `Enter Vide Order No` : colIndex === 4 ? `Enter Vide Order Date` :  colIndex === 5 ? `Enter Remakrs` : `Enter ${column.HEADER}`}
                                                    value={rowData[stateKey]}
                                                    onChange={(e) => handleRowChanges(rowIndex, stateKey, e.target.value)}
                                                />
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody> */}
        </table>

        <div className="w-full flex items-center justify-end mt-3">
          <Button
            onClick={addRow}
            buttontype="button"
            variant="primary_rounded"
          >
            Add
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end mt-5 gap-5">
        <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
          Back
        </PrimaryButton>

        <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton>

        <PrimaryButton
          onClick={saveDataToSessionStorage}
          buttonType="submit"
          variant="primary"
        >
          Save
        </PrimaryButton>
      </div>
    </>
  );
};
