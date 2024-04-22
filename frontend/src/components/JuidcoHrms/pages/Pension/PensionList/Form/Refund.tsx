"use client";

import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { FetchAxios, useCodeQuery } from "@/utils/fetchAxios";
import { HRMS_URL } from "@/utils/api/urls";
import toast from "react-hot-toast";
import DropDownList from "@/components/Helpers/DropDownList";
import { DateInput, formatDate } from "@fullcalendar/core/index.js";
import axios from "@/lib/axiosConfig";
import { ulb_name, current_date } from "../Index";
import { returnEmpPension } from "./Nominee";

interface RefundProps {
  onNext: () => void;
  emp_id: string;
}

// -----------------------  EMPLOYEE REFUND TYPES ------------------------//
interface EmployeeBasicDetails {
  emp_name: string;
  dob: DateInput;
}

interface EmployeePersonalDetails {
  identification_marks: string;
}

interface EmployeeJoinDetails {
  department_id: string;
  designation_id: string;
  grade_pay?: number;
  basic_pay?: number;
  doj: string;
}

interface EmployeeAddressDetails {
  address_primary: string;
  address_primary_permanent: string;
}

interface EmployeeExtend {
  retiring_from_service: string;
  last_pay_drawn: string;
  cause_of_leaving_service: string;
}

export interface EmployeeDetailsInterface {
  emp_id: string;
  emp_basic_details: EmployeeBasicDetails;
  emp_join_details: EmployeeJoinDetails;
  emp_address_details: EmployeeAddressDetails;
  emp_personal_details: EmployeePersonalDetails;
  emp_extend: EmployeeExtend;
}
type EmployeeRefundType = EmployeeBasicDetails &
  EmployeeJoinDetails &
  EmployeeAddressDetails &
  EmployeePersonalDetails &
  EmployeeExtend;
// -----------------------  EMPLOYEE REFUND TYPES ------------------------//

const Refund: React.FC<RefundProps> = ({ onNext, emp_id }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");
  const [payrollData, setPayrollData] = useState<any[]>();

  const handleSubmitFormik = () => {
    router.push(`${pathName}?page=3`);
    onNext();
  };

  // --------------------------- OTP VERFICATION -----------------------------//
  const handleSubmitOTP = async () => {
    try {
      const res = await axios({
        url: `${HRMS_URL.OTP.create}`,
        method: "POST",
        data: {
          mobileNumber: mobileNo,
        },
      });
      alert("OTP sent successfully!");
      setOtpSent(true);
      setButtonText("Validate OTP");
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleValidateOTP = async () => {
    try {
      // const res = await axios(`${HRMS_URL.OTP.validate}`, {
      //   mobileNumber: mobileNo,
      //   enteredOtp: otpValue,
      // });

      const res = await axios({
        url: `${HRMS_URL.OTP.validate}`,
        method: "POST",
        data: {
          mobileNumber: mobileNo,
          enteredOtp: otpValue,
        },
      });

      const { status } = res.data.data;

      if (status) {
        // OTP is valid
        alert("OTP verified successfully!");
        setButtonText("Successfully Verified");
      } else {
        // OTP is invalid
        alert("Invalid OTP. Please try again.");
        setButtonText("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      alert("Failed to verify OTP");
      setButtonText("Validate OTP");
    }
  };
  // --------------------------- OTP VERFICATION -----------------------------//

  //--------------------------- GET EMPLOYEE DETAILS ---------------------------//
  const fetchConfig: FetchAxios = {
    url: `${HRMS_URL.EMS.getById}`,
    url_extend: `/${emp_id}`,
    method: "GET",
    res_type: 1,
    query_key: "emp_details",
    data: [],
  };
  const { data: emp_details, error } =
    useCodeQuery<EmployeeDetailsInterface>(fetchConfig);
  if (error) toast.error("OOps! Failed to get employee details!");
  //--------------------------- GET EMPLOYEE DETAILS ---------------------------//

  //--------------------------- INITIALIZING EMPLOYEE DETAILS ---------------------------//
  const last_pay_drawn: number =
    Number(emp_details?.emp_join_details?.basic_pay) +
    Number(emp_details?.emp_join_details?.grade_pay);
  const dob = formatDate(emp_details?.emp_basic_details.dob as string);
  const not_provided: string = "not provided";

  const initialValues: EmployeeRefundType = {
    emp_name: emp_details?.emp_basic_details.emp_name || not_provided,
    dob: dob || not_provided,
    department_id: emp_details?.emp_join_details.department_id || not_provided,
    designation_id:
      emp_details?.emp_join_details.designation_id || not_provided,
    address_primary:
      emp_details?.emp_address_details.address_primary || not_provided,
    address_primary_permanent:
      emp_details?.emp_address_details.address_primary_permanent ||
      not_provided,
    doj: emp_details?.emp_join_details.doj || not_provided,
    identification_marks:
      emp_details?.emp_personal_details.identification_marks || not_provided,
    last_pay_drawn: String(last_pay_drawn) || "no data",
    cause_of_leaving_service: "",
    retiring_from_service: "",
  };
  //--------------------------- INITIALIZING EMPLOYEE DETAILS ---------------------------//

  useEffect(() => {
    if (typeof window !== "undefined") {
      const res = sessionStorage.getItem("payroll");
      const _data = JSON.parse(res as string);
      setPayrollData(_data.data);
    }
  }, []);

  return (
    <>
      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 pb-30 pt-20 shadow-md">
        <SubHeading className="text-[20px] py-4">
          Declaration for Refund
        </SubHeading>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitFormik}
          enableReinitialize
        >
          {({ values, handleChange, handleSubmit, handleReset }) => (
            <form onSubmit={handleSubmit} className="relative">
              <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
                <InputBox
                  onChange={handleChange}
                  value={values.emp_name}
                  label="Name of the Employee"
                  name="emp_name"
                />

                <DropDownList
                  onChange={handleChange}
                  value={values.department_id}
                  label="Parent Department"
                  name="department_id"
                  api={HRMS_URL.DEPARTMENT.get || ""}
                  placeholder={""}
                />

                <DropDownList
                  onChange={handleChange}
                  value={values.designation_id}
                  label="Designation"
                  name="designation_id"
                  api={HRMS_URL.DESIGNATION.get || ""}
                  placeholder={""}
                />

                <InputBox
                  onChange={handleChange}
                  value={values.emp_name}
                  label="Father's Name / Husband's Name"
                  name="emp_name"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.address_primary}
                  label="Present Address"
                  name="address_primary"
                />

                <DropDownList
                  onChange={handleChange}
                  value={values.department_id}
                  label="Name of Department under working"
                  name="department_id"
                  api={HRMS_URL.DEPARTMENT.get || ""}
                  placeholder={""}
                />

                <InputBox
                  onChange={handleChange}
                  value={String(values.dob)}
                  label="Date of Birth"
                  name="dob"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.address_primary_permanent || "not provided"}
                  label="Permanent Address"
                  name="address_primary_permanent"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.retiring_from_service}
                  label="Retiring from service"
                  name="retiring_from_service"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.doj}
                  label="Date of Joining Service"
                  name="doj"
                  type="date"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.last_pay_drawn}
                  label="Last Pay Drawn: Basic Pay + Grade Pay"
                  name="last_pay_drawn"
                  disabled
                />

                <InputBox
                  onChange={handleChange}
                  value={values.cause_of_leaving_service || "Retirement"}
                  label="Cause of leaving service"
                  name="cause_of_leaving_service"
                  disabled
                />

                {/* --------------------------- OTP --------------------- */}
                <div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="mobileNo"
                      className="text-secondary text-sm"
                    >
                      Enter Mobile No.
                    </label>
                    <input
                      type="text"
                      id="mobileNo"
                      value={mobileNo}
                      className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400`}
                      onChange={(e) => {
                        let formattedNumber = e.target.value.trim();
                        if (!formattedNumber.startsWith("+91")) {
                          formattedNumber = "+91" + formattedNumber;
                        }
                        setMobileNo(formattedNumber);
                      }}
                      placeholder="Enter Mobile No."
                    />
                  </div>

                  {/* OTP input section */}

                  {otpSent && (
                    <div className="mt-5">
                      <label htmlFor="otpValue">Enter OTP- </label>
                      <input
                        type="text"
                        id="otpValue"
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        placeholder="Enter OTP"
                        className="border rounded-xl p-2 mb-2 bg-transparent"
                      />

                      <button
                        type="button"
                        onClick={handleValidateOTP}
                        className="bg-[#4245D9] text-white text-md px-4 p-1 rounded-md mt-2 ml-5"
                      >
                        Validate OTP
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={otpSent ? handleValidateOTP : handleSubmitOTP}
                    className="bg-[#4245D9] text-white text-md px-4 p-1 rounded-md mt-2"
                  >
                    {otpSent ? buttonText : "Send OTP"}
                  </button>
                </div>
                {/* --------------------------- OTP --------------------- */}

                <InputBox
                  onChange={handleChange}
                  value={values.identification_marks}
                  label="Mark Of Identification"
                  name="identification_marks"
                />
              </div>
              <div className="mt-5">
                <input type="checkbox" /> Declaration*
                <br></br>
                <div className="mt-5">
                  To Whomever it will be concerned
                  <br></br>
                  <br></br>
                  Where the Municipal Commissioner /Standing Committee of{" "}
                  {ulb_name} has consented to grant me the sum of Rs.
                  {Math.round(returnEmpPension(payrollData, emp_id) / 12)} per
                  month as to amount of my pension with effect from{" "}
                  {current_date} I here by acknowledge that in subject to
                  revision ,if the same being found to be in excess of that to
                  which I am entitled under the rules , and I promise to raise
                  no objection to such revision,I further promise to refund
                  amount paid to me in excess of that to which I may be
                  eventually found entitled.
                </div>
              </div>

              <div className="flex items-center justify-end mt-5 gap-5">
                <PrimaryButton
                  buttonType="button"
                  variant={"cancel"}
                  onClick={goBack}
                >
                  Back
                </PrimaryButton>

                <PrimaryButton
                  onClick={handleReset}
                  buttonType="button"
                  variant={"cancel"}
                >
                  Reset
                </PrimaryButton>

                <PrimaryButton buttonType="submit" variant="primary">
                  Next
                </PrimaryButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Refund;
