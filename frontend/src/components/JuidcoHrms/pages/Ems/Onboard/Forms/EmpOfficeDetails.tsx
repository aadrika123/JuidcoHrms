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
import {
  initialOfficeDetails,
  officeDetailsValidationSchema,
} from "@/utils/validation/Ems/ems.validation";
import { EmployeeDetailsProps } from "@/utils/types/employee.type";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

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
      sessionStorage.setItem("emp_type", JSON.stringify(tabIndex));
      setSubmitting(false);

      if (props.setData) {
        props.setData("emp_office_details", values, tabIndex);
      }
      if (tabIndex === 1) {
        router.push(`${pathName}?emp=old&page=2`);
      } else if (tabIndex === 2) {
        router.push(`${pathName}?emp=new&page=2`);
      }
    }
  };

  useEffect(() => {
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_type")
        ? setTabIndex(JSON.parse(sessionStorage.getItem("emp_type") ?? ""))
        : null
      : "";
  }, [pathName]);

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_office_details")
        ? JSON.parse(sessionStorage.getItem("emp_office_details") ?? "{}")
        : initialOfficeDetails
      : initialOfficeDetails;

  return (
<>
  <div className="flex justify-between mb-10">
        <SubHeading>
        Employee Office Details      
            <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z" fill="#6565DD" />
            </svg>
          </i>
        </SubHeading>
      </div> 
    <div className="border rounded-lg bg-white border-[#D9E4FB] p-6 px-10 shadow-md">
     {/* <div className="flex justify-between mb-10">
        <SubHeading>
        Employee Office Details      
            <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z" fill="#6565DD" />
            </svg>
          </i>
        </SubHeading>
      </div>  */}
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
              checked={tabIndex === 1}
            />
            <label htmlFor="accounting" className=" cursor-pointer">
              Existing Employee
            </label>
          </div>

          <div className="flex-all-center ">
            <input
              id="function"
              onChange={() => setTabIndex(2)}
              type="radio"
              name="radio-1"
              className="radio  border-zinc-600"
              checked={tabIndex === 2}
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
                label="Office Name"
                name="office_name"
                required={true}
                placeholder={"Select Office Name"}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.office_code}
                error={errors.office_code}
                touched={touched.office_code}
                label="Office Code"
                name="office_code"
                required={true}
                placeholder="Enter Office Code"
                maxLength={10}

              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ddo_designation}
                error={errors.ddo_designation}
                touched={touched.ddo_designation}
                label="DDO Designation"
                required={true}
                name="ddo_designation"
                placeholder={"Enter DDO Designation"}
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ddo_code}
                error={errors.ddo_code}
                touched={touched.ddo_code}
                label="DDO Code"
                required={true}
                name="ddo_code"
                placeholder={"Enter DDO Code"}
                maxLength={10}
                onKeyPress={(e:any) => {
                  if (!(e.key >= '0' && e.key <= '9')) {
                    e.preventDefault(); 
                  }
                }}
              />

              {/* <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                error={errors.district}
                touched={touched.district}
                label="District*"
                name="district"
                placeholder={"Enter District"}
              /> */}

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                error={errors.district}
                touched={touched.district}
                label="District"
                required={true}
                name="district"
                placeholder={"Choose District"}
                options={[
                  { id: 1, name: "Deoghar" },
                  { id: 2, name: "Dumka" },
                  { id: 3, name: "Bokaro" },
                  { id: 4, name: "Giridih" },
                  { id: 5, name: "Koderma" },
                  { id: 6, name: "Godda" },
                  { id: 7, name: "Chatra" },
                  { id: 8, name: "Dhanbad" },
                  { id: 9, name: "Gharwha" },
                  { id: 10, name: "East-Singhbhum" },
                  { id: 11, name: "Jamtara" },
                  { id: 12, name: "Saraikela-Kharsawan" },
                  { id: 13, name: "Ranchi" },
                  { id: 14, name: "Pakur" },
                  { id: 15, name: "Latehar" },
                  { id: 16, name: "Hazaribagh" },
                  { id: 17, name: "Lohardaga" },
                  { id: 18, name: "Palamu" },
                  { id: 19, name: "Ramghar" },
                  { id: 20, name: "Simdega" },
                  { id: 21, name: "West-Singhbhum" },
                  { id: 22, name: "Sahebganj" },
                  { id: 23, name: "Gumla" },
                  { id: 24, name: "Khunti" },
                ]}
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
    </div>
    </>
  );
};

export default EmployeeOfficeDetails;
