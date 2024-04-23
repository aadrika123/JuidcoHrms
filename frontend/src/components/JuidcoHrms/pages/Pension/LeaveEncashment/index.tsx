"use client";
import React, { useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import "primereact/resources/themes/saga-blue/theme.css";
import Input from "@/components/global/atoms/Input";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { HRMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import Link from "next/link";

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  employee_id: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
};
const LeaveEncashment = () => {
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [earnedLeaves, setEarnedLeaves] = useState<any>();
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex">
        <div className="flex justify-start mt-3">
          Total Results: {earnedLeaves && earnedLeaves.length}
        </div>
      </div>
    );
  };
  const header = renderHeader();

  const viewBodyTemplate = (rowData: any) => {
    return (
      <Link href={`leave_encash_approval?id=${rowData.id}`}>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          View
        </button>
      </Link>
    );
  };
  const statusBodyTemplate = (rowData: any) => {
    let statusText = "";
    let statusColor = "";

    if (rowData.status === 0) {
      statusText = "Pending";
      statusColor = "text-orange-500";
    } else if (rowData.status === 1) {
      statusText = "Approved";
      statusColor = "text-green-500";
    } else if (rowData.status === 2) {
      statusText = "Rejected";
      statusColor = "text-red-500";
    } else {
      statusText = "Unknown";
      statusColor = "text-gray-500";
    }

    return <h1 className={`font-bold ${statusColor}`}>{statusText}</h1>;
  };

  const getAllLeaveEncashhment = async () => {
    const res = await axios({
      url: `${HRMS_URL.LEAVE_ENCASHMENT.get}`,
      method: "GET",
      data: {},
    });
    console.log("getAllLeaveEncashhment", res);
    if (res.status) {
      setEarnedLeaves(res?.data?.data?.data);
      console.log("getAllLeaveEncashhment", res?.data?.data?.data);
    }
  };
  



  const onIndexTemplate = (data: any, props: any) => {
    return props?.rowIndex + 1; // eslint-disable-line
  };

  useEffect(() => {
    getAllLeaveEncashhment();
  }, []);
  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Pension Management
          </SubHeading>
        </div>
      </div>
      <div className="flex">
        <SubHeading className="mx-5 my-5 mb-0 text-4xl">List</SubHeading>

        <div className="flex ml-auto">
          {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} /> */}
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <Input
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <DataTable
          value={earnedLeaves}
          paginator
          showGridlines
          stripedRows
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          globalFilterFields={["employee_id", "emp_name"]}
          header={header}
          emptyMessage="No records found"
          size="small"
          className="shadow-xl"
          let-i="rowIndex" 
        >
          <Column field="i" header="#" body={onIndexTemplate} />

           {/* <Column
            className=""
            field="id"
            header="ID"
            style={{ maxWidth: "12rem" }}
          />  */}
          <Column
            header="Employee ID"
            field="employee_id"
            filterField="employee_id"
          />
          <Column
            header="Employee Name"
            field="emp_name"
            filterField="emp_name"
          />
          <Column
            field="leave_balance_after_apply"
            header="Earned Leave Balance"
          />
          <Column field="application_id" header="Application" />
          <Column
            header="En-cashment Amount"
            field="grand_total_encashment_amount"
          />
          <Column header="Status" field="status" body={statusBodyTemplate} />
          <Column header="View" body={viewBodyTemplate} />
        </DataTable>
      </div>
      <style>
        {`th.p-filter-column {
        background: #E1E8F0;
      }`}
      </style>
    </>
  );
};

export default LeaveEncashment;