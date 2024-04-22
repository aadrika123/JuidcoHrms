/***
 * Author: Jaideep
 * Status: Open
 * Uses: Statement Form Design
 */

import PrimaryButton from "@/components/Helpers/Button";
import React, { useEffect, useState } from "react";
import goBack from "@/utils/helper";
import { InnerHeading } from "@/components/Helpers/Heading";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import { usePathname, useRouter } from "next/navigation";
import { statement, PayDrawData } from "./data";
import { useQueryClient } from "react-query";
import { EmployeeDetailsInterface } from "./Refund";
interface StatementProps {
  onNext: () => void;
  emp_id: string;
}

const Statement: React.FC<StatementProps> = ({ onNext, emp_id }) => {
  const [salaryStatement] = useState<PayDrawData[]>(statement);
  const router = useRouter();
  const pathName = usePathname();
  const [payrollData, setPayrollData] = useState<any[]>();

  const queryClient = useQueryClient();

  const COLUMS_EMP_PAY_DRAW_DETAILS: COLUMNS[] = [
    {
      HEADER: "Month ",
      ACCESSOR: "nominee_name",
      isRequired: true,
    },
    {
      HEADER: "Year",
      ACCESSOR: "relation",
      isRequired: true,
    },

    {
      HEADER: "No. of Day",
      ACCESSOR: "percentage",
      isRequired: true,
      type: "number",
    },

    {
      HEADER: "Rs.",
      ACCESSOR: "address",
      isRequired: true,
    },
  ];

  const handleClick = () => {
    router.push(`${pathName}?page=4`);
    onNext();
  };

  const emp_details =
    queryClient.getQueryData<EmployeeDetailsInterface>("emp_details");
  const last_pay_drawn: number =
    Number(emp_details?.emp_join_details?.basic_pay) +
    Number(emp_details?.emp_join_details?.grade_pay);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const res = sessionStorage.getItem("payroll");
      const _data = JSON.parse(res as string);
      setPayrollData(_data.data);
    }
  }, []);

  function returnNetPay(payrollData: any, emp_id: string) {
    if (!payrollData) return 0;

    const emp: any = payrollData?.filter((emp: any) => emp.emp_id === emp_id);
    return emp[0].net_pay;
  }

  return (
    <>
      <div className="shadow-md p-10">
        <InnerHeading>
          Statement showing the pay drawn during the 12 month :
        </InnerHeading>

        <div className="overflow-x-auto">
          <table className="table-auto w-full mt-10">
            <thead>
              <tr>
                {COLUMS_EMP_PAY_DRAW_DETAILS.map((item, index) => (
                  <th key={index} className="px-4 py-2 text-left">
                    {item.HEADER}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salaryStatement?.map((k, i: number) => (
                <tr className=" border-b" key={i}>
                  <td className=" px-4 py-2 text-left">{k.month}</td>
                  <td className=" px-4 py-2 text-left">{k.year}</td>
                  <td className=" px-4 py-2 text-left">
                    {k.no_of_days_present}
                  </td>
                  <td className=" px-4 py-2 text-left">
                    {returnNetPay(payrollData, emp_id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span>
          {" "}
          Remarks
          <input
            type="text"
            placeholder="Please Enter Remarks"
            className="border mt-5 mx-4 p-2 mb-5"
          />
          <br></br>
          (The undersigned having satisfied about the above particular
          ,recommend the grant of the pension of Rs {last_pay_drawn} only. )
        </span>

        <div className="flex items-center justify-end mt-5 gap-5">
          <PrimaryButton
            buttonType="button"
            variant={"cancel"}
            onClick={goBack}
          >
            Back
          </PrimaryButton>

          <PrimaryButton
            //   onClick={handleReset}
            buttonType="button"
            variant={"cancel"}
          >
            Reset
          </PrimaryButton>

          <PrimaryButton
            buttonType="submit"
            variant="primary"
            onClick={handleClick}
          >
            Next
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Statement;
