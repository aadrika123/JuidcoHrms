/***
 * Author: Jaideep
 * Status: Open
 * Uses: Employee Pension details
 */

"use client";
import PrimaryButton from "@/components/Helpers/Button";
import React, { useState } from "react";
import goBack from "@/utils/helper";
import { InnerHeading, SubHeading } from "@/components/Helpers/Heading";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import Image from "next/image";
import HeadOffice from "@/assets/svg/icons/headOffice.svg";
import JDOffice from "@/assets/svg/icons/jdOffice.svg";
import PPO from "@/assets/svg/icons/ppo.svg";
import GPO from "@/assets/svg/icons/gpo.svg";
import CPO from "@/assets/svg/icons/cpo.svg";
import PPO1 from "@/assets/svg/icons/ppo1.svg";
import Bank from "@/assets/svg/icons/bank.svg";
import EmployeeIcon from "@/assets/icons/employee 1.png";
import { HRMS_URL } from "@/utils/api/urls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import TableListContainer, {
  COLUMNS,
} from "@/components/global/organisms/TableListContainer";

// import NextPrevPagination from "@/components/global/molecules/NextPrevPagination";
import HorizontalStepperPension from "@/components/Helpers/Widgets/StepperPension";
export const last_work_day: string = "2024-12-31";
const Dashboard = () => {
  const queryClient = useQueryClient();

  const chartOptions = {
    chart: {
      type: "donut",
    },
    series: [4, 1],
    labels: ["Approved", "Reject"],
    colors: ["#665DD9", "#3592FF"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  const chartOptions2 = {
    chart: {
      type: "donut",
    },
    series: [2, 1],
    labels: ["Approved", "Reject"],
    colors: ["#665DD9", "#3592FF"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

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
  const [activeStep] = useState(0);

  const useCodeQuery = (endpoint: string) => {
    return useQuery([endpoint, [selectedFilter, selectedData, page]], () =>
      fetchData(endpoint)
    );
  };

  const { data: empPension, error: empLstErr } = useCodeQuery(
    `${HRMS_URL.PENSION.getAll}`
  );

  const { data: department } = useCodeQuery(`${HRMS_URL.DEPARTMENT.get}`);

  const pensionData = {
    ...empPension,
    data: empPension?.data.map((emp: any) => ({
      ...emp,
      deparment: department?.data[emp.emp_department]?.name,
      retiring_date: `${emp.last_working_day}-12-31`
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

  // const handleChangePage = (direction: "prev" | "next") => {
  //   setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  // };

  const currentYear = new Date().getFullYear();

  const steps = [
    { title: "Head of Office" },
    { title: "JD Office" },
    { title: "PPO" },
    { title: "GPO" },
    { title: "CPO" },
    { title: "PPO" },
    { title: "Bank" },
  ];

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

      <div className="w-full flex flex-col sm:flex-row justify-between">
        {/* ----------------------- 1st col code for Pie Chart   ----------------------------------- */}

        <div
          className={`w-auto md:w-6/12 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
        >
          <InnerHeading className="text-xl flex items-center justify-between">
            <div className="flex items-center">
              <i className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <rect width="32" height="32" rx="9" fill="#665DD9" />
                  <path
                    d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                    fill="white"
                    fillOpacity="0.92"
                  />
                </svg>
              </i>
              Process initiated by HR
            </div>

            <div className="menu flex items-center  top-0 right-0 ">
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </InnerHeading>

          <div className="justify-center items-center flex mt-5">
            <ReactApexChart
              options={chartOptions as ApexOptions}
              series={chartOptions.series}
              type="pie"
              height={300}
              width={400}
            />
          </div>
        </div>

        {/* ----------------------- 2nd col code for Pie Chart  ----------------------------------- */}

        <div
          className={`w-auto md:w-6/12 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
        >
          <InnerHeading className="text-xl flex items-center justify-between">
            <div className="flex items-center">
              <i className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <rect width="32" height="32" rx="9" fill="#665DD9" />
                  <path
                    d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                    fill="white"
                    fillOpacity="0.92"
                  />
                </svg>
              </i>
              Disbursement
            </div>
            <div className="menu flex items-center  top-0 right-0 ">
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </InnerHeading>

          <div className="justify-center items-center flex mt-5">
            <ReactApexChart
              options={chartOptions2 as ApexOptions}
              series={chartOptions2.series}
              type="pie"
              height={300}
              width={400}
            />
          </div>
        </div>
      </div>

      <div className="border-b border-zinc-300 p-10 shadow-lg m-5">
        <div className="flex justify-between mb-5">
          <SubHeading>
            <Image src={EmployeeIcon} alt="employee" width={40} height={20} />
            <span className="ml-4">Search Application</span>
          </SubHeading>
        </div>

        {/* -----------------------------------Filter------------------------------------------ */}
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
          {/* <div className="mt-2 px-2 pr-4 mb-2 flex items-center justify-between text-xs text-secondary"> */}
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

          {/* <div className="mt-2 px-2 pr-4 flex items-center justify-between text-xs text-secondary"> */}
          <div className="mt-2 px-2 pr-4 flex items-center justify-between text-xs text-secondary">
            {/* <h2>{userDetails?.name}</h2> */}
            <h2>Head of Office</h2>
            <h2>JD Office</h2>
            <h2>PPO</h2>
            <h2>GPO</h2>
            <h2>CPO</h2>
            <h2>PPO</h2>
            <h2>Bank</h2>
          </div>
        </div>
      </div>

      <section className="m-5 p-10 shadow-lg">
        <h2 className="text-[2rem] text-secondary font-medium">
          No. of Employees to be Retired in Last Year{" "}
          <span className="text-primary_blue"> {currentYear} </span>
        </h2>
        <div className="mt-[3rem]">
          <TableListContainer
            columns={EMP_LIST_COLS}
            tableData={pensionData?.data || []}
            actionBtn
            actionName="Status"
            setEmpId={removeEmployee}
            sl_no={false}
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

export default Dashboard;
