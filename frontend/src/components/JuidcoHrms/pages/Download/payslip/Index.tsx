"use client";
import React, { useRef, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import Image from "next/image";
import EmployeeIcon from "@/assets/icons/search_salary_slip.png";
import { RiFilter2Line } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";

const Download_payslip = () => {
  const [values, setValues] = useState({
    leave_from: "",
    leave_to: "",
    payslipData: {
      billNo: "",
      employeePFNo: "",
      employeeName: "",
      panNo: "",
      employeeAccountNo: "",
      designation: "",
      payScale: "",
      allowances: {
        basic: 0,
        da: 0,
        hra: 0,
        medicalAllowance: 0,
        totalAllowances: 0,
      },
      deductions: {
        gli: 0,
        pf: 0,
        incomeTax: 0,
        professionalTax: 0,
        totalDeductions: 0,
      },
      recovery: {
        totalRecovery: 0,
      },
      netPay: 0,
      ddoSignature: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const calculateDaysDiff = () => {
    const { leave_from, leave_to } = values;
    const from = new Date(leave_from);
    const to = new Date(leave_to);
    const diffInTime = to.getTime() - from.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    console.log("Difference in days:", diffInDays);
    return diffInDays;
  };

 
  //   const mockData = {
  //     billNo: "12345",
  //     employeePFNo: "7890",
  //     employeeName: "John Doe",
  //     panNo: "ABCDE1234F",
  //     employeeAccountNo: "1234567890",
  //     designation: "Software Engineer",
  //     payScale: "Grade 6",
  //     allowances: {
  //       basic: 25000,
  //       da: 5000,
  //       hra: 3000,
  //       medicalAllowance: 2000,
  //       totalAllowances: 35000,
  //     },
  //     deductions: {
  //       gli: 1000,
  //       pf: 2000,
  //       incomeTax: 5000,
  //       professionalTax: 200,
  //       totalDeductions: 8200,
  //     },
  //     recovery: {
  //       totalRecovery: 0,
  //     },
  //     netPay: 26800,
  //     ddoSignature: "John Doe",
  //   };

  //   setValues({
  //     ...values,
  //     payslipData: mockData,
  //   });
  // };

  // Function to convert number to words
  const convertNumberToWords = (num: number): string => {
    const ones = [
      "",
      "ONE",
      "TWO",
      "THREE",
      "FOUR",
      "FIVE",
      "SIX",
      "SEVEN",
      "EIGHT",
      "NINE",
      "TEN",
      "ELEVEN",
      "TWELVE",
      "THIRTEEN",
      "FOURTEEN",
      "FIFTEEN",
      "SIXTEEN",
      "SEVENTEEN",
      "EIGHTEEN",
      "NINETEEN",
    ];
    const tens = [
      "",
      "",
      "TWENTY",
      "THIRTY",
      "FORTY",
      "FIFTY",
      "SIXTY",
      "SEVENTY",
      "EIGHTY",
      "NINETY",
    ];

    if (num === 0) {
      return "ZERO";
    }

    if (num < 20) {
      return ones[num];
    }

    if (num < 100) {
      return tens[Math.floor(num / 10)] + " " + ones[num % 10];
    }

    if (num < 1000) {
      return (
        ones[Math.floor(num / 100)] +
        " HUNDRED " +
        convertNumberToWords(num % 100)
      );
    }

    return "OUT OF RANGE";
  };

  const renderTable = () => {
    const { payslipData } = values;

    if (!payslipData) {
      return null;
    }

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    return (
      <>
        <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
          <BackButton />
          <div>
            <SubHeading className="mx-5 my-5 mb-0 text-4xl">
              Download Pay Slip
            </SubHeading>
          </div>
        </div>
        <div>
          {/* ------------------ */}{" "}
          <div
            className={`w-full sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
          >
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

            <div className="flex justify-around  items-center w-full">
              <div className="flex gap-8">
                <div className="flex flex-col ">
                  <label htmlFor="fromDate" className="text-[15px]">
                    Date From
                  </label>
                  <input
                    id="fromDate"
                    type="date"
                    placeholder="From Date"
                    className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    onChange={handleChange}
                    value={values.leave_from}
                    name="leave_from"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="toDate" className="text-[15px]">
                    Date To
                  </label>
                  <input
                    id="toDate"
                    type="date"
                    placeholder="To Date"
                    className="border border-gray-300 rounded-md px-3 py-1"
                    onChange={handleChange}
                    value={values.leave_to}
                    name="leave_to"
                  />
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="w-full border border-indigo-600 bg-indigo-600 hover:bg-indigo-500 text-white  shadow-lg rounded-md text-base px-5 py-1"
                  onClick={calculateDaysDiff}
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
          {/* ------------------ */}
        </div>
        <div className="w-full sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg">
          <div ref={componentRef} className="">
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
              <span>SALARY SLIP - APRIL 2024 SALARY</span>
            </div>

            <div className="  ">
              <div className="flex place-content-center">
                <table className="w-[451px] h-[140px] border-flex  m-5 ">
                  <tr className="border">
                    <td className="border  w-[150px] pl-3">BILL NO.:</td>
                    <td className="border">{payslipData.billNo}</td>
                  </tr>
                  <tr className="border-1px">
                    <td className="border w-[250px] pl-3">EMPLOYEE PF NO:</td>
                    <td className="border">{payslipData.employeePFNo}</td>
                  </tr>
                  <tr>
                    <td className="border   w-[150px] pl-3">EMPLOYEE NAME</td>
                    <td className="border">{payslipData.employeeName}</td>
                  </tr>
                  <tr>
                    <td className="border w-[150px] pl-3">PAN NO. :</td>
                    <td className="border">{payslipData.panNo}</td>
                  </tr>
                </table>
                {/* -------------------- */}
                <table className="w-[504.999px] h-[113.093px] border-flex  m-5">
                  <tr className="border">
                    <td className="border  w-[250px] pl-3">
                      EMPLOYEE A/C NO.:
                    </td>
                    <td className="border">{payslipData.employeeAccountNo}</td>
                  </tr>
                  <tr className="border-1px">
                    <td className="border w-[150px] pl-3">DESIGNATION:</td>
                    <td className="border">{payslipData.designation}</td>
                  </tr>
                  <tr>
                    <td className="border   w-[150px] pl-3">PAY SCALE:</td>
                    <td className="border">{payslipData.payScale}</td>
                  </tr>
                </table>
              </div>

              <div className="flex place-content-center">
                <table className="w-[375.833px] h-[168.333px] border-flex  m-5">
                  <tr className="border">
                    <td className="font-bold" colSpan={2}>
                      ALLOWANCES
                    </td>
                  </tr>
                  <tr className="border-1px">
                    <td className="border w-[150px] pl-3">BASIC</td>
                    <td className="border">{payslipData.allowances.basic}</td>
                  </tr>
                  <tr>
                    <td className="border   w-[150px] pl-3">DA</td>
                    <td className="border">{payslipData.allowances.da}</td>
                  </tr>
                  <tr>
                    <td className="border w-[150px] pl-3">HRA</td>
                    <td className="border">{payslipData.allowances.hra}</td>
                  </tr>
                  <tr>
                    <td className="border w-[150px] pl-3">MEDICAL ALLOW.</td>
                    <td className="border">
                      {payslipData.allowances.medicalAllowance}
                    </td>
                  </tr>
                  <tr>
                    <td className="border w-[150px] pl-3">TOTAL</td>
                    <td className="border">
                      {payslipData.allowances.totalAllowances}
                    </td>
                  </tr>
                </table>
                {/* ------------------------ */}
                <table className="w-[375.833px] h-[168.333px]  border-flex m-5">
                  <tr className="border">
                    <td className="font-bold" colSpan={2}>
                      DEDUCTION
                    </td>
                  </tr>
                  <tr className="border-1px">
                    <td className="border w-[150px] pl-3">GLI</td>
                    <td className="border">{payslipData.deductions.gli}</td>
                  </tr>
                  <tr>
                    <td className="border   w-[150px] pl-3">PF</td>
                    <td className="border">{payslipData.deductions.pf}</td>
                  </tr>
                  <tr>
                    <td className="border w-[150px] pl-3">I.TAX</td>
                    <td className="border">
                      {payslipData.deductions.incomeTax}
                    </td>
                  </tr>
                  <tr>
                    <td className="border w-[150px] pl-3">PROFESSINOL TAX</td>
                    <td className="border">
                      {payslipData.deductions.professionalTax}
                    </td>
                  </tr>
                  <tr>
                    <td className="border w-[150px] pl-3">TOTAL</td>
                    <td className="border">
                      {payslipData.deductions.totalDeductions}
                    </td>
                  </tr>
                </table>
                {/* -------------------------------- */}
                <table className="w-[ 190px] h-[60.916px] border-flex m-5">
                  <tr className="border">
                    <td className="font-bold" colSpan={2}>
                      RECOVERY
                    </td>
                  </tr>
                  <tr className="border-1px">
                    <td className="border w-[150px] pl-3">TOTAL:</td>
                    <td className="border">
                      {payslipData.recovery.totalRecovery}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="flex place-content-around mt-10">
            <div className="">
              <p>
                NET PAY : {payslipData.netPay} (
                {convertNumberToWords(payslipData.netPay)} ONLY)
              </p>
            </div>
            <div>
              <p>DDO’S SIGNATURE</p>

              <button
                type="submit"
                className="p-2.5 px-5 text-[0.875rem] flex items-center mt-6 btn-neutral hover:border-neutral-400 rounded-md font-medium text-white hover:bg-neutral-700 hover:text-white bg-[#4338CA]"
                
              
                onClick={handlePrint}
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return renderTable();
};

export default Download_payslip;
