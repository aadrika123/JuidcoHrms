"use client";
import React, { useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import "primereact/resources/themes/saga-blue/theme.css"
// import "primeicons/primeicons.css";
import Input from "@/components/global/atoms/Input";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import { HRMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";

// import { debug } from "console";

const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    employee_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    }
};
const Gratuity_table = () => {
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [earnedLeaves, setEarnedLeaves] = useState<any>();

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
    };
    const clearFilter = () => {
        initFilters();
    };
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
        return (
          <div className="flex">
            <div className="flex justify-start mt-3">
              Total Results: {earnedLeaves && earnedLeaves.length}
            </div>
            <div className="flex ml-auto">
                
                {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} /> */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <Input value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
          </div>
        );
    };
    const header = renderHeader();
    const viewBodyTemplate = (rowData:any) => {
      return <Button label="View" severity="info" />
    };
    const getAllLeaveEncashhment= async ()=>{
      const res = await axios({
          url: `/pay/payslip?emp_id=EMP912e43`,
          method: "GET",
          data: {},
        });
        console.log('getAllLeaveEncashhment', res);
        if(res.status){
            setEarnedLeaves(res?.data?.data?.data);
            console.log('getAllLeaveEncashhment', res?.data?.data?.data)
        }
    }
    
    useEffect(()=>{
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
      <DataTable
        value={earnedLeaves}
        paginator showGridlines stripedRows 
        rows={5}
        rowsPerPageOptions={[5, 10, 20, 50]}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          "name",
          "country",
          "representative",
          "status"
        ]}
        header={header}
        emptyMessage="No records found"
        size="small"
        
      >
        <Column   
            className=""
            field="id"
            filterField="id"
            header="ID"
            style={{ maxWidth: "12rem" }}
        />
        <Column
            header="Employee ID"
            field="employee_id"
            filterField="employee_id"
            // style={{ minWidth: "12rem" }}
        />
        <Column
            header="Employee Name"
            field="name"
            filterField="name"
            // filterMenuStyle={{ width: "14rem" }}
            // style={{ minWidth: "14rem" }}
        />
        <Column
          field="gratuity_amount"
          header="Gratuity Amount"
          // filterMenuStyle={{ width: "14rem" }}
          // style={{ minWidth: "12rem" }}
        />
        <Column
          field="application_id"
          header="Application Id"
          // style={{ minWidth: "6rem" }}
        />
        <Column
          header="Date Of Relieving "
          field="employee_id"
          // style={{ minWidth: "6rem" }}
        />
        <Column
          header="View"
          field="employee_id"
          body={viewBodyTemplate}
          // style={{ minWidth: "6rem" }}
        />
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

export default Gratuity_table;



// export default Gratuity_table;
