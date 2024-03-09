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
import { DateFormatter } from "@/utils/helper";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import EmployeeOfficeDetails from "./Forms/EmpOfficeDetails";
import {
  EmployeeOnBoardAllTypes,
  EmployeeOnBoardForm,
} from "@/utils/types/employee.type";
import { redirect, useSearchParams } from "next/navigation";
import EmployeeBasicDetails from "./Forms/EmpBasicDetails";
import EmpployeePersonalDetails from "./Forms/EmpPersonalDetails";
import Button from "@/components/global/atoms/Button";
import EmpPresentAddress from "./Forms/EmpPresentAddress";
import EmpInitialJoinDetails from "./Forms/EmpInitialJoinDetails";
import EmpEducationDetails from "./Forms/EmpEducationDetails";
import EmpLoanDetails from "./Forms/EmpLoanDetails";
import EmployeeServiceHistory from "./Forms/EmployeeServiceHistory";
import { EmpTimeBound } from "./Forms/EmpTimeBound";
import EmployeeFamilyDetails from "./Forms/EmpFamilyDetails";
import EmpSalaryDetails from "./Forms/EmpSalaryDetails";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Imports // ----------------------------------------------------------------

// ----------------Types---------------------//

// ----------------Types---------------------//

// Main Functions // ----------------------------------------------------------------
export const EmployeeOnBoard = () => {
  const queryClient = useQueryClient();
  const searchParam = useSearchParams().get("page");
  const [empId, setEmpId] = useState();
  // ----------Employee All Detail states------------ //
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [employeeOnBoardDetails, setEmployeeOnBoardDetails] = useState<any>(
    () =>
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("emp_onboard") as string) || ``
        : {}
  );

  const router = useRouter();
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
  // console.log(employeeOnBoardDetails, "index");

  // ------------------ Functions ------------------//

  // Add Bank Details
  const createVendorDetails = async (
    values: EmployeeOnBoardForm
  ): Promise<EmployeeOnBoardForm> => {
    values.emp_basic_details.dob = DateFormatter(values.emp_basic_details.dob);
    console.log(values, "valll");
    const res = await axios({
      url: `${HRMS_URL.EMS.create}`,
      method: "POST",
      data: values,
    });
    setEmpId(res.data.data.emp_id);
    return res.data;
  };
  const { mutate } = useMutation(createVendorDetails, {
    onSuccess: () => {
      toast.success(`Employee Added Successfully!`);
      setShowCongratulations(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("employee-onboard");
    },
  });

  console.log("first", empId);

  return (
    <>
      <Toaster />

      {showCongratulations && (
        <div className="fixed top-1/2 left-1/2 transform border border-green-800 -translate-x-1/2 -translate-y-1/2 bg-[#F8FFF7] p-8 rounded-md text-black text-center justify-center w-[50%] h-[40%] flex flex-col items-center">
          {/* <div className='mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100" height="100">
                                <circle cx="50%" cy="50%" r="50%" fill="#12743B" />
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" fill="#fff" />
                            </svg>
                        </div> */}
          <Image
            src="/icons/correct.jpeg"
            alt="Correct Icon"
            width={200}
            height={200}
          />
          <h2 className="text-lg mb-4">
            For new employee ID #{empId || ""} has been generated successfully.
          </h2>
        </div>
      )}

      <section>
        <HeaderWidget title="Employee Management System" variant={"view"} />
      </section>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Onboarding the Employee
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z" fill="#6565DD" />
            </svg>
          </i>
        </SubHeading>
      </div>

      <section className="border rounded-lg bg-white border-[#D9E4FB] p-6 px-10 shadow-md" >


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
            <EmpEducationDetails setData={getStateData} />
          ) : searchParam === "6" ? (
            <>
              <EmpInitialJoinDetails setData={getStateData} />
            </>
          ) : searchParam === "7" ? (
            //
            <EmployeeServiceHistory setData={getStateData} />
          ) : searchParam === "8" ? (
            <>
              <EmployeeFamilyDetails setData={getStateData} />
            </>
          ) : //
            searchParam === "9" ? (
              //
              <EmpSalaryDetails setData={getStateData} />
            ) : searchParam === "10" ? (
              <EmpLoanDetails setData={getStateData} />
            ) : searchParam === "11" ? (
              <>
                <EmpTimeBound setData={getStateData} />

                <aside className="flex w-full items-center justify-end mt-3">
                  <Button
                    buttontype="button"
                    variant="primary"
                    onClick={() => mutate(employeeOnBoardDetails)}
                  >
                    Save
                  </Button>
                </aside>
              </>
            ) : (
              <></>
            )}
        </div>
      </section>
    </>
  );
};
