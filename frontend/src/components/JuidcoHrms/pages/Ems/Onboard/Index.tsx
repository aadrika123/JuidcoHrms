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
import EmployeeServiceHistory from "./Forms/EmployeeServiceHistory";
import { EmpTimeBound } from "./Forms/EmpTimeBound";
import EmployeeFamilyDetails from "./Forms/EmpFamilyDetails";
import EmpSalaryDetails from "./Forms/EmpSalaryDetails";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import CorrectIcon from "@/assets/icons/correct.png";
import { useWorkingAnimation } from "@/components/Helpers/Widgets/useWorkingAnimation";
import NavTab from "./Tables/NavTab";

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

  function removeSessionsAfterSubmit() {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
  }
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();

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

  const onBoardEmployee = async (
    values: EmployeeOnBoardForm
  ): Promise<EmployeeOnBoardForm> => {
    values.emp_basic_details.dob = DateFormatter(values.emp_basic_details.dob);
    activateWorkingAnimation();
    const res = await axios({
      url: `${HRMS_URL.EMS.create}`,
      method: "POST",
      data: values,
    });
    setEmpId(res.data.data.emp_id);
    return res.data;
  };

  const { mutate } = useMutation(onBoardEmployee, {
    onSuccess: () => {
      toast.success(`Employee Added Successfully!`);
      setShowCongratulations(true);
      hideWorkingAnimation();
      setTimeout(() => {
        removeSessionsAfterSubmit();
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

  return (
    <>
      <Toaster />
      {workingAnimation}
      {showCongratulations && (
        <div className="fixed top-1/2 left-1/2 transform border border-green-800 -translate-x-1/2 -translate-y-1/2 bg-[#F8FFF7] p-8 rounded-md text-black text-center justify-center w-[50%] h-[40%] flex flex-col items-center">
          {/* <div className='mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100" height="100">
                                <circle cx="50%" cy="50%" r="50%" fill="#12743B" />
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" fill="#fff" />
                            </svg>
                        </div> */}
          <Image
            src={CorrectIcon}
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
        {/* <HeaderWidget title="Employee Management System" variant={"view"} /> */}
      </section>

      <div className="flex items-center justify-between border-b-2 pb-7 mb-10">
        <div className="flex items-center">
          <PrimaryButton
            buttonType="button"
            variant={"cancel"}
            onClick={goBack}
            className="border-0 bg-transparent hover:bg-transparent hover:text-[#3592FF] flex items-center"
          >
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              >
                <g clipPath="url(#clip0_949_7008)">
                  <path
                    d="M10.6736 7.20536L4 13.9137L10.6736 20.622C10.7339 20.7012 10.8105 20.7665 10.8981 20.8134C10.9858 20.8604 11.0826 20.888 11.1819 20.8943C11.2812 20.9007 11.3806 20.8856 11.4736 20.8501C11.5666 20.8147 11.6508 20.7597 11.7206 20.6888C11.7905 20.618 11.8443 20.533 11.8784 20.4395C11.9125 20.3461 11.9262 20.2464 11.9184 20.1472C11.9107 20.048 11.8817 19.9517 11.8335 19.8646C11.7853 19.7776 11.7189 19.702 11.6389 19.6429L6.64583 14.6081H19.9306C20.1147 14.6081 20.2914 14.535 20.4216 14.4047C20.5518 14.2745 20.625 14.0979 20.625 13.9137C20.625 13.7295 20.5518 13.5529 20.4216 13.4227C20.2914 13.2924 20.1147 13.2193 19.9306 13.2193H6.64583L11.6389 8.18453C11.7687 8.05376 11.8413 7.87677 11.8407 7.69249C11.84 7.50821 11.7662 7.33174 11.6354 7.20189C11.5047 7.07205 11.3277 6.99946 11.1434 7.00012C10.9591 7.00077 10.7826 7.0746 10.6528 7.20536H10.6736Z"
                    fill="#665DD9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_949_7008">
                    <rect
                      width="25"
                      height="25"
                      fill="white"
                      transform="matrix(0 -1 1 0 0 25)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </i>
            Back
          </PrimaryButton>
        </div>
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Onboarding the Employee
          </SubHeading>
        </div>
      </div>
      {/* <div className="flex justify-between mb-10">
        <SubHeading>
        Employee Office Details      
            <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z" fill="#6565DD" />
            </svg>
          </i>
        </SubHeading>
      </div> */}

      <section className="">
        {/* <section className="border rounded-lg bg-white border-[#D9E4FB] p-6 px-10 shadow-md" > */}

        {/* <NavTab/> */}
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
          ) : searchParam === "11" ? (
            <>
              {/* <EmpTimeBound setData={getStateData} />

              <aside className="flex w-full items-center justify-end mt-3">
                <Button
                  buttontype="button"
                  variant="primary"
                  onClick={() => mutate(employeeOnBoardDetails)}
                >
                  Save
                </Button>
              </aside> */}
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};
