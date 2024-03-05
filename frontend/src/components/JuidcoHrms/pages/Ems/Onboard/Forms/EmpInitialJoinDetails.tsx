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
            const formData = { ...values };

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
                                    { id: 1, name: "Agriculture Animal Husbandry and Co-operative Department" },
                                    { id: 2, name: "Building Construction Department" },
                                    { id: 3, name: "Cabinet Election Department" },
                                    { id: 4, name: "Cabinet Secretaritat and Vigilance Department" },
                                    { id: 5, name: "Commercial Tax Department" },
                                    { id: 6, name: "Drinking Water and Sanitation Department" },
                                    { id: 7, name: "Energy Department" },
                                    { id: 8, name: "Excise and Prohibition Department" },
                                    { id: 9, name: "Finance Department" },
                                    { id: 10, name: "Food Public Distribution and Consumer Affairs Department" },
                                    { id: 11, name: "Forest Environment and Climate Change Department" },
                                    { id: 12, name: "Governor Secretariat" },
                                    { id: 13, name: "Health Medical Education and Family Welfare Department" },
                                    { id: 14, name: "Higher and Technical Education Department" },
                                    { id: 15, name: "Home Jail and Disaster Management" },
                                    { id: 16, name: "Industries Department" },
                                    { id: 17, name: "Information and Public Relation Department" },
                                    { id: 18, name: "Information Technology and e-Governance Department" },
                                    { id: 19, name: "Labour Employment Training and Skill Development Department" },
                                    { id: 20, name: "Law Department" },
                                    { id: 21, name: "Legisletive Assembly" },
                                    { id: 22, name: "Mines and Geology Department" },
                                    { id: 23, name: "Panchayati Raj Department" },
                                    { id: 24, name: "Personnel Administrative Reforms and Rajbhasha Department" },
                                    { id: 25, name: "Planning and Development Department" },
                                    { id: 26, name: "Revenue Registration and Land Reforms Department" },
                                    { id: 27, name: "Road Construction Department" },
                                    { id: 28, name: "Rural Development Department" },
                                    { id: 29, name: "Rural Works Department" },
                                    { id: 30, name: "School Education and Literacy Department" },
                                    { id: 31, name: "Tourism Art Culture Sports and Youth Afairs Department " },
                                    { id: 32, name: "Transport Department" },
                                    { id: 33, name: "Urban Development and Housing Department" },
                                    { id: 34, name: "Water Resource Department" },
                                    { id: 35, name: "Welfare Department" },
                                    { id: 36, name: "Women Child Development and Social Security Department" },

                                ]}
                            />

                            <SelectForNoApi
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.designation}
                                error={errors.designation}
                                touched={touched.designation}
                                label="Designation*"
                                placeholder="Please Select"
                                name="designation"
                                options={[
                                    { id: 1, name: "Assistant Municipal Commissioner" },
                                    { id: 2, name: "Executive Officer/Special Officer" },
                                    { id: 3, name: "Deputy Municipal Comissioner" },
                                    { id: 4, name: "Additional Municipal Comissioner" },
                                    { id: 5, name: "Junior Engineer(Civil & Mechanical)" },
                                    { id: 6, name: "Assistant Engineer(Civil )/Technical Advisor to the Superitending Engineer" },
                                    { id: 7, name: "Assistant Engineer(Transport/Mechanical)" },
                                    { id: 8, name: "Executive Engineer/Technical Advisor to Chief Engineer" },
                                    { id: 9, name: "Subordinate Engineer" },
                                    { id: 10, name: "Chief City Engineer" },
                                    { id: 11, name: "Junior Engineer(Electrical)" },
                                    { id: 12, name: "Assistant Engineer(Electrical)" },
                                    { id: 13, name: "Pipeline Inspector" },
                                    { id: 14, name: "Street Light Inspector" },
                                    { id: 15, name: "Sub Divisional Clerk/Office - Assistant-cum-Accountant/Accounts Clerk/Accountant -Cum-Computer Operator" },
                                    { id: 16, name: "Accountant -Cum-Cashier/Accountant" },
                                    { id: 17, name: "Assistant Accounts Officer" },
                                    { id: 18, name: "Accounts Officer" },
                                    { id: 19, name: "Chief Accounts Officer" },
                                    { id: 20, name: "Revenue Inspector" },
                                    { id: 21, name: "Assistant Superitendent of Tax" },
                                    { id: 22, name: "Assistant Revenue Officer(Assessment and valuation officer /Tax Superetendant/Assistant Valuation officer Integrated)" },
                                    { id: 23, name: "Chief Assessment and valuation officer" },
                                    { id: 24, name: "Sanitary Supervisor" },
                                    { id: 25, name: "Sanitary and Food Inspector" },
                                    { id: 26, name: "Chief Sanitary Inspector" },
                                    { id: 27, name: "Assistant Public Health Officer" },
                                    { id: 28, name: "Public Health Officer" },
                                    { id: 29, name: "Garden Superitendent" },
                                    { id: 30, name: "Agriculture Officer" },
                                    { id: 31, name: "Horticulture Officer" },
                                    { id: 32, name: "Publicity Assistant" },
                                    { id: 33, name: "Assistant Public Relations Officer" },
                                    { id: 34, name: "Public Relations Officer" },
                                    { id: 35, name: "Legal Assistant" },
                                    { id: 36, name: "Assistant Law Officer" },
                                    { id: 37, name: "Law Officer" },
                                    { id: 38, name: "Veterinary Assistant" },
                                    { id: 39, name: "Medical Assistant" },
                                    { id: 40, name: "Veterinary Officer" },
                                    { id: 41, name: "Medical Practitioner" },
                                    { id: 42, name: "Sub Divisional Clerk/Office - Assistant-cum-Computer Operator/ Accounts Clerk -Cum-Computer Operator" },
                                    { id: 43, name: "Branch Officer" },
                                    { id: 44, name: "Real Estate Officer" },
                                    { id: 45, name: "Office Superitendent" },
                                    { id: 46, name: "Administrative Officer" },
                                    { id: 47, name: "Stenographer Assistant" },
                                    { id: 48, name: "Personal Assistant" },
                                    { id: 49, name: "Private Secretary" },
                                    { id: 50, name: "Planning Assistant" },
                                    { id: 51, name: "Municipal Commissioner" },
                                    { id: 52, name: "project manager" },
                                    { id: 53, name: "project manager consultant" },
                                    { id: 54, name: "Deputy Project Manager" },
                                    { id: 55, name: "Assistant Project Manager" },
                                    { id: 56, name: "Deputy General Manager" },
                                    { id: 57, name: "General Manager" },
                                    { id: 58, name: "Drawing & Disbursing Officer" },
                                    { id: 59, name: "Chief Secretary (IAS)" },
                                    { id: 60, name: "Director" },
                                    { id: 61, name: "Deputy Executive Officer" },
                                    { id: 62, name: "SMM Financial Inclusion & Micro Enterprises" },
                                    { id: 63, name: "SMM MIS & ME" },
                                    { id: 64, name: "SMM Skills & Livelihood" },
                                    { id: 65, name: "SMM Social Development & Infrastructure" },
                                    { id: 66, name: "CMM Financial Inclusion" },
                                    { id: 67, name: "CMM MIS & ME" },
                                    { id: 68, name: "CMM Skills & Livelihood" },
                                    { id: 69, name: "CMM Social Development & Infrastructure" },
                                    { id: 70, name: "Principal Assistant" },
                                    { id: 71, name: "Assistant" },
                                    { id: 72, name: "Tax Inspector" },
                                    { id: 73, name: "PEON" },
                                    { id: 74, name: "City Manager" },
                                    { id: 75, name: "Community Organizer" },
                                    { id: 76, name: "Programmer" },
                                    { id: 77, name: "Computer Operator" },
                                    { id: 78, name: "Water Tax Collector" },
                                    { id: 79, name: "Candidate" },
                                    { id: 80, name: "Candidate CO" },
                                    { id: 81, name: "SMM – Shelters and Social Infrastructure" },
                                    { id: 82, name: "SMM – Social Mobilization & Institutional Development" },
                                    { id: 83, name: "SMM – HR & Capacity Building" },
                                    { id: 84, name: "Accountant" },
                                    { id: 85, name: "Computer Operator Cum Assistant" },
                                    { id: 86, name: "Sweeper" },
                                    { id: 87, name: "Night Guard" },
                                    { id: 88, name: "Driver" },
                                    { id: 89, name: "Electrician" },
                                    { id: 90, name: "Assistant Electrician" },
                                    { id: 91, name: "JCB Operator Cum Driver" },
                                    { id: 92, name: "Accounts Clerk Cum Computer Operator" },
                                    { id: 93, name: "Plumber" },
                                    { id: 94, name: "Chairman" },
                                    { id: 95, name: "Dy Chairman" },
                                    { id: 96, name: "Section Officer" },
                                    { id: 97, name: "Ward Zamadar" },
                                    { id: 98, name: "Deputy Municipal Corporation" },
                                    { id: 99, name: "Chief Engineer" },
                                    { id: 100, name: "Executive Engineer" },
                                    { id: 101, name: "Sanitary Inspector In Charge" },
                                    { id: 102, name: "Social Development Specialist" },
                                    { id: 103, name: "Labour" },
                                    { id: 104, name: "WORK SARKAR" },
                                    { id: 105, name: "Light Inspector" },
                                    { id: 106, name: "ROAD MAT" },
                                    { id: 107, name: "Tubewel Mechanic" },
                                    { id: 108, name: "MIS Specialist" },
                                    { id: 109, name: "GIS Specialist" },
                                    { id: 110, name: "Town Planning Specialist" },
                                    { id: 111, name: "Project Engineering Specialist" },
                                    { id: 112, name: "Tax Daroga" },
                                    { id: 113, name: "Joint Secretery" },
                                    { id: 114, name: "Deputy Secretery" },
                                    { id: 115, name: "Town Planner" },
                                    { id: 116, name: "Assistant Director" },
                                    { id: 117, name: "Accountant" },
                                ]}
                            />
                            {/* <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.designation}
                                error={errors.designation}
                                touched={touched.designation}
                                label="Designation*"
                                placeholder="Enter Designation"
                                name="designation"
                            /> */}
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
                                    { id: 1, name: "Gazette" },
                                    { id: 2, name: "Non-Gazette" },
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
                                    { id: 1, name: "1" },
                                    { id: 2, name: "2" },
                                    { id: 3, name: "3" },
                                    { id: 4, name: "4" },
                                    { id: 5, name: "5" },
                                    { id: 6, name: "6" },
                                    { id: 7, name: "7" },
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
                                    type="number"
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
                                    type="number"

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
                                    type="number"

                                />
                            </div>

                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.doc}
                                label="Date of Confirmation"
                                name="doc"
                                placeholder={"Enter Date of Confirmation"}
                                type='date'
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
                                type='number'

                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.conf_order_number}
                                label="Confirmation Order Number"
                                name="conf_order_number"
                                placeholder={"Enter Confirmation Order Number"}
                                type='number'
                            />

                            <SelectForNoApi
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.deduction_type}
                                error={errors.deduction_type}
                                touched={touched.deduction_type}
                                label="Deduction Type*"
                                name="deduction_type"
                                placeholder={"Please Select"}
                                options={[
                                    { id: 1, name: "GPF" },
                                    { id: 2, name: "CPS" },
                                ]}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.conf_order_date}
                                label="Confirmation Order Date"
                                name="conf_order_date"
                                placeholder={"Enter Confirmation Order Date"}
                                type="date"

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

                                {gisOrder === 'yes' && (
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
                            {/* <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.gis_account}
                                label="GIS Account No"
                                name="gis_account"
                                placeholder={"Enter GIS Account No."}
                                type="number"

                            /> */}
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
                                    { id: 1, name: "EPF" },
                                    { id: 2, name: "GPF" },
                                    { id: 3, name: "VPF" },
                                    { id: 4, name: "NPS" },
                                    { id: 5, name: "PPF" },
                                ]}
                            />
                            <InputBox
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.acc_number}
                                label="Account Number"
                                name="acc_number"
                                placeholder={"Enter Account Number"}
                                type='number'
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