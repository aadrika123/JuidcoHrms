/*
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Salary details - Employee Salary Information page
 */

"use client";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import React, { useState } from "react";
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

const EmpSalaryDetails: React.FC<
  EmployeeDetailsProps<EmployeeSalaryDetailType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const router = useRouter();
  const pathName = usePathname();
  const empType = useSearchParams().get("emp");
  const [employeeSalaryDetails, setEmployeeSalaryDetails] = useState([{}]);
  const [session, setSession] = useState<number>(0);
  const [isValidate, setIsValidate] = useState<boolean>(true);

  const handleSubmitForm = (values: any) => {
    if (typeof window !== "undefined") {
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
        { id: 1, name: "DA(%)" },
        { id: 2, name: "HRA(%)" },
        { id: 3, name: "DP(A)" },
        { id: 4, name: "ADA(A)" },
        { id: 5, name: "IR(A)" },
        { id: 6, name: "IA(A)" },
        { id: 7, name: "CA(A)" },
        { id: 8, name: "SP(A)" },
        { id: 9, name: "MA(A)" },
        { id: 10, name: "SA(A)" },
      ],

      //       ].filter((option) => {
      // return(
      //   // (option.name === "DA(%)").includes("HRA(%), DP(A), ADA(A), IR(A)"))
      // )

      //       }

      // ].filter((option)=>{
      //   console.log("option", option.name)
      //   return (
      //     (option.name === "DA(%)" && ["HRA(%)", "DP(A)"].includes(option.name)) ||
      //     (option.name === "HRA(%)" && ["DA(%)", "DP(A)"].includes(option.name))
      //     // (values.married_status !== "Single")
      //   );
      // })
      // !option.name.includes("DA(%)")
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
        <h5>Steps-10/11</h5>
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
            <TableFormContainer
              columns={COLUMNS_FOR_SLRY_DEDUCTION_INFRM_INFRM}
              getData={[]}
              subHeading={" "}
              setData={getStateData}
              session_key="emp_salary_deduction_details"
              setSession={session}
              validate={setIsValidate}
            />
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

          {/* <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton> */}

          {isValidate ? (
            <PrimaryButton
              onClick={() => {
                getDataSesson();
                handleSubmitForm(employeeSalaryDetails);
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
