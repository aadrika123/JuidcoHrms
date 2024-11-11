"use client";

import React, { useEffect, useRef, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import Image from "next/image";
import EmployeeIcon from "@/assets/icons/search_salary_slip.png";
import JharIcon from "@/assets/icons/jhar.svg";
import { RiFilter2Line } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
import axios from "@/lib/axiosConfig";
import PrimaryButton from "@/components/Helpers/Button";
import { HRMS_URL } from "@/utils/api/urls";
import { FetchAxios, useCodeQuery } from "@/utils/fetchAxios";
import { PayslipTypes } from "@/utils/types/payslip.type";
import toast from "react-hot-toast";
import {
  allowanceFullForm,
  deductionFullForm,
} from "@/utils/formatter/fullForm";

const Download_payslip = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [empId, setEmpId] = useState<string>("");
  const [empData, setEmpData] = useState<any>({
    payroll: [],
  });
  const [calcProperties, setCalcProperties] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedDate(value);
  };

  // ------------- date and month calculation -------------------- //

  // const currentDate = new Date()

  // const newDate = new Date().getFullYear()
  // const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
  // const currentMonth = monthName.toUpperCase();

  const fetchTDS: FetchAxios = {
    url: `${HRMS_URL.PAYSLIP.getAll}`,
    url_extend: `?emp_id=${empId}&date=${new Date(selectedDate).toISOString()}&name=TDS,EPF,ESIC`,
    method: "GET",
    res_type: 1,
    query_key: "emp_tds_detail",
    data: [],
  };

  const { data: deductions, error } = useCodeQuery<PayslipTypes>(fetchTDS);
  if (error) toast.error("OOps! Failed to get employee nominee details!");

  // function extractAmountFromDeductions(data: any[], key: string): number {
  //   const zxt = data?.filter((object) => object.name === key);
  //   if (!zxt) return 0;
  //   return zxt[0]?.amount_in;
  // }

  // const EPF_AMOUNT = extractAmountFromDeductions(
  //   deductions?.emp_salary_details.emp_salary_deduction,
  //   "EPF"
  // );

  // const ESIC_AMOUNT = extractAmountFromDeductions(
  //   deductions?.emp_salary_details.emp_salary_deduction,
  //   "ESIC"
  // );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_details = sessionStorage.getItem("user_details") || " ";
      const emp_id = JSON.parse(user_details as string)?.emp_id;
      setEmpId(emp_id);
    }
  }, [empId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HRMS_URL.PROPERTIES.get}/calc`);
        setCalcProperties(response.data?.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  // Extract ESIC employer rate from calcProperties
  const esicEmployerRate = parseFloat(
    calcProperties["calc.esic.employer"] || 3.25
  );

  // Calculate ESIC employer contribution as 3.25% of gross pay if present
  const ESIC_EMPLOYER_AMOUNT = empData?.payroll?.[0]?.gross_pay
    ? parseFloat(
        ((empData.payroll[0].gross_pay * esicEmployerRate) / 100).toFixed(2)
      )
    : 0;

  // Extract the basic pay from empData
  const basicPay = empData?.payroll?.[0]?.basic_pay || 0;

  // Extract the DA amount from emp_salary_allow array
  const daAmount =
    empData?.emp_salary_details?.emp_salary_allow?.find(
      (allowance: any) => allowance.name === "DA"
    )?.amount_in || 0;

  // Calculate total salary for EPF calculation (basic pay + DA)
  const totalSalaryForEPF = basicPay + daAmount;

  // Extract EPF employer rate from calcProperties or use the default
  const epfEmployerRate = parseFloat(
    calcProperties["calc.epf.employer"] || 3.67
  );

  // Calculate EPF employer contribution as 3.67% of (basic pay + DA)
  const EPF_EMPLOYER_AMOUNT = totalSalaryForEPF
    ? parseFloat(((totalSalaryForEPF * epfEmployerRate) / 100).toFixed(2))
    : 0;

  // Extract EPS rate from calcProperties or use the default value
  const epsRate = parseFloat(calcProperties["calc.eps"] || 8.33);

  // Calculate EPS contribution as 8.33% of (basic pay + DA)
  const EPS_AMOUNT = totalSalaryForEPF
    ? parseFloat(((totalSalaryForEPF * epsRate) / 100).toFixed(2))
    : 0;

  const fetchEmpData = async () => {
    const formattedDate = new Date(selectedDate);
    try {
      const res = await axios({
        url: `${HRMS_URL.PAYSLIP.getAll}?emp_id=${empId}&date=${formattedDate.toISOString()}`,
        method: "GET",
      });
      setEmpData(res.data?.data);
      console.log(res.data?.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setEmpData(null);
    }
  };

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div>
        {/* ------------------ */}
        <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
          <BackButton />
          <div>
            <SubHeading className="mx-5 my-5 mb-0 text-4xl">
              Download Pay Slip
            </SubHeading>
          </div>
        </div>
        <div className="w-full sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg">
          <div className="flex items-center">
            <div className="w-[71px] h-[76px] relative mr-3">
              <Image
                className="w-full h-full object-cover"
                src={EmployeeIcon}
                alt="emp"
                width={71}
                height={76}
              />
            </div>
            <div>
              <span className="text-[25px]">Search Pay Slip</span>
            </div>
          </div>
          <div className="flex justify-around items-center w-full">
            <div className="flex gap-8">
              <div className="flex flex-col ">
                <label htmlFor="monthYear" className="text-[15px]">
                  Month-Year
                </label>
                <input
                  id="monthYear"
                  type="month"
                  className="border bg-transparent border-gray-300 rounded-md px-3 py-1 mr-2"
                  onChange={handleChange}
                  value={selectedDate}
                  name="monthYear"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full border border-indigo-600 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg rounded-md text-base px-5 py-1"
                onClick={fetchEmpData}
              >
                <p className="flex justify-center">
                  <span className="mt-1">
                    <RiFilter2Line />
                  </span>
                  Search record
                </p>
              </button>
            </div>
          </div>
        </div>

        {empData?.payroll?.length === 0 && (
          <div className="w-full p-10 flex flex-row justify-center items-center">
            <h1 className="text-3xl">No payroll data for selected month</h1>
          </div>
        )}

        {/* ------------------ */}
        {empData?.payroll?.length !== 0 && (
          <div
            ref={componentRef}
            className="w-full sm:w-full h-auto mb-5 rounded-2xl flex flex-col relative bg-[#ffffff] pt-5 pb-5 shadow-lg"
          >
            <div className="text-center">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={JharIcon}
                  alt="jhar_icon"
                  width={25}
                  height={25}
                  className="mb-1"
                />
                <h1 className="text-black font-serif font-bold mb-1">
                  GOVT. OF JHARKHAND
                </h1>
                <p className="text-black font-serif text-xs">
                  MUNICIPAL CORPORATION RANCHI
                </p>
                <p className="text-black font-serif text-xs">RANCHI</p>
              </div>
              <div className="w-full flex justify-center p-7 text-md text-black">
                <span>
                  SALARY SLIP -{" "}
                  {new Date(empData?.payroll[0]?.date)
                    .toLocaleString("en-US", { month: "long" })
                    .toUpperCase()}{" "}
                  - {new Date(empData?.payroll[0]?.date).getFullYear()} SALARY
                </span>
              </div>
            </div>

            <div className="text-black">
              <div className="flex w-full">
                <table className="w-full h-[100px] border-2 border-neutral-600 m-4">
                  <tr>
                    <td className="border-2 border-neutral-600 w-[100px] text-xs pl-2 p-1">
                      NAME:{" "}
                    </td>
                    <td className=" text-xs border-2 border-neutral-600">
                      {empData?.emp_basic_details?.emp_name}
                    </td>
                  </tr>
                  <tr className="border-1px">
                    <td className="border-2 border-neutral-600 w-[100px] text-xs pl-2 p-1">
                      DESIGNATION:
                    </td>
                    <td className="border-2 border-neutral-600 text-xs">
                      {empData?.emp_join_details?.designation?.name}
                    </td>
                  </tr>
                  <tr className="border-1px">
                    <td className="border-2 border-neutral-600 w-[100px] text-xs pl-2 p-1">
                      DEPARTMENT:
                    </td>
                    <td className="border-2 border-neutral-600 text-xs">
                      {empData?.emp_join_details?.department?.name}
                    </td>
                  </tr>

                  <tr className="border-1px">
                    <td className="border-2 border-neutral-600 w-[150px] text-xs pl-2 p-1">
                      EMPLOYEE NUMBER:
                    </td>
                    <td className="border-2 border-neutral-600 text-xs">
                      {empData?.emp_id}
                    </td>
                  </tr>
                </table>
                {/* -------------------- */}
              </div>
              <div className="flex flex-col m-4 mt-[-1px] border-2 border-t-2 border-y-0	 border-neutral-600">
                <tr className="border">
                  <td className=" p-2 font-bold text-sm">SALARY DETAILS</td>
                  <td className=" pl-2 p-1"></td>
                </tr>
                <tr className="">
                  <td className="border-2 border-l-0 border-neutral-600 pl-2 p-1 font-bold w-6/12 text-xs">
                    Earnings
                  </td>
                  <td className="border-2 border-r-0 border-l-0 border-neutral-600 pl-2 p-1 font-bold w-[50rem] text-xs">
                    Deductions
                  </td>
                  <td className="border-2 border-r-0 border-l-0 border-neutral-600 pl-2 p-1 font-bold w-[50rem] text-xs"></td>
                </tr>

                <tr className="border-1px">
                  <td className="border-2 border-t-0 border-l-0 border-neutral-600 pl-2 p-1 font-bold w-6/12">
                    {empData?.emp_salary_details?.emp_salary_allow?.map(
                      (item: any, index: number) => (
                        <tr key={index} className="border-1px ">
                          <>
                            <td className="border-b border-r-0 border-neutral-600 w-[150rem] p-2 text-xs">
                              {allowanceFullForm(item?.name) || null}
                            </td>
                            <td className="border-b border-neutral-600 p-2 text-xs">
                              {item?.amount_in || 0}
                            </td>
                          </>
                        </tr>
                      )
                    )}
                  </td>
                  <td className="border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 p-2 font-bold w-[50rem]">
                    {empData?.emp_salary_details?.emp_salary_deduction?.map(
                      (item: any, index: number) => (
                        <tr key={index} className="border-1px">
                          <>
                            <td className="border-b border-neutral-600 w-[150rem] p-2 text-xs">
                              {deductionFullForm(item?.name) || null}
                            </td>
                            <td className="border-b border-neutral-600 p-2 text-xs">
                              {item?.amount_in || 0}
                            </td>
                          </>
                        </tr>
                      )
                    )}
                  </td>
                </tr>
                {/* <tr className="border-1px">
                  <td className="border-2 border-t-0  border-l-0 border-neutral-600  font-bold w-6/12 text-xs pl-2 p-1">
                    Total Allowance (B)
                  </td>
                  <td className="border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 pl-2 p-1 font-bold w-[50rem] text-xs">
                    {empData?.total?.total_allowance}
                  </td>{" "}
                  <td className="border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 pl-2 p-1 font-bold w-[50rem] text-xs"></td>
                </tr> */}

                <tr className="border-1px">
                  <td className=" border-2 border-t-0  border-l-0 border-neutral-600 pl-2 p-1 font-bold w-6/12 text-xs">
                    <div className="flex justify-between">
                      <div className="">Total Allowance (B)</div>
                      <div className="">{empData?.total?.total_allowance}</div>
                    </div>
                  </td>
                  <td className="border-2 border-t-0  border-l-0 border-neutral-600 pl-2 p-1 font-bold w-[50rem] text-xs">
                    {/* {empData?.total?.total_allowance} */}
                  </td>
                </tr>

                <tr className="border-1px">
                  <td className=" border-2 border-t-0  border-l-0 border-neutral-600 pl-2 p-1 font-bold w-6/12 text-xs">
                    <div className="flex justify-between">
                      <div className=""> Basic Pay</div>
                      <div className="">{empData?.payroll[0]?.basic_pay}</div>
                    </div>
                  </td>
                  <td className="border-2 border-t-0  border-l-0 border-neutral-600 pl-2 p-1 font-bold w-[50rem] text-xs">
                    {/* {empData?.payroll[0]?.basic_pay} */}
                  </td>
                </tr>

                <tr className="border-1px">
                  <td className=" border-2 border-t-0  border-l-0 border-neutral-600 pl-2 p-1 font-bold w-6/12 text-xs">
                    <div className="flex justify-between">
                      <div className=""> Grade Pay</div>
                      <div className="">
                        {empData?.emp_join_details?.grade_pay}
                      </div>
                    </div>
                  </td>
                  <td className="border-2 border-t-0  border-l-0 border-neutral-600 pl-2 p-1 font-bold w-[50rem] text-xs">
                    {/* {empData?.emp_join_details?.grade_pay} */}
                  </td>
                </tr>

                <tr className="border-1px">
                  <td className=" border-2 border-t-0 border-b-0 border-l-0 border-neutral-600 pl-2 p-1 font-bold w-6/12 text-xs">
                    <div className="flex justify-between">
                      <div className=""> Gross Salary</div>
                      <div className="">{empData?.payroll[0]?.gross_pay}</div>
                    </div>
                  </td>
                  <td className="border-2 border-t-0 border-b-0 border-l-0 border-neutral-600 pl-2 p-1 font-bold w-[50rem] text-xs">
                    {/* {empData?.payroll[0]?.gross_pay} */}
                  </td>
                </tr>
              </div>

              <div className="flex flex-col m-4 mt-[-1rem]">
                <table className="w-full border-2 border-neutral-600">
                  <tr className=" ">
                    <td className="border-2 border-t-0 border-r-0 border-l-0 border-neutral-600  font-bold pl-2 p-1 text-xs">
                      Employer Contribution
                    </td>
                    <td className=" p-2 border-2 border-t-0 border-r-0 border-l-0 border-neutral-600"></td>
                    <td className=" p-2 border-2 border-t-0 border-r-0 border-l-0 border-neutral-600"></td>
                    <td className=" p-2 border-2 border-t-0 border-r-0 border-l-0 border-neutral-600"></td>
                  </tr>
                  <tr className="border">
                    <td className="border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 font-bold text-xs pl-2 p-1">
                      PF
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      {EPF_EMPLOYER_AMOUNT}
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      Deductions
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      {empData?.total?.total_deductions}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      ESI
                    </td>
                    <td className=" border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      {ESIC_EMPLOYER_AMOUNT}
                    </td>
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1"></td>
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1"></td>
                  </tr>
                  <tr className="border">
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      EPS
                    </td>
                    <td className=" border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      {EPS_AMOUNT}
                    </td>
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1"></td>
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1"></td>
                  </tr>

                  <tr className="border">
                    <td className=" border-2 border-t-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      Reimbursements:
                    </td>
                    <td className=" text-xs pl-2 p-1 font-bold text-center border-2 border-t-0 border-r-0 border-l-0 border-neutral-600"></td>
                    <td className=" text-xs pl-2 p-1 font-bold text-center border-2 border-t-0 border-r-0 border-l-0 border-neutral-600">
                      Summary
                    </td>
                    <td className=" text-xs pl-2 p-1 font-bold text-center border-2 border-t-0 border-r-0 border-l-0 border-neutral-600"></td>
                  </tr>

                  <tr className="border">
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      Medical (Reimb)
                    </td>
                    <td className=" border-2 border-t-0 border-r-0  border-neutral-600 p-2"></td>
                    <td className="border-2 border-t-0 border-r-0 border-neutral-600 text-xs pl-2 p-1">
                      Gross Salary
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      {empData?.payroll[0]?.gross_pay}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      Conv. (Reimb)
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 p-2"></td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      Add: Reimbursed Allowances
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 p-2"></td>
                  </tr>
                  <tr className=" border">
                    <td className="border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      Telephone. (Reimb)
                    </td>
                    <td className="border-2 border-t-0 border-r-0 border-neutral-600 p-2 font-bold">
                      {/* {empData?.emp_salary_details.emp_salary_deduction?.name} */}
                    </td>
                    <td className="border-2 border-t-0 border-r-0 border-neutral-600 text-xs pl-2 p-1">
                      Less: Deductions
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      {empData?.total?.total_deductions}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      Other(Reimb)
                    </td>
                    <td className="border-2 border-t-0 border-r-0 border-neutral-600 p-2"></td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      Less: TDS
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      {empData?.payroll[0]?.tds_amount}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className=" border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      Total Reimbursements
                    </td>
                    <td className=" border-2 border-t-0 border-r-0  border-neutral-600 p-2"></td>
                    {/* <td className="border p-2">Less: FBT</td>
                        <td className="border p-2">123213</td> */}
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      Less: Loans Emi
                    </td>
                    <td className="border-2 border-t-0 border-r-0 border-neutral-600 p-2"></td>
                  </tr>
                  <tr className="border">
                    <td className="border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">
                      Salary (CTC) / PM
                    </td>
                    <td className=" border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      Rs.{" "}
                      {(
                        (empData?.payroll[0]?.gross_pay as number) +
                        EPF_EMPLOYER_AMOUNT +
                        EPS_AMOUNT +
                        ESIC_EMPLOYER_AMOUNT
                      ).toFixed(2)}{" "}
                      ONLY
                    </td>
                    <td className="border-2 border-t-0 border-r-0 border-neutral-600 text-xs pl-2 p-1">
                      Net Salary Transfer Amount
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">
                      {(empData?.payroll[0]?.net_pay as number) -
                        (empData?.payroll[0]?.tds_amount as number)}
                    </td>
                  </tr>
                  {/* <tr className="border">
                    <td className="border-2 border-t-0 border-r-0 border-l-0 border-neutral-600 text-xs pl-2 p-1 font-bold">Salary (CTC) / PA</td>
                    <td className="border-2 border-t-0 border-r-0 border-neutral-600 text-xs pl-2 p-1">
                      Rs.{" "}
                      {((empData?.payroll[0]?.gross_pay as number) +
                        EPF_AMOUNT +
                        ESIC_AMOUNT) *
                        12}{" "}
                      ONLY
                    </td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 text-xs pl-2 p-1">Authorised by</td>
                    <td className="border-2 border-t-0 border-r-0  border-neutral-600 p-2"></td>
                  </tr> */}
                  <tr className="border">
                    <td className=" text-xs pl-2 p-1 font-bold">Prepared By</td>
                    <td className=" text-xs pl-2 p-1">Checked By</td>
                  </tr>
                </table>

                {/* -------------------------------- */}
              </div>
            </div>

            <div className="flex justify-between pl-4 pr-4">
              <div className="">
                <p className="text-xs text-black">
                  Note: <span className="text-[red]">* </span>This is a system
                  generated Payslip
                </p>
              </div>
              <div>
                <p className="text-xs text-black">DDO’S SIGNATURE</p>
              </div>
            </div>
          </div>
        )}
        {empData?.payroll?.length !== 0 && (
          <div className="w-full flex flex-row justify-end items-center">
            <PrimaryButton variant="primary" onClick={handlePrint}>
              Print
            </PrimaryButton>
          </div>
        )}
      </div>
    </>
  );
};

export default Download_payslip;
