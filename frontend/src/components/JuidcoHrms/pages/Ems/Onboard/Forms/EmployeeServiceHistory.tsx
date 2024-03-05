"use client";

/***
 * Author: Krish
 * Status: Open
 * Date: 24/02/2024
 */

import React, { useState } from "react";

import type { EmployeeServiceHistoryType } from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import { EmployeeDetailsProps } from "@/utils/types/employee.type";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import EmployeePromotionDetailsTable from "@/components/JuidcoHrms/pages/Ems/Onboard/Tables/EmpPromDetailsTable";
import EmployeeTransferDetailsTable from "../Tables/EmpTransferDetailsTable";

const EmployeeServiceHistory: React.FC<
  EmployeeDetailsProps<EmployeeServiceHistoryType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [employeeServiceHistory, setEmloyeeServiceHistory] = useState([]);
  const pathName = usePathname();
  const router = useRouter();

  const handleSubmitForm = (values: any) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_service_history", JSON.stringify(values));

      if (props.setData) {
        props.setData("emp_service_history", values, tabIndex);
      }
      router.push(`${pathName}?page=8`);
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
      ACCESSOR: "increment_date",
      isRequired: true,
      type: "date"
    },

    {
      HEADER: "Increment Amount",
      ACCESSOR: "increment_amount",
      isRequired: true,
      type:"number"
    },

    {
      HEADER: "Basic Pay After Increment",
      ACCESSOR: "basic_pay_increment",
      isRequired: true,
      type:'number'
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
      type:"date"
    },
  ];

  // ----------------------- TABLE COLUMNS --------------------------------//

  function getStateData(key: string, values: any, index?: number) {
    setEmloyeeServiceHistory((prev: any) => ({ ...prev, [key]: values }));
    setTabIndex(index || tabIndex);
  }

  return (
    <>
      <SubHeading className="text-[20px] pt-4">
        Employee Service History{" "}
      </SubHeading>
      <div className="mt-4">
        <TableFormContainer
          setData={getStateData}
          columns={COLUMNS_FOR_EMP_INCR_DET}
          session_key={"emp_inc_details"}
          getData={[]}
          subHeading={"Employee Increment Details "}
          
        />
      </div>

      <div className="">
        <EmployeePromotionDetailsTable setData={getStateData} />
        <EmployeeTransferDetailsTable setData={getStateData} />
      </div>

      <div className="flex items-center justify-end mt-5 gap-5">
        <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
          Back
        </PrimaryButton>

        <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton>

        <PrimaryButton
          onClick={() => handleSubmitForm(employeeServiceHistory)}
          buttonType="submit"
          variant="primary"
        >
          Next
        </PrimaryButton>
      </div>
    </>
  );
};

export default EmployeeServiceHistory;
