"use client";

/***
 * Author: Krish
 * Status: Open
 * Date: 24/02/2024
 */

import React, { useState, useEffect } from "react";

import type { EmployeeServiceHistoryType } from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import { EmployeeDetailsProps } from "@/utils/types/employee.type";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import EmployeePromotionDetailsTable from "@/components/JuidcoHrms/pages/Ems/Onboard/Tables/EmpPromDetailsTable";
import EmployeeTransferDetailsTable from "../Tables/EmpTransferDetailsTable";
import toast from "react-hot-toast";

const EmployeeServiceHistory: React.FC<
  EmployeeDetailsProps<EmployeeServiceHistoryType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [employeeServiceHistory, setEmloyeeServiceHistory] = useState([]);
  const [session, setSession] = useState<number>(0);
  const [isValidate, setIsValidate] = useState<boolean>(true);
  const [resetTable, setResetTable] = useState<number>(0);

  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");

  const handleSubmitForm = (values: any) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_service_history", JSON.stringify(values));

      if (props.setData) {
        props.setData("emp_service_history", values, tabIndex);
      }
      router.push(`${pathName}?emp=${empType}&page=8`);
    }
  };

  // ----------------------- TABLE COLUMNS --------------------------------//

  const COLUMNS_FOR_EMP_INCR_DET: COLUMNS[] = [
    {
      HEADER: "SL. No.",
      ACCESSOR: "sl_no",
      isRequired: false,
      sl_no: true,
    },
    {
      HEADER: "Scale",
      ACCESSOR: "scale",
      isRequired: true,
    },

    {
      HEADER: "Increment Date",
      ACCESSOR: "inc_date",
      isRequired: true,
      type: "date",
    },

    {
      HEADER: "Increment Amount",
      ACCESSOR: "inc_amount",
      isRequired: true,
      type: "number",
    },

    {
      HEADER: "Basic Pay After Increment",
      ACCESSOR: "basic_pay_after_inc",
      isRequired: true,
      type: "number",
    },

    {
      HEADER: "Vide Order No.",
      ACCESSOR: "vide_order_no",
      isRequired: true,
    },
    {
      HEADER: "Vide Order Date",
      ACCESSOR: "vide_order_date",
      isRequired: true,
      type: "date",
    },
  ];

  // ----------------------- TABLE COLUMNS --------------------------------//

  function getStateData(key: string, values: any[], index?: number) {
    values.deleteObject();
    setEmloyeeServiceHistory((prev: any) => ({ ...prev, [key]: values }));
    setTabIndex(index || tabIndex);
  }

  function getDataSesson() {
    setSession(1);
  }

  function resetData() {
    setResetTable(resetTable + 1);
  }

  //////////////////////////////////////////////////////////////////

  const [employeeType, setEmployeeType] = useState<number>();

  useEffect(() => {
    const storedJoinDataString = sessionStorage.getItem("emp_basic_details");
    const storedJoinData = storedJoinDataString
      ? JSON.parse(storedJoinDataString)
      : null;

    const empType = storedJoinData?.emp_type;
    setEmployeeType(empType);
  }, []);

  ////////////////////////////////////////////////////////////////

  return (
    <>
      {/* <SubHeading className="text-[20px] pt-4">
        Employee Service History{" "}
      </SubHeading> */}

      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Service History{" "}
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
        <h5>Steps-7/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md">
        <div className="border p-5 rounded-xl shadow mt-4">
          <TableFormContainer
            setData={getStateData}
            columns={COLUMNS_FOR_EMP_INCR_DET}
            session_key={"emp_inc_details"}
            getData={[]}
            subHeading={"Employee Increment Details "}
            setSession={session}
            validate={setIsValidate}
            // resetTable={resetTable}
          />
        </div>

        <div className="border p-5 rounded-xl shadow mt-4">
          <EmployeePromotionDetailsTable
            setData={getStateData}
            setSession={session}
            validate={setIsValidate}
            resetTable={resetTable}
          />
        </div>

        {/* <div className="border p-5 rounded-xl shadow mt-4">
          <EmployeeTransferDetailsTable
            setData={getStateData}
            setSession={session}
            validate={setIsValidate}
            resetTable={resetTable}
          />
        </div> */}
        {/* {employeeType && employeeType !== 4 && ( */}
        <div
          className={`border p-5 rounded-xl shadow mt-4 ${employeeType && employeeType !== 4 ? "block" : "hidden"}`}
        >
          <EmployeeTransferDetailsTable
            setData={getStateData}
            setSession={session}
            validate={setIsValidate}
            resetTable={resetTable}
          />
        </div>
        {/* )} */}

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
                handleSubmitForm(employeeServiceHistory);
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
    </>
  );
};

export default EmployeeServiceHistory;
