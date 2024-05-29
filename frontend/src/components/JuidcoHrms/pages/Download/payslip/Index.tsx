"use client";

import React, { useEffect, useRef, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import Image from "next/image";
import EmployeeIcon from "@/assets/icons/search_salary_slip.png";
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
    url_extend: selectedDate
      ? `?emp_id=${empId}&date=${new Date(selectedDate).toISOString()}&name=TDS,EPF,ESIC`
      : `?emp_id=${empId}&name=TDS,EPF,ESIC`,
    method: "GET",
    res_type: 1,
    query_key: "emp_tds_detail",
    data: [],
  };

  const { data: deductions, error } = useCodeQuery<PayslipTypes>(fetchTDS);
  if (error) toast.error("OOps! Failed to get employee nominee details!");

  function extractAmountFromDeductions(data: any[], key: string): number {
    const zxt = data?.filter((object) => object.name === key);
    if (!zxt) return 0;
    return zxt[0]?.amount_in;
  }

  const EPF_AMOUNT = extractAmountFromDeductions(
    deductions?.emp_salary_details.emp_salary_deduction,
    "EPF"
  );

  const ESIC_AMOUNT = extractAmountFromDeductions(
    deductions?.emp_salary_details.emp_salary_deduction,
    "ESIC"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_details = sessionStorage.getItem("user_details") || " ";
      const emp_id = JSON.parse(user_details as string)?.emp_id;
      setEmpId(emp_id);
    }
  }, [empId]);

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
            className="w-full sm:w-full h-auto mb-5 rounded-2xl flex flex-col relative bg-[#ffffff] pt-10 pb-10 shadow-lg"
          >
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
                  SALARY SLIP -{" "}
                  {new Date(empData?.payroll[0]?.date)
                    .toLocaleString("en-US", { month: "long" })
                    .toUpperCase()}{" "}
                  - {new Date(empData?.payroll[0]?.date).getFullYear()} SALARY
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
                                  {allowanceFullForm(item?.name) || null}
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
                                  {deductionFullForm(item?.name) || null}
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
                      <td className="border p-2 font-bold">Basic Pay</td>
                      <td className="border p-2 font-bold">
                        {empData?.payroll[0]?.basic_pay}
                      </td>
                    </tr>
                    <tr className="border-1px">
                      <td className="border p-2 font-bold">Gross Salary</td>
                      <td className="border p-2 font-bold">
                        {empData?.payroll[0]?.gross_pay}
                      </td>
                    </tr>

                    <tr className="border">
                      <td className=" p-2 font-bold">Employer Contribution</td>
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
                      <td className=" border p-2 font-bold">Reimbursements:</td>
                      <td className=" p-2 font-bold text-center"></td>
                      <td className=" p-2 font-bold text-center">Summary</td>
                    </tr>

                    <tr className="border">
                      <td className=" border p-2 font-bold">Medical (Reimb)</td>
                      <td className=" border p-2"></td>
                      <td className="border p-2">Gross Salary</td>
                      <td className="border p-2">
                        {empData?.payroll[0]?.gross_pay}
                      </td>
                    </tr>
                    <tr className="border">
                      <td className=" border p-2 font-bold">Conv. (Reimb)</td>
                      <td className="border p-2"></td>
                      <td className="border p-2">Add: Reimbursed Allowances</td>
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
                      <td className="border p-2">Net Salary Transfer Amount</td>
                      <td className="border p-2">
                        {(empData?.payroll[0]?.net_pay as number) -
                          (empData?.payroll[0]?.tds_amount as number)}
                      </td>
                    </tr>
                    {/* <tr className="border">
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
                    </tr> */}
                    <tr className="border">
                      <td className=" p-2 font-bold">Prepared By</td>
                      <td className=" p-2">Checked By</td>
                    </tr>
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
