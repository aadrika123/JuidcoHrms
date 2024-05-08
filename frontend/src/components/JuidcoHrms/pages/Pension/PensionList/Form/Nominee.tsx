"use client";
import PrimaryButton from "@/components/Helpers/Button";
import React, { useEffect, useState } from "react";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import goBack from "@/utils/helper";
import ProfileIcon from "@/assets/icons/profile_new.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import TableListContainer from "@/components/global/organisms/TableListContainer";
import { FetchAxios, useCodeQuery } from "@/utils/fetchAxios";
import { HRMS_URL } from "@/utils/api/urls";
import toast, { Toaster } from "react-hot-toast";
import { SubHeading } from "@/components/Helpers/Heading";
import { ulb_name } from "../Index";

interface NomineeProps {
  onNext: () => void;
  emp_id: string;
}

export function returnEmpPension(payrollData: any, emp_id: string) {
  if (!payrollData) return 0;

  const emp: any = payrollData?.filter((emp: any) => emp.emp_id === emp_id);
  const pension = (emp[0]?.net_pay * 60 * 30) / 70;
  return Math.floor(pension);
}

const Nominee: React.FC<NomineeProps> = ({ onNext, emp_id }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [payrollData] = useState<any[]>();

  const COLUMS_EMP_NOMINEE_DETAILS: COLUMNS[] = [
    {
      HEADER: "Nominee Name ",
      ACCESSOR: "nominee_name",
      isRequired: true,
    },
    {
      HEADER: "Relation",
      ACCESSOR: "relation",
      isRequired: true,
    },

    {
      HEADER: "Percentage",
      ACCESSOR: "percentage",
      isRequired: true,
      type: "number",
    },

    {
      HEADER: "Address",
      ACCESSOR: "address",
      isRequired: true,
    },
    {
      HEADER: "Minor",
      ACCESSOR: "minor",
      isRequired: true,
      type: "radio",
    },
  ];

  //--------------------------- GET EMPLOYEE NOMINEE DETAILS ---------------------------//
  const fetchConfig: FetchAxios = {
    url: `${HRMS_URL.NOMINEE.getById}`,
    url_extend: `?emp_id=${emp_id}`,
    method: "GET",
    res_type: 1,
    query_key: "emp_nominee_details",
    data: [],
  };
  const { data: _nominee_details, error } = useCodeQuery<any>(fetchConfig);
  if (error) toast.error("OOps! Failed to get employee nominee details!");
  //--------------------------- GET EMPLOYEE NOMINEE DETAILS ---------------------------//

  const hanldeClick = () => {
    router.push(`${pathName}?page=2`);
    onNext();
  };

  //--------------------------- GET PAYROLL DETAILS ---------------------------//
  const fetchPayroll: FetchAxios = {
    url: `${HRMS_URL.PAYROLL.getAll}`,
    url_extend: `&page=1&search=${emp_id}`,
    method: "GET",
    res_type: 1,
    query_key: "emp_payroll",
    data: [],
  };
  const { data: payroll_details, error: p_error } =
    useCodeQuery<any>(fetchPayroll);
  if (p_error) toast.error("OOps! Failed to get employee details!");
  //--------------------------- GET PAYROLL DETAILS ---------------------------//

  useEffect(() => {
    sessionStorage.setItem("payroll", JSON.stringify(payroll_details));
  }, [payroll_details]);

  return (
    <>
      <Toaster />
      <div className="p-10 shadow-lg">
        <div className="flex gap-10 m-5">
          <div className="flex flex-col items-center gap-1">
            <Image src={ProfileIcon} width={100} height={100} alt="logo" />

            <h4>Employee Image</h4>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Image src={ProfileIcon} width={100} height={100} alt="logo" />

            <h4>Joint Image</h4>
          </div>
        </div>
        <div className="p-10 shadow-lg mb-10">
          <SubHeading>Employee Nominee Details</SubHeading>
          <TableListContainer
            columns={COLUMS_EMP_NOMINEE_DETAILS}
            tableData={_nominee_details?.data || []}
            sl_no={true}
            thead_bg="#E1E7FF"
          />
        </div>
        <input type="checkbox" /> Declaration*
        <br></br>
        <div className="mt-10">
          Whereas the municipal commissioner,{ulb_name} has consented
          provisionally to advance to me the sum of Rs.
          {returnEmpPension(payrollData, emp_id)} a month ,in anticipation of
          the completion of the enquiries necessary to enable the Corporation to
          fix the amount of my pension I heleby acknowledge that in accepting
          this advance I fully understand that my pension is subject to revision
          on the completion of the necessary formal enquiries ,and I promise to
          raise no objection to such supervision on the ground that the
          provision pension no to be paid to me exceeds the pension to which I
          may be eventually found entitled .In further promise to repay amount
          advanced to me in excess of the pension to which I may be eventually
          found entitled.In further promise to repay amount advanced to me in
          excess of the pension to which I may be eventually found entitled.
        </div>
        <div className="flex items-center justify-end mt-5 gap-5">
          <PrimaryButton
            buttonType="button"
            variant={"cancel"}
            onClick={goBack}
          >
            Back
          </PrimaryButton>

          <PrimaryButton buttonType="button" variant={"cancel"}>
            Reset
          </PrimaryButton>

          <PrimaryButton
            buttonType="submit"
            variant="primary"
            onClick={hanldeClick}
          >
            Next
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Nominee;
