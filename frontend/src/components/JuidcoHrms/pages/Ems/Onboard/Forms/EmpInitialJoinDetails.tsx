/***
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Joining details - Employee Initial Joining Information page
 */

"use client";

import React, { useState, useEffect } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import { Formik } from "formik";
import {
  EmployeeJoinDetailsType,
  EmployeeDetailsProps,
} from "@/utils/types/employee.type";
import {
  initialEmployeeJoinDetails,
  employeeJoinValidationSchema,
} from "@/utils/validation/Ems/ems.validation";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
import DropDownList from "@/components/Helpers/DropDownList";
import { HRMS_URL } from "@/utils/api/urls";
import toast from "react-hot-toast";
import SelectForNoApiNew from "@/components/global/atoms/SelectForNoApiNew";

const EmpInitialJoinDetails: React.FC<
  EmployeeDetailsProps<EmployeeJoinDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const [confirmationOrder, setConfirmationOrder] = useState("");
  const [gisOrder, setGisOrder] = useState("");
  const empType = useSearchParams().get("emp");

  const updateConfirmationOrder = (value: string) => {
    setConfirmationOrder(value);
  };

  const updateGisOrder = (value: string) => {
    setGisOrder(value);
  };

  const handleSubmitFormik = (
    values: EmployeeJoinDetailsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    Object.keys(values).forEach((key) => {
      const val = values[key as keyof typeof values];
      if (
        val ==
        initialEmployeeJoinDetails[
        key as keyof typeof initialEmployeeJoinDetails
        ]
      ) {
        delete values[key as keyof typeof values];
      }
    });
    if (typeof window !== "undefined") {
      const formData = {
        ...values,
        confirmation_order: confirmationOrder,
        member_gis: gisOrder,
      };
      // const formData = { ...values };

      sessionStorage.setItem("emp_join_details", JSON.stringify(formData));
      setSubmitting(false);

      if (props.setData) {
        props.setData("emp_join_details", formData as any);
      }
      router.push(`${pathName}?emp=${empType}&page=7`);
    }
  };

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_join_details")
        ? JSON.parse(sessionStorage.getItem("emp_join_details") ?? "{}")
        : initialEmployeeJoinDetails
      : initialEmployeeJoinDetails;

  const handleOnblurForPayBand = (values: any, e: any) => {
    const payBandValue = e?.target?.value;
    if (values?.pay_scale) {
      if (Number(values.pay_scale) >= 1 && Number(values.pay_scale) <= 5) {
        if (!(Number(payBandValue) >= 5200 && Number(payBandValue) <= 20200)) {
          toast.error(
            `Pay Band 5200 - 20200 is allowed as Pay Scale is ${values?.pay_scale}`
          );
          values.pay_band = "";
        }
      } else if (
        Number(values.pay_scale) >= 6 &&
        Number(values.pay_scale) <= 9
      ) {
        if (!(Number(payBandValue) >= 9300 && Number(payBandValue) <= 34800)) {
          toast.error(
            `Pay Band 9300 - 34800 is allowed as Pay Scale is ${values?.pay_scale}`
          );
          values.pay_band = "";
        }
      } else if (
        Number(values.pay_scale) >= 10 &&
        Number(values.pay_scale) <= 12
      ) {
        if (!(Number(payBandValue) >= 15600 && Number(payBandValue) <= 39100)) {
          toast.error(
            `Pay Band 15600 - 39100 is allowed as Pay Scale is ${values?.pay_scale}`
          );
          values.pay_band = "";
        }
      } else if (
        (Number(values.pay_scale) >= 13 && Number(values.pay_scale) <= 14) ||
        values.pay_scale === "13-A"
      ) {
        if (!(Number(payBandValue) >= 37400 && Number(payBandValue) <= 67000)) {
          toast.error(
            `Pay Band 37400 - 67000 is allowed as Pay Scale is ${values?.pay_scale}`
          );
          values.pay_band = "";
        }
      } else if (Number(values.pay_scale) === 15) {
        if (!(Number(payBandValue) >= 67000 && Number(payBandValue) <= 79000)) {
          toast.error(
            `Pay Band 6700 - 79000 is allowed as Pay Scale is ${values?.pay_scale}`
          );
          values.pay_band = "";
        }
      } else if (Number(values.pay_scale) === 16) {
        if (!(Number(payBandValue) >= 75500 && Number(payBandValue) <= 80000)) {
          toast.error(
            `Pay Band 75500 - 80000 is allowed as Pay Scale is ${values?.pay_scale}`
          );
          values.pay_band = "";
        }
      } else if (Number(values.pay_scale) === 17) {
        if (!(Number(payBandValue) === 80000)) {
          toast.error(
            `Pay Band 80000 is allowed as Pay Scale is ${values?.pay_scale}`
          );
          values.pay_band = "";
        }
      } else if (Number(values.pay_scale) === 18) {
        if (!(Number(payBandValue) === 90000)) {
          toast.error(
            `Pay Band 90000 is allowed as Pay Scale is ${values?.pay_scale}`
          );
          values.pay_band = "";
        }
      }
    } else {
      toast.error("Please select Pay Scale before entering Pay Band");
      values.pay_band = "";
    }
  };

  //////////////////////////////////////////////////////////////////

  const [employeeType, setEmployeeType] = useState<number>();

  useEffect(() => {
    const storedJoinDataString = sessionStorage.getItem("emp_basic_details");
    const storedJoinData = storedJoinDataString
      ? JSON.parse(storedJoinDataString)
      : null;

    const empType = storedJoinData?.emp_type;
    setEmployeeType(empType);
  }, []);

  ////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Joining Information
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
        <h5>Steps-6/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md">
        <SubHeading className="text-[20px] py-4">
          Employee Initial Joining Details
        </SubHeading>
        <Formik
          initialValues={initialValues}
          validationSchema={employeeType !== 4 && employeeJoinValidationSchema}
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
            setFieldError
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
                {employeeType && employeeType === 4 ? null : (
                  <>
                    <DropDownList
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.department_id}
                      error={errors.department_id}
                      touched={touched.department_id}
                      label="Department"
                      name="department_id"
                      placeholder={"Please Select Department"}
                      api={`${HRMS_URL.DEPARTMENT.get}`}
                      //required
                    />

                    <DropDownList
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.designation_id}
                      touched={touched.designation_id}
                      label="Designation"
                      placeholder="Please Select"
                      name="designation_id"
                      api={`${HRMS_URL.DESIGNATION.get}`}
                      //required
                    />

                    <SelectForNoApi
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.class}
                      label="Class(1,2,3,4)"
                      name="class"
                      placeholder={"Please Select"}
                      options={[
                        { id: 1, name: "1" },
                        { id: 2, name: "2" },
                        { id: 3, name: "3" },
                        { id: 4, name: "4" },
                      ]}
                      //required
                    />

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        Whether Confirmation Order
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex items-center">
                          <input
                            onChange={() => updateConfirmationOrder("yes")}
                            checked={confirmationOrder === "yes"}
                            className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent"
                            id="yes"
                            name="confirmation_order"
                            type="checkbox"
                          />

                          <label htmlFor="yes">Yes</label>
                        </div>

                        <div className="flex items-center">
                          <input
                            onChange={() => updateConfirmationOrder("no")}
                            checked={confirmationOrder === "no"}
                            className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent"
                            id="no"
                            name="confirmation_order"
                            type="checkbox"
                          />
                          <label htmlFor="no">No</label>
                        </div>
                      </div>

                      <div className="mt-3">
                        {confirmationOrder === "yes" && (
                          <InputBox
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.doc}
                            label="Date of Confirmation"
                            name="doc"
                            placeholder={"Enter Date of Confirmation"}
                            type="date"
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 2xl:grid-cols-3  gap-2 ">
                      {/* <InputBox
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pay_scale}
                        // error={errors.pay_scale}
                        // touched={touched.pay_scale}
                        label="Pay Scale"
                        name="pay_scale"
                        placeholder={"Enter Pay Scale"}
                        type="number"
                        // //required={true}
                        maxLength={10}
                      /> */}
                      <SelectForNoApiNew
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pay_scale}
                        label="Pay Scale"
                        name="pay_scale"
                        placeholder={"Please Select"}
                        //required={true}
                        error={errors.pay_scale}
                        touched={touched.pay_scale}
                        options={[
                          { id: 1, name: "1" },
                          { id: 2, name: "2" },
                          { id: 3, name: "3" },
                          { id: 4, name: "4" },
                          { id: 5, name: "5" },
                          { id: 6, name: "6" },
                          { id: 7, name: "7" },
                          { id: 8, name: "8" },
                          { id: 9, name: "9" },
                          { id: 10, name: "10" },
                          { id: 11, name: "11" },
                          { id: 12, name: "12" },
                          { id: 13, name: "13" },
                          { id: 14, name: "13-A" },
                          { id: 15, name: "14" },
                          { id: 16, name: "15" },
                          { id: 17, name: "16" },
                          { id: 18, name: "17" },
                          { id: 19, name: "18" },
                        ]}
                      />

                      {/* <InputBox
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.grade_pay}
                        error={errors.grade_pay}
                        touched={touched.grade_pay}
                        label="Grade Pay"
                        name="grade_pay"
                        placeholder={"Enter Grade Pay"}
                        type="number"
                        //required={true}
                      /> */}

                      <InputBox
                        onChange={handleChange}
                        onBlur={(e) => {
                          handleOnblurForPayBand(values, e);
                        }}
                        value={values.pay_band}
                        error={errors.pay_band}
                        touched={touched.pay_band}
                        label="Pay Band"
                        name="pay_band"
                        placeholder={"Enter Pay Band"}
                        type="number"
                        //required={true}
                        onKeyPress={(e: any) => {
                          if (
                            !((e.key >= "0" && e.key <= "9") || e.key === " ")
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />

                      <SelectForNoApiNew
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.grade_pay}
                        error={errors.grade_pay}
                        label="Grade Pay"
                        name="grade_pay"
                        //required={true}
                        touched={touched.grade_pay}
                        placeholder={"Please Select"}
                        
                        options={
                          Number(values.pay_scale) >= 1 &&
                            Number(values.pay_scale) <= 5
                            ? [
                              { id: 1800, name: "1800" },
                              { id: 1900, name: "1900" },
                              { id: 2000, name: "2000" },
                              { id: 2400, name: "2400" },
                              { id: 2800, name: "2800" },
                            ]
                            : Number(values.pay_scale) >= 6 &&
                              Number(values.pay_scale) <= 9
                              ? [
                                { id: 4200, name: "4200" },
                                { id: 4600, name: "4600" },
                                { id: 4800, name: "4800" },
                                { id: 5400, name: "5400" },
                              ]
                              : Number(values.pay_scale) >= 10 &&
                                Number(values.pay_scale) <= 12
                                ? [
                                  { id: 5400, name: "5400" },
                                  { id: 6600, name: "6600" },
                                  { id: 7600, name: "7600" },
                                ]
                                : (Number(values.pay_scale) >= 13 &&
                                  Number(values.pay_scale) <= 14) ||
                                  values.pay_scale === "13-A"
                                  ? [
                                    { id: 8700, name: "8700" },
                                    { id: 8900, name: "8900" },
                                    { id: 10000, name: "10000" },
                                  ]
                                  : []
                        }
                      />
                    </div>

                    {confirmationOrder === "yes" && (
                      <InputBox
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conf_order_number}
                        label="Confirmation Order Number"
                        name="conf_order_number"
                        placeholder={"Enter Confirmation Order Number"}
                        type="text"
                        maxLength={10}
                        onKeyPress={(e: any) => {
                          if (!(e.key >= "0" && e.key <= "9")) {
                            e.preventDefault();
                          }
                        }}
                      />
                    )}

                    {confirmationOrder === "yes" && (
                      <InputBox
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conf_order_date}
                        label="Confirmation Order Date"
                        name="conf_order_date"
                        placeholder={"Enter Confirmation Order Date"}
                        type="date"
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        Member of GIS or not
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex items-center">
                          <input
                            onChange={() => updateGisOrder("yes")}
                            checked={gisOrder === "yes"}
                            // className={`mr-1 bg-white checkbox border border-zinc-500`}
                            className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent"
                            id="yes"
                            name={"confirmation_order"}
                            type="checkbox"
                          />
                          <label htmlFor="yes">Yes</label>
                        </div>

                        <div className="flex items-center">
                          <input
                            onChange={() => updateGisOrder("no")}
                            checked={gisOrder === "no"}
                            // className={`mr-1 bg-white checkbox border border-zinc-500`}
                            className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent"
                            id="no"
                            name={"confirmation_order"}
                            type="checkbox"
                          />
                          <label htmlFor="no">No</label>
                        </div>
                      </div>

                      <div className="mt-3">
                        {gisOrder === "yes" && (
                          <InputBox
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gis_account}
                            label="GIS Account No"
                            name="gis_account"
                            placeholder={"Enter GIS Account No."}
                            type="number"
                          />
                        )}
                      </div>
                    </div>
                    <SelectForNoApi
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.appoint_authority}
                      error={errors.appoint_authority}
                      touched={touched.appoint_authority}
                      label="Appointment Authority"
                      name="appoint_authority"
                      placeholder={"Please Select"}
                      options={[
                        { id: 1, name: "Central" },
                        { id: 2, name: "State" },
                        { id: 3, name: "ULB" },
                        { id: 4, name: "RA Scheme" },
                        { id: 5, name: "Employee Exchange" },
                      ]}
                    />
                    {values.appoint_authority === "ULB" && (
                      <SelectForNoApi
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={"Yes"}
                        label="Whether deputed to ULB"
                        name="ulb"
                        options={[{ id: 1, name: "Yes" }]}
                      />
                    )}
                    {values.appoint_authority !== "ULB" && (
                      <SelectForNoApi
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ulb}
                        label="Whether deputed to ULB"
                        name="ulb"
                        placeholder={"Please Select"}
                        options={[
                          { id: 1, name: "Yes" },
                          { id: 2, name: "No" },
                        ]}
                      />
                    )}

                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_inc_order}
                      label="Last Increment Order No."
                      name="last_inc_order"
                      placeholder={"Enter Last Increment Order No."}
                      type="text"
                    />
                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name_of_service}
                      label="Name Of Service at the time of joining"
                      name="name_of_service"
                      placeholder={
                        "Enter Name Of Service at the time of joining"
                      }
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
                      value={values.last_inc_order_date}
                      label="Last Increment order Date"
                      name="last_inc_order_date"
                      placeholder={"Enter Last Increment order Date"}
                      type="date"
                    />

                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.wef_date}
                      label="WEF date"
                      name="wef_date"
                      type="date"
                    />

                    <SelectForNoApi
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sen_grade_list}
                      label="Employee fall under, Seniority in gradation list"
                      name="sen_grade_list"
                      placeholder={"Enter if Seniority in gradation list"}
                      options={[
                        { id: 1, name: "Gazette" },
                        { id: 2, name: "Non-Gazette" },
                      ]}
                    />
                  </>
                )}
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.task}
                  // error={errors.task}
                  // touched={touched.task}
                  label="Task"
                  placeholder="Enter Task"
                  name="task"
                  // //required={true}
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
                  value={values.doj}
                  error={errors.doj}
                  touched={touched.doj}
                  label="Date Of Joining"
                  name="doj"
                  placeholder={"Enter Date Of Joining"}
                  type="date"
                //required={true}
                />
                <SelectForNoApi
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.effective_pay_commision}
                  error={errors.effective_pay_commision}
                  touched={touched.effective_pay_commision}
                  label="Effective Pay Commission (At the time of Joining)"
                  name="effective_pay_commision"
                  placeholder={"Please Select"}
                  options={[
                    { id: 1, name: "1" },
                    { id: 2, name: "2" },
                    { id: 3, name: "3" },
                    { id: 4, name: "4" },
                    { id: 5, name: "5" },
                    { id: 6, name: "6" },
                    { id: 7, name: "7" },
                  ]}
                  //required={employeeType && employeeType === 4 ? false : true}
                />
                {/* <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.basic_pay}
                  error={errors.basic_pay}
                  touched={touched.basic_pay}
                  label="Basic Pay"
                  name="basic_pay"
                  placeholder={"Enter Basic Pay"}
                  type="number"
                  //required={true}
                /> */}
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.basic_pay}
                  error={errors.basic_pay}
                  touched={touched.basic_pay}
                  label={
                    employeeType && employeeType === 4
                      ? "Effective Daily Wage"
                      : " Basic Pay"
                  }
                  name="basic_pay"
                  placeholder={
                    employeeType && employeeType === 4
                      ? "Enter Effective Daily Wage"
                      : "Enter Basic Pay"
                  }
                  type="number"
                  //required={employeeType && employeeType === 4 ? false : true}
                />
                <SelectForNoApi
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.deduction_type}
                  error={errors.deduction_type}
                  touched={touched.deduction_type}
                  label="Deduction Type"
                  name="deduction_type"
                  placeholder={"Please Select"}
                  options={[
                    { id: 1, name: "GPF" },
                    { id: 2, name: "CPS" },
                  ]}
                  //required={employeeType && employeeType === 4 ? false : true}
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bank_name}
                  label="Bank Name"
                  name="bank_name"
                  placeholder={"Enter Bank Name"}
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
                  value={values.branch_name}
                  label="Branch Name"
                  name="branch_name"
                  placeholder={"Enter Branch Name"}
                />
                <SelectForNoApi
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pf_category}
                  label="PF Category"
                  name="pf_category"
                  placeholder={"Please Select"}
                  options={[
                    { id: 1, name: "EPF" },
                    { id: 2, name: "GPF" },
                    { id: 3, name: "VPF" },
                    { id: 4, name: "NPS" },
                    { id: 5, name: "PPF" },
                  ]}
                />
                {/* <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.acc_number}
                  label="Account Number"
                  name="acc_number"
                  placeholder={"Enter Account Number"}
                  type="text"
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
                  value={values.ifsc}
                  label="IFSC Code"
                  name="ifsc"
                  placeholder={"Enter IFSC Code"}
                  maxLength={12}
                /> */}
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.acc_number}
                  label="Account Number"
                  name="acc_number"
                  placeholder={"Enter Account Number"}
                  type="text"
                  // maxLength={10}
                  onKeyPress={(e: any) => {
                    if (!(e.key >= "0" && e.key <= "9")) {
                      e.preventDefault();
                    }
                  }}
                  error={errors?.acc_number}
                  touched={touched.acc_number}
                  regEx={/^\d{11,}$/}
                  customError="Atleast 11 digits"
                  setFieldError={setFieldError}
                />
                {values.acc_number && (
                  <div>
                    <InputBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ifsc}
                      label="IFSC Code"
                      name="ifsc"
                      placeholder={"Enter IFSC Code"}
                      maxLength={12}
                    />
                  </div>
                )}
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

export default EmpInitialJoinDetails;
