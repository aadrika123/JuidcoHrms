/***
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Time Bound details - Employee Time Bound Promotion/ACP/MACP details page
 */

"use client";

import React, { useState } from "react";
// import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import { SubHeading } from "@/components/Helpers/Heading";
// import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import Button from "@/components/global/atoms/Button";
import {
  EmployeeTimeBoundDetailType,
  EmployeeDetailsProps,
} from "@/utils/types/employee.type";
// import { useRouter } from "next/navigation";

export const EmpTimeBound: React.FC<
  EmployeeDetailsProps<EmployeeTimeBoundDetailType>
> = (props) => {
  // const pathName = usePathname();
  // const router = useRouter();
  const [addedRows, setAddedRows] = useState<number>(0);
  const [basicPay, setBasicPay] = useState<string>("");

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

  const [tableData, setTableData] = useState<any[]>([getInitialFormData()]);

  React.useEffect(() => {
    const storedData = sessionStorage.getItem("emp_timebound_details");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }

    const joinDetails = sessionStorage.getItem("emp_join_details");
    if (joinDetails) {
      const d = JSON.parse(joinDetails);
      setBasicPay(d?.basic_pay);
    }
  }, []);

  const handleInputChange = (
    fieldName: any,
    value: any,
    nestedKey?: any,
    rowIndex?: number
  ) => {
    setTableData((prevFormData) => {
      const updatedData = [...prevFormData];
      // if (updatedData[0]?.inc_amt !== "") {
      updatedData[0].b_after_pay = String(
        parseInt(updatedData[0]?.inc_amt) + parseInt(basicPay)
      );

      if (updatedData[0]?.inc_amt === "") {
        updatedData[0].b_after_pay = "";
      }

      if (nestedKey !== undefined && rowIndex !== undefined) {
        if (typeof updatedData[rowIndex][fieldName] !== "object") {
          updatedData[rowIndex][fieldName] = { [nestedKey]: value };
        } else {
          updatedData[rowIndex][fieldName][nestedKey] = value;
        }
      } else {
        updatedData[rowIndex as any][fieldName] = value;
      }
      saveDataToSessionStorage();
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
      <div className="flex justify-between mb-10">
        <SubHeading>
          Time Bound Promotion/ACP/MACP details
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z"
                fill="#6565DD"
              />
            </svg>
          </i>
        </SubHeading>
        <h5>Steps-10/10</h5>
      </div>
      <div>
        <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md mt-10">
          <SubHeading className="mb-10">
            Time Bound Promotion/ACP/MACP details
          </SubHeading>
          <table>
            {/* -----------------------Table Header----------------------------------- */}
            <thead className="text-[1rem] bg-primary_green text-[#211F35]  ">
              <tr>
                {COLUMNS_FOR_EMP_TRNG_INFRM?.map((cols, index: number) => (
                  <>
                    <th
                      key={index}
                      className={` p-3 font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
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
                <tr key={rowIndex} className=" py-2 px-4 ">
                  <td className=" py-3 px-10 text-center border-b-2">
                    <span>{rowIndex + 1}</span>
                  </td>
                  {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, colIndex) => {
                    const stateKey: any =
                      Object.keys(getInitialFormData())[colIndex];
                    return (
                      <td key={colIndex} className="border-b-2">
                        {colIndex === 0 ? (
                          <div className=" inline-flex items-center pt-1 pb-1 mx-2 my-2">
                            <React.Fragment>
                              <p className="mr-2">From:</p>
                              <input
                                type="text"
                                className="w-full h-full p-2 bg-transparent "
                                placeholder="Enter Increment Amount"
                                onChange={(e) =>
                                  handleInputChange(
                                    stateKey,
                                    e.target.value,
                                    "from",
                                    rowIndex
                                  )
                                }
                                maxLength={10}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                                value={rowData[stateKey]?.from || ""}
                              />
                              <p className="ml-2 mr-2">To:</p>
                              <input
                                type="text"
                                className="w-full h-full p-2 bg-transparent "
                                placeholder="Enter Increment Amount"
                                onChange={(e) =>
                                  handleInputChange(
                                    stateKey,
                                    e.target.value,
                                    "to",
                                    rowIndex
                                  )
                                }
                                maxLength={10}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
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
                            type="text"
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
                            maxLength={10}
                            onKeyPress={(e: any) => {
                              if (!(e.key >= "0" && e.key <= "9")) {
                                e.preventDefault();
                              }
                            }}
                          />
                        ) : colIndex === 2 ? (
                          <input
                            type="text"
                            className="w-full h-full bg-transparent outline-none"
                            placeholder={`Enter ${column.placeholder}`}
                            value={rowData[stateKey]}
                            disabled
                            onChange={(e) =>
                              handleInputChange(
                                stateKey,
                                e.target.value,
                                undefined,
                                rowIndex
                              )
                            }
                            maxLength={10}
                            onKeyPress={(e: any) => {
                              if (!(e.key >= "0" && e.key <= "9")) {
                                e.preventDefault();
                              }
                            }}
                          />
                        ) : colIndex === 3 ? (
                          <input
                            type="text"
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
                            maxLength={10}
                            onKeyPress={(e: any) => {
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
                            maxLength={10}
                            onKeyPress={(e: any) => {
                              if (
                                !(
                                  (e.key >= "a" && e.key <= "z") ||
                                  (e.key >= "A" && e.key <= "Z") ||
                                  e.key === " "
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
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
          <PrimaryButton
            buttonType="button"
            variant={"cancel"}
            onClick={goBack}
          >
            Back
          </PrimaryButton>
          {/* 
        <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton> */}

          {/* <PrimaryButton
          onClick={saveDataToSessionStorage}
          buttonType="submit"
          variant="primary"
        >
          Save
        </PrimaryButton> */}
        </div>
      </div>
    </>
  );
};
