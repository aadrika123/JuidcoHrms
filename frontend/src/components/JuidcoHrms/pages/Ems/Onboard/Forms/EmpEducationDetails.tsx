/***
 * Author: Jaideep
 * Status: Open
 * Uses: Employee Education details & Employee Training Information - Employee Education page
 */

"use client";

import React, { useState, useEffect } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import {
  EmployeeDetailsProps,
  EmployeeEducationDetailsType,
} from "@/utils/types/employee.type";
import EmpEducationTable from "../Tables/EmpEducationTable";
import EmployeeTrainingTable from "../Tables/EmpTrainingTable";
import toast from "react-hot-toast";

const EmpEducationDetails: React.FC<
  EmployeeDetailsProps<EmployeeEducationDetailsType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [session, setSession] = useState<boolean>(false);
  const [resetTable, setResetTable] = useState<number>(0);
  const [employeeEducationDetails, setEmployeeEducationDetails] = useState<
    EmployeeEducationDetailsType[]
  >([]);
  const pathName = usePathname();
  const router = useRouter();

  const handleSubmitForm = (values: any) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_education_details", JSON.stringify(values));
      if (props.setData) {
        props.setData("emp_education_details", values, tabIndex);
      }
      router.push(`${pathName}?page=6`);
    }
  };

  function getStateData(key: string, values: any, index?: number) {
    const updatedDetails = Array.isArray(values) ? values : [values];
    setEmployeeEducationDetails(updatedDetails);
    setTabIndex(index || tabIndex);
  }

  function getDataSesson() {
    setSession(!session);
  }

  function resetData() {
    setResetTable(resetTable + 1);
  }

  const [employeeType, setEmployeeType] = useState<number>();

  useEffect(() => {
    const storedJoinDataString = sessionStorage.getItem("emp_basic_details");
    const storedJoinData = storedJoinDataString
      ? JSON.parse(storedJoinDataString)
      : null;
    setEmployeeType(storedJoinData?.emp_type);
  }, []);

  useEffect(() => {
    const isValid = employeeEducationDetails.some((entry:any) =>
      entry.stream &&
      entry.board &&
      entry.passing_year &&
      entry.marks !== undefined &&
      entry.grade &&
      entry.upload_edu
    );
    setIsValidate(isValid);
  }, [employeeEducationDetails]);

  return (
    <div>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Education & Training Details 
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
        <h5>Steps-5/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md">
        <div className="border p-5 rounded-xl shadow overflow-auto hide-scrollbar ">
          <SubHeading className="text-[20px] pt-4">
            Employee Education <span className="text-red-500">*</span>
          </SubHeading>
          <EmpEducationTable
            setData={getStateData}
            validate={setIsValidate}
            setSession={session}
            resetTable={resetTable}
          />
        </div>

        <div className={`border p-5 rounded-xl shadow mt-6 ${employeeType && employeeType === 4 ? "hidden" : "block"}`}>
          <EmployeeTrainingTable
            setData={getStateData}
            setSession={session}
            validate={setIsValidate}
            resetTable={resetTable}
          />
        </div>

        <div className="flex items-center justify-end mt-5 gap-5">
          <PrimaryButton buttonType="button" variant="cancel" onClick={goBack}>
            Back
          </PrimaryButton>
          <PrimaryButton buttonType="button" variant="cancel" onClick={resetData}>
            Reset
          </PrimaryButton>
          {isValidate ? (
            <PrimaryButton
              onClick={() => {
                getDataSesson();
                handleSubmitForm(employeeEducationDetails);
              }}
              buttonType="submit"
              variant="primary"
            >
              Next
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => {
                toast.error("Please fill at least one level of education!");
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

export default EmpEducationDetails;
