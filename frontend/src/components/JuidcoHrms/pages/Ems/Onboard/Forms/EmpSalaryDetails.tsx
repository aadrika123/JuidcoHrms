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

const EmpSalaryDetails: React.FC<
  EmployeeDetailsProps<EmployeeSalaryDetailType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const router = useRouter();
  const pathName = usePathname();
  const empType = useSearchParams().get("emp");
  const [employeeSalaryDetails, setEmployeeSalaryDetails] = useState([]);

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
      ]

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

  const [selectedOption, setSelectedOption] = useState("");

const handleSelectChange = (e:any) => {
  setSelectedOption(e.target.value);
};


  return (
    <div>
      <SubHeading className="text-[20px] pt-4">Salary Information</SubHeading>
      {/* -----------------------Radio option for salary ----------------------------------- */}

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

      {tabIndex === 2 && (
        <>
          <TableFormContainer
            columns={COLUMNS_FOR_SLRY_DEDUCTION_INFRM_INFRM}
            getData={[]}
            subHeading={" "}
            setData={getStateData}
            session_key="emp_salary_deduction_details"
          />
        </>
      )}

       {tabIndex === 1 && (
        <>
          <TableFormContainer
            columns={COLUMNS_FOR_SLRY_INFRM_INFRM}
            getData={[]}
            subHeading={" "}
            setData={getStateData}
            session_key="emp_salary_allow_details"
          />
        </>
      )} 
 

      {/* -----------------------Radio option based form fiels----------------------------------- */}

      <div className="flex items-center justify-end mt-5 gap-5">
        <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
          Back
        </PrimaryButton>

        <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton>

        <PrimaryButton
          onClick={() => handleSubmitForm(employeeSalaryDetails)}
          buttonType="submit"
          variant="primary"
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

export default EmpSalaryDetails;
