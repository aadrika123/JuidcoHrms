"use client";
import React, { useEffect, useState } from "react";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { InnerHeading, SubHeading } from "@/components/Helpers/Heading";
import TableListContainer from "@/components/global/organisms/TableListContainer";
import { FetchAxios, useCodeQuery } from "@/utils/fetchAxios";
import { HRMS_URL } from "@/utils/api/urls";
import toast, { Toaster } from "react-hot-toast";
import { returnEmpPension } from "./Nominee";
import axios from "@/lib/axiosConfig"

interface PensionPaymentProps {
  onPrev: () => void;
  emp_id: string;
}

const FamilyDeclaration: React.FC<PensionPaymentProps> = ({ emp_id }) => {
  //--------------------------- GET EMPLOYEE FAMILY DETAILS ---------------------------//
  const fetchConfig: FetchAxios = {
    url: `${HRMS_URL.FAMILY.getById}`,
    url_extend: `?emp_id=${emp_id}`,
    method: "GET",
    res_type: 1,
    query_key: "emp_family_details",
    data: [],
  };
  const { data: emp_family_details, error } = useCodeQuery<any>(fetchConfig);
  if (error) toast.error("OOps! Failed to get employee details!");
  console.log(emp_family_details);
  //--------------------------- GET EMPLOYEE FAMILY DETAILS ---------------------------//

  const COLUMS_EMP_FAMILY_DETAILS: COLUMNS[] = [
    {
      HEADER: "Name ",
      ACCESSOR: "name",
      isRequired: true,
    },
    {
      HEADER: "Relation",
      ACCESSOR: "relation",
      isRequired: true,
    },

    {
      HEADER: "D.O.B",
      ACCESSOR: "dob",
      isRequired: true,
      type: "date",
    },

    {
      HEADER: "Married or Unmarried(in case of daughter only)",
      ACCESSOR: "address",
      isRequired: true,
    },
  ];

  function onSave() {
    setTimeout(() => {
      toast.success("Pension data saved successfully!");
    }, 1000);

    setTimeout(() => {
      window.location.replace("/hrms/ems/pension-management");
    }, 2000);
  }


  const [payrollData, setPayrollData] = useState<any[]>();


  useEffect(() => {
    if (typeof window !== "undefined") {
      const res = sessionStorage.getItem("payroll");
      const _data = JSON.parse(res as string);
      setPayrollData(_data?.data);
    }
  }, []);

  const familyPension: number =
    (returnEmpPension(payrollData, emp_id) * 30) / 100;

  const pension_data = {
    beneficery_id: 1,
    emp_id: emp_id,
    pension_amnt: returnEmpPension(payrollData, emp_id),
    family_pension_amnt: familyPension,
    date_of_death: "",
    summary: "",
    communi_sent_acc_officer: "",
    pensioncol: "",
  }

  async function storePensionData() {
    try {
      const res = await axios({
        url: "/employee/pension/create",
        method: "POST",
        data: pension_data
      })

      if (res.status) onSave()

    } catch {
      alert("Something went wrong!")
    }
  }

  return (
    <div>
      <Toaster />
      <div className="p-10 shadow-lg mb-10 ">
        <SubHeading>Employee Family Details</SubHeading>
        <TableListContainer
          columns={COLUMS_EMP_FAMILY_DETAILS}
          tableData={emp_family_details?.data || []}
          sl_no={true}
          thead_bg="#E1E7FF"
        />
      </div>
      <div className="p-10 shadow-lg mb-10 mt-5">
        <InnerHeading className="flex items-center justify-center mb-5">
          Certificate of dues if found outstanding against corporation employee.
        </InnerHeading>
        <input type="checkbox" /> Declaration*
        <br></br>
        <div className="mt-10">
          Should any amount whether due to excess or overdrawal of pay
          ,allowance or unrefunded balance of advances of pay travelling
          allowances,on transfer,motor car or cycle ,House Building etc or dues
          on account of house rent or otherwise outstanding for recovery of any
          amount from me,I shall be called upon to pay.{" "}
        </div>
      </div>

      <div className="flex items-center justify-end mt-5 gap-5">
        <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
          Back
        </PrimaryButton>

        <PrimaryButton onClick={storePensionData} buttonType="submit" variant="primary">
          Save
        </PrimaryButton>
      </div>
    </div>
  );
};

export default FamilyDeclaration;
