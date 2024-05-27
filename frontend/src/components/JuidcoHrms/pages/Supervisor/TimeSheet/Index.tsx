/***
 * Author: Jaideep
 * Status: Open
 * Date: 25/04/2024
 * Description: Time Sheet page for Supervisor
 */

"use client";

import { InnerHeading, SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EmployeeIcon from "@/assets/icons/employee 1.png";
import ExcelIcon from "@/assets/icons/excel 1.png";
import Chronometer from "@/assets/icons/chronometer 1.png";
import { useQuery } from "react-query";
import { HRMS_URL } from "@/utils/api/urls";
import PrimaryButton from "@/components/Helpers/Button";
import PayrollTableContainer from "../../Ems/PayrollManagement/Segments/PayrollTableContainer";
import axios from "@/lib/axiosConfig";
import toast from "react-hot-toast";
import readXlsxFile from "read-excel-file";
import { useMutation, useQueryClient } from "react-query";
import NextPrevPagination from "@/components/global/molecules/NextPrevPagination";
import { EmployeePayrollData } from "@/utils/types/payslip.type";

type PayrollCount = {
  total_employee: number;
  total_amount: number;
};
type TableData = EmployeePayrollData | PayrollCount;

const TimeSheet = () => {
  const [selectedFileName] = useState("");
  const [excelData, setExcelData] = useState<any[]>([]);
  const [showExcelConfMsg, setShowExcelConfMsg] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuey, setSearchQuery] = useState<string>("");
  const [hitSearch, setHitSearch] = useState<string>("false");

  const handleFileRead = (e: React.ChangeEvent<any>) => {
    const file = e.target.files[0];
    setShowExcelConfMsg(true);
    readXlsxFile(file).then(async (rows) => {
      const n = rows.length;
      const d: any[] = [];
      for (let i = 1; i < n; i++) {
        const row = rows[i];
        const record = {
          emp_id: row[0],
          working_hour: row[row.length - 1],
        };

        d.push(record);
      }

      setExcelData(d);
    });
  };

  const uploadSheetAPI = async () => {
    try {
      const res = await axios({
        url: `${HRMS_URL.PAYROLL.updateMany}`,
        method: "POST",
        data: { data: excelData },
      });

      return res.data;
    } catch (error) {
      alert(error);
    }
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(uploadSheetAPI, {
    onError: () => {
      toast.error("Failed to update sheet");
    },
    onSuccess: () => {
      toast.success("Payroll Updated Successfully");
    },
    onSettled: () => {
      setShowExcelConfMsg(false);
      queryClient.invalidateQueries();
    },
  });

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0];
  //   setSelectedFileName(file ? file.name : "");
  // };

  const fetchData = async <T extends TableData>(
    endpoint: string
  ): Promise<T[] | T> => {
    if (endpoint === "null") return [];
    const res = await axios({
      url: `${endpoint}`,
      method: "GET",
    });

    return res.data?.data as T;
  };

  const useCodeQuery = <T extends TableData>(endpoint: string, key: string) => {
    return useQuery([key, hitSearch, page], async () => {
      const data = await fetchData<T>(endpoint);
      return Array.isArray(data) ? data[0] : data;
    });
  };

  const { data: empLstData, error: empLstErr } =
    useCodeQuery<EmployeePayrollData>(
      `/pay/payroll?limit=100&page=${page}&search=${searchQuey}`,
      "payroll-all"
    );

  // const { data: payrollCount, error: payrollCountErr } =
  //   useCodeQuery<PayrollCount>(
  //     `${HRMS_URL.PAYROLL_TOTAL.getAll}`,
  //     "payroll-total"
  //   );

  useEffect(() => {
    sessionStorage.setItem("payroll", JSON.stringify(empLstData));
  }, [empLstData]);

  // ############################################################################## //
  const parent_emp = [
    {
      emp_id: "EMP912e43",
    },
    {
      emp_id: "EMP912e45",
    },
  ];
  // ############################################################################## //

  const filterEmpListData = empLstData?.data?.filter(
    (elem: any) => elem.status === null
  );

  console.log(filterEmpListData);
  const parentEmpIds = new Set(parent_emp.map((emp) => emp.emp_id));

  console.log(parentEmpIds);

  const filterEmployeeList = filterEmpListData?.filter((elem: any) =>
    parentEmpIds.has(elem.emp_id)
  );

  console.log(filterEmployeeList);

  // if (payrollCountErr) {
  //   throw Error;
  // }

  if (empLstErr) {
    toast.error("No data available!");
  }
  const handleHitSearch = (): void => {
    setHitSearch(searchQuey);
  };

  const handleChangePage = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  // -----------------Employee Onboard report JSX----------------------//
  // const employeeReports = (
  //   <section className="flex items-center justify-between mt-5">
  //     <div>
  //       <h2 className="text-[2rem] text-secondary font-medium">
  //         Payroll Management System
  //       </h2>
  //     </div>
  //     <div className="flex items-start gap-8">
  //       <div className=" w-40 flex flex-col gap-3">
  //         <span className="text-primary_blue text-[1.63544rem]">
  //           {payrollCount?.total_employee}
  //         </span>
  //         <span>Total No. of Employee</span>
  //       </div>
  //       <div className="w-40 flex flex-col gap-3">
  //         <span className="text-[#63ADCB] text-[1.63544rem]">
  //           {payrollCount?.total_amount}/-
  //         </span>
  //         <span>Total No. of Amount</span>
  //       </div>
  //     </div>
  //   </section>
  // );

  // -----------------Employee Onboard report JSX----------------------//

  return (
    <>
      {showExcelConfMsg && (
        <div className="w-[18rem] h-[20rem] absolute left-1/2 top-1/4 translate -translate-x-1/2 bg-gray-50 shadow-2xl rounded-md flex flex-col items-center justify-center text-center gap-5">
          <InnerHeading>Are you sure want to upload the sheet</InnerHeading>
          <PrimaryButton onClick={mutate} variant="primary">
            Submit
          </PrimaryButton>
        </div>
      )}

      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Approval Leave
          </SubHeading>
        </div>
      </div>

      <div className="shadow-md p-5">
        <div className="flex justify-between mb-10">
          <SubHeading>
            <Image src={EmployeeIcon} alt="employee" width={40} height={20} />
            <span className="ml-4">Search Employee</span>
          </SubHeading>
        </div>

        {/* -----------------------------------Filter------------------------------------------ */}
        <section className="flex items-end gap-12 w-full pl-16 border-b border-zinc-300 pb-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="search-by" className="text-secondary text-lg">
              Search Employee
            </label>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="p-2.5 bg-transparent border border-gray-700 rounded-md"
              placeholder="E.g. Bineet kumar, EMP912e44"
            />
          </div>
          <PrimaryButton
            onClick={handleHitSearch}
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
        {/* -----------------------------------Filter------------------------------------------ */}

        {/* --------------------------------Excel -------------------------------------------- */}

        <div className="flex justify-between mt-10 shadow-md p-5">
          <SubHeading>
            <Image src={ExcelIcon} alt="excel" width={40} height={20} />
            <Image
              src={Chronometer}
              alt="Chronometer"
              width={25}
              height={20}
              className="ml-[-1rem] mt-5"
            />

            <span className="ml-4">Time Sheet</span>
          </SubHeading>
          <div className="flex gap-10">
            <div className="right-0 flex items-start gap-3 border bporder-zinc-200 rounded-md p-3">
              Upload Time-sheet
              <label htmlFor="file_upload">
                <span className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                      fill="#969393"
                    />
                  </svg>
                </span>
                {selectedFileName && (
                  <span className="ml-2">{selectedFileName}</span>
                )}
              </label>
              {/* Hidden file input */}
              <input
                type="file"
                id="file_upload"
                name="file_upload"
                style={{ display: "none" }}
                onChange={handleFileRead}
              />
            </div>

            {/* <div className="right-0 flex items-start gap-3 border bporder-zinc-200 rounded-md p-3">
            Download Time-sheet
            <label htmlFor="file_upload">
              <span className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 21 21"
                  fill="none"
                  className="mt-1"
                >
                  <path
                    d="M10.5 9.25487L7.40425 6.15825L8.02287 5.52912L10.0625 7.56875V0H10.9375V7.56875L12.9762 5.53L13.5957 6.15825L10.5 9.25487ZM5.78812 12.25C5.38562 12.25 5.04962 12.1152 4.78012 11.8457C4.51062 11.5762 4.37558 11.24 4.375 10.8369V8.71675H5.25V10.8369C5.25 10.971 5.306 11.0944 5.418 11.207C5.53 11.3196 5.65337 11.3756 5.78812 11.375H15.2119C15.346 11.375 15.4694 11.319 15.582 11.207C15.6946 11.095 15.7506 10.9716 15.75 10.8369V8.71675H16.625V10.8369C16.625 11.2394 16.4902 11.5754 16.2207 11.8449C15.9512 12.1144 15.615 12.2494 15.2119 12.25H5.78812Z"
                    fill="#403B3B"
                  />
                </svg>
              </span>
              {selectedFileName && (
                <span className="ml-2">{selectedFileName}</span>
              )}
            </label>
        
            <input
              type="file"
              id="file_upload"
              name="file_upload"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div> */}
          </div>
        </div>

        {/* --------------------------------Excel -------------------------------------------- */}

        {/* -----------------------------------Employee TimeSheet Reports------------------------------------------ */}
        <section className="mx-16 mt-[3rem]">
          {/* {employeeReports} */}
          <div className="mt-[5rem]">
            {filterEmpListData && filterEmpListData?.length < 1 ? (
              <span className="flex items-center justify-center text-2xl font-semibold ">
                Oops! No Data Found
              </span>
            ) : (
              <PayrollTableContainer
                tableData={filterEmployeeList || []}
                actionBtn
                actionName="Status"
                sl_no={false}
              />
            )}
          </div>
          <aside className="mt-16">
            <div>
              <NextPrevPagination
                page={empLstData?.currentPage || 0}
                pageCount={empLstData?.totalPage || 0}
                handlePageChange={handleChangePage}
              />
            </div>
          </aside>
        </section>
        {/* -----------------------------------Employee TimeSheet Reports------------------------------------------ */}
      </div>
    </>
  );
};

export default TimeSheet;
