/*
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Salary details - Employee Salary Information page
 */

"use client";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import React, { useState, useEffect } from "react";
import {
  EmployeeDetailsProps,
  EmployeeSalaryDetailType,
} from "@/utils/types/employee.type";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SubHeading } from "@/components/Helpers/Heading";
import toast from "react-hot-toast";
import Button from "@/components/global/atoms/Button";

const EmpSalaryDetails: React.FC<
  EmployeeDetailsProps<EmployeeSalaryDetailType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const router = useRouter();
  const pathName = usePathname();
  const empType = useSearchParams().get("emp");
  const [employeeSalaryDetails, setEmployeeSalaryDetails] = useState([]);
  const [session, setSession] = useState<number>(0);
  const [isValidate, setIsValidate] = useState<boolean>(true);
  const [resetTable, setResetTable] = useState<number>(0);
  const [basic_pay, setBasicPay] = useState(0);
  const [basic_pay1, setBasicPay1] = useState(0);

  const initialDeductDetails = () => ({
    amount_in: "",
    name: "",
    wfe_date: "",
    acnt_no: "",
  });

  const [employeeDeductionDetails, setEmployeeDeductionDetails] = useState<any>(
    [initialDeductDetails]
  );

  function storeEmployeeDeductionDetails() {
    console.log(employeeDeductionDetails, "before");
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "emp_salary_deduction_details",
        JSON.stringify(employeeDeductionDetails)
      );
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem(
        "emp_salary_deduction_details"
      );
      const empDeduction = JSON.parse(sessionData as string);
      if (empDeduction) setEmployeeDeductionDetails(empDeduction);
    }
  }, []);

  // console.log("employeeDeductionDetails", employeeDeductionDetails)

  useEffect(() => {
    const storedJoinDataString = sessionStorage.getItem("emp_join_details");
    const storedJoinData = storedJoinDataString
      ? JSON.parse(storedJoinDataString)
      : null;

    const storedAllowanceDataString = sessionStorage.getItem(
      "emp_salary_allow_details"
    );
    const storedAllowanceData = storedAllowanceDataString
      ? JSON.parse(storedAllowanceDataString)
      : null;

    if (storedJoinData && storedJoinData.basic_pay) {
      const totalAllowances = storedAllowanceData?.reduce(
        (sum: number, item: any) => sum + item.amount_in,
        0
      );

      const newBasicPay2 = storedJoinData.basic_pay;
      console.log("newBasicPay2", newBasicPay2);
      setBasicPay1(newBasicPay2);
      const newBasicPay = storedJoinData.basic_pay + totalAllowances;
      console.log("newBasicPay", newBasicPay);
      setBasicPay(newBasicPay);
    }
  }, [basic_pay, employeeDeductionDetails]);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selectedOption = e.target.value;
    let calculatedAmount = 0;

    const currentBasicPay = basic_pay; // Use the current basic_pay state
    console.log("currentBasicPay", currentBasicPay);
    switch (selectedOption) {
      case "PT":
        if (currentBasicPay <= 25000) {
          calculatedAmount = 0;
        } else if (currentBasicPay >= 25001 && currentBasicPay <= 41666) {
          calculatedAmount = 100;
        } else if (currentBasicPay >= 41667 && currentBasicPay <= 66666) {
          calculatedAmount = 150;
        } else if (currentBasicPay >= 66667) {
          calculatedAmount = 200;
        }
        break;

      case "IT": {
        const annualBasicPay = currentBasicPay * 12;
        console.log("annualBasicPay12", annualBasicPay);
        if (annualBasicPay <= 250000) {
          calculatedAmount = 0;
        } else if (annualBasicPay >= 250001 && annualBasicPay <= 500000) {
          calculatedAmount = Math.round((annualBasicPay * 5) / 100);
          console.log("calculatedAmount12323", calculatedAmount);
        } else if (annualBasicPay >= 500001 && annualBasicPay <= 1000000) {
          calculatedAmount = Math.round((annualBasicPay * 20) / 100);
        } else if (annualBasicPay > 1000000) {
          calculatedAmount = Math.round((annualBasicPay * 30) / 100);
        }
        break;
      }

      case "ESIC":
        console.log("currentBasicPayESIC", currentBasicPay);
        if (currentBasicPay >= 21000) {
          calculatedAmount = currentBasicPay * 0.0175;
        }
        break;

      case "EPF": {
        const basicPay = basic_pay;
        const allowanceDataString =
          sessionStorage.getItem("emp_salary_allow_details") || "";
        const allowanceData = JSON?.parse(allowanceDataString);
        const daAllowance = allowanceData.find(
          (item: any) => item.name === "DA"
        );
        console.log("daAllowance", daAllowance);
        if (daAllowance) {
          const daAmount = daAllowance.amount_in;
          console.log("currentBasicPay", currentBasicPay);
          const totalAmount = basicPay + daAmount;
          console.log("totalAmount", totalAmount);
          // Calculate EPF (12% of total amount)
          calculatedAmount = Math.round(totalAmount * 0.12);
        } else {
          console.error("DA allowance not found in allowance data");
        }

        console.log("daAllowance", daAllowance);
        if (daAllowance) {
          const daAmount = daAllowance.amount_in;
          console.log("currentBasicPay", currentBasicPay);
          const totalAmount = basic_pay1 + daAmount;
          console.log("totalAmount", totalAmount);
          // Calculate EPF (12% of total amount)
          calculatedAmount = Math.round(totalAmount * 0.12);
        } else {
          console.error("DA allowance not found in allowance data");
        }
        break;
      }

      default:
        calculatedAmount = 0;
        break;
    }

    setEmployeeDeductionDetails((prev: any) => {
      const updatedDetails = [...prev];
      updatedDetails[index] = {
        ...updatedDetails[index],
        name: selectedOption,
        amount_in: calculatedAmount,
      };
      return updatedDetails;
    });
  };

  const handleSubmitForm = (values: any, employeeDeductionDetails: any) => {
    if (typeof window !== "undefined") {
      values.emp_salary_deduction_details = employeeDeductionDetails;
      sessionStorage.setItem("emp_salary_details", JSON.stringify(values));

      if (props.setData) {
        props.setData("emp_salary_details", values, tabIndex);
      }

      router.push(`${pathName}?emp=${empType}&page=10`);
    }
  };

  const COLUMNS_FOR_SLRY_INFRM_INFRM: COLUMNS[] = [
    {
      HEADER: "SL.No.",
      ACCESSOR: "sl_no",
      isRequired: false,
      sl_no: true,
    },
    {
      HEADER: "Name",
      ACCESSOR: "name",
      isRequired: true,
      type: "select",
      placeholder: "Please Select",
      select_options: [
        { id: 1, name: "DA" },
        { id: 2, name: "HRA" },
        { id: 3, name: "DP(A)" },
        { id: 4, name: "ADA(A)" },
        { id: 5, name: "IR(A)" },
        { id: 6, name: "IA(A)" },
        { id: 7, name: "CA(A)" },
        { id: 8, name: "SP(A)" },
        { id: 9, name: "MA(A)" },
        { id: 10, name: "SA(A)" },
      ],
    },

    {
      HEADER: "WFE Date",
      ACCESSOR: "wfe_date",
      isRequired: true,
      type: "date",
    },

    {
      HEADER: "Amount",
      ACCESSOR: "amount_in",
      isRequired: true,
      type: "number",
    },
  ];

  const COLUMNS_FOR_SLRY_DEDUCTION_INFRM_INFRM: COLUMNS[] = [
    {
      HEADER: "SL.No.",
      ACCESSOR: "sl_no",
      isRequired: false,
      sl_no: true,
    },
    {
      HEADER: "Name",
      ACCESSOR: "name",
      isRequired: true,
      type: "select",
      placeholder: "Please Select",
      select_options: [
        { id: 1, name: "GPF(%)" },
        { id: 2, name: "EPF(%)" },
        { id: 3, name: "Vol EPF(A)" },
        { id: 4, name: "QR(A)" },
        { id: 5, name: "PT" },
        { id: 6, name: "IT" },
        { id: 7, name: "LIC Policy -1" },
        { id: 8, name: "LIC Policy -2" },
        { id: 9, name: "LIC Policy -3" },
        { id: 10, name: "LIC Policy -4" },
        { id: 11, name: "LIC Policy -5" },
        { id: 12, name: "LIC Policy -6" },
        { id: 13, name: "Hire Charge" },
        { id: 14, name: "Water Rent" },
        { id: 15, name: "Rent Payment" },
        { id: 16, name: "Telephone Bills" },
      ],
    },

    {
      HEADER: "WFE Date",
      ACCESSOR: "wfe_date",
      isRequired: true,
      type: "date",
    },

    {
      HEADER: "A/C No.",
      ACCESSOR: "acnt_no",
      isRequired: true,
      type: "number",
    },
    {
      HEADER: "Amount",
      ACCESSOR: "amount_in",
      isRequired: true,
      type: "number",
    },
  ];

  function getStateData(key: string, values: any) {
    setEmployeeSalaryDetails((prev: any) => ({ ...prev, [key]: values }));
    setTabIndex(tabIndex);
  }

  function getDataSesson() {
    setSession(1);
  }
  function resetData() {
    setResetTable(resetTable + 1);
  }

  /////////////////////////////////

  return (
    <div>
      {/* <SubHeading className="text-[20px] pt-4">Salary Information</SubHeading> */}

      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Salary Information
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

      {/* -----------------------Radio option for salary ----------------------------------- */}
      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md mt-10">
        <SubHeading>Employee Salary Information</SubHeading>

        <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
          <div className="flex-all-center ">
            <input
              id="accounting"
              type="radio"
              onChange={() => setTabIndex(1)}
              name="radio-1"
              className="radio border border-zinc-600"
              defaultChecked
            />
            <label htmlFor="accounting" className=" cursor-pointer">
              Allowances
            </label>
          </div>

          <div className="flex-all-center ">
            <input
              id="function"
              onChange={() => setTabIndex(2)}
              type="radio"
              name="radio-1"
              className="radio  border-zinc-600"
            />
            <label htmlFor="function" className=" cursor-pointer">
              Deductions
            </label>
          </div>
        </div>

        {/* -----------------------Radio option based form fiels----------------------------------- */}

        {tabIndex === 1 && (
          <>
            <TableFormContainer
              columns={COLUMNS_FOR_SLRY_INFRM_INFRM}
              getData={[]}
              subHeading={" "}
              setData={getStateData}
              session_key="emp_salary_allow_details"
              setSession={session}
              validate={setIsValidate}
            />
          </>
        )}

        {tabIndex === 2 && (
          <>
            <div className="overflow-auto hide-scrollbar">
              <table className="overflow-x-hidden">
                <thead className="text-[1rem] bg-primary_green text-[#211F35]  ">
                  <tr>
                    {COLUMNS_FOR_SLRY_DEDUCTION_INFRM_INFRM?.map(
                      (cols, index: number) => (
                        <>
                          <th
                            key={index}
                            // className="w-full"
                            // className={`font-medium ${index === 0 ? "w-[2%]" : "w-[2%]"}`}
                          >
                            <div className="flex gap-2 py-2 px-2 rounded-md">
                              <span>{cols.HEADER}</span>
                            </div>
                          </th>
                        </>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {employeeDeductionDetails?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="w-[10%] px-5">{index + 1}</td>
                      <td className="w-[20%]">
                        <select
                          value={employeeDeductionDetails[index].name}
                          onChange={(e) => handleSelectChange(e, index)}
                          className="w-[20rem] border rounded-xl p-2 mt-2"
                        >
                          <option value="">Please Select</option>
                          <option value="GPF">GPF</option>
                          <option value="EPF">EPF</option>
                          <option value="PT">PT</option>
                          <option value="IT">IT</option>
                          <option value="Vol EPF(A)"> Vol EPF(A)</option>
                          <option value="QR(A)">QR(A)</option>
                          <option value="LIC Policy- 1">LIC Policy- 1</option>
                          <option value="LIC Policy- 2">LIC Policy- 2</option>
                          <option value="LIC Policy- 3">LIC Policy- 3</option>
                          <option value="LIC Policy- 4">LIC Policy- 4</option>
                          <option value="LIC Policy- 5">LIC Policy- 5</option>
                          <option value="LIC Policy- 6">LIC Policy- 6</option>
                          <option value="Hire Charge">Hire Charge</option>
                          <option value="Rent Payment">Rent Payment</option>
                          <option value="Telephone Bills">
                            Telephone Bills
                          </option>
                          <option value="ESIC">ESIC</option>
                        </select>
                      </td>

                      <td className="w-[20%] ">
                        <input
                          type="date"
                          className=" bg-transparent outline-none w-[15rem]"
                          placeholder={"Enter Date"}
                          value={item.wfe_date}
                          onChange={(e) =>
                            setEmployeeDeductionDetails((prev: any) => {
                              const updateData = [...prev];
                              updateData[index].wfe_date = e.target.value;
                              return updateData;
                            })
                          }
                        />
                      </td>
                      <td className="w-[10%]">
                        <input
                          type="number"
                          className="bg-transparent outline-none w-[15rem]"
                          placeholder={"Enter Accnt No "}
                          value={item.acnt_no}
                          onChange={(e) =>
                            setEmployeeDeductionDetails((prev: any) => {
                              const updateData = [...prev];
                              updateData[index].acnt_no = e.target.value;
                              return updateData;
                            })
                          }
                        />
                      </td>

                      <td className="w-[20%]">
                        {["ESIC", "IT", "PT", "EPF"].includes(item.name) ? (
                          <span>{item.amount_in}</span>
                        ) : (
                          <input
                            type="number"
                            value={item.amount_in}
                            placeholder="Enter Amount"
                            onChange={(e) =>
                              setEmployeeDeductionDetails((prev: any) => {
                                const updateData = [...prev];
                                updateData[index].amount_in = Number(
                                  e.target.value
                                );
                                return updateData;
                              })
                            }
                            onKeyPress={(e) => {
                              if (!(e.key >= "0" && e.key <= "9")) {
                                e.preventDefault();
                              }
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                className="float-end rounded-3xl"
                onClick={() => {
                  setEmployeeDeductionDetails((prev: any) => [
                    ...prev,
                    {
                      amount_in: "",
                      name: "",
                      wfe_date: "",
                      acnt_no: "",
                    },
                  ]);
                  storeEmployeeDeductionDetails();
                }}
                variant="primary"
              >
                Add
              </Button>
            </div>
          </>
        )}

        {/* -----------------------Radio option based form fiels----------------------------------- */}

        <div className="flex items-center justify-end mt-5 gap-5">
          <PrimaryButton
            buttonType="button"
            variant={"cancel"}
            onClick={goBack}
          >
            Back
          </PrimaryButton>

          <PrimaryButton
            buttonType="button"
            variant={"cancel"}
            onClick={resetData}
          >
            Reset
          </PrimaryButton>

          {isValidate ? (
            <PrimaryButton
              onClick={() => {
                getDataSesson();
                handleSubmitForm(
                  employeeSalaryDetails,
                  employeeDeductionDetails
                );
              }}
              buttonType="submit"
              variant="primary"
            >
              Next
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => {
                toast.error("Please fill the complete form!");
              }}
              variant="disabled"
            >
              Next
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpSalaryDetails;
