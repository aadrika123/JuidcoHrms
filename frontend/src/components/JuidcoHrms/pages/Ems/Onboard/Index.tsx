/**
 * Author: Krish
 * status: Open
 *
 */

"use client";

// Imports // ----------------------------------------------------------------
import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";

import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { SubHeading } from "@/components/Helpers/Heading";
import { HRMS_URL } from "@/utils/api/urls";
import goBack, { DateFormatter } from "@/utils/helper";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import EmployeeOfficeDetails from "./Forms/EmpOfficeDetails";
import {
  EmployeeOnBoardAllTypes,
  EmployeeOnBoardForm,
} from "@/utils/types/employee.type";
import { useSearchParams } from "next/navigation";
import EmployeeBasicDetails from "./Forms/EmpBasicDetails";
import EmpployeePersonalDetails from "./Forms/EmpPersonalDetails";
import Button from "@/components/global/atoms/Button";
import EmpPresentAddress from "./Forms/EmpPresentAddress";
import EmpInitialJoinDetails from "./Forms/EmpInitialJoinDetails";
import EmpEducationDetails from "./Forms/EmpEducationDetails";
import EmpLoanDetails from "./Forms/EmpLoanDetails";
import EmployeeServiceHistory from "./Forms/EmployeeServiceHistory";
// Imports // ----------------------------------------------------------------

// ----------------Types---------------------//

// ----------------Types---------------------//

// Main Functions // ----------------------------------------------------------------
export const EmployeeOnBoard = () => {
  const queryClient = useQueryClient();
  const searchParam = useSearchParams().get("page");
  // ----------Employee All Detail states------------ //
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [employeeOnBoardDetails, setEmployeeOnBoardDetails] = useState<any>(
    () =>
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("emp_onboard") as string) || {}
        : {}
  );
  // ----------Employee All Detail states------------ //

  // ------------------ Functions ------------------//
  function getStateData(
    key: keyof EmployeeOnBoardForm,
    values: EmployeeOnBoardAllTypes,
    index?: number
  ) {
    setEmployeeOnBoardDetails((prev: any) => ({ ...prev, [key]: values }));
    setTabIndex(index || tabIndex);
  }

  useEffect(() => {
    sessionStorage.setItem(
      "emp_onboard",
      JSON.stringify(employeeOnBoardDetails)
    );
  }, [employeeOnBoardDetails]);

  // ------------------ Functions ------------------//

  // Add Bank Details
  const createVendorDetails = async (
    values: EmployeeOnBoardForm
  ): Promise<EmployeeOnBoardForm> => {
    values.emp_basic_details.dob = DateFormatter(values.emp_basic_details.dob);

    const res = await axios({
      url: `${HRMS_URL.EMS.create}`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  const { mutate } = useMutation(createVendorDetails, {
    onSuccess: () => {
      toast.success("Successfully Added Vendor Details!");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("vendor-list");
      setTimeout(() => {
        goBack();
      }, 1000);
    },
  });

  return (
    <>
      <Toaster />
      <section>
        <HeaderWidget title="Employee Management System" variant={"view"} />
      </section>
      <section className="border rounded-lg bg-white border-[#12743B] p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>
            Onboarding the Employee
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z"
                  fill="#4F4F55"
                />
              </svg>
            </i>
          </SubHeading>
        </div>

        <div className="mt-8">
          {searchParam === "1" || !searchParam ? (
            <EmployeeOfficeDetails setData={getStateData} />
          ) : searchParam === "2" ? (
            <EmployeeBasicDetails setData={getStateData} />
          ) : searchParam === "3" ? (
              <EmpployeePersonalDetails setData={getStateData} />
          ) : searchParam === "4" ? (
            <EmpPresentAddress setData={getStateData} />
          ) : searchParam === "5" ? (
            <EmpEducationDetails />
          ): searchParam === "6" ? (
            <>
            <EmpInitialJoinDetails setData={getStateData} />
            <Button
                buttontype="button"
                variant="primary"
                onClick={() => mutate(employeeOnBoardDetails)}
              >
                Save
              </Button>
            </>
          ) : searchParam === "7" ? (
            <EmpLoanDetails setData={getStateData} />
          ) : searchParam === "4" ? (
            <EmployeeServiceHistory setData={getStateData} />
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};
