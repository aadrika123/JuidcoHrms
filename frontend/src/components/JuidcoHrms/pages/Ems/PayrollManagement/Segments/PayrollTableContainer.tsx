/**
 * Author: Krish
 * Status: Open
 * Created for: Showing payroll for all employees
 */

import React from "react";
import { COLUMNS } from "@/components/global/organisms/TableListContainer";
import PrimaryButton from "@/components/Helpers/Button";
import { EmployeePayrollType } from "@/utils/types/payslip.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { set_payroll } from "@/redux/reducers/payroll.reducer";
import axios from "@/lib/axiosConfig";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { HRMS_URL } from "@/utils/api/urls";

interface TLContainerProps {
  tableData: EmployeePayrollType[];
  actionBtn?: boolean;
  actionName?: string;
  setEmpId?: (val: number) => void;
  sl_no: boolean;
}

const Thead: React.FC<{
  index: number;
  HEADER: string;
  WIDTH?: string;
}> = (props) => {
  return (
    <>
      {props.index === 0 ? (
        <>
          <th className="px-4 w-16">
            <div
              key={props.index}
              className={`p-5 text-[1.5rem] font-light text-blue-600`}
            >
              <div className="flex gap-2">
                <span>#</span>
              </div>
            </div>
          </th>
          <th
            key={props.index}
            className={`p-5 text-xl font-light w-[${props.WIDTH}]`}
          >
            <div className="flex gap-2">
              <span className=" whitespace-nowrap">{props.HEADER}</span>
            </div>
          </th>
        </>
      ) : (
        <th
          key={props.index}
          className={`p-5 text-xl font-light w-[${props.WIDTH}]`}
        >
          <div className="flex gap-2">
            <span>{props.HEADER}</span>
          </div>
        </th>
      )}
    </>
  );
};

const PayrollTableContainer: React.FC<TLContainerProps> = (props) => {
  const dispatch = useDispatch();
  const pathName = usePathname();

  const EMP_LIST_COLS: COLUMNS[] = [
    {
      HEADER: "Employee Details",
      ACCESSOR: "emp_name",
    },

    {
      HEADER: "Salary Details",
      ACCESSOR: "emp_id",
    },
    {
      HEADER: "Attendance Details",
      ACCESSOR: "name",
      WIDTH: "auto",
    },
    {
      HEADER: "Net Salary",
      ACCESSOR: "emp_leave_count",
    },
    {
      HEADER: "Status",
      ACCESSOR: "emp_present_count",
    },
  ];

  // =================================== POST PAYROLL DATA ================================//
  const queryClient = useQueryClient();

  async function getAndPostPayrollData(data: {
    id: number;
    status: "approved" | "reject";
  }) {
    try {
      if (!data) return null;

      const res = await axios({
        method: "POST",
        url: `${HRMS_URL.PAYROLL.update}`,
        data: data,
      });

      return res.data?.data;
    } catch (error) {
      return error;
    }
  }

  const { mutate } = useMutation(
    (data: { id: number; status: "approved" | "reject" }) =>
      getAndPostPayrollData(data),
    {
      onSuccess: () => {
        toast.success(`Employee Status Updated`);
      },
      onError: () => {
        toast.error(`Failed to Approve!`);
      },
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  // =================================== POST PAYROLL DATA ================================//

  return (
    <div>
      <table className="mt-4 w-full">
        <thead className="  text-[1rem] border-t border-b border-zinc-400 text-[#211F35]  ">
          <tr>
            {EMP_LIST_COLS?.map((cols, index: number) => (
              <Thead
                key={index}
                HEADER={cols.HEADER}
                WIDTH={cols.WIDTH}
                index={index}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {props.tableData?.map((item, index: number) => (
            <tr key={index} className=" shadow-md h-[9rem]">
              {/* =================== Serial No ======================== */}
              <td className="py-3 text-xl text-zinc-600 font-light">
                <div className="pl-5">
                  <h4>{index + 1}</h4>
                </div>
              </td>

              {/* =================== Employee Details ======================== */}
              <td className="py-3 text-xl text-zinc-600 font-light">
                <div className="pl-5">
                  <h4 className="text-xl font-semibold">{item.emp_name}</h4>
                  <p>E. ID - {item.emp_id}</p>
                  <p>PAN No. -</p>
                </div>
              </td>

              {/* =================== Salary Details ======================== */}

              <td className="py-3 text-xl text-zinc-600 font-light">
                <div className="pl-5">
                  <div className="grid grid-cols-2">
                    <p>Allowances-</p>
                    <p className="text-[#0E9D4A] font-medium">
                      {item.total_allowance}/-
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Deductions-</p>
                    <p className="text-red-600 font-medium">
                      {item.total_deductions}/-
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Claims-</p>
                    <p className="text-zinc-700 font-medium">0/-</p>
                  </div>
                </div>
              </td>

              {/* =================== Attendance Details ======================== */}
              <td className="py-3 text-xl text-zinc-600 font-light">
                <div className="pl-5">
                  <div className="grid grid-cols-2 whitespace-nowrap">
                    <p>Total Present days-</p>
                    <p className="text-[#0E9D4A] font-medium">
                      {item.present_days}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 whitespace-nowrap">
                    <p>Total Absent days-</p>
                    <p className="text-red-600 font-medium">
                      {item.leave_days}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 whitespace-nowrap">
                    <p>LWP-</p>
                    <p className="text-zinc-700 font-medium">{item.lwp_days}</p>
                  </div>
                </div>
              </td>

              {/* =================== Net Salary ======================== */}
              <td className="py-3 text-xl text-zinc-600 font-light">
                <div className="pl-5">
                  <p className="text-2xl font-medium text-[#0E9D4A] ">
                    {item.net_pay}/-
                  </p>
                </div>
              </td>

              {/* =================== STATUS ======================== */}
              <td className="py-3 text-xl text-zinc-600 font-light">
                <div className="pl-5 flex flex-col  gap-2 w-full">
                  <PrimaryButton
                    onClick={() => {
                      const confirm = window.confirm(
                        "Are you sure want to Approve"
                      );

                      if (confirm) {
                        mutate({
                          id: item.id,
                          status: "approved",
                        });
                      }
                    }}
                    variant="primary"
                    className="rounded-none flex items-center justify-center"
                  >
                    <span>Approve</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                      >
                        <path
                          d="M9.11542 0.88796L3.44509 6.80777L0.846191 4.09452L1.51246 3.39895L3.44509 5.41168L8.44916 0.192383L9.11542 0.88796Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </PrimaryButton>
                  <PrimaryButton
                    onClick={() => {
                      const confirm = window.confirm(
                        "Are you sure want to Approve"
                      );

                      if (confirm) {
                        mutate({
                          id: item.id,
                          status: "reject",
                        });
                      }
                    }}
                    variant="cancel"
                    className="rounded-none  flex items-center justify-center"
                  >
                    <span>Reject</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="8"
                        viewBox="0 0 6 8"
                        fill="none"
                      >
                        <path
                          d="M5.84006 1.94981C5.89007 1.8948 5.92996 1.829 5.95742 1.75623C5.98487 1.68346 5.99934 1.60519 5.99998 1.52598C6.00061 1.44678 5.98741 1.36821 5.96112 1.29489C5.93484 1.22156 5.89601 1.15493 5.8469 1.09889C5.79779 1.04286 5.73937 0.998529 5.67507 0.9685C5.61077 0.93847 5.54187 0.923339 5.47238 0.92399C5.40289 0.924641 5.33422 0.94106 5.27036 0.97229C5.2065 1.00352 5.14873 1.04893 5.10043 1.10588L3.00296 3.49607L0.906189 1.10588C0.858279 1.04727 0.800504 1.00026 0.736311 0.967659C0.672117 0.935054 0.60282 0.917522 0.532553 0.916108C0.462287 0.914695 0.39249 0.92943 0.327328 0.959433C0.262165 0.989437 0.202971 1.03409 0.153277 1.09074C0.103584 1.14739 0.0644082 1.21487 0.0380879 1.28915C0.0117676 1.36343 -0.00115833 1.44299 8.14426e-05 1.52309C0.00132121 1.60319 0.0167013 1.68218 0.0453039 1.75536C0.0739065 1.82854 0.115146 1.8944 0.166562 1.94901L2.26194 4.33999L0.165166 6.73017C0.0727267 6.84326 0.0224017 6.99283 0.0247938 7.14738C0.0271859 7.30192 0.0821082 7.44938 0.17799 7.55868C0.273871 7.66797 0.403226 7.73058 0.538802 7.73331C0.674377 7.73604 0.805589 7.67867 0.904793 7.5733L3.00296 5.18311L5.09974 7.57409C5.19894 7.67947 5.33015 7.73683 5.46573 7.73411C5.6013 7.73138 5.73066 7.66877 5.82654 7.55947C5.92242 7.45017 5.97734 7.30272 5.97974 7.14817C5.98213 6.99362 5.9318 6.84405 5.83936 6.73096L3.74399 4.33999L5.84006 1.94981Z"
                          fill="#FF0000"
                        />
                      </svg>
                    </span>
                  </PrimaryButton>

                  <Link href={`${pathName}/${item.emp_id}`} className="w-full">
                    <PrimaryButton
                      onClick={() => {
                        dispatch(set_payroll(item));
                      }}
                      variant="cancel"
                      className="rounded-none  flex items-center justify-center w-full"
                    >
                      <span>Edit</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="11"
                          viewBox="0 0 10 11"
                          fill="none"
                        >
                          <path
                            d="M9.52631 2.90154C9.34342 3.09469 9.16591 3.28217 9.16054 3.46964C9.1444 3.65143 9.32729 3.83891 9.49942 4.01502C9.75761 4.29907 10.0104 4.55472 9.99967 4.83309C9.98891 5.11146 9.71458 5.40119 9.44025 5.68524L7.2187 8.03719L6.45487 7.23048L8.74097 4.82172L8.22458 4.27635L7.46075 5.07737L5.44361 2.94698L7.50916 0.771151C7.71895 0.54959 8.06859 0.54959 8.26761 0.771151L9.52631 2.10051C9.73609 2.31071 9.73609 2.67998 9.52631 2.90154ZM0 8.70187L5.14238 3.26512L7.15952 5.39551L2.01715 10.8323H0V8.70187Z"
                            fill="#6D63E8"
                          />
                        </svg>
                      </span>
                    </PrimaryButton>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTableContainer;
