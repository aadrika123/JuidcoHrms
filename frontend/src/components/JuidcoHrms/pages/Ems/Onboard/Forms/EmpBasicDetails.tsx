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
import { usePathname, useRouter } from "next/navigation";
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

  const handleSubmitFormik = (
    values: EmployeeDetailsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_basic_details", JSON.stringify(values));
      setSubmitting(false);

      if (props.setData) {
        props.setData("emp_basic_details", values);
      }
      router.push(`${pathName}?page=3`);
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
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
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_image}
                error={errors.emp_image}
                touched={touched.emp_image}
                label="image*"
                name="emp_image"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_name}
                error={errors.emp_name}
                touched={touched.emp_name}
                label="Name**"
                name="emp_name"
                placeholder={"Enter Name"}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mode_of_recruitment}
                error={errors.mode_of_recruitment}
                touched={touched.mode_of_recruitment}
                label="Mode of Recruitment*"
                name="mode_of_recruitment"
                placeholder={"Enter Mode of Recruitment"}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_no}
                error={errors.contact_no}
                touched={touched.contact_no}
                label="Contact No.*"
                name="contact_no"
                placeholder={"Enter Contact No."}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emg_contact_no}
                error={errors.emg_contact_no}
                touched={touched.emg_contact_no}
                label="Emergency Contact No.*"
                name="emg_contact_no"
                placeholder={"Enter Emergency Contact Number"}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.aadhar_no}
                error={errors.aadhar_no}
                touched={touched.aadhar_no}
                label="Aadhar Card No.*"
                name="aadhar_no"
                placeholder={"Enter Aadhar Card No."}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.epic_no}
                error={errors.epic_no}
                touched={touched.epic_no}
                label="EPIC No.*"
                name="epic_no"
                placeholder={"Enter EPIC Number"}
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gender}
                error={errors.gender}
                touched={touched.gender}
                label="Gender*"
                name="gender"
                placeholder={"Enter Gender"}
                options={[
                  {
                    id: 1,
                    name: "male",
                  },
                  {
                    id: 2,
                    name: "female",
                  },
                ]}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pran}
                error={errors.pran}
                touched={touched.pran}
                label="PRAN*"
                name="pran"
                placeholder={"Enter PRAN"}
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_type}
                error={errors.emp_type}
                touched={touched.emp_type}
                label="Employee Type*"
                name="emp_type"
                placeholder={"Enter Employee Type"}
                options={[
                  {
                    id: 1,
                    name: "Permanent",
                  },
                  {
                    id: 2,
                    name: "Temporary",
                  },
                  {
                    id: 3,
                    name: "Contractual",
                  },
                ]}
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.weight}
                error={errors.weight}
                touched={touched.weight}
                label="Weight*"
                name="weight"
                placeholder={"Enter Weight"}
                type="number"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.height}
                error={errors.height}
                touched={touched.height}
                label="Height*"
                name="height"
                placeholder={"Enter Height"}
                type="number"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cps}
                error={errors.cps}
                touched={touched.cps}
                label="CPS*"
                name="cps"
                placeholder={"Enter CPS"}
                type="number"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gps}
                error={errors.gps}
                touched={touched.gps}
                label="GPS*"
                name="gps"
                placeholder={"Enter GPS"}
                type="number"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
                error={errors.dob}
                touched={touched.dob}
                label="D.O.B*"
                name="dob"
                placeholder={"Enter D.O.B"}
                type="date"
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
