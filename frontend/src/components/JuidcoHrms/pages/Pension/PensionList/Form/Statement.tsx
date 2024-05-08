/***
 * Author: Jaideep
 * Status: Open
 * Uses: Statement Form Design
 */

import PrimaryButton from "@/components/Helpers/Button";
import React from "react";
import goBack from "@/utils/helper";
import { InnerHeading } from "@/components/Helpers/Heading";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import { EmployeeDetailsInterface } from "./Refund";
import { FetchAxios, useCodeQuery } from "@/utils/fetchAxios";
import { HRMS_URL } from "@/utils/api/urls";
import toast from "react-hot-toast";
import { EmployeePayrollData } from "@/utils/types/payslip.type";
interface StatementProps {
  onNext: () => void;
  emp_id: string;
}

const Statement: React.FC<StatementProps> = ({ onNext, emp_id }) => {
  const router = useRouter();
  const pathName = usePathname();
  // const [payrollData, setPayrollData] = useState<any[]>();

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

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const res = sessionStorage.getItem("payroll");
  //     if (res !== "undefined") {
  //       const _data = JSON.parse(res as string);
  //       setPayrollData(_data.data);
  //     }
  //   }
  // }, []);

  // function returnNetPay(payrollData: any, emp_id: string) {
  //   if (!payrollData) return 0;

  //   const emp: any = payrollData?.filter((emp: any) => emp.emp_id === emp_id);
  //   return emp[0].net_pay;
  // }

  //--------------------------- GET PAYROLL DETAILS ---------------------------//
  const fetchPayroll: FetchAxios = {
    url: `${HRMS_URL.PAYROLL.getAll}`,
    url_extend: `&page=1&search=${emp_id}&lastMonth=true`,
    method: "GET",
    res_type: 1,
    query_key: "emp_payroll",
    data: [],
  };
  const { data: payroll_details, error: p_error } =
    useCodeQuery<EmployeePayrollData>(fetchPayroll);
  if (p_error) toast.error("OOps! Failed to get employee details!");

  //--------------------------- GET PAYROLL DETAILS ---------------------------//

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
              {payroll_details?.data?.map((k, i: number) => (
                <tr className=" border-b" key={i}>
                  <td className=" px-4 py-2 text-left">
                    {String(k.month).padStart(2, "0")}
                  </td>
                  <td className=" px-4 py-2 text-left">{k.year}</td>
                  <td className=" px-4 py-2 text-left">{k.present_days}</td>
                  <td className=" px-4 py-2 text-left">{k.net_pay}</td>
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
