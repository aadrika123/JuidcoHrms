/**
 * | Author- Krish
 * | Created for- Employee LIST
 * | Status: closed
 */

"use client";

import React, { useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import Image from "next/image";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import NextPrevPagination from "@/components/global/molecules/NextPrevPagination";
import TableListContainer, {
  COLUMNS,
} from "@/components/global/organisms/TableListContainer";
import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import EmployeeIcon from "@/assets/icons/employee 1.png";

const EmployeeList = () => {
  const [selectedFilter, setSelectedFilter] = useState<number | string>("");
  const [selectedData, setSelectedData] = useState<number | string>("");
  const [page, setPage] = useState<number>(1);
  const [dataList, setDataList] = useState<any[]>([]);

  const EMP_LIST_COLS: COLUMNS[] = [
  { HEADER: "Employee Name", ACCESSOR: "emp_name" },
  { HEADER: "Employment ID", ACCESSOR: "emp_id" },
];

// Conditionally push filter column (only if not filtering by Employee Name)
if (selectedFilter !== 3) {
  EMP_LIST_COLS.push({
    HEADER:
      selectedFilter === "" || selectedFilter === 0
        ? "Department"
        : selectedFilter === 1
        ? "Designation"
        : selectedFilter === 2
        ? "Employee Type"
        : "",
    ACCESSOR:
      selectedFilter === "" || selectedFilter === 0
        ? "dep_name"
        : selectedFilter === 1
        ? "des_name"
        : selectedFilter === 2
        ? "emp_type_name"
        : "",
  });
}



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

  const { data: empLstData, error: empLstErr } = useCodeQuery(
    `${HRMS_URL.EMS.get}&page=${page}${selectedFilter === 0
      ? `&department=${selectedData}`
      : selectedFilter === 1
        ? `&designation=${selectedData}`
        : selectedFilter === 2
          ? `&emp_type=${selectedData}`
          : selectedFilter === 3
            ? `&emp_id=${selectedData}`
            : ""
    }`
  );

  const { data: empCount, error: empCountErr } = useCodeQuery(
    `${HRMS_URL.EMP_COUNT.get}`
  );

  const newEmpLst = empLstData?.data.map((obj: any) => {
    return {
      ...obj,
      emp_join_details: {
        ...obj?.emp_join_details,
        department: {
          ...obj.emp_join_details?.department,
          dep_name: obj?.emp_join_details?.department?.name,
        },
        designation: {
          ...obj.emp_join_details?.designation,
          des_name: obj?.emp_join_details?.designation?.name,
        },
      },
      emp_basic_details: {
        ...obj.emp_basic_details,
        emp_type_master: {
          ...obj.emp_basic_details?.emp_type_master,
          emp_type_name: obj.emp_basic_details?.emp_type_master?.name,
        },
      },
    };
  });

  // FILTER BY DEPARTMENT , DESIGNATION, EMPLOYEE TYPE
  useEffect(() => {
    (async () => {
      let url: string | null = null;

      if (selectedFilter === 0) {
        url = HRMS_URL.DEPARTMENT.get ?? null;
      } else if (selectedFilter === 1) {
        url = HRMS_URL.DESIGNATION.get ?? null;
      } else if (selectedFilter === 2) {
        url = HRMS_URL.EMPLOYEE_TYPE_MASTER.getAll ?? null;
      } else if (selectedFilter === 3) {
        url = HRMS_URL.EMS.getNames ?? null;
      }

      if (url !== null) {
        try {
          const res = await axios({
            url: url,
            method: "GET",
          });

          const data = selectedFilter === 3 ? res.data?.data : res.data?.data?.data;
          setDataList(data || []);
          setSelectedData("");
        } catch (err) {
          console.error("Error fetching filter data:", err);
          setDataList([]);
        }
      } else {
        setDataList([]);
      }
    })();
  }, [selectedFilter]);



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
          List of On-Boarded Employee Records
        </h2>
        <h4 className=" text-[1.3819rem]">
          <span className="text-primary_blue">
            Onboarded employee - {empCount?.totalEmp}
          </span>
        </h4>
      </div>
      <div className="flex items-start gap-8">
        <div className=" w-40 flex flex-col gap-3">
          <span className="text-primary_blue text-[1.63544rem]">
            {empCount?.existingEmp}
          </span>
          <span>Total No. of Existing Employee</span>
        </div>
        <div className="w-40 flex flex-col gap-3">
          <span className="text-[#63ADCB] text-[1.63544rem]">
            {empCount?.newEmp}
          </span>
          <span>Total No. of New Employee</span>
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
            Employee List
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
            <option value={2}>Employee Type</option>
            <option value={3}>Employee Name</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="filter-by" className="text-secondary text-lg">
            Filter By
          </label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedData(e.target.value)
            }
            className="p-3 rounded-lg shadow-inner border-2 border-zinc-400 w-64 max-w-xs bg-white "
          >
            <option disabled selected>
              Select Filter By
            </option>
            {dataList?.map((k: any) => {
              const id = k.id ?? k.emp_id;
              const name = k.name ?? k.emp_name;
              return (
                <option key={id} value={id}>
                  {name}
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
          <TableListContainer
            columns={EMP_LIST_COLS}
            tableData={newEmpLst || []}
            actionBtn
            actionName="Status"
            setEmpId={removeEmployee}
            sl_no={false}
            action_type={["delete", "readonly", "edit"]}
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

export default EmployeeList;
