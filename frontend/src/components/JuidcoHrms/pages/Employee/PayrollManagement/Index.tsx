"use client";

import React, { useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Image from "next/image";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import NextPrevPagination from "@/components/global/molecules/NextPrevPagination";

import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import EmployeeIcon from "@/assets/icons/employee 1.png";
import PayrollTableContainer from "./Segments/PayrollTableContainer";

const PayrollManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);

  const queryClient = useQueryClient();

  const handleChangePage = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  const fetchData = async (endpoint: string) => {
    if (endpoint === "null") return [];
    const res = await axios({
      url: `${endpoint}`,
      method: "GET",
    });

    return res.data?.data;
  };

  // const { currentPage, count, totalPage } = page;
  const useCodeQuery = (endpoint: string) => {
    return useQuery([endpoint, [selectedFilter, selectedData, page]], () =>
      fetchData(endpoint)
    );
  };

  const { data: dataList = [], error: dataError } = useCodeQuery(
    `${selectedFilter === 0 ? HRMS_URL.DEPARTMENT.get : selectedFilter === 1 ? HRMS_URL.DESIGNATION.get : null}`
    // `${HRMS_URL.DEPARTMENT.get}`
  );

  const { data: empLstData, error: empLstErr } = useCodeQuery(
    `${HRMS_URL.EMS.get}&page=${page}&department=${selectedData}`
  );

  const { data: empCount, error: empCountErr } = useCodeQuery(
    `${HRMS_URL.EMP_COUNT.get}`
  );

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

  if (dataError) {
    return <div>Failed to fetch data</div>;
  }

  if (empCountErr) {
    throw Error;
  }

  if (empLstErr) {
    toast.error("No data available!");
  }

  // -----------------Employee Onboard report JSX----------------------//
  const employeeReports = (
    <section className="flex items-center justify-between mt-5">
      <div>
        <h2 className="text-[2rem] text-secondary font-medium">
          Payroll Management System
        </h2>
      </div>
      <div className="flex items-start gap-8">
        <div className=" w-40 flex flex-col gap-3">
          <span className="text-primary_blue text-[1.63544rem]">
            {empCount?.existingEmp}
          </span>
          <span>Total No. of Employee</span>
        </div>
        <div className="w-40 flex flex-col gap-3">
          <span className="text-[#63ADCB] text-[1.63544rem]">
            {empCount?.newEmp}
          </span>
          <span>Total No. of Amount</span>
        </div>
      </div>
    </section>
  );
  // -----------------Employee Onboard report JSX----------------------//

  return (
    <>
      <Toaster />
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Payroll Management
          </SubHeading>
        </div>
      </div>
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
            Search By
          </label>
          <select
            onChange={(e) => setSelectedFilter(parseInt(e.target.value))}
            className="p-3 rounded-lg shadow-inner border-2 border-zinc-400 w-64 bg-white"
          >
            <option disabled selected>
              Select Search By
            </option>
            <option value={0}>Department</option>
            <option value={1}>Designation</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="filter-by" className="text-secondary text-lg">
            Filter By
          </label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedData(parseInt(e.target.value))
            }
            className="p-3 rounded-lg shadow-inner border-2 border-zinc-400 w-64 max-w-xs bg-white "
          >
            <option disabled selected>
              Select Filter By
            </option>
            {dataList?.data?.map((k: any) => {
              return (
                <option key={k.id} value={k.id}>
                  {k.name}
                </option>
              );
            })}
          </select>
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
      {/* -----------------------------------Filter------------------------------------------ */}

      {/* -----------------------------------Employee Onboard Reports------------------------------------------ */}
      <section className="mx-16 mt-[3rem]">
        {employeeReports}
        <div className="mt-[5rem]">
          <PayrollTableContainer
            tableData={empLstData?.data || []}
            actionBtn
            actionName="Status"
            setEmpId={removeEmployee}
            sl_no={false}
          />
        </div>
        <aside className="mt-16">
          <div>
            <NextPrevPagination
              page={empLstData?.currentPage}
              pageCount={empLstData?.totalPage}
              handlePageChange={handleChangePage}
            />
          </div>
        </aside>
      </section>
      {/* -----------------------------------Employee Onboard Reports------------------------------------------ */}
    </>
  );
};

export default PayrollManagement;
