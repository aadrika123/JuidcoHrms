"use client";

import React, { useState } from "react";

import type { EmployeeOfficeDetaislType } from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";

import { EmployeeDetailsProps } from "@/utils/types/employee.type";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import TableFormContainerTwo from "@/components/global/organisms/TableFormContainerTwo";

const EmployeeServiceHistory: React.FC<
  EmployeeDetailsProps<EmployeeOfficeDetaislType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const pathName = usePathname();
  const router = useRouter();

  const handleSubmitFormik = (
    values: EmployeeOfficeDetaislType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_office_details", JSON.stringify(values));
      setSubmitting(false);

      if (props.setData) {
        props.setData("emp_office_details", values, tabIndex);
      }
      router.push(`${pathName}?page=2`);
    }
  };

  // ----------------------- TABLE COLUMNS --------------------------------//

  const COLUMNS_FOR_EMP_INCR_DET = [
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
    },

    {
      HEADER: "Increment Amount",
      ACCESSOR: "increment_amount",
      isRequired: true,
    },

    {
      HEADER: "Basic Pay After Increment",
      ACCESSOR: "basic_pay_increment",
      isRequired: true,
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
    },
  ];

  const COLUMNS_FOR_EMP_PROM_DET = [
    {
      HEADER: "SL. No.",
      ACCESSOR: {
        sr_no: {
          from: "",
          to: "",
        },
      },
      isRequired: false,
      sl_no: true,
    },
  ];

  // ----------------------- TABLE COLUMNS --------------------------------//

  return (
    <>
      <SubHeading className="text-[20px] pt-4">
        Employee Service History{" "}
      </SubHeading>
      <div className="">
        <TableFormContainer
          columns={COLUMNS_FOR_EMP_INCR_DET}
          getData={[]}
          subHeading={"Employee Increment Details "}
        />
      </div>

      <div className="">
        <TableFormContainerTwo
          columns={COLUMNS_FOR_EMP_PROM_DET}
          getData={[]}
          subHeading={"Employee Increment Details "}
          doubleField={true}
        />
      </div>

      <div className="flex items-center justify-end mt-5 gap-5">
        <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
          Back
        </PrimaryButton>

        <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton>

        <PrimaryButton buttonType="submit" variant="primary">
          Next
        </PrimaryButton>
      </div>
    </>
  );
};

export default EmployeeServiceHistory;
