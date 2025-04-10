"use client";

/***
 * Author: Krish
 * Status: Open
 * Date: 24/02/2024
 */

import React, { useState , useEffect} from "react";

import type { EmployeeFamilyDetailsType } from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import { EmployeeDetailsProps } from "@/utils/types/employee.type";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import toast from "react-hot-toast";

const EmployeeFamilyDetails: React.FC<
  EmployeeDetailsProps<EmployeeFamilyDetailsType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [employeeFamilyDetails, setEmployeeFamilyDetails] = useState([]);
  const [isValidate, setIsValidate] = useState<boolean>(true);
  const [session, setSession] = useState<number>(0);

  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFamilyDetails = sessionStorage.getItem("emp_family_details");
      if (savedFamilyDetails) {
        setEmployeeFamilyDetails(JSON.parse(savedFamilyDetails));
      }
    }
  }, []);

  const handleSubmitForm = (values: any) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_family_details", JSON.stringify(values));

      if (props.setData) {
        props.setData("emp_family_details", values, tabIndex);
      }
      router.push(`${pathName}?emp=${empType}&page=9`);
    }
  };

  // ----------------------- TABLE COLUMNS --------------------------------//
  const COLUMS_EMP_FAMILY_DETAILS: COLUMNS[] = [
    { HEADER: "SL. No.", ACCESSOR: "sl_no", isRequired: false, sl_no: true },
    { HEADER: "Name", ACCESSOR: "name", isRequired: true },
    { HEADER: "Relation", ACCESSOR: "relation", isRequired: true },
    { HEADER: "D.O.B", ACCESSOR: "dob", isRequired: true, type: "date" },
    { HEADER: "Dependent", ACCESSOR: "dependent", type: "radio", isRequired: true },
  ];

  const COLUMS_EMP_NOMINEE_DETAILS: COLUMNS[] = [
    { HEADER: "SL. No.", ACCESSOR: "sl_no", isRequired: false, sl_no: true },
    { HEADER: "Nominee Name", ACCESSOR: "nominee_name", isRequired: true },
    { HEADER: "Relation", ACCESSOR: "relation", isRequired: true },
    { HEADER: "Percentage", ACCESSOR: "percentage", isRequired: true, type: "number" },
    { HEADER: "Address", ACCESSOR: "address", isRequired: true },
    { HEADER: "Minor", ACCESSOR: "minor", isRequired: true, type: "radio" },
  ];
  // ----------------------- TABLE COLUMNS --------------------------------//

  function getStateData(key: string, values: any, index?: number) {
    setEmployeeFamilyDetails((prev: any) => ({ ...prev, [key]: values }));
    setTabIndex(index || tabIndex);
  }

  function getDataSession() {
    setSession(1);
  }

  return (
    <>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Family Details
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
        <h5>Steps-8/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md">
        <TableFormContainer
          setData={getStateData}
          columns={COLUMS_EMP_FAMILY_DETAILS}
          getData={[]}
          subHeading="Employee Family Details"
          session_key={"emp_fam_details"}
          setSession={session}
          validate={setIsValidate}
        />

        <TableFormContainer
          setData={getStateData}
          columns={COLUMS_EMP_NOMINEE_DETAILS}
          getData={[]}
          subHeading={
            <>
              Employee Nominee Details <span className="text-red-500">*</span>
            </>
          }
          session_key={"emp_nominee_details"}
          setSession={session}
          validate={setIsValidate}
        />

        <div className="flex items-center justify-end mt-5 gap-5">
          <PrimaryButton buttonType="button" variant="cancel" onClick={goBack}>
            Back
          </PrimaryButton>

          <PrimaryButton buttonType="button" variant="cancel">
            Reset
          </PrimaryButton>

          {isValidate ? (
            <PrimaryButton
              onClick={() => {
                getDataSession();
                handleSubmitForm(employeeFamilyDetails);
              }}
              buttonType="submit"
              variant="primary"
            >
              Next
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => toast.error("Please fill the complete form!")}
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

export default EmployeeFamilyDetails;
