/* eslint-disable @typescript-eslint/no-explicit-any */
/***
 * Author: Jaideep
 * Status: Open
 * Uses: Employee Pension details
 */

"use client";
import PrimaryButton from "@/components/Helpers/Button";
import React, { useState } from "react";
import goBack from "@/utils/helper";
import { SubHeading } from "@/components/Helpers/Heading";

// import Image from "next/image";
// import HeadOffice from "@/assets/svg/icons/headOffice.svg";
// import JDOffice from "@/assets/svg/icons/jdOffice.svg";
// import PPO from "@/assets/svg/icons/ppo.svg";
// import GPO from "@/assets/svg/icons/gpo.svg";
// import CPO from "@/assets/svg/icons/cpo.svg";
// import PPO1 from "@/assets/svg/icons/ppo1.svg";
// import Bank from "@/assets/svg/icons/bank.svg";
// import EmployeeIcon from "@/assets/icons/employee 1.png";
import { HRMS_URL } from "@/utils/api/urls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import TableListContainer, {
  COLUMNS,
} from "@/components/global/organisms/TableListContainer";

// import NextPrevPagination from "@/components/global/molecules/NextPrevPagination";
// import HorizontalStepperPension from "@/components/Helpers/Widgets/StepperPension";
export const last_work_day: string = "2024-12-31";
const ProcessedDashboard = () => {
  const queryClient = useQueryClient();

  const EMP_LIST_COLS: COLUMNS[] = [
    {
      HEADER: "Employee Name",
      ACCESSOR: "emp_name",
    },

    {
      HEADER: "Employment ID",
      ACCESSOR: "emp_id",
    },
    {
      HEADER: "Department",
      ACCESSOR: "deparment",
    },
    {
      HEADER: "Date Of Joining",
      ACCESSOR: "doj",
    },
    {
      HEADER: "Last Date of Working",
      ACCESSOR: "retiring_date",
    },
  ];

  const fetchData = async (endpoint: string) => {
    if (endpoint === "null") return [];
    const res = await axios({
      url: `${endpoint}`,
      method: "GET",
    });

    return res.data?.data;
  };

  const [selectedFilter] = useState<number | null>(null);
  const [selectedData] = useState<number | null>(null);

  const [page] = useState<number>(1);
  // const [activeStep] = useState(0);

  const useCodeQuery = (endpoint: string) => {
    return useQuery([endpoint, [selectedFilter, selectedData, page]], () =>
      fetchData(endpoint)
    );
  };

  const { data: empPension, error: empLstErr } = useCodeQuery(
    `${HRMS_URL.PENSION.getAll}?processed=true`
  );

  const { data: department } = useCodeQuery(`${HRMS_URL.DEPARTMENT.get}`);

  const pensionData = {
    ...empPension,
    data: empPension?.data.map((emp: any) => ({
      ...emp,
      deparment: department?.data[emp.emp_department]?.name,
      retiring_date: `${emp.last_working_day}-12-31`,
    })),
  };

  if (empLstErr) toast.error("Failed to fetch data");

  // REMOVE EMPLOYEE
  const remEmployee = async (id: number) => {
    try {
      const res = await axios({
        url: `${HRMS_URL.EMS.delete}`,
        method: "POST",
        data: {
          id: id,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation(remEmployee, {
    onSuccess: () => {
      toast.success("Removed Employee");
    },
    onError: () => {
      alert("Error removing Employee");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const removeEmployee = (id: number) => {
    const confirm = window.confirm("Are you sure want to delete this Employee");
    if (confirm) mutate(id);
  };

  // const steps = [
  //   { title: "Head of Office" },
  //   { title: "JD Office" },
  //   { title: "PPO" },
  //   { title: "GPO" },
  //   { title: "CPO" },
  //   { title: "PPO" },
  //   { title: "Bank" },
  // ];

  return (
    <>
      <Toaster />
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
            Pension Management
          </SubHeading>
        </div>
      </div>

      {/* <div className="border-b border-zinc-300 p-10 shadow-lg m-5">
        <div className="flex justify-between mb-5">
          <SubHeading>
            <Image src={EmployeeIcon} alt="employee" width={40} height={20} />
            <span className="ml-4">Search Application</span>
          </SubHeading>
        </div>

        <section className="flex items-end gap-12 w-full pl-16 pb-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="search-by" className="text-secondary text-lg">
              Search By
            </label>
            <input
              type="text"
              className="border border-slate-300 p-3 bg-transparent"
            />
          </div>

          <PrimaryButton
            variant="primary"
            className="flex items-center gap-2 text-lg"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.5001 16.5667C12.5334 16.8167 12.4501 17.0833 12.2584 17.2583C12.1813 17.3356 12.0898 17.3969 11.989 17.4387C11.8882 17.4805 11.7801 17.502 11.6709 17.502C11.5618 17.502 11.4537 17.4805 11.3529 17.4387C11.2521 17.3969 11.1605 17.3356 11.0834 17.2583L7.74178 13.9167C7.65089 13.8278 7.58178 13.7192 7.53986 13.5992C7.49793 13.4792 7.48433 13.3511 7.50011 13.225V8.95833L3.50844 3.85C3.37312 3.67628 3.31205 3.45605 3.3386 3.23744C3.36514 3.01883 3.47714 2.81962 3.65011 2.68333C3.80844 2.56667 3.98344 2.5 4.16678 2.5H15.8334C16.0168 2.5 16.1918 2.56667 16.3501 2.68333C16.5231 2.81962 16.6351 3.01883 16.6616 3.23744C16.6882 3.45605 16.6271 3.67628 16.4918 3.85L12.5001 8.95833V16.5667ZM5.86678 4.16667L9.16678 8.38333V12.9833L10.8334 14.65V8.375L14.1334 4.16667H5.86678Z"
                  fill="white"
                />
              </svg>
            </span>
            Search record
          </PrimaryButton>
        </section>

        <div className="mt-8 p-4">
          <div className="mt-2 px-2 pr-4 mb-2 flex items-center justify-between text-xs text-secondary">
            <Image src={HeadOffice} alt="employee" width={40} height={20} />
            <Image src={JDOffice} alt="employee" width={40} height={20} />
            <Image src={PPO} alt="employee" width={40} height={20} />
            <Image src={GPO} alt="employee" width={40} height={20} />
            <Image src={CPO} alt="employee" width={40} height={20} />
            <Image src={PPO1} alt="employee" width={40} height={20} />
            <Image src={Bank} alt="employee" width={40} height={20} />
          </div>

          <HorizontalStepperPension steps={steps} activeStep={activeStep} />

          <div className="mt-2 px-2 pr-4 flex items-center justify-between text-xs text-secondary">
            <h2>Head of Office</h2>
            <h2>JD Office</h2>
            <h2>PPO</h2>
            <h2>GPO</h2>
            <h2>CPO</h2>
            <h2>PPO</h2>
            <h2>Bank</h2>
          </div>
        </div>
      </div> */}

      <section className="m-5 p-10 shadow-lg">
        <h2 className="text-[2rem] text-secondary font-medium">
          Processed Pensions{" "}
          {/* <span className="text-primary_blue"> {currentYear} </span> */}
        </h2>
        <div className="mt-[3rem]">
          <TableListContainer
            columns={EMP_LIST_COLS}
            tableData={pensionData?.data || []}
            actionBtn
            actionName="Action"
            setEmpId={removeEmployee}
            sl_no={false}
            action_type={["readonly"]}
            pensionView
          />
        </div>
        <aside className="mt-16">
          <div>
            {/* <NextPrevPagination
              page={empLstData?.currentPage}
              pageCount={empLstData?.totalPage}
              handlePageChange={handleChangePage}
            /> */}
          </div>
        </aside>
      </section>
    </>
  );
};

export default ProcessedDashboard;
