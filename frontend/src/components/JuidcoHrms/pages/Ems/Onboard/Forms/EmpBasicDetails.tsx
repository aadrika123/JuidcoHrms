/***
 * Author: Krish
 * Status: Closed
 * Date: 21/02/2024
 */

"use client";

import React, { useEffect, useState } from "react";

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
import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";
import toast, { Toaster } from "react-hot-toast";
import SelectForNoApiNew from "@/components/global/atoms/SelectForNoApiNew";
const EmployeeBasicDetails: React.FC<
  EmployeeDetailsProps<EmployeeDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");
  const [employeeName, setEmployeeName] = useState({
    emp_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
  });
  const [isEmpExist, setIsEmpExist] = useState<boolean>(false);
  const [isAdult, setIsAdult] = useState<boolean>(false);

  const [selectedFileName, setSelectedFileName] = useState<any>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const size = event.target.files[0].size;

    const fileType = file.type;

    const acceptedFileTypes = ["image/png", "image/jpeg"];

    if (!acceptedFileTypes.includes(fileType)) {
      alert("Please upload a PNG or JPEG file.");
      return;
    }

    console.log(size);
    if (size / 1024 >= 2548) {
      alert("Cannot upload more than 2MB data!");
    } else {
      setSelectedFileName(file ? file.name : "");
      setImagePreview(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFormData = sessionStorage.getItem("emp_basic_details");
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData);
        setSelectedFileName(parsedData.emp_image);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const res = sessionStorage.getItem("employee_full_name");
      const emp_name = JSON.parse(res as string);
      if (emp_name)
        setEmployeeName({
          emp_id: emp_name.emp_id || "",
          first_name: emp_name.first_name || "",
          middle_name: emp_name.middle_name || "",
          last_name: emp_name.last_name || "",
        });
    }
  }, []);

  function handleChangeName(key: string, value: string) {
    sessionStorage.setItem("employee_full_name", JSON.stringify(employeeName));
    setEmployeeName((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleSubmitFormik = (
    values: EmployeeDetailsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof window !== "undefined") {
      const fullName = Object.values(employeeName)
        .filter((value, key: any) => key !== "emp_id") // Filter out emp_id
        .join(" ");

      values.emp_name = String(fullName);
      values.emp_id = employeeName.emp_id;
      sessionStorage.setItem("emp_basic_details", JSON.stringify(values));
      setSubmitting(false);

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

  // ------------------------- VALIDATE EMPLOYEE ID  ------------------------------//
  const validateEmployeeId = async () => {
    try {
      const res = await axios({
        url: `${HRMS_URL.EMS.validate}`,
        method: "POST",
        data: {
          emp_id: employeeName.emp_id,
        },
      });

      if (res.data.data.data[0].exists === true) {
        setIsEmpExist(true);
      } else {
        setIsEmpExist(false);
      }
    } catch (error) {
      console.log(error);
      throw new Error("something went wrong while validating employee id!");
    }
  };
  // ------------------------- VALIDATE EMPLOYEE ID  ------------------------------//

  //validation for dob
  const validateDob = (e: any) => {
    const dob = new Date(e.target.value);
    const isAtLeast18 =
      new Date(dob.getFullYear() + 18, dob.getMonth() - 1, dob.getDate()) <=
      new Date();
    if (isAtLeast18) {
      setIsAdult(false);
      // setIsEmpExist(true)
    } else {
      setIsAdult(true);
      // setIsEmpExist(false)
    }
    console.log(isAtLeast18);
    // console.log(isAtLeast18)
    // console.log(dob.getFullYear()+18)
    // console.log(dob.getMonth()-1)
    // console.log(dob.getDate())
  };

  return (
    <>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Details
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
        <h5>Steps-2/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 pb-30 pt-20 shadow-md">
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
              <Toaster />
              <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
                {empType === "old" && (
                  <InputBox
                    // ------------------------- VALIDATE EMPLOYEE ID  ------------------------------//
                    onChange={(e: React.ChangeEvent<any> | undefined) =>
                      handleChangeName("emp_id", e?.target.value)
                    }
                    onBlur={validateEmployeeId}
                    value={employeeName.emp_id}
                    error={"Employee Id Already Exist!"}
                    touched={isEmpExist}
                    label="Employment ID"
                    name="emp_id"
                    placeholder={"Enter Employment ID"}
                    required={true}
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
                <div className="absolute top-[-9rem] right-0 flex items-start gap-3 cursor-pointer mt-4">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 w-20 h-20 rounded-full object-cover border border-gray-300"
                    />
                  )}
                  <p className="text-zinc-600 mt-2">
                    Upload Employee Profile
                    <span className="text-red-500">*</span>
                    {touched.emp_image && errors.emp_image && (
                      <div className="text-red-500">{errors.emp_image}</div>
                    )}
                    <br></br>
                    {selectedFileName && (
                      <span className="ml-2">{selectedFileName}</span>
                    )}
                  </p>

                  <label
                    htmlFor="emp_image"
                    className="border border-zinc-200 p-6 rounded-xl"
                  >
                    <span className="cursor-pointer">
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
                      Upload Image
                    </span>
                  </label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="emp_image"
                    name="emp_image"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(event) => {
                      handleChange(event);
                      handleFileChange(event);
                    }}
                  />
                </div>

                {/* ------------------------------------------------------- */}
                <div>
                  <p className="text-secondary text-sm">
                    First Name <span className="text-red-500">*</span>
                  </p>

                  <input
                    type="text"
                    onChange={(e: React.ChangeEvent<any>) =>
                      handleChangeName("first_name", e.target.value)
                    }
                    value={employeeName.first_name}
                    onBlur={handleBlur}
                    name="emp_name"
                    placeholder={"Enter First Name"}
                    required={true}
                    className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400 w-full`}
                    // maxLength={40}
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

                <div>
                  <p className="text-secondary text-sm">Middle Name</p>

                  <input
                    onChange={(e: React.ChangeEvent<any>) =>
                      handleChangeName("middle_name", e.target.value)
                    }
                    value={employeeName.middle_name}
                    onBlur={handleBlur}
                    name="emp_name"
                    placeholder={"Enter Middle Name"}
                    className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400 w-full`}
                    // required={true}
                    // maxLength={40}
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

                <div>
                  <p className="text-secondary text-sm">
                    Last Name <span className="text-red-500">*</span>
                  </p>

                  <input
                    onChange={(e: React.ChangeEvent<any>) =>
                      handleChangeName("last_name", e.target.value)
                    }
                    value={employeeName.last_name}
                    onBlur={handleBlur}
                    name="emp_name"
                    placeholder={"Enter Last Name"}
                    required={true}
                    className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400 w-full`}
                    // maxLength={40}
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

                {/* ------------------------------------------------------- */}
                <SelectForNoApi
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mode_of_recruitment}
                  // error={errors.mode_of_recruitment}
                  // touched={touched.mode_of_recruitment}
                  label="Mode of Recruitment"
                  name="mode_of_recruitment"
                  // required={true}
                  placeholder={"Enter Mode of Recruitment"}
                  options={[
                    {
                      id: 1,
                      name: "Online",
                    },
                    {
                      id: 2,
                      name: "Contractual",
                    },
                    {
                      id: 3,
                      name: "Appointments",
                    },
                    {
                      id: 4,
                      name: "Outsourced",
                    },
                    {
                      id: 5,
                      name: "Employees",
                    },
                    {
                      id: 6,
                      name: "Daily Wages",
                    },
                    {
                      id: 7,
                      name: "Deputation Post",
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
                  placeholder={"+91"}
                  type="text"
                  required={true}
                  maxLength={10}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emg_contact_no}
                  error={errors.emg_contact_no}
                  touched={touched.emg_contact_no}
                  label="Emergency Contact No."
                  name="emg_contact_no"
                  placeholder={"+91"}
                  type="text"
                  required={true}
                  maxLength={10}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
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
                  type="text"
                  required={true}
                  maxLength={12}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.epic_no}
                  error={errors.epic_no}
                  touched={touched.epic_no}
                  label="EPIC No.(Voter id)"
                  name="epic_no"
                  placeholder={"Enter EPIC Number"}
                  type="text"
                  required={true}
                  maxLength={10}
                  onKeyPress={(e: any) => {
                    if (
                      !(
                        (e.key >= "0" || e.key >= "A" || e.key >= "a") &&
                        (e.key <= "9" || e.key <= "Z" || e.key <= "z")
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                <SelectForNoApi
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                  error={errors.gender}
                  touched={touched.gender}
                  label="Gender"
                  name="gender"
                  placeholder={"Please Select"}
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
                      name: "Transgender",
                    },
                  ]}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pran}
                  // error={errors.pran}
                  // touched={touched.pran}
                  label="PRAN"
                  name="pran"
                  placeholder={"Enter PRAN"}
                  type="text"
                  // required={true}
                  maxLength={12}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
                />
                <SelectForNoApiNew
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
                  // onBlur={handleBlur}
                  value={values.weight}
                  label="Weight"
                  name="weight"
                  placeholder={"in KG"}
                  type="text"
                  maxLength={3}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.height}
                  label="Height"
                  name="height"
                  placeholder={"in c.m"}
                  type="text"
                  maxLength={3}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cps}
                  label="CPS"
                  name="cps"
                  placeholder={"Enter CPS"}
                  type="text"
                  // required={true}
                  maxLength={12}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gps}
                  error={errors.gps}
                  touched={touched.gps}
                  label="GPF"
                  name="gps"
                  placeholder={"Enter GPF"}
                  type="text"
                  required={true}
                  maxLength={12}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={validateDob}
                  value={values.dob}
                  error={"Age must be atleast 18"}
                  touched={isAdult}
                  label="D.O.B"
                  name="dob"
                  placeholder={"Enter D.O.B"}
                  type="date"
                  required={true}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pan_no}
                  label="PAN No."
                  name="pan_no"
                  placeholder={"Enter PAN Number"}
                  type="text"
                  maxLength={10}
                  onKeyPress={(e: any) => {
                    if (
                      !(
                        (e.key >= "0" || e.key >= "9") &&
                        (e.key <= "A" || e.key <= "Z")
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
                  buttonType="button"
                  variant={"cancel"}
                >
                  Reset
                </PrimaryButton>

                {!isEmpExist && !isAdult ? (
                  <PrimaryButton buttonType="submit" variant="primary">
                    Next
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    buttonType="button"
                    onClick={() => {
                      if (isAdult) {
                        toast.error("Employee Id Already Exist!");
                      } else {
                        toast.error("Age must be atleast 18");
                      }
                    }}
                    variant="disabled"
                  >
                    Next
                  </PrimaryButton>
                )}

                {/* {isAdult && (
                    <PrimaryButton
                        buttonType="button"
                        onClick={() => {
                            toast.error("Age must be atleast 18");
                        }}
                        variant="disabled"
                    >
                        Next
                    </PrimaryButton>
                )} */}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EmployeeBasicDetails;
