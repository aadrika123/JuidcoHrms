"use client";

/***
 * Author: Krish
 * Status: Open
 * Date: 24/02/2024
 */

import React, { useState } from "react";

import type { EmployeeOfficeDetaislType } from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import { EmployeeDetailsProps } from "@/utils/types/employee.type";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";

const EmployeeFamilyDetails: React.FC<
  EmployeeDetailsProps<EmployeeOfficeDetaislType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [employeeFamilyDetails, setEmployeeFamilyDetails] = useState([]);
  const pathName = usePathname();
  const router = useRouter();

  const handleSubmitForm = (values: any) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_family_details", JSON.stringify(values));

      if (props.setData) {
        props.setData("emp_family_details", values, tabIndex);
      }
      router.push(`${pathName}?page=9`);
    }
  };

  // ----------------------- TABLE COLUMNS --------------------------------//
  const COLUMS_EMP_FAMILY_DETAILS: COLUMNS[] = [
    {
      HEADER: "SL. No.",
      ACCESSOR: "sl_no",
      isRequired: false,
      sl_no: true,
    },
    {
      HEADER: "Name",
      ACCESSOR: "name",
      isRequired: true,
    },
    {
      HEADER: "Relation",
      ACCESSOR: "relation",
      isRequired: true,
    },

    {
      HEADER: "D.O.B",
      ACCESSOR: "dob",
      isRequired: true,
    },

    {
      HEADER: "Dependent",
      ACCESSOR: "dependent",
      type: "radio",
      isRequired: true,
    },
  ];

  const COLUMS_EMP_NOMINEE_DETAILS: COLUMNS[] = [
    {
      HEADER: "SL. No.",
      ACCESSOR: "sl_no",
      isRequired: false,
      sl_no: true,
    },
    {
      HEADER: "Nominee Name ",
      ACCESSOR: "nominee_name",
      isRequired: true,
    },
    {
      HEADER: "Relation",
      ACCESSOR: "relation",
      isRequired: true,
    },

    {
      HEADER: "Percentage",
      ACCESSOR: "percentage",
      isRequired: true,
      type:"number"
    },

    {
      HEADER: "Address",
      ACCESSOR: "address",
      isRequired: true,
    },
    {
      HEADER: "Minor",
      ACCESSOR: "minor",
      isRequired: true,
      type: "radio",
    },
  ];
  // ----------------------- TABLE COLUMNS --------------------------------//

  function getStateData(key: string, values: any, index?: number) {
    setEmployeeFamilyDetails((prev: any) => ({ ...prev, [key]: values }));
    setTabIndex(index || tabIndex);
  }

  return (
    <>
      <SubHeading className="text-[20px] pt-4">
        Employee Family Details
      </SubHeading>
      
      <div className="mt-4">
        <TableFormContainer
          setData={getStateData}
          columns={COLUMS_EMP_FAMILY_DETAILS}
          getData={[]}
          subHeading={""}
          session_key={"emp_fam_details"}
        />

        <TableFormContainer
          setData={getStateData}
          columns={COLUMS_EMP_NOMINEE_DETAILS}
          getData={[]}
          subHeading={"Employee Nominee Details  "}
          session_key={"emp_nominee_details"}
        />
      </div>

      <div className="flex items-center justify-end mt-5 gap-5">
        <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
          Back
        </PrimaryButton>

        <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton>

        <PrimaryButton
          onClick={() => handleSubmitForm(employeeFamilyDetails)}
          buttonType="submit"
          variant="primary"
        >
          Next
        </PrimaryButton>
      </div>
    </>
  );
};

export default EmployeeFamilyDetails;