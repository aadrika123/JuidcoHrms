/***
 * Author: Krish
 * Status: Closed
 * Date: 21/02/2024
 */

"use client";

import React from "react";

import { Formik } from "formik";
import type {
  EmployeeDetailsType,
  EmployeeDetailsProps,
} from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  initialEmployeeDetails,
  employeeValidationSchema,
} from "@/utils/validation/Ems/ems.validation";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

const EmployeeBasicDetails: React.FC<
  EmployeeDetailsProps<EmployeeDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");

  const fileInputRef = React.useRef(null);

  const handleDivClick = () => {
    // Trigger click on the hidden file input
    (fileInputRef.current as unknown as HTMLInputElement).click();
  };

  const handleSubmitFormik = (
    values: EmployeeDetailsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_basic_details", JSON.stringify(values));
      setSubmitting(false);
      Object.keys(values).forEach((key) => {
        const val = values[key as keyof typeof values];
        if (
          val ==
          initialEmployeeDetails[
            key as keyof typeof initialEmployeeDetails
          ]
        ) {
          delete values[key as keyof typeof values];
        }
      });
      if (props.setData) {
        props.setData("emp_basic_details", values);
      }
      router.push(`${pathName}?emp=${empType}&page=3`);
    }
  };

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_basic_details")
        ? JSON.parse(sessionStorage.getItem("emp_basic_details") ?? "{}")
        : initialEmployeeDetails
      : initialEmployeeDetails;

  return (
    <>
      <SubHeading className="text-[20px] py-4">Employee Details</SubHeading>
      <Formik
        initialValues={initialValues}
        validationSchema={employeeValidationSchema}
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
          <form onSubmit={handleSubmit} className="relative">
            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
              {empType === "old" && (
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emp_id}
                  error={errors.emp_id}
                  touched={touched.emp_id}
                  label="Employment ID *"
                  name="emp_id"
                  placeholder={"Enter Employment ID"}
                />
              )}

              {/* <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_image}
                error={errors.emp_image}
                touched={touched.emp_image}
                type="file"
                label="image*"
                name="emp_image"
              /> */}

              <div className="absolute top-[-9rem] right-0 flex items-start gap-3 cursor-pointer">
                <p className="text-zinc-600">Upload Employee Profile<span className="text-red-500">*</span></p>
                <div
                  className="w-[10rem] h-[8rem] bg-white border border-zinc-300 rounded-xl flex flex-col items-center justify-center"
                  onClick={handleDivClick}
                >
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="2em"
                      width="2em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg>
                  </span>
                  <span>Upload Image</span>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="emp_image"
                  />
                </div>
              </div>
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_name}
                error={errors.emp_name}
                touched={touched.emp_name}
                label="Name"
                name="emp_name"
                placeholder={"Enter Name"}
                required={true}
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mode_of_recruitment}
                error={errors.mode_of_recruitment}
                touched={touched.mode_of_recruitment}
                label="Mode of Recruitment"
                name="mode_of_recruitment"
                required={true}
                placeholder={"Enter Mode of Recruitment"}
                options={[
                  {
                    id: 1,
                    name: "Online",
                  },
                  {
                    id: 2,
                    name: "Offline",
                  },
                  {
                    id: 3,
                    name: "Consultant- Third Agent",
                  },
                ]}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_no}
                error={errors.contact_no}
                touched={touched.contact_no}
                label="Contact No."
                name="contact_no"
                placeholder={"Enter Contact No."}
                type="number"
                required={true}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emg_contact_no}
                error={errors.emg_contact_no}
                touched={touched.emg_contact_no}
                label="Emergency Contact No."
                name="emg_contact_no"
                placeholder={"Enter Emergency Contact Number"}
                type="number"
                required={true}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.aadhar_no}
                error={errors.aadhar_no}
                touched={touched.aadhar_no}
                label="Aadhar Card No."
                name="aadhar_no"
                placeholder={"Enter Aadhar Card No."}
                type="number"
                required={true}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.epic_no}
                error={errors.epic_no}
                touched={touched.epic_no}
                label="EPIC No."
                name="epic_no"
                placeholder={"Enter EPIC Number"}
                type="number"
                required={true}
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gender}
                error={errors.gender}
                touched={touched.gender}
                label="Gender"
                name="gender"
                placeholder={"Enter Gender"}
                required={true}
                options={[
                  {
                    id: 1,
                    name: "Male",
                  },
                  {
                    id: 2,
                    name: "Female",
                  },
                  {
                    id: 3,
                    name: "Transgender"
                  }
                ]}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pran}
                error={errors.pran}
                touched={touched.pran}
                label="PRAN"
                name="pran"
                placeholder={"Enter PRAN"}
                type="number"
                required={true}
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_type}
                error={errors.emp_type}
                touched={touched.emp_type}
                label="Employee Type"
                name="emp_type"
                placeholder={"Enter Employee Type"}
                required={true}
                options={[
                  {
                    id: 1,
                    name: "Sanctioned Post",
                  },
                  {
                    id: 2,
                    name: "Contractual Appointment",
                  },
                  {
                    id: 3,
                    name: "Outsourced Employees",
                  },
                  {
                    id: 4,
                    name: "Daily Wages",
                  },
                  {
                    id: 5,
                    name: "Deputation Post",
                  },
                ]}
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.weight}
                error={errors.weight}
                touched={touched.weight}
                label="Weight"
                name="weight"
                placeholder={"Enter Weight in KG"}
                type="text"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.height}
                label="Height"
                name="height"
                placeholder={"Enter Height"}
                type="text"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cps}
                label="CPS"
                name="cps"
                placeholder={"Enter CPS"}
                type="number"
                required={true}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gps}
                error={errors.gps}
                touched={touched.gps}
                label="GPS"
                name="gps"
                placeholder={"Enter GPF"}
                type="number"
                required={true}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
                error={errors.dob}
                touched={touched.dob}
                label="D.O.B"
                name="dob"
                placeholder={"Enter D.O.B"}
                type="date"
                required={true}
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
    </>
  );
};

export default EmployeeBasicDetails;
