/***
 * Author: Krish
 * Status: Closed
 * Date: 21/02/2024
 */

"use client";

import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import type { EmployeeOfficeDetaislType } from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { officeDetailsValidationSchema } from "@/utils/validation/Ems/ems.validation";
import { EmployeeDetailsProps } from "@/utils/types/employee.type";
import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";
import DropDownList from "@/components/Helpers/DropDownList";

const EmployeeOfficeDetails: React.FC<
  EmployeeDetailsProps<EmployeeOfficeDetaislType>
> = (props) => {
  const [empType, setEmpType] = useState<number>(0);
  const pathName = usePathname();
  const router = useRouter();
  const [ddoData, setDdoData] = useState<any>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`${HRMS_URL.DDO.get}?search=${input}`);
        setDdoData(response.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDdoData(null);
      }
    };

    const debounce = setTimeout(() => {
      if (input.trim() !== "") {
        fetchData();
      } else {
        setDdoData(null);
      }
    }, 300);

    return () => clearTimeout(debounce);

    // fetchData();
  }, [input]);

  const handleInputChange = (e: any) => {
    setIsTyping(true);
    const inputValue: string = e.target.value;
    setInput(inputValue);
  };

  const handleSubmitFormik = (
    values: EmployeeOfficeDetaislType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    values.emp_type = empType;

    if (typeof window !== "undefined") {
      values.ddo_code = input;
      values.ddo_designation = ddoData.data[0].ddo_designation;
      values.office_code = ddoData.data[0].ddo_office;
      values.office_name = ddoData.data[0].ddo_name;

      sessionStorage.setItem("emp_office_details", JSON.stringify(values));
      sessionStorage.setItem("emp_type", JSON.stringify(empType));
      setSubmitting(false);

      if (props.setData) {
        props.setData("emp_office_details", values, empType);
      }
      if (empType === 0) {
        router.push(`${pathName}?emp=old&page=2`);
      } else if (empType === 1) {
        router.push(`${pathName}?emp=new&page=2`);
      }
    }
  };

  useEffect(() => {
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_type")
        ? setEmpType(JSON.parse(sessionStorage.getItem("emp_type") ?? ""))
        : null
      : "";
  }, [pathName]);

  const initialOfficeDetails: EmployeeOfficeDetaislType = {
    emp_type: 0,
    office_name: "",
    office_code: "",
    ddo_designation: "",
    ddo_code: input,
    district: "",
  };

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_office_details")
        ? JSON.parse(sessionStorage.getItem("emp_office_details") ?? "{}")
        : initialOfficeDetails
      : initialOfficeDetails;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFormData = sessionStorage.getItem("emp_office_details");
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData);
        setInput(parsedData.ddo_code);
        // setDdoData({
        //   ddo_office: parsedData.office_code,
        // });
      }
    }
  }, []);

  return (
    <>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Office Details
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z"
                fill="#6565DD"
              />
            </svg>
          </i>
        </SubHeading>
        <h5>Steps-1/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-6 px-10 shadow-md">
        <section className="mt-6">
          <SubHeading className="text-[19px]">
            Select the Type of Employee
          </SubHeading>

          <div className="flex items-center gap-12 text-secondary mt-4">
            <div className="flex-all-center ">
              <input
                id="accounting"
                type="radio"
                onChange={() => setEmpType(0)}
                name="radio-1"
                className="radio border border-zinc-600"
                defaultChecked
                checked={empType === 0}
              />
              <label htmlFor="accounting" className=" cursor-pointer">
                Existing Employee
              </label>
            </div>

            <div className="flex-all-center ">
              <input
                id="function"
                onChange={() => setEmpType(1)}
                type="radio"
                name="radio-1"
                className="radio  border-zinc-600"
                checked={empType === 1}
              />
              <label htmlFor="function" className=" cursor-pointer">
                New Employee
              </label>
            </div>
          </div>
        </section>
        <SubHeading className="text-[20px] py-4">Office Details</SubHeading>
        <Formik
          initialValues={initialValues}
          validationSchema={officeDetailsValidationSchema}
          onSubmit={handleSubmitFormik}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
                <DropDownList
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.district}
                  error={errors.district}
                  touched={touched.district}
                  label="District"
                  required={true}
                  name="district"
                  placeholder={"Choose District"}
                  api={`${HRMS_URL.DISTRICT.get}`}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={values.office_code}
                  // value={input.length > 7 ? ddoData?.data[0]?.ddo_office : ""}
                  value={
                    input.length > 7 && ddoData?.data && ddoData.data.length > 0
                      ? ddoData.data[0].ddo_office
                      : ""
                  }
                  error={errors.office_code}
                  touched={touched.office_code}
                  label="Office Code"
                  name="office_code"
                  required={true}
                  placeholder="Enter Office Code"
                  maxLength={20}
                  disabled
                  onKeyPress={(e: any) => {
                    if (
                      !(
                        (e.key >= "a" && e.key <= "z") ||
                        (e.key >= "0" && e.key <= "9") ||
                        (e.key >= "A" && e.key <= "Z") ||
                        e.key === " "
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={values.ddo_designation}
                  // value={input.length > 7 ? ddoData?.data[0]?.ddo_designation : ""}
                  value={
                    input.length > 7 && ddoData?.data && ddoData.data.length > 0
                      ? ddoData.data[0].ddo_designation
                      : ""
                  }
                  error={errors.ddo_designation}
                  touched={touched.ddo_designation}
                  label="DDO Designation"
                  required={true}
                  name="ddo_designation"
                  disabled
                  placeholder={"Enter DDO Designation"}
                  maxLength={30}
                  onKeyPress={(e: any) => {
                    if (
                      !(
                        (e.key >= "a" && e.key <= "z") ||
                        (e.key >= "A" && e.key <= "Z") ||
                        e.key === " "
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                />

                <div className="flex flex-col relative">
                  <label className="text-sm text-secondary">
                    DDO Code <span className="text-red-400">*</span>
                  </label>
                  <input
                    placeholder="Type DDO code here"
                    value={input}
                    onChange={handleInputChange}
                    className="border border-zinc-400 h-12 rounded-lg pl-3 bg-transparent mt-1"
                  />
                  {isTyping && (
                    <div className="absolute top-[5rem] left-0 w-[20rem] h-[30rem] rounded-md overflow-scroll">
                      <ul
                        className={`${isTyping ? "border bg-white" : "bg-transparent border-0	"}`}
                      >
                        {/* <ul className={`bg-${isTyping ? "white" : "transparent"} p-2 border`}> */}
                        {ddoData?.data?.map((item: any, i: number) => (
                          <li
                            onClick={() => {
                              setInput(item.ddo_code);
                              setIsTyping(false);
                            }}
                            className="text-sm font-semibold p-2 border-b cursor-pointer"
                            key={i}
                          >
                            {item.ddo_code}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={values.office_name}
                  // value={input.length > 7 ? ddoData?.data[0].ddo_name : ""}
                  value={
                    input.length > 7 && ddoData?.data && ddoData.data.length > 0
                      ? ddoData.data[0].ddo_name
                      : ""
                  }
                  error={errors.office_name}
                  touched={touched.office_name}
                  label="Office Name"
                  name="office_name"
                  required={true}
                  disabled
                  placeholder={"Enter Office Name"}
                  maxLength={30}
                  onKeyPress={(e: any) => {
                    if (
                      !(
                        (e.key >= "a" && e.key <= "z") ||
                        (e.key >= "A" && e.key <= "Z") ||
                        e.key === " "
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
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
                  buttonType="submit"
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

export default EmployeeOfficeDetails;
