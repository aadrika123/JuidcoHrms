/***
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Joining details - Employee Initial Joining Information page
 */

"use client";

import React, { useState } from 'react'
import { SubHeading } from '@/components/Helpers/Heading'
import { Formik } from 'formik';
import { EmployeeJoinDetailsType, EmployeeDetailsProps } from '@/utils/types/employee.type';
import { initialEmployeeJoinDetails, employeeJoinValidationSchema } from '@/utils/validation/Ems/ems.validation';
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

const EmpInitialJoinDetails: React.FC<
    EmployeeDetailsProps<EmployeeJoinDetailsType>
> = (props) => {
    const pathName = usePathname();
    const router = useRouter();
    const [confirmationOrder, setConfirmationOrder] = useState('');
    const [gisOrder, setGisOrder] = useState('');
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
        if (typeof window !== "undefined") {
            // const formData = { ...values, confirmation_order: confirmationOrder, member_gis: gisOrder };
            const formData = { ...values};

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

    return (
        <>
            <SubHeading className="text-[20px] py-4">
                Employee Initial Joining Details
            </SubHeading>
            <Formik
                initialValues={initialValues}
                validationSchema={employeeJoinValidationSchema}
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
                            <SelectForNoApi
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.department}
                                error={errors.department}
                                touched={touched.department}
                                label="Department*"
                                name="department"
                                placeholder={"Please Select"}
                                options={[
                                    { id: 1, name: "department 1" },
                                    { id: 2, name: "department 2" },
                                ]}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.designation}
                                error={errors.designation}
                                touched={touched.designation}
                                label="Designation*"
                                placeholder="Enter Designation"
                                name="designation"
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.task}
                                error={errors.task}
                                touched={touched.task}
                                label="Task*"
                                placeholder="Enter Task"
                                name="task"
                            />
                            <SelectForNoApi
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.department}
                                label="Class(1,2,3,4)"
                                name="class"
                                placeholder={"Please Select"}
                                options={[
                                    { id: 1, name: "class 1" },
                                    { id: 2, name: "class 2" },
                                ]}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.doj}
                                error={errors.doj}
                                touched={touched.doj}
                                label="Date Of Joining*"
                                name="doj"
                                placeholder={"Enter Date Of Joining"}
                                type="date"
                            />
                            <SelectForNoApi
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.effective_pay_commision}
                                error={errors.effective_pay_commision}
                                touched={touched.effective_pay_commision}
                                label="Effective Pay Commission* (At the time of Joining)"
                                name="effective_pay_commision"
                                placeholder={"Please Select"}
                                options={[
                                    { id: 1, name: "commission 1" },
                                    { id: 2, name: "commission 2" },
                                ]}
                            />


                            {/* <div className="flex flex-col gap-2">
                                <div className="flex items-center">Weather Confirmation Order*</div>
                                <div className="flex items-center gap-5">
                                    <div className="flex items-center">
                                        <input
                                            onChange={() => updateConfirmationOrder('yes')}
                                            checked={confirmationOrder === 'yes'}
                                            className={`mr-1 bg-white checkbox border border-zinc-500`}
                                            id="yes"
                                            name="confirmation_order"
                                            type="checkbox"
                                        />
                                        <label htmlFor="yes">Yes</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            onChange={() => updateConfirmationOrder('no')}
                                            checked={confirmationOrder === 'no'}
                                            className={`mr-1 bg-white checkbox border border-zinc-500`}
                                            id="no"
                                            name="confirmation_order"
                                            type="checkbox"
                                        />
                                        <label htmlFor="no">No</label>
                                    </div>
                                    {touched.confirmation_order && errors.confirmation_order && (
                                        <div className="text-red-500 text-sm block">{errors.confirmation_order}</div>
                                    )}
                                    
                                </div>
                            </div> */}

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">Weather Confirmation Order*</div>
                                <div className="flex items-center gap-5">
                                    <div className="flex items-center">
                                        <input
                                            onChange={() => updateConfirmationOrder('yes')}
                                            checked={confirmationOrder === 'yes'}
                                            className={`mr-1 bg-white checkbox border border-zinc-500`}
                                            id="yes"
                                            name="confirmation_order"
                                            type="checkbox"
                                        />
                                        <label htmlFor="yes">Yes</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            onChange={() => updateConfirmationOrder('no')}
                                            checked={confirmationOrder === 'no'}
                                            className={`mr-1 bg-white checkbox border border-zinc-500`}
                                            id="no"
                                            name="confirmation_order"
                                            type="checkbox"
                                        />
                                        <label htmlFor="no">No</label>
                                    </div>
                                </div>
                                {touched.confirmation_order && errors.confirmation_order && (
                                    <div className="text-red-500 text-md block">{errors.confirmation_order}</div>
                                )}
                            </div>


                            <div className="grid grid-cols-3 2xl:grid-cols-3  gap-2 ">

                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pay_scale}
                                    error={errors.pay_scale}
                                    touched={touched.pay_scale}
                                    label="Pay Scale*"
                                    name="pay_scale"
                                    placeholder={"Enter Pay Scale"}
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pay_band}
                                    error={errors.pay_band}
                                    touched={touched.pay_band}
                                    label="Pay Band*"
                                    name="pay_band"
                                    placeholder={"Enter Pay Band"}
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.grade_pay}
                                    error={errors.grade_pay}
                                    touched={touched.grade_pay}
                                    label="Grade Pay*"
                                    name="grade_pay"
                                    placeholder={"Enter Grade Pay"}
                                />
                            </div>

                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.doc}
                                label="Date of Confirmation"
                                name="doc"
                                placeholder={"Enter Date of Confirmation"}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.basic_pay}
                                error={errors.basic_pay}
                                touched={touched.basic_pay}
                                label="Basic Pay*"
                                name="basic_pay"
                                placeholder={"Enter Basic Pay"}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.conf_order_number}
                                label="Confirmation Order Number"
                                name="conf_order_number"
                                placeholder={"Enter Confirmation Order Number"}
                            />
                            <SelectForNoApi
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.deduction_type}
                                error={errors.deduction_type}
                                touched={touched.deduction_type}
                                label="Deduction Type(GPF/CPS)*"
                                name="deduction_type"
                                placeholder={"Please Select"}
                                options={[
                                    { id: 1, name: "deduction 1" },
                                    { id: 2, name: "deduction 2" },
                                ]}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.conf_order_date}
                                label="Confirmation Order Date"
                                name="conf_order_date"
                                placeholder={"Enter Confirmation Order Date"}
                            />

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                    Member of GIS or not
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="flex items-center">
                                        <input
                                            onChange={() => updateGisOrder('yes')}
                                            checked={gisOrder === 'yes'}
                                            className={`mr-1 bg-white checkbox border border-zinc-500`}
                                            id="yes"
                                            name={"confirmation_order"}
                                            type="checkbox"
                                        />
                                        <label htmlFor="yes">Yes</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            onChange={() => updateGisOrder('no')}
                                            checked={gisOrder === 'no'}
                                            className={`mr-1 bg-white checkbox border border-zinc-500`}
                                            id="no"
                                            name={"confirmation_order"}
                                            type="checkbox"
                                        />
                                        <label htmlFor="no">No</label>
                                    </div>
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
                                    { id: 1, name: "authority 1" },
                                    { id: 2, name: "authority 2" },
                                ]}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.gis_account}
                                label="GIS Account No"
                                name="gis_account"
                                placeholder={"Enter GIS Account No."}
                            />
                            <SelectForNoApi
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.ulb}
                                label="Whether deputed to ULB"
                                name="ulb"
                                placeholder={"Please Select"}
                                options={[
                                    { id: 1, name: "ulb 1" },
                                    { id: 2, name: "ulb 2" },
                                ]}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.last_inc_order}
                                label="Last Increment Order No."
                                name="last_inc_order"
                                placeholder={"Enter Last Increment Order No."}
                                type="date"
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name_of_service}
                                label="Name Of Service at the time of joining"
                                name="name_of_service"
                                placeholder={"Enter Name Of Service at the time of joining"}
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
                                value={values.bank_name}
                                label="Bank Name"
                                name="bank_name"
                                placeholder={"Enter Bank Name"}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.wef_date}
                                label="WEF date"
                                name="wef_date"
                                type="date"
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
                                    { id: 1, name: "pf 1" },
                                    { id: 2, name: "pf 2" },
                                ]}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.acc_number}
                                label="Account Number"
                                name="acc_number"
                                placeholder={"Enter Account Number"}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.ifsc}
                                label="IFSC Code"
                                name="ifsc"
                                placeholder={"Enter IFSC Code"}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sen_grade_list}
                                label="Employee fall under, Seniority in gradation list"
                                name="sen_grade_list"
                                placeholder={"Enter if Seniority in gradation list"}
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
}

export default EmpInitialJoinDetails