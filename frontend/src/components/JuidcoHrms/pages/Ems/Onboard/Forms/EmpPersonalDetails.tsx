/***
 * Author: Krish
 * Status: Closed
 * Date: 21/02/2024
 */

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const empType = useSearchParams().get("emp");

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
      values.emp_lang_do = empLangTypes;

      // const new_val = { ...values, emp_lang_do: empLangTypes };
      console.log(values);
      if (props.setData) {
        props.setData("emp_personal_details", values);
      }
      router.push(`${pathName}?emp=${empType}&page=4`);
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
                label="Married Status"
                name="married_status"
                placeholder={"Select Married Status"}
                required={true}
                options={[
                  { id: 1, name: "Single" },
                  { id: 2, name: "Married" },
                  { id: 3, name: "Widow" },
                ]}
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.identification_marks}
                error={errors.identification_marks}
                touched={touched.identification_marks}
                label="Identification Marks"
                placeholder="Enter Identification Marks"
                name="identification_marks"
                required={true}
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.religion}
                error={errors.religion}
                touched={touched.religion}
                label="Religion"
                name="religion"
                placeholder={"Select Religion"}
                required={true}
                options={[
                  { id: 1, name: "Hindu" },
                  { id: 2, name: "Muslim" },
                  { id: 3, name: "Sikh" },
                  { id: 4, name: "Christian" },
                ]}
              />
              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_categories}
                error={errors.emp_categories}
                touched={touched.emp_categories}
                label="Categories"
                name="emp_categories"
                placeholder={"Select Categories"}
                required={true}
                options={[
                  { id: 1, name: "SC" },
                  { id: 2, name: "ST" },
                  { id: 3, name: "OBC-1" },
                  { id: 4, name: "OBC-2" },
                  { id: 5, name: "General" },
                ]}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_home_state}
                error={errors.emp_home_state}
                touched={touched.emp_home_state}
                label="Home State"
                name="emp_home_state"
                placeholder={"Enter Home State"}
                required={true}
              />

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_district}
                error={errors.emp_district}
                touched={touched.emp_district}
                label="District"
                name="emp_district"
                placeholder={"Enter District"}
                required={true}
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

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_blood_group}
                error={errors.emp_blood_group}
                touched={touched.emp_blood_group}
                label="Blood Group"
                name="emp_blood_group"
                placeholder={"Enter Blood Group"}
                required={true}
                options={[
                  { id: 1, name: "A+" },
                  { id: 2, name: "A-" },
                  { id: 3, name: "B+" },
                  { id: 4, name: "B-" },
                  { id: 5, name: "AB+" },
                  { id: 6, name: "AB-" },
                  { id: 7, name: "O+" },
                  { id: 8, name: "O-" },
                ]}
              />

              <div>
                <div className="grid">
                  <SelectForNoApi
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emp_health_status}
                    error={errors.emp_health_status}
                    touched={touched.emp_health_status}
                    label="Health Status"
                    name="emp_health_status"
                    placeholder="Enter Health Status"
                    options={[
                      { id: 1, name: "Fit" },
                      { id: 2, name: "UnFit" },
                    ]}
                    required={true}
                  />
                </div>

                {values.emp_health_status && (
                  <>
                    <input
                      type="file"
                      name="emp_health_file"
                      onChange={handleChange}
                      value={undefined}
                      // value={values.emp_health_file || ''}
                    />
                  </>
                )}
              </div>


              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_ltc_home_town}
                error={errors.emp_ltc_home_town}
                touched={touched.emp_ltc_home_town}
                label="LTC Home Town"
                name="emp_ltc_home_town"
                placeholder={"Enter LTC Home Town"}
                required={true}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_nearest_railway_station}
                error={errors.emp_nearest_railway_station}
                touched={touched.emp_nearest_railway_station}
                label="Nearest Railway Station"
                name="emp_nearest_railway_station"
                placeholder={"Enter Nearest Railway Station"}
                required={true}
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
                    name: "Physically Disabled",
                  },
                  {
                    id: 2,
                    name: "Normal",
                  },
                ]}
              />

              {/* <SelectForNoApi
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
                    name: "Father",
                  },
                  {
                    id: 2,
                    name: "Mother",
                  },
                  {
                    id: 3,
                    name: "Husband",
                  },
                  {
                    id: 4,
                    name: "Spouse",
                  },
                ]}
              />  */}

              <div>
                <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4">
                  {/* <SelectForNoApi
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emp_family}
                    error={errors.emp_family}
                    touched={touched.emp_family}
                    label="Family/Guardian"
                    name="emp_family"
                    placeholder={"Select Family/Guardian"}
                    required={true}
                    options={[
                      {
                        id: 1,
                        name: "Father",
                      },
                      {
                        id: 2,
                        name: "Mother",
                      },
                      {
                        id: 3,
                        name: "Spouse",
                        // hidden: values.married_status === "Single",


                      },
                    ]}
                  /> */}
                  <SelectForNoApi
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emp_family}
                    error={errors.emp_family}
                    touched={touched.emp_family}
                    label="Family/Guardian"
                    name="emp_family"
                    placeholder={"Select Family/Guardian"}
                    required={true}
                    options={[
                      {
                        id: 1,
                        name: "Father",
                      },
                      {
                        id: 2,
                        name: "Mother",
                      },
                      {
                        id: 3,
                        name: "Spouse",
                      },
                    ].filter((option) => {
                      return (
                        (values.married_status === "Single" && ["Father", "Mother"].includes(option.name)) ||
                        (values.married_status !== "Single")
                      );
                    })}

                  />


                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emp_family_name}
                    error={errors.emp_family_name}
                    touched={touched.emp_family_name}
                    label="Name"
                    name="emp_family_name"
                    placeholder={"Enter Family Name"}
                    required={true}
                  />
                </div>

                {!(values.married_status === "Single") && (values.emp_family === "Spouse") && (
                  <div className="mt-5">
                    <div>
                      <InputBox
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.emp_org_name}
                        error={errors.emp_org_name}
                        touched={touched.emp_org_name}
                        label="Organisation"
                        name="emp_org_name"
                        placeholder={"Enter Organisation Name"}
                      />
                    </div>
                    <div className="mt-5">
                      <InputBox
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.emp_office_name}
                        error={errors.emp_office_name}
                        touched={touched.emp_office_name}
                        label="Office Name"
                        name="emp_office_name"
                        placeholder={"Enter Office Name"}
                      />
                    </div>
                  </div>
                )}
              </div>

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emp_lang}
                error={errors.emp_lang}
                touched={touched.emp_lang}
                label="Language"
                name="emp_lang"
                placeholder={"Select Language"}
                required={true}
                options={[
                  {
                    id: 1,
                    name: "Hindi",
                  },
                  {
                    id: 2,
                    name: "English",
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
