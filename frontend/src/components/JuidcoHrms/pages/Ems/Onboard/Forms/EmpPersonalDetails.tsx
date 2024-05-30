/***
 * Author: Krish
 * Status: Closed
 * Date: 21/02/2024
 */

"use client";

import React, { useEffect, useState } from "react";

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
import DropDownList from "@/components/Helpers/DropDownList";
import { HRMS_URL } from "@/utils/api/urls";

const EmpployeePersonalDetails: React.FC<
  EmployeeDetailsProps<EmployeePersonalDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");

  const [empLang, setEmpLang] = useState<
    [
      {
        lang: string;
        lang_type: string[];
      },
    ]
  >([
    {
      lang: "",
      lang_type: [],
    },
  ]);

  // const [empMotherLang, setEmpMotherLang] = useState<
  //   [
  //     {
  //       lang: string;
  //       lang_type: string[];
  //     },
  //   ]
  // >([
  //   {
  //     lang: "",
  //     lang_type: [],
  //   },
  // ]);
  function updateEmpLangTypes(id: number, key: string, value: string | number) {
    setEmpLang((prev: any): any => {
      const updatedData = [...prev];
      const row = { ...updatedData[id] };

      if (Array.isArray(row[key])) {
        if (row[key].includes(value)) {
          row[key] = row[key].filter((lang: string) => lang !== value);
        } else {
          row[key] = [...row[key], value];
        }
      } else {
        row[key] = value;
      }

      updatedData[id] = { ...row };
      return updatedData;
    });
  }

  function addEmpLangTypes() {
    setEmpLang((prev: any) => {
      const lastObj = prev[prev.length - 1];

      // Check if all values in 'lastObj' are empty
      const lastObjEmpty = Object.values(lastObj).every((item) => item === "");

      if (!lastObjEmpty) {
        return [
          ...prev,
          {
            lang: "",
            lang_type: [],
          },
        ];
      } else {
        return prev;
      }
    });
  }

  // function updateEmpMotherLang(
  //   id: number,
  //   key: string,
  //   value: string | number
  // ) {
  //   setEmpMotherLang((prev: any): any => {
  //     const updatedData = [...prev];
  //     const row = { ...updatedData[id] };

  //     if (Array.isArray(row[key])) {
  //       if (row[key].includes(value)) {
  //         row[key] = row[key].filter((lang: string) => lang !== value);
  //       } else {
  //         row[key] = [...row[key], value];
  //       }
  //     } else {
  //       row[key] = value;
  //     }

  //     updatedData[id] = { ...row };
  //     return updatedData;
  //   });
  // }
  // function addEmpMotherLang() {
  //   setEmpMotherLang((prev: any) => {
  //     const lastObj = prev[prev.length - 1];

  //     // Check if all values in 'lastObj' are empty
  //     const lastObjEmpty = Object.values(lastObj).every((item) => item === "");

  //     if (!lastObjEmpty) {
  //       return [
  //         ...prev,
  //         {
  //           lang: "",
  //           lang_type: [],
  //         },
  //       ];
  //     } else {
  //       return prev;
  //     }
  //   });
  // }

  const handleSubmitFormik = (
    values: EmployeePersonalDetailsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    values.emp_lang = empLang;
    // values.emp_mother_tounge = empMotherLang;
    Object.keys(values).forEach((key) => {
      const val = values[key as keyof typeof values];
      if (
        val ==
        initialEmployeePersonalDetails[
          key as keyof typeof initialEmployeePersonalDetails
        ]
      ) {
        delete values[key as keyof typeof values];
      }
    });
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_personal_details", JSON.stringify(values));
      setSubmitting(false);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const empData = JSON.parse(
        sessionStorage.getItem("emp_personal_details") ?? "{}"
      );

      if (empData) {
        setEmpLang(
          empData.emp_lang || [
            {
              lang: "",
              lang_type: [],
            },
          ]
        );
      }
    }
  }, []);

  const languages = [
    { id: 1, name: "English" },
    { id: 2, name: "Bengali" },
    { id: 3, name: "Bodo" },
    { id: 4, name: "Dogri" },
    { id: 5, name: "Gujarati" },
    { id: 6, name: "Hindi" },
    { id: 7, name: "Kannada" },
    { id: 8, name: "Kashmiri" },
    { id: 9, name: "Konkani" },
    { id: 10, name: "Maithili" },
    { id: 11, name: "Malayalam" },
    { id: 12, name: "Manipuri" },
    { id: 13, name: "Marathi" },
    { id: 14, name: "Nepali" },
    { id: 15, name: "Odia" },
    { id: 16, name: "Punjabi" },
    { id: 17, name: "Sanskrit" },
    { id: 18, name: "Santali" },
    { id: 19, name: "Sindhi" },
    { id: 20, name: "Tamil" },
    { id: 21, name: "Telugu" },
    { id: 22, name: "Urdu" },
    { id: 23, name: "Assamese" },
  ];
  return (
    <>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Personal Details{" "}
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
        <h5>Steps-3/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md">
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
                    { id: 3, name: "Widowed" },
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
                  maxLength={50}
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
                    { id: 5, name: "Jainism" },
                    { id: 6, name: "Parsis" },
                    { id: 7, name: "Buddhism" },
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
                  // maxLength={20}
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
                {/* <SelectForNoApi
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
                /> */}

                <DropDownList
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emp_district}
                  error={errors.emp_district}
                  touched={touched.emp_district}
                  label="District"
                  name="emp_district"
                  placeholder={"Select District"}
                  required
                  api={`${HRMS_URL.DISTRICT.get}`}
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
                    <div>
                      <input
                        type="file"
                        name="emp_health_file"
                        onChange={handleChange}
                        value={undefined}
                        // value={values.emp_health_file || ''}
                      />
                    </div>
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
                  maxLength={20}
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
                          (values.married_status === "Single" &&
                            ["Father", "Mother"].includes(option.name)) ||
                          values.married_status !== "Single"
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
                      // maxLength={60}
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

                  {!(values.married_status === "Single") &&
                    values.emp_family === "Spouse" && (
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
                        <div className="mt-5">
                          <InputBox
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.emp_office_name}
                            error={errors.emp_office_name}
                            touched={touched.emp_office_name}
                            label="Office Location"
                            name="emp_office_name"
                            placeholder={"Enter Office Location"}
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
                      </div>
                    )}
                </div>
                <div className="flex items-center gap-5">
                  <div>
                    {empLang?.map((row, index: number) => {
                      console.log("first", row.lang);
                      return (
                        <React.Fragment key={index}>
                          <SelectForNoApi
                            onChange={(e) =>
                              updateEmpLangTypes(index, "lang", e.target.value)
                            }
                            value={row.lang}
                            label={`${index === 0 ? "Language" : ""}`}
                            name="emp_lang"
                            placeholder={`${index === 0 ? "Select Mother Tongue" : "Select Language"}`}
                            options={languages}
                          />

                          <div className="flex items-center gap-5 mt-4">
                            <div className="flex items-center">
                              <input
                                onChange={() =>
                                  updateEmpLangTypes(index, "lang_type", "read")
                                }
                                className={`mr-1 bg-white checkbox border border-zinc-500`}
                                checked={empLang[index].lang_type.includes(
                                  "read"
                                )}
                                name={"read"}
                                id="read"
                                type="checkbox"
                              />
                              <label htmlFor="read">Read</label>
                            </div>

                            <div className="flex items-center">
                              <input
                                onChange={() =>
                                  updateEmpLangTypes(
                                    index,
                                    "lang_type",
                                    "write"
                                  )
                                }
                                className={`mr-1 bg-white checkbox border border-zinc-500`}
                                checked={empLang[index].lang_type.includes(
                                  "write"
                                )}
                                name={"write"}
                                id="write"
                                type="checkbox"
                              />
                              <label htmlFor="write">Write</label>
                            </div>

                            <div className="flex items-center">
                              <input
                                onChange={() =>
                                  updateEmpLangTypes(
                                    index,
                                    "lang_type",
                                    "speak"
                                  )
                                }
                                checked={empLang[index].lang_type.includes(
                                  "speak"
                                )}
                                className={`mr-1 bg-white checkbox border border-zinc-500`}
                                name={"write"}
                                id="write"
                                type="checkbox"
                              />
                              <label htmlFor="write">Speak</label>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={addEmpLangTypes}
                    className="flex items-center flex-col gap-1"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 19 19"
                        fill="none"
                      >
                        <path
                          d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z"
                          fill="#12743B"
                        />
                      </svg>
                    </span>
                    <span className="text-xs whitespace-nowrap">
                      add more language
                    </span>
                  </button>
                </div>
                {/* <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emp_mother_tounge}
                  error={errors.emp_mother_tounge}
                  touched={touched.emp_mother_tounge}
                  label="Mother Tongue"
                  required={true}
                  name="emp_mother_tounge"
                  placeholder={"Enter Mother Tongue"}
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
                /> */}
                {/* MOther Tounge */}
                {/* <div className="flex items-center gap-5">
                  <div>
                    {empMotherLang?.map((row, index: number) => {
                      console.log("first", row.lang);
                      return (
                        <React.Fragment key={index}>
                          <SelectForNoApi
                            onChange={(e) =>
                              updateEmpMotherLang(index, "lang", e.target.value)
                            }
                            value={row.lang}
                            label={`${index === 0 ? "Mother Tongue" : ""}`}
                            name="emp_lang"
                            placeholder={"Select Mother Tongue"}
                            required={index === 0 ? true : false}
                            options={languages}
                          />

                          <div className="flex items-center gap-5 mt-4">
                            <div className="flex items-center">
                              <input
                                onChange={() =>
                                  updateEmpMotherLang(
                                    index,
                                    "lang_type",
                                    "read"
                                  )
                                }
                                className={`mr-1 bg-white checkbox border border-zinc-500`}
                                checked={empMotherLang[
                                  index
                                ].lang_type.includes("read")}
                                name={"read"}
                                id="read"
                                type="checkbox"
                              />
                              <label htmlFor="read">Read</label>
                            </div>

                            <div className="flex items-center">
                              <input
                                onChange={() =>
                                  updateEmpMotherLang(
                                    index,
                                    "lang_type",
                                    "write"
                                  )
                                }
                                className={`mr-1 bg-white checkbox border border-zinc-500`}
                                checked={empMotherLang[
                                  index
                                ].lang_type.includes("write")}
                                name={"write"}
                                id="write"
                                type="checkbox"
                              />
                              <label htmlFor="write">Write</label>
                            </div>

                            <div className="flex items-center">
                              <input
                                onChange={() =>
                                  updateEmpMotherLang(
                                    index,
                                    "lang_type",
                                    "speak"
                                  )
                                }
                                checked={empMotherLang[
                                  index
                                ].lang_type.includes("speak")}
                                className={`mr-1 bg-white checkbox border border-zinc-500`}
                                name={"write"}
                                id="write"
                                type="checkbox"
                              />
                              <label htmlFor="write">Speak</label>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={addEmpMotherLang}
                    className="flex items-center flex-col gap-1"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 19 19"
                        fill="none"
                      >
                        <path
                          d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z"
                          fill="#12743B"
                        />
                      </svg>
                    </span>
                    <span className="text-xs whitespace-nowrap">
                      add more language
                    </span>
                  </button>
                </div> */}
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

export default EmpployeePersonalDetails;
