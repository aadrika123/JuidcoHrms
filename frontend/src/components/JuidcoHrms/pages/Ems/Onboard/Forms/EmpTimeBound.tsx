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
import goBack from "@/utils/helper";
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
  const [addedRows, setAddedRows] = useState<number>(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

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
      type: "date",
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
    inc_amt: "",
    b_after_pay: "",
    vide_order_no: "",
    vide_order_date: "",
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
        props.setData("emp_timebound_details", tableData as any);
      }
      setShowCongratulations(true);

      setTimeout(() => {
        router.push("/hrms/ems/onboard");
      }, 3000);
    }
  };

  const addRow = () => {
    if (addedRows < 2) {
      saveDataToSessionStorage();
      setTableData((prevData) => [...prevData, getInitialFormData()]);
      setAddedRows((prevRows) => prevRows + 1);
    }
  };

  return (
    <>
      <SubHeading className="text-[20px] pt-4 mt-10 mb-4">
        Time Bound Promotion/ACP/MACP details
      </SubHeading>
      <div>
        <table>
          {/* -----------------------Table Header----------------------------------- */}
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
          {/* -----------------------Table Body----------------------------------- */}

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
                              type="number"
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
                              type="number"
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
                      ) : colIndex === 4 ? (
                        <input
                          type="date"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder={`Enter ${column.placeholder}`}
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
                      ) : colIndex === 1 ? (
                        <input
                          type="number"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder={`Enter ${column.placeholder}`}
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
                      ) : colIndex === 2 ? (
                        <input
                          type="number"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder={`Enter ${column.placeholder}`}
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
                      ) : colIndex === 3 ? (
                        <input
                          type="number"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder={`Enter ${column.placeholder}`}
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
          {/* -----------------------Table Body----------------------------------- */}
        </table>
        {/* -----------------------Add Row ----------------------------------- */}

        <div className="w-full flex items-center justify-end mt-3">
          <Button
            onClick={addRow}
            buttontype="button"
            variant="primary_rounded"
          >
            Add
          </Button>
        </div>
        {/* -----------------------Add Row ----------------------------------- */}
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

        {showCongratulations && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F8FFF7] p-8 rounded-md text-black text-center justify-center w-[50%] h-[40%] flex flex-col items-center">
            {/* <div className='mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100" height="100">
                                <circle cx="50%" cy="50%" r="50%" fill="#12743B" />
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" fill="#fff" />
                            </svg>
                        </div> */}
            {/* <Image src={correctImage} alt="Correct Icon" width={200} /> */}
            <h2 className="text-lg mb-4">Successfully Added.</h2>
          </div>
        )}
      </div>
    </>
  );
};
