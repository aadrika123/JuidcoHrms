/**
 * Author: Jaideep
 * Status: Open
 * Use: Created for edit employee payroll
 */

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileIcon from "@/assets/icons/profile_new.png";
import {
  InnerHeading,
  InnerTextHeading,
  SubHeading,
} from "@/components/Helpers/Heading";
import { HRMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { PayslipTypes } from "@/utils/types/payslip.type";
import { FetchAxios, useCodeQuery } from "@/utils/fetchAxios";

const EditEmployeePayroll = ({ emp }: { emp: string }) => {
  // const [empData, setEmpData] = useState<PayslipTypes>();
  const [isClient, setIsClient] = useState(false);
  const [department, setDepartment] = useState<any[]>([]);
  const [designation, setDesignation] = useState<any[]>([]);

  // =================================================================================== //
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalDayDiff, setTotalDayDiff] = useState(0);

  const handleFromDateChange = (e: React.ChangeEvent<any>) => {
    const selectedDate = e.target.value;
    setFromDate(selectedDate);
    calculateDayDifference(selectedDate, toDate);
  };

  const handleToDateChange = (e: React.ChangeEvent<any>) => {
    const selectedDate = e.target.value;
    setToDate(selectedDate);
    calculateDayDifference(fromDate, selectedDate);
  };

  const calculateDayDifference = (start: any, end: any) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setTotalDayDiff(Math.round(differenceInDays));
    } else {
      setTotalDayDiff(0);
    }
  };

  const hanldeClick = async () => {
    const data = {
      id: 1,
      leave_status: 3,
      total_days: totalDayDiff,
      emp_leave_chart_id: 1,
      leave_type: 1,
      employee_id: "EMP912e43",
    };

    try {
      const res = await axios({
        // url: `${HRMS_URL.LEAVECHART.create}/EMP912e43`,
        url: "/employee/leave-update",
        method: "POST",
        data: data,
      });

      sessionStorage.setItem("day_diff", JSON.stringify(totalDayDiff));

      toast.success("Employee Leave updated");
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  console.log("Saving...", totalDayDiff);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const _data = sessionStorage.getItem("day_diff");
      if (_data === "null") setTotalDayDiff(0);
      const data = JSON.parse(_data as string);
      console.log(data, "dfif");
      setTotalDayDiff(data);
    }
  }, []);

  // =================================================================================== //

  const employeePayrollData = useSelector(
    (state: any) => state.payroll.payroll
  );

  const fetchData = async () => {
    const res = await axios({
      url: `${HRMS_URL.LEAVEGET.get}?emp_id=${emp}`,
      method: "GET",
    });
    return res.data?.data;
  };

  // const [empData, setEmpData] = useState<any>({});

  // const fetchEmpData = async () => {
  //   try {
  //     const res = await axios({
  //       url: `/pay/payslip?emp_id=${emp}&date=${"2024-04-29"}`,
  //       method: "GET",
  //     });
  //     setEmpData(res.data?.data);
  //   } catch (error) {
  //     console.error("Error fetching employee data:", error);
  //     setEmpData(null);
  //   }
  // };

  // useEffect(() => {
  //   fetchEmpData();
  // }, [emp]);

  const currentDate = new Date();
  const newDate = new Date().getFullYear();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const currentMonth = monthName.toUpperCase();

  //--------------------------- GET EMPLOYEE PAYSLIP DETAILS ---------------------------//
  const fetchConfig: FetchAxios = {
    url: `${HRMS_URL.PAYSLIP.getAll}`,
    url_extend: `?emp_id=${emp}&date=${currentDate.toISOString()}`,
    method: "GET",
    res_type: 1,
    query_key: "emp_payslip_details",
    data: [],
  };
  const { data: empData, error } = useCodeQuery<PayslipTypes>(fetchConfig);
  if (error) toast.error("OOps! Failed to get employee nominee details!");
  //--------------------------- GET EMPLOYEE PAYSLIP DETAILS ---------------------------//

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data } = useQuery(["leaveData", emp], fetchData);

  const fetchEmpProfile = async () => {
    try {
      const res = await axios({
        url: `/employee/get-single/${emp}`,
        method: "GET",
      });
      return res.data?.data;
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const { data: EmpProfile } = useQuery(["emp_profile", emp], fetchEmpProfile);

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${HRMS_URL.DEPARTMENT.get}`,
        method: "GET",
      });
      const data = res?.data?.data?.data;
      setDepartment(data);
    })();
  }, [EmpProfile?.emp_id]);

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${HRMS_URL.DESIGNATION.get}`,
        method: "GET",
      });
      const data = res?.data?.data?.data;
      setDesignation(data);
    })();
  }, [EmpProfile?.emp_id]);

  // ------------- date and month calculation -------------------- //

  // ----------------------------GET TDS -------------------------//
  const fetchTDS: FetchAxios = {
    url: `${HRMS_URL.PAYSLIP.getAll}`,
    url_extend: `?emp_id=${emp}&date=${currentDate.toISOString()}&name=TDS,EPF,ESIC`,
    method: "GET",
    res_type: 1,
    query_key: "emp_tds_detail",
    data: [],
  };
  const { data: deductions } = useCodeQuery<PayslipTypes>(fetchTDS);
  if (error) toast.error("OOps! Failed to get employee nominee details!");

  function extractAmountFromDeductions(data: any[], key: string): number {
    const zxt = data?.filter((object) => object.name === key);
    if (!zxt) return 0;
    return zxt[0]?.amount_in;
  }
  // const TDS_AMOUNT = extractAmountFromDeductions(
  //   deductions?.emp_salary_details.emp_salary_deduction,
  //   "TDS"
  // );

  const EPF_AMOUNT = extractAmountFromDeductions(
    deductions?.emp_salary_details.emp_salary_deduction,
    "EPF"
  );

  const ESIC_AMOUNT = extractAmountFromDeductions(
    deductions?.emp_salary_details.emp_salary_deduction,
    "ESIC"
  );
  // ----------------------------GET TDS -------------------------//

  return (
    <>
      <Toaster />
      {isClient ? (
        <>
          {/* Header of page */}
          <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
            <BackButton />
            <div>
              <SubHeading className="mx-5 my-5 mb-0 text-4xl">
                Payroll Management
              </SubHeading>
            </div>
          </div>
          {/* Header of page */}

          {/* 1st col starts */}

          <div className="flex shadow-lg rounded-lg">
            <div className="w-2/12 p-4">
              <div className="h-64 rounded-lg p-4">
                <Image src={ProfileIcon} width={200} height={200} alt="logo" />
              </div>
            </div>
            <div className="w-5/12 p-4">
              <div className="rounded-lg p-4">
                <SubHeading className="font-extrabold">
                  {employeePayrollData?.emp_name}
                </SubHeading>
                <InnerHeading>Employee ID- {EmpProfile?.emp_id}</InnerHeading>
                <InnerHeading>Pan no.- 34535345345 </InnerHeading>
                <InnerHeading>
                  Role-{" "}
                  {EmpProfile
                    ? designation[EmpProfile?.emp_join_details?.designation_id]
                        ?.name
                    : ""}{" "}
                </InnerHeading>
                <InnerHeading>
                  Task- {EmpProfile?.emp_join_details?.task}
                </InnerHeading>
                <InnerHeading>
                  Department-{" "}
                  {EmpProfile
                    ? department[EmpProfile?.emp_join_details?.department_id]
                        ?.name
                    : ""}{" "}
                </InnerHeading>
              </div>
            </div>

            <div className="w-5/12 p-4">
              <div className="rounded-lg p-4 mt-7">
                <InnerHeading>
                  Account No.-{" "}
                  {EmpProfile?.emp_join_details?.acc_number || "No data"}
                </InnerHeading>
                <InnerHeading>
                  IFSC Code.- {EmpProfile?.emp_join_details?.ifsc || "No data"}
                </InnerHeading>
                <InnerHeading>UAN No- EFFG33432R</InnerHeading>
              </div>
            </div>
          </div>

          {/* 1st col end */}

          {/* 2nd col starts */}
          <div className="w-full flex flex-col sm:flex-row justify-between ">
            <div
              className={`w-auto md:w-6/12 sm:w-full h-auto mt-5 mb-5 flex flex-col relative bg-[#ffffff] p-10 shadow-lg rounded-2xl `}
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
                  Attendance Details
                </div>

                <div className={`w-full md:w-[56.3%] self-end max-w-[800px]`}>
                  <div className="w-full flex flex-col sm:flex-row justify-between ">
                    <div
                      className={`w-full md:w-[48.5%] flex flex-col items-center justify-center relative border-r-2 border-[#C1C9EB] `}
                    >
                      <span className="text-[#574CDD] text-3xl font-bold">
                        {employeePayrollData?.present_days + totalDayDiff}
                      </span>
                      <InnerTextHeading className="text-center">
                        Total No. of Present Days
                      </InnerTextHeading>
                    </div>

                    <div
                      className={`w-full md:w-[48.5%]  flex flex-col items-center justify-center relative`}
                    >
                      <span className="text-[#098DA4] text-3xl font-bold">
                        {(((employeePayrollData?.leave_days as number) +
                          employeePayrollData?.lwp_days) as number) -
                          totalDayDiff}
                      </span>
                      <InnerTextHeading className="text-center">
                        Total No. of Absent Days
                      </InnerTextHeading>
                    </div>
                  </div>
                </div>
              </InnerHeading>

              <div className="flex flex-col mt-20">
                <div className="text-sm">
                  <span>Type of Leave - {data?.emp_leave_type?.name}</span>
                </div>
                <div className="text-sm">
                  <span>
                    Date of Leave - {data?.leave_from} to {data?.leave_to}
                  </span>
                </div>
                <div className="text-sm">
                  <span>Total day of leave- {data?.total_days}</span>
                </div>
                <div className="text-sm">
                  <span className="text-sm">
                    Status of leave-{" "}
                    <span className="text-green-600">
                      {data ? (
                        <>{data.leave_status === 3 ? "Approve" : "Pending"}</>
                      ) : (
                        <></>
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`w-auto md:w-6/12 sm:w-full h-auto mt-5 mb-5 flex flex-col relative bg-[#ffffff] p-10 shadow-lg ml-5 rounded-2xl`}
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
                  Permissible Leave
                </div>
              </InnerHeading>

              <div>
                <InnerHeading className="mx-4 mt-5">Date Range</InnerHeading>
                <span className="mt-5">
                  <input
                    type="date"
                    className="border mx-4 p-3"
                    value={fromDate}
                    onChange={handleFromDateChange}
                  />
                  To
                  <input
                    type="date"
                    className="border mx-4 p-3"
                    value={toDate}
                    onChange={handleToDateChange}
                  />
                </span>
                <button
                  type="button"
                  onClick={hanldeClick}
                  className="w-20 mt-4 bg-[#4338CA] text-white rounded-md py-2 px-4"
                >
                  Enter
                </button>
                {totalDayDiff !== 0 && (
                  <div className="mt-4">
                    Total: {totalDayDiff} {totalDayDiff === 1 ? "day" : "days"}
                  </div>
                )}
              </div>
            </div>

            {/* 2nd col end */}
          </div>

          {/* 3rd col starts */}

          <div>
            <div className="w-full sm:w-full h-auto mb-5 rounded-2xl flex flex-col relative bg-[#ffffff] pt-10 pb-10 shadow-lg">
              <div className="">
                <div>
                  <h1 className="w-full text-black font-serif font-bold flex justify-center">
                    GOVT. OF JHARKHAND
                  </h1>
                  <p className="w-full text-black font-serif flex justify-center">
                    MUNICIPAL CORPORATION RANCHI
                  </p>
                  <p className="w-full text-black font-serif flex justify-center">
                    RANCHI
                  </p>
                </div>
                <div className="w-full flex justify-center p-7">
                  <span>
                    SALARY SLIP - {currentMonth} - {newDate} SALARY
                  </span>
                </div>

                <div className="  ">
                  <div className="flex w-full">
                    <table className="w-full h-[140px] border-flex m-4">
                      <tr>
                        <td className="border w-[200px] pl-3">NAME: </td>
                        <td className="border">
                          {empData?.emp_basic_details?.emp_name}
                        </td>
                      </tr>
                      <tr className="border-1px">
                        <td className="border w-[150px] pl-3">DESIGNATION:</td>
                        <td className="border">
                          {empData?.emp_join_details?.designation?.name}
                        </td>
                      </tr>
                      <tr className="border-1px">
                        <td className="border w-[150px] pl-3">DEPARTMENT:</td>
                        <td className="border">
                          {empData?.emp_join_details?.department?.name}
                        </td>
                      </tr>

                      <tr className="border-1px">
                        <td className="border w-[150px] pl-3">
                          EMPLOYEE NUMBER:
                        </td>
                        <td className="border">{empData?.emp_id}</td>
                      </tr>
                    </table>
                    {/* -------------------- */}
                  </div>

                  <div className="flex flex-col m-4">
                    <table className="w-full border-flex">
                      <tr className="border">
                        <td className=" p-2 font-bold">SALARY DETAILS</td>
                        <td className=" p-2"></td>
                      </tr>

                      <tr className="border-1px">
                        <td className="border p-2 font-bold w-[25rem]">
                          Earnings
                        </td>
                        <td className="border p-2 font-bold w-[25rem]">
                          Deductions
                        </td>
                        <td className="border p-2 font-bold w-[25rem]"></td>
                        <td className="border p-2 font-bold w-[25rem]"></td>
                      </tr>

                      <tr className="border-1px">
                        <td className="border p-2 font-bold ">
                          {empData?.emp_salary_details?.emp_salary_allow?.map(
                            (item: any, index: number) => (
                              <tr key={index} className="border-1px ">
                                <>
                                  <td className="border w-[150rem] p-2">
                                    {item?.name || null}
                                  </td>
                                  <td className="border p-2">
                                    {item?.amount_in || 0}
                                  </td>
                                </>
                              </tr>
                            )
                          )}
                        </td>

                        {/* <td className="border p-2 font-bold"></td> */}
                        {/* <td className="border p-2 font-bold"></td> */}
                        <td className="border p-2 font-bold">
                          {empData?.emp_salary_details?.emp_salary_deduction?.map(
                            (item: any, index: number) => (
                              <tr key={index} className="border-1px">
                                <>
                                  <td className="border w-[150rem] p-2">
                                    {item?.name || null}
                                  </td>
                                  <td className="border p-2">
                                    {item?.amount_in || 0}
                                  </td>
                                </>
                              </tr>
                            )
                          )}
                        </td>
                      </tr>

                      <tr className="border-1px">
                        <td className="border p-2 font-bold">
                          Total Allowance (B)
                        </td>
                        <td className="border p-2 font-bold">
                          {empData?.total?.total_allowance}
                        </td>
                      </tr>
                      <tr className="border-1px">
                        <td className="border p-2 font-bold">Gross Salary</td>
                        <td className="border p-2 font-bold">
                          {empData?.payroll[0]?.gross_pay}
                        </td>
                      </tr>
                      <tr className="border">
                        <td className=" p-2 font-bold">
                          Employer Contribution
                        </td>
                        <td className=" p-2"></td>
                      </tr>
                      <tr className="border">
                        <td className="border p-2 font-bold">PF Employer</td>
                        <td className="border p-2">{EPF_AMOUNT}</td>
                        <td className="border p-2">Deductions</td>
                        <td className="border p-2">
                          {empData?.total?.total_deductions}
                        </td>
                      </tr>
                      <tr className="border">
                        <td className=" border p-2 font-bold">ESI Employer</td>
                        <td className=" border p-2">{ESIC_AMOUNT}</td>
                      </tr>
                      {/* <tr className="border">
                        <td className="border  p-2 font-bold">Exgratia</td>
                        <td className=" border p-2"></td>
                      </tr> */}
                      <tr className="border">
                        <td className=" border p-2 font-bold">
                          Reimbursements:
                        </td>
                        <td className=" p-2 font-bold text-center"></td>
                        <td className=" p-2 font-bold text-center">Summary</td>
                      </tr>

                      <tr className="border">
                        <td className=" border p-2 font-bold">
                          Medical (Reimb)
                        </td>
                        <td className=" border p-2"></td>
                        <td className="border p-2">Gross Salary</td>
                        <td className="border p-2">
                          {empData?.payroll[0]?.gross_pay}
                        </td>
                      </tr>
                      <tr className="border">
                        <td className=" border p-2 font-bold">Conv. (Reimb)</td>
                        <td className="border p-2"></td>
                        <td className="border p-2">
                          Add: Reimbursed Allowances
                        </td>
                        <td className="border p-2"></td>
                      </tr>
                      <tr className=" border">
                        <td className="border p-2 font-bold">
                          Telephone. (Reimb)
                        </td>
                        <td className="border p-2 font-bold">
                          {/* {empData?.emp_salary_details.emp_salary_deduction?.name} */}
                        </td>
                        <td className="border p-2">Less: Deductions</td>
                        <td className="border p-2">
                          {empData?.total?.total_deductions}
                        </td>
                      </tr>
                      <tr className="border">
                        <td className=" p-2 font-bold">Other(Reimb)</td>
                        <td className=" p-2"></td>
                        <td className="border p-2">Less: TDS</td>
                        <td className="border p-2">
                          {empData?.payroll[0]?.tds_amount}
                        </td>
                      </tr>
                      <tr className="border">
                        <td className=" p-2 font-bold">Total Reimbursements</td>
                        <td className=" p-2"></td>
                        {/* <td className="border p-2">Less: FBT</td>
                        <td className="border p-2">123213</td> */}
                        <td className="border p-2">Less: Loans Emi</td>
                        <td className="border p-2"></td>
                      </tr>
                      <tr className="border">
                        <td className=" p-2 font-bold">Salary (CTC) / PM</td>
                        <td className=" p-2">
                          Rs.{" "}
                          {(empData?.payroll[0]?.gross_pay as number) +
                            EPF_AMOUNT +
                            ESIC_AMOUNT}{" "}
                          ONLY
                        </td>
                        <td className="border p-2">
                          Net Salary Transfer Amount
                        </td>
                        <td className="border p-2">
                          {(empData?.payroll[0]?.net_pay as number) -
                            (empData?.payroll[0]?.tds_amount as number)}
                        </td>
                      </tr>
                      <tr className="border">
                        <td className=" p-2 font-bold">Salary (CTC) / PA</td>
                        <td className=" p-2">
                          Rs.{" "}
                          {((empData?.payroll[0]?.gross_pay as number) +
                            EPF_AMOUNT +
                            ESIC_AMOUNT) *
                            12}{" "}
                          ONLY
                        </td>
                        <td className="border p-2">Authorised by</td>
                        <td className="border p-2"></td>
                      </tr>
                      <tr className="border">
                        <td className=" p-2 font-bold">Prepared By</td>
                        <td className=" p-2">Checked By</td>
                      </tr>

                      {/* {empData?.emp_salary_details?.emp_salary_deduction?.map(
                        (item: any, index: number) => (
                          <tr key={index} className="border-1px">
                            <>
                              <td className="border w-[150px] p-2">
                                {item?.name || null}
                              </td>
                              <td className="border p-2">
                                {item?.amount_in || 0}
                              </td>
                            </>
                          </tr>
                        )
                      )} */}
                      {/* <tr className="border-1px">
                        <td className="border p-2 font-bold w-[20rem]">
                          TOTAL COST TO COMPANY :
                        </td>
                        <td className="border p-2">
                          {empData?.payroll[0].net_pay} ONLY
                        </td>
                      </tr> */}
                    </table>

                    {/* -------------------------------- */}
                  </div>
                </div>
              </div>
              <div className="flex justify-between  p-5">
                <div className="">
                  <p>
                    Note: <span className="text-[red]">* </span>This is a system
                    generated Payslip
                  </p>
                </div>
                <div>
                  <p>DDO’S SIGNATURE</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd col ends */}
        </>
      ) : null}
    </>
  );
};

export default EditEmployeePayroll;
