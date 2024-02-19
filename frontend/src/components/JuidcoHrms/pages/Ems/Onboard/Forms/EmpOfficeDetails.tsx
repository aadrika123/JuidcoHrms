"use client";

import React, { useState } from "react";

import { Formik } from "formik";
import type { EmployeeOfficeDetaislType } from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import {
  initialOfficeDetails,
  officeDetailsValidationSchema,
} from "@/utils/validation/Ems/ems.validation";
import { EmployeeDetailsProps } from "@/utils/types/employee.type";

const EmployeeOfficeDetails: React.FC<
  EmployeeDetailsProps<EmployeeOfficeDetaislType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const pathName = usePathname();
  const router = useRouter();

  const handleSubmitFormik = (
    values: EmployeeOfficeDetaislType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_office_details", JSON.stringify(values));
      setSubmitting(false);

      if (props.setData) {
        props.setData("officeDetails", values, tabIndex);
      }
      router.push(`${pathName}?page=2`);
    }
  };

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_office_details")
        ? JSON.parse(sessionStorage.getItem("emp_office_details") ?? "{}")
        : initialOfficeDetails
      : initialOfficeDetails;

  return (
    <>
      <section className="mt-6">
        <SubHeading className="text-[19px]">
          Select the Type of Employee
        </SubHeading>

        <div className="flex items-center gap-12 text-secondary mt-4">
          <div className="flex-all-center ">
            <input
              id="accounting"
              type="radio"
              onChange={() => setTabIndex(1)}
              name="radio-1"
              className="radio border border-zinc-600"
              defaultChecked
            />
            <label htmlFor="accounting" className=" cursor-pointer">
              Old Employee
            </label>
          </div>

          <div className="flex-all-center ">
            <input
              id="function"
              onChange={() => setTabIndex(2)}
              type="radio"
              name="radio-1"
              className="radio  border-zinc-600"
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
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.office_name}
                error={errors.office_name}
                touched={touched.office_name}
                label="Office Name*"
                name="office_name"
                placeholder={"Select Office Name"}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.office_code}
                error={errors.office_code}
                touched={touched.office_code}
                label="Office Code*"
                name="office_code"
                placeholder="Enter Office Code"
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ddo_designation}
                error={errors.ddo_designation}
                touched={touched.ddo_designation}
                label="DDO Designation*"
                name="ddo_designation"
                placeholder={"Enter DDO Designation"}
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ddo_code}
                error={errors.ddo_code}
                touched={touched.ddo_code}
                label="DDO Code*"
                name="ddo_code"
                placeholder={"Enter DDO Code"}
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                error={errors.district}
                touched={touched.district}
                label="District*"
                name="district"
                placeholder={"Enter District"}
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
                Save
              </PrimaryButton>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EmployeeOfficeDetails;
