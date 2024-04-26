"use client";

import React, { useRef, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import Image from "next/image";
import EmployeeIcon from "@/assets/icons/search_salary_slip.png";
import { RiFilter2Line } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
import axios from "@/lib/axiosConfig";


const Download_payslip = () => {
    const [values, setValues] = useState<any>({
        date: "",
        payslipData: "",
    });
    const [empData, setEmpData] = useState<any>({
        payroll: []
    });
    const user_details = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user_details') || " ") : {};
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValues({

            ...values,
            date: value,
        });
    };

    // // Function to convert number to words
    // const convertNumberToWords = (num: number): string => {
    //     const ones = [
    //         "",
    //         "ONE",
    //         "TWO",
    //         "THREE",
    //         "FOUR",
    //         "FIVE",
    //         "SIX",
    //         "SEVEN",
    //         "EIGHT",
    //         "NINE",
    //         "TEN",
    //         "ELEVEN",
    //         "TWELVE",
    //         "THIRTEEN",
    //         "FOURTEEN",
    //         "FIFTEEN",
    //         "SIXTEEN",
    //         "SEVENTEEN",
    //         "EIGHTEEN",
    //         "NINETEEN",
    //     ];
    //     const tens = [
    //         "",
    //         "",
    //         "TWENTY",
    //         "THIRTY",
    //         "FORTY",
    //         "FIFTY",
    //         "SIXTY",
    //         "SEVENTY",
    //         "EIGHTY",
    //         "NINETY",
    //     ];

    //     if (num === 0) {
    //         return "ZERO";
    //     }

    //     if (num < 20) {
    //         return ones[num];
    //     }

    //     if (num < 100) {
    //         return tens[Math.floor(num / 10)] + " " + ones[num % 10];
    //     }

    //     if (num < 1000) {
    //         return (
    //             ones[Math.floor(num / 100)] +
    //             " HUNDRED " +
    //             convertNumberToWords(num % 100)
    //         );
    //     }

    //     return "OUT OF RANGE";
    // };


    const formatDate = (date: any) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const fetchEmpData = async () => {
        const date = new Date()
        try {
            const res = await axios({
                url: `/pay/payslip?emp_id=${user_details?.emp_id}&date=${formatDate(date)}`,
                method: "GET",
            });
            setEmpData(res.data?.data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
            setEmpData(null);
        }
    };

    // useEffect(() => {
    //   fetchEmpData();
    // }, [emp]);


    const { payslipData } = values;
    const componentRef = useRef(null);

    // if (!payslipData) {
    //   return null;
    // }
    console.log(values)


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // console.log("first", payslipData);

    // useEffect(() => {
    //   fetchPayslipData();
    // }, []);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

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
                                    className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                                    onChange={handleChange}
                                    value={values.monthYear}
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
                        <span>
                            SALARY SLIP - {months[Number(values.date.split("-")[1] - 1)]}{" "}
                            {values.date.split("-")[0]} SALARY
                        </span>
                    </div>

                    <div className="  ">
                        <div className="flex place-content-center">
                            {/* ................ */}
                            <table className="w-[451px] h-[140px] border-flex  m-5 ">
                                <tbody>
                                    <tr className="border">
                                        <td className="border  w-[150px] pl-3">BILL NO.:</td>
                                        <td className="border"> {18827986132}</td>
                                    </tr>
                                    <tr className="border-1px">
                                        <td className="border w-[250px] pl-3">EMPLOYEE PF NO:</td>
                                        <td className="border">
                                            {empData?.emp_basic_details?.emp_pf_no || 0}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border w-[150px] pl-3">EMPLOYEE NAME</td>

                                        <td className="border">
                                            {empData?.emp_basic_details?.emp_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border w-[150px] pl-3">PAN NO. :</td>
                                        <td className="border">
                                            {payslipData?.emp_basic_details?.emp_pan_no || 0}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* ............................. */}
                            <table className="w-[504.999px] h-[113.093px] border-flex  m-5">
                                <tbody>
                                    <tr className="border">
                                        <td className="border  w-[250px] pl-3">EMPLOYEE A/C NO.:</td>
                                        <td className="border">
                                            {empData?.emp_join_details?.acc_number || 0}
                                        </td>
                                    </tr>
                                    <tr className="border-1px">
                                        <td className="border w-[150px] pl-3">DESIGNATION:</td>
                                        <td className="border">
                                            {empData?.emp_join_details?.designation?.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border   w-[150px] pl-3">PAY SCALE:</td>
                                        <td className="border">
                                            {empData?.emp_join_details?.pay_scale || 0}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex place-content-center">

                            <table className="w-[375.833px] h-[168.333px] border-flex  m-5">
                                <tbody>
                                    <tr className="border">
                                        <td className="font-bold px-4" colSpan={2}>
                                            ALLOWANCE
                                        </td>
                                    </tr>

                                    {empData?.emp_salary_details?.emp_salary_allow?.map(
                                        (item: any, index: number) => (
                                            <tr key={index} className="border-1px">
                                                <>
                                                    <td className="border w-[150px] pl-3">
                                                        {item?.name || null}
                                                    </td>
                                                    <td className="border">{item?.amount_in || 0}</td>
                                                </>
                                            </tr>
                                        )
                                    )}

                                    <tr>
                                        <td className="border w-[150px] pl-3">TOTAL</td>
                                        <td className="border">
                                            {empData?.total?.total_allowance}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* ------------------------ */}

                            <table className="w-[375.833px] h-[168.333px]  border-flex m-5">
                                <tbody>
                                    <tr className="border">
                                        <td className="font-bold px-4" colSpan={2}>
                                            DEDUCTION
                                        </td>
                                    </tr>

                                    {empData?.emp_salary_details?.emp_salary_deduction?.map(
                                        (item: any, index: number) => (
                                            <tr key={index} className="border-1px">
                                                <>
                                                    <td className="border w-[150px] pl-3">
                                                        {item?.name || null}
                                                    </td>
                                                    <td className="border">{item?.amount_in || 0}</td>
                                                </>
                                            </tr>
                                        )
                                    )}

                                    <tr>
                                        <td className="border w-[150px] pl-3">TOTAL</td>
                                        <td className="border">
                                            {empData?.total?.total_deductions}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="w-[375.833px] h-[168.333px]  border-flex m-5">
                                <tbody>
                                    <tr className="border">
                                        <td className="font-bold px-4" colSpan={2}>
                                            RECOVERY
                                        </td>
                                    </tr>



                                    <tr>
                                        <td className="border w-[150px] pl-3">TOTAL</td>
                                        <td className="border">
                                            {empData?.total?.total_deductions}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex place-content-around mt-10">
                    <div className="">
                        <p>
                            NET PAY : {empData?.payroll[0]?.net_pay} Only 
                            {/* ({convertNumberToWords(empData?.payroll[0]?.net_pay)} ONLY) */}
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

export default Download_payslip;