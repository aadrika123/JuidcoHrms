"use client";

import React, { useState } from "react";

import { Formik } from "formik";
import type {
  EmployeePersonalDetailsType,
  EmployeeDetailsProps,
} from "@/utils/types/employee.type";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import {
  initialEmployeePersonalDetails,
  employeePersonalDetailsValidationSchema,
} from "@/utils/validation/Ems/ems.validation";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

const EmpployeePersonalDetails: React.FC<
  EmployeeDetailsProps<EmployeePersonalDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();

  const [empLangTypes, setEmpLangTypes] = useState<
    ("read" | "write" | "speak")[]
  >([]);

  function updateEmpLangTypes(langType: "read" | "write" | "speak") {
    setEmpLangTypes((prev) => {
      // Toggle the value in the array
      if (prev.includes(langType)) {
        return prev.filter((lang) => lang !== langType);
      } else {
        return [...prev, langType];
      }
    });
  }
  const handleSubmitFormik = (
    values: EmployeePersonalDetailsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_personal_details", JSON.stringify(values));
      setSubmitting(false);

      if (props.setData) {
        props.setData("emp_personal_details", values);
      }
      router.push(`${pathName}?page=4`);
    }
  };

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_personal_details")
        ? JSON.parse(sessionStorage.getItem("emp_personal_details") ?? "{}")
        : initialEmployeePersonalDetails
      : initialEmployeePersonalDetails;

  return (
    <>
      <SubHeading className="text-[20px] py-4">
        Employee Personal Details
      </SubHeading>
      <Formik
        initialValues={initialValues}
        validationSchema={employeePersonalDetailsValidationSchema}
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
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.married_status}
                error={errors.married_status}
                touched={touched.married_status}
                label="Married Status*"
                name="married_status"
                placeholder={"Select Married Status"}
                options={[
                  { id: 1, name: "married" },
                  { id: 2, name: "not married" },
                ]}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.identification_marks}
                error={errors.identification_marks}
                touched={touched.identification_marks}
                label="Identification Marks*"
                placeholder="Enter Identification Marks"
                name="identification_marks"
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.religion}
                error={errors.religion}
                touched={touched.religion}
                label="Religion*"
                name="religion"
                placeholder={"Select Religion"}
                options={[{ id: 1, name: "hindu" }]}
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_categories}
                error={errors.emp_categories}
                touched={touched.emp_categories}
                label="Categories*"
                name="emp_categories"
                placeholder={"Select Categories"}
                options={[{ id: 1, name: "option 1" }]}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_home_state}
                error={errors.emp_home_state}
                touched={touched.emp_home_state}
                label="Home State*"
                name="emp_home_state"
                placeholder={"Enter Home State"}
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_district}
                error={errors.emp_district}
                touched={touched.emp_district}
                label="District*"
                name="emp_district"
                placeholder={"Enter District"}
              />

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_blood_group}
                error={errors.emp_blood_group}
                touched={touched.emp_blood_group}
                label="Blood Group*"
                name="emp_blood_group"
                placeholder={"Enter Blood Group"}
                options={[
                  { id: 1, name: "A+" },
                  { id: 1, name: "B+" },
                ]}
              />

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_health_status}
                error={errors.emp_health_status}
                touched={touched.emp_health_status}
                label="Health Status*"
                name="emp_health_status"
                placeholder={"Enter Health Status"}
                options={[
                  { id: 1, name: "Good" },
                  { id: 1, name: "Bad" },
                ]}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_ltc_home_town}
                error={errors.emp_ltc_home_town}
                touched={touched.emp_ltc_home_town}
                label="LTC Home Town*"
                name="emp_ltc_home_town"
                placeholder={"Enter LTC Home Town"}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_nearest_railway_station}
                error={errors.emp_nearest_railway_station}
                touched={touched.emp_nearest_railway_station}
                label="Nearest Railway Station*"
                name="emp_nearest_railway_station"
                placeholder={"Enter Nearest Railway Station"}
              />

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_phy_health_type}
                error={errors.emp_phy_health_type}
                touched={touched.emp_phy_health_type}
                label="Physical Health Type"
                name="emp_phy_health_type"
                placeholder={"Select Physical Health Type"}
                options={[
                  {
                    id: 1,
                    name: "Good",
                  },
                  {
                    id: 2,
                    name: "Bad",
                  },
                ]}
              />

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_family}
                error={errors.emp_family}
                touched={touched.emp_family}
                label="Family/Guardian*"
                name="emp_family"
                placeholder={"Select Family/Guardian"}
                options={[
                  {
                    id: 1,
                    name: "Good",
                  },
                  {
                    id: 2,
                    name: "Bad",
                  },
                ]}
              />

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_lang}
                error={errors.emp_lang}
                touched={touched.emp_lang}
                label="Language*"
                name="emp_lang"
                placeholder={"Select Language"}
                options={[
                  {
                    id: 1,
                    name: "hindi",
                  },
                  {
                    id: 2,
                    name: "english",
                  },
                ]}
              />
              <div></div>
              <div className="flex items-center gap-5">
                <div className="flex items-center">
                  <input
                    onChange={() => updateEmpLangTypes("read")}
                    className={`mr-1 bg-white checkbox border border-zinc-500`}
                    name={"read"}
                    id="read"
                    type="checkbox"
                  />
                  <label htmlFor="read">Read</label>
                </div>

                <div className="flex items-center">
                  <input
                    onChange={() => updateEmpLangTypes("write")}
                    className={`mr-1 bg-white checkbox border border-zinc-500`}
                    name={"write"}
                    id="write"
                    type="checkbox"
                  />
                  <label htmlFor="write">Write</label>
                </div>

                <div className="flex items-center">
                  <input
                    onChange={() => updateEmpLangTypes("speak")}
                    className={`mr-1 bg-white checkbox border border-zinc-500`}
                    name={"write"}
                    id="write"
                    type="checkbox"
                  />
                  <label htmlFor="write">Speak</label>
                </div>
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
    </>
  );
};

export default EmpployeePersonalDetails;
