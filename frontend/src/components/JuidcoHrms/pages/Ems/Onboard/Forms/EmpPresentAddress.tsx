/***
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Address details - Employee Present Address page
 */

"use client";

import React, { useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import { Formik } from "formik";
import {
  EmployeePresentAddressDetailsType,
  EmployeeDetailsProps,
} from "@/utils/types/employee.type";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  initialEmployeeAddressDetails,
  employeePresentAddressValidationSchema,
} from "@/utils/validation/Ems/ems.validation";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

const EmpPresentAddress: React.FC<
  EmployeeDetailsProps<EmployeePresentAddressDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");
  const [confirmationOrder, setConfirmationOrder] = useState("");

  const updateConfirmationOrder = (value: string) => {
    setConfirmationOrder(value);
  };

  const handleSubmitFormik = (values: EmployeePresentAddressDetailsType) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_address_details", JSON.stringify(values));

      if (props.setData) {
        props.setData("emp_address_details", values);
      }
      router.push(`${pathName}?emp=${empType}&page=5`);
    }
  };

  // const handleSubmitFormik = (
  //   values: EmployeePresentAddressDetailsType,
  //   { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  // ) => {

  //   if (typeof window !== "undefined") {
  //     let formData ;
  //     if (confirmationOrder === "yes") {
  //       formData = [
  //         { type: "present", ...values },
  //         { type: "permanent", ...values },
  //       ];
  //     } else {
  //       formData = [{ type: "present", ...values }];
  //     }

  //     sessionStorage.setItem("emp_address_details", JSON.stringify(formData));
  //     setSubmitting(false);

  //     if (props.setData) {
  //       props.setData("emp_address_details", formData as any);
  //     }
  //     router.push(`${pathName}?emp=${empType}&page=5`);
  //   }
  // };

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_address_details")
        ? JSON.parse(sessionStorage.getItem("emp_address_details") ?? "{}")
        : initialEmployeeAddressDetails
      : initialEmployeeAddressDetails;



  return (
    <>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Present Address
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z" fill="#6565DD" />
            </svg>
          </i>
        </SubHeading>
        <h5>Steps-11/4</h5>

      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md">
        <SubHeading className="text-[20px] py-4">
          Employee Present Address
        </SubHeading>
        <Formik
          initialValues={initialValues}
          validationSchema={employeePresentAddressValidationSchema}
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
              <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
                {/* -----------------------Present Address fields----------------------------------- */}

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address_primary}
                  error={errors.address_primary}
                  touched={touched.address_primary}
                  label="Address-1"
                  required={true}
                  placeholder="Enter Present Address"
                  name="address_primary"
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address_secondary}
                  label="Address-2"
                  name="address_secondary"
                  placeholder={"Enter Present Address"}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.village}
                  error={errors.village}
                  touched={touched.village}
                  label="Village/Town/City"
                  required={true}
                  placeholder="Enter Your Village/Town/City"
                  name="village"
                  onKeyPress={(e: any) => {
                    if (!((e.key >= 'a' || e.key >= 'A')  && (e.key <= 'z' || e.key <= 'Z') )) {
                      e.preventDefault();
                    }
                  }}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.post_office}
                  label="Post Office"
                  placeholder="Enter Your Post Office"
                  name="post_office"
                />
                <SelectForNoApi
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  error={errors.state}
                  touched={touched.state}
                  label="State"
                  required={true}
                  placeholder="Please Select"
                  name="state"
                  options={[
                    { "id": 1, "name": "West Bengal" },
                    { "id": 2, "name": "Rajasthan" },
                    { "id": 3, "name": "Jammu and Kashmir" },
                    { "id": 4, "name": "Uttar Pradesh" },
                    { "id": 5, "name": "Bihar" },
                    { "id": 6, "name": "Assam" },
                    { "id": 7, "name": "Odisha" },
                    { "id": 8, "name": "Tamil Nadu" },
                    { "id": 9, "name": "Andhra Pradesh" },
                    { "id": 10, "name": "Madhya Pradesh" },
                    { "id": 11, "name": "Kerala" },
                    { "id": 12, "name": "Karnataka" },
                    { "id": 13, "name": "Maharashtra" },
                    { "id": 14, "name": "Gujarat" },
                    { "id": 15, "name": "Nagaland" },
                    { "id": 16, "name": "Punjab" },
                    { "id": 17, "name": "Himachal Pradesh" },
                    { "id": 18, "name": "Manipur" },
                    { "id": 19, "name": "Meghalaya" },
                    { "id": 20, "name": "Tripura" },
                    { "id": 21, "name": "Sikkim" },
                    { "id": 22, "name": "Goa" },
                    { "id": 23, "name": "Arunachal Pradesh" },
                    { "id": 24, "name": "Mizoram" },
                    { "id": 25, "name": "Chhattisgarh" },
                    { "id": 26, "name": "Jharkhand" },
                    { "id": 27, "name": "Uttarakhand" },
                    { "id": 28, "name": "Telangana" },
                    { "id": 29, "name": "Haryana" },
                    { "id": 30, "name": "Delhi" },
                    { "id": 31, "name": "Andaman and Nicobar Islands" },
                    { "id": 32, "name": "Chandigarh" },
                    { "id": 33, "name": "Dadra and Nagar Haveli" },
                    { "id": 34, "name": "Lakshadweep" },
                    { "id": 35, "name": "Puducherry" },
                    { "id": 36, "name": "Anglo Indian Nominated" },
                    { "id": 37, "name": "Jammu and Kashmir" },
                    { "id": 38, "name": "Ladakh" }
                  ]}
                />
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

                <SelectForNoApi
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.block_ulb}
                  label="Block ULB"
                  // placeholder="Block ULB"
                  name="block_ulb"
                  placeholder={"Choose Block ULB"}
                  options={[
                    { id: 1, name: "Ranchi (Nagar Nigam)" },
                    { id: 2, name: "Dhanbad (Nagar Nigam)" },
                    { id: 3, name: "Hazaribag (Nagar Parshad)" },
                    { id: 4, name: "Adityapur (Nagar Parshad)" },
                    { id: 5, name: "Vishrampur (Nagar Panchayat)" },
                    { id: 6, name: "Jamshedpur (NAC)" },
                    { id: 7, name: "Deoghar (Nagar Nigam)" },
                    { id: 8, name: "Medininagar (Daltonganj) (Nagar Parshad)" },
                    { id: 9, name: "Jhumri Talaiya (Nagar Parshad)" },
                    { id: 10, name: "Giridih (Nagar Parshad)" },
                    { id: 11, name: "Sahibganj (Nagar Parshad)" },
                    { id: 12, name: "Phusro (Nagar Parshad)" },
                    { id: 13, name: "Chas (Nagar Parshad)" },
                    { id: 14, name: "Chaibasa (Nagar Parshad)" },
                    { id: 15, name: "Chakradharpur (Nagar Parshad)" },
                    { id: 16, name: "Garhwa (Nagar Panchayat)" },
                    { id: 17, name: "Hussainabad (Nagar Panchayat)" },
                    { id: 18, name: "Chatra (Nagar Parshad)" },
                    { id: 19, name: "Madhupur (Nagar Parshad)" },
                    { id: 20, name: "Godda (Nagar Panchayat)" },
                    { id: 21, name: "Pakur (Nagar Panchayat)" },
                    { id: 22, name: "Dumka (Nagar Parshad)" },
                    { id: 23, name: "Jamtara (Nagar Panchayat)" },
                    { id: 24, name: "Mihijam (Nagar Panchayat)" },
                    { id: 25, name: "Chirkunda (Nagar Panchayat)" },
                    { id: 26, name: "Khunti (Nagar Panchayat)" },
                    { id: 27, name: "Lohardaga (Nagar Parshad)" },
                    { id: 28, name: "Gumla (Nagar Panchayat)" },
                    { id: 29, name: "Simdega (Nagar Panchayat)" },
                    { id: 30, name: "Jugsalai (Municipality)" },
                    { id: 31, name: "Majhiaown (Nagar Panchayat)" },
                    { id: 32, name: "Latehar (Nagar Panchayat)" },
                    { id: 33, name: "Kodarma (Nagar Panchayat)" },
                    { id: 34, name: "Rajmahal (Nagar Panchayat)" },
                    { id: 35, name: "Basukinath (Nagar Panchayat)" },
                    { id: 36, name: "Bundu (Nagar Panchayat)" },
                    { id: 37, name: "Saraikela (Nagar Panchayat)" },
                    { id: 38, name: "Chakulia (Nagar Panchayat)" },
                    { id: 39, name: "Vishrampur (Nagar Panchayat)" },
                  ]}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pin_code}
                  error={errors.pin_code}
                  touched={touched.pin_code}
                  label="Pin Code"
                  required={true}
                  placeholder="Pin Code"
                  name="pin_code"
                  type="text"
                  maxLength={6}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= '0' && e.key <= '9')) {
                      e.preventDefault();
                    }
                  }}
                />
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.police_station}
                  error={errors.police_station}
                  touched={touched.police_station}
                  label="Police Station"
                  required={true}
                  placeholder="Police Station"
                  name="police_station"
                  onKeyPress={(e: any) => {
                    if (!((e.key >= 'a' || e.key >= 'A') && (e.key <= 'z' || e.key <= 'Z'))) {
                      e.preventDefault();
                    }
                  }}
                />
                <div className="flex items-center gap-5">
                  <div className="flex items-center">
                    <input
                      onChange={(e) =>
                        updateConfirmationOrder(e.target.checked ? "yes" : "no")
                      }
                      checked={confirmationOrder === "yes"}
                      className={`mr-1 bg-white checkbox border border-zinc-500`}
                      id="yes"
                      name="emp_address_same"
                      type="checkbox"
                    />
                    <label htmlFor="">
                      If Present & Permanent Address are not same<span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
                {/* -----------------------Present Address fields ends----------------------------------- */}

                {/* -----------------------Present Address fields if confirmationOrder === yes ----------------------------------- */}

                {confirmationOrder === "yes" && (
                  <>
                    <div>
                      <SubHeading className="text-[20px] py-4">
                        Employee Permanent Address
                      </SubHeading>
                    </div>
                    <div></div>


                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address_primary_permanent}
                      error={errors.address_primary_permanent}
                      touched={touched.address_primary_permanent}
                      label="Address-1"
                      placeholder="Enter Permanent Address"
                      name="address_primary_permanent"
                    />

                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address_secondary_permanent}
                      label="Address-2"
                      name="address_secondary_permanent"
                      placeholder={"Enter Permanent Address"}
                    />
                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.village_permanent}
                      error={errors.village_permanent}
                      touched={touched.village_permanent}
                      label="Village/Town/City"
                      placeholder="Enter Your Permanent Village/Town/City"
                      name="village_permanent"
                      onKeyPress={(e: any) => {
                        if (!((e.key >= 'a' || e.key >= 'A') && (e.key <= 'z' || e.key <= 'Z'))) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.post_office_permanent}
                      label="Post Office"
                      placeholder="Enter Your Permanent Post Office"
                      name="post_office_permanent"
                      onKeyPress={(e: any) => {
                        if (!((e.key >= 'a' || e.key >= 'A') && (e.key <= 'z' || e.key <= 'Z'))) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <SelectForNoApi
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state_permanent}
                      error={errors.state_permanent}
                      touched={touched.state_permanent}
                      label="State"
                      placeholder="Please Select"
                      name="state_permanent"
                      options={[
                        { "id": 1, "name": "West Bengal" },
                        { "id": 2, "name": "Rajasthan" },
                        { "id": 3, "name": "Jammu and Kashmir" },
                        { "id": 4, "name": "Uttar Pradesh" },
                        { "id": 5, "name": "Bihar" },
                        { "id": 6, "name": "Assam" },
                        { "id": 7, "name": "Odisha" },
                        { "id": 8, "name": "Tamil Nadu" },
                        { "id": 9, "name": "Andhra Pradesh" },
                        { "id": 10, "name": "Madhya Pradesh" },
                        { "id": 11, "name": "Kerala" },
                        { "id": 12, "name": "Karnataka" },
                        { "id": 13, "name": "Maharashtra" },
                        { "id": 14, "name": "Gujarat" },
                        { "id": 15, "name": "Nagaland" },
                        { "id": 16, "name": "Punjab" },
                        { "id": 17, "name": "Himachal Pradesh" },
                        { "id": 18, "name": "Manipur" },
                        { "id": 19, "name": "Meghalaya" },
                        { "id": 20, "name": "Tripura" },
                        { "id": 21, "name": "Sikkim" },
                        { "id": 22, "name": "Goa" },
                        { "id": 23, "name": "Arunachal Pradesh" },
                        { "id": 24, "name": "Mizoram" },
                        { "id": 25, "name": "Chhattisgarh" },
                        { "id": 26, "name": "Jharkhand" },
                        { "id": 27, "name": "Uttarakhand" },
                        { "id": 28, "name": "Telangana" },
                        { "id": 29, "name": "Haryana" },
                        { "id": 30, "name": "Delhi" },
                        { "id": 31, "name": "Andaman and Nicobar Islands" },
                        { "id": 32, "name": "Chandigarh" },
                        { "id": 33, "name": "Dadra and Nagar Haveli" },
                        { "id": 34, "name": "Lakshadweep" },
                        { "id": 35, "name": "Puducherry" },
                        { "id": 36, "name": "Anglo Indian Nominated" },
                        { "id": 37, "name": "Jammu and Kashmir" },
                        { "id": 38, "name": "Ladakh" }
                      ]}
                    />
                    {/* <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.district_permanent}
                    error={errors.district_permanent}
                    touched={touched.district_permanent}
                    label="District"
                    placeholder="Enter Your Permanent District"
                    name="district_permanent"
                  /> */}

                    <SelectForNoApi
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.district_permanent}
                      error={errors.district_permanent}
                      touched={touched.district_permanent}
                      label="District"
                      name="district_permanent"
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
                    {/* <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.block_ulb_permanent}
                    label="Block ULB"
                    placeholder="Enter Your Permanent Block ULB"
                    name="block_ulb_permanent"
                  /> */}
                    <SelectForNoApi
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.block_ulb_permanent}
                      label="Block ULB"
                      name="block_ulb_permanent"
                      placeholder={"Choose Permanent Block ULB"}
                      options={[
                        { id: 1, name: "Ranchi (Nagar Nigam)" },
                        { id: 2, name: "Dhanbad (Nagar Nigam)" },
                        { id: 3, name: "Hazaribag (Nagar Parshad)" },
                        { id: 4, name: "Adityapur (Nagar Parshad)" },
                        { id: 5, name: "Vishrampur (Nagar Panchayat)" },
                        { id: 6, name: "Jamshedpur (NAC)" },
                        { id: 7, name: "Deoghar (Nagar Nigam)" },
                        { id: 8, name: "Medininagar (Daltonganj) (Nagar Parshad)" },
                        { id: 9, name: "Jhumri Talaiya (Nagar Parshad)" },
                        { id: 10, name: "Giridih (Nagar Parshad)" },
                        { id: 11, name: "Sahibganj (Nagar Parshad)" },
                        { id: 12, name: "Phusro (Nagar Parshad)" },
                        { id: 13, name: "Chas (Nagar Parshad)" },
                        { id: 14, name: "Chaibasa (Nagar Parshad)" },
                        { id: 15, name: "Chakradharpur (Nagar Parshad)" },
                        { id: 16, name: "Garhwa (Nagar Panchayat)" },
                        { id: 17, name: "Hussainabad (Nagar Panchayat)" },
                        { id: 18, name: "Chatra (Nagar Parshad)" },
                        { id: 19, name: "Madhupur (Nagar Parshad)" },
                        { id: 20, name: "Godda (Nagar Panchayat)" },
                        { id: 21, name: "Pakur (Nagar Panchayat)" },
                        { id: 22, name: "Dumka (Nagar Parshad)" },
                        { id: 23, name: "Jamtara (Nagar Panchayat)" },
                        { id: 24, name: "Mihijam (Nagar Panchayat)" },
                        { id: 25, name: "Chirkunda (Nagar Panchayat)" },
                        { id: 26, name: "Khunti (Nagar Panchayat)" },
                        { id: 27, name: "Lohardaga (Nagar Parshad)" },
                        { id: 28, name: "Gumla (Nagar Panchayat)" },
                        { id: 29, name: "Simdega (Nagar Panchayat)" },
                        { id: 30, name: "Jugsalai (Municipality)" },
                        { id: 31, name: "Majhiaown (Nagar Panchayat)" },
                        { id: 32, name: "Latehar (Nagar Panchayat)" },
                        { id: 33, name: "Kodarma (Nagar Panchayat)" },
                        { id: 34, name: "Rajmahal (Nagar Panchayat)" },
                        { id: 35, name: "Basukinath (Nagar Panchayat)" },
                        { id: 36, name: "Bundu (Nagar Panchayat)" },
                        { id: 37, name: "Saraikela (Nagar Panchayat)" },
                        { id: 38, name: "Chakulia (Nagar Panchayat)" },
                      ]}
                    />
                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pin_code_permanent}
                      error={errors.pin_code_permanent}
                      touched={touched.pin_code_permanent}
                      label="Pin Code"
                      placeholder="Enter Your Permanent Pin Code"
                      name="pin_code_permanent"
                      type="text"
                      maxLength={6}
                      onKeyPress={(e: any) => {
                        if (!(e.key >= '0' && e.key <= '9')) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.police_station_permanent}
                      error={errors.police_station_permanent}
                      touched={touched.police_station_permanent}
                      label="Police Station"
                      placeholder="Enter Your Permanent Police Station"
                      name="police_station_permanent"
                      onKeyPress={(e: any) => {
                        if (!((e.key >= 'a' || e.key >= 'A') && (e.key <= 'z' || e.key <= 'Z'))) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </>
                )}

                {/* -----------------------Present Address fields if confirmationOrder === yes ends ----------------------------------- */}
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

export default EmpPresentAddress;
