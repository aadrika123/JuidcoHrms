"use client";

import React, { useState } from 'react'
import { SubHeading } from '@/components/Helpers/Heading'
import { EmployeeLoanDetailsType, EmployeeDetailsProps } from '@/utils/types/employee.type';
import { initialEmployeeLoanDetails } from '@/utils/validation/Ems/ems.validation';
import { Formik } from 'formik';
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

const EmpLoanDetails: React.FC<
    EmployeeDetailsProps<EmployeeLoanDetailsType>
> = (props) => {
    const pathName = usePathname();
    const router = useRouter();

    const handleSubmitFormik = (
        values: EmployeeLoanDetailsType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        if (typeof window !== "undefined") {
            const formData = { ...values };

            sessionStorage.setItem("emp_join_details", JSON.stringify(formData));
            setSubmitting(false);

            if (props.setData) {
                props.setData("emp_join_details", formData);
            }
            router.push(`${pathName}?page=7`);
        }
    };

    const initialValues =
        typeof window !== "undefined"
            ? sessionStorage.getItem("emp_join_details")
                ? JSON.parse(sessionStorage.getItem("emp_join_details") ?? "{}")
                : initialEmployeeLoanDetails
            : initialEmployeeLoanDetails;

    const [tabIndex, setTabIndex] = useState<number>(1);
    const [innerTabIndex, setInnerTabIndex] = useState<number>(1);

    const [additionalForms, setAdditionalForms] = useState<Array<number>>([1]);
    const [additionalForms2, setAdditionalForms2] = useState<Array<number>>([1]);

    const handleAddMore = () => {
        setAdditionalForms((prevForms) => [...prevForms, prevForms.length + 1]);
    };

    const handleAddMoreRecovery = () => {
        setAdditionalForms2((prevForms) => [...prevForms, prevForms.length + 1]);
    };

    return (
        <>
            <SubHeading className="text-[20px] py-4">
              Employee Loan & Advance Information           
            </SubHeading>

            <Formik
                initialValues={initialValues}
                // validationSchema={employeeJoinValidationSchema}
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
                        <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
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
                                    Loan Details
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
                                    Recovery Details
                                </label>
                            </div>
                        </div>

                        {tabIndex === 1 && additionalForms.map((formIndex, arrayIndex) => (
                            <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 mt-4 ">

                                <SelectForNoApi
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.loan_name}
                                    label="Loan Name"
                                    name="loan_name"
                                    placeholder={"Please Select"}
                                    options={[
                                        { id: 1, name: "loan 1" },
                                        { id: 2, name: "loan 2" },
                                    ]}
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.loan_account_num}
                                    label="Loan Account Number"
                                    placeholder="Enter Loan Account Number"
                                    name="loan_account_num"
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.sanc_order_num}
                                    label="Sanc Order Number"
                                    placeholder="Enter Sanc Order Number"
                                    name="sanc_order_num"
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dos}
                                    label="Date of Sanction"
                                    name="dos"
                                    type='date'
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.san_authority}
                                    label="Sanctioning Authority"
                                    placeholder="Enter Sanctioning Authority"
                                    name="san_authority"
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dod}
                                    label="Date of Disbursement"
                                    name="dod"
                                    type='date'
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dis_treasury_name}
                                    label="Disbursing Treasury Name"
                                    placeholder="Enter Disbursing Treasury Name"
                                    name="dis_treasury_name"
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.voucher_date}
                                    label="Voucher Date"
                                    name="voucher_date"
                                    type='date'
                                />
                                <InputBox
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.treasury_voc_num}
                                    label="Treasury Voucher Number"
                                    placeholder="Enter Treasury Voucher Number"
                                    name="treasury_voc_num"
                                />
                                {arrayIndex === additionalForms.length - 1 && (
                                    <div className="flex items-center justify-end mt-5 gap-5">
                                        <PrimaryButton buttonType="button" onClick={handleAddMore} variant="primary">
                                            +Add More
                                        </PrimaryButton>
                                    </div>
                                )}
                            </div>
                        ))}

                        {tabIndex === 2 && additionalForms2.map((formIndex, arrayIndexRec) => (
                            <>
                                <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
                                    <div className="flex-all-center">
                                        <input
                                            id="principal"
                                            type="radio"
                                            onChange={() => setInnerTabIndex(1)}
                                            name="inner-radio-2"
                                            className="radio border border-zinc-600"
                                            defaultChecked
                                        />
                                        <label htmlFor="principal" className="cursor-pointer">
                                            Principal Component
                                        </label>
                                    </div>

                                    <div className="flex-all-center">
                                        <input
                                            id="recovery"
                                            onChange={() => setInnerTabIndex(2)}
                                            type="radio"
                                            name="inner-radio-2"
                                            className="radio border-zinc-600"
                                        />
                                        <label htmlFor="recovery" className="cursor-pointer">
                                            Recovery Details
                                        </label>
                                    </div>
                                </div>

                                {innerTabIndex === 1 && (
                                    <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">

                                        <SelectForNoApi
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.loan_name_principal}
                                            label="Loan Name"
                                            name="loan_name_principal"
                                            placeholder={"Please Select"}
                                            options={[
                                                { id: 1, name: "loan 1" },
                                                { id: 2, name: "loan 2" },
                                            ]}
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.tot_amt_released}
                                            label="Loan Amount Released (Rs)"
                                            placeholder="Enter Loan Amount Released(Rs)"
                                            name="tot_amt_released"
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.total_install}
                                            label="Total Installment Fixed(Rs)"
                                            placeholder="Enter Total Installment Fixed(Rs)"
                                            name="total_install"
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.monthly_install}
                                            label="Monthly Installment Amount(Rs)"
                                            placeholder="Enter Monthly Installment Amount(Rs)"
                                            name="monthly_install"
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.last_paid_install}
                                            label="Last Paid Installment Number"
                                            placeholder="Last Paid Installment Number"
                                            name="last_paid_install"
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.month_last_install}
                                            label="Month In Which last Installment was paid"
                                            name="month_last_install"
                                            type='date'
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.total_amnt}
                                            label="Total Amount Paid Towards Principal(Rs)"
                                            placeholder="Enter Total Amount Paid Towards Principal(Rs)"
                                            name="total_amnt"
                                        />
                                    </div>
                                )}

                                {innerTabIndex === 2 && (
                                    <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">

                                        <SelectForNoApi
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.loan_name_recovery}
                                            label="Loan Name"
                                            name="loan_name_recovery"
                                            placeholder={"Please Select"}
                                            options={[
                                                { id: 1, name: "loan 1" },
                                                { id: 2, name: "loan 2" },
                                            ]}
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.total_int_amount}
                                            label=" Total Interest Amount To Be Recovered (Rs)"
                                            placeholder="Enter Total Interest Amount To Be Recovered (Rs)"
                                            name="total_int_amount"
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.total_install_recovery}
                                            label="Total No. Of Installments"
                                            placeholder="Enter Total No. Of Installments"
                                            name="total_install_recovery"
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.monthly_install_recovery}
                                            label="Monthly Installment Amount(Rs)"
                                            placeholder="Enter Monthly Installment Amount(Rs)"
                                            name="monthly_install_recovery"
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.last_paid_install_recovery}
                                            label="Last paid Installment Number."
                                            placeholder="Enter Last paid Installment Number."
                                            name="last_paid_install_recovery"
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.month_last_install_recovery}
                                            label="Month In Which last Installment was paid"
                                            placeholder="Enter Month In Which last Installment was paid"
                                            name="month_last_install_recovery"
                                            type='date'
                                        />
                                        <InputBox
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.total_amnt_recovery}
                                            label="Total Amount Paid Towards Interest(Rs)"
                                            placeholder="Enter Total Amount Paid Towards Interest(Rs)"
                                            name="total_amnt_recovery"
                                        />
                                    </div>



                                )}

                                {arrayIndexRec === additionalForms2.length - 1 && (
                                    <div className="flex items-center justify-end mt-5 gap-5">
                                        <PrimaryButton buttonType="button" onClick={handleAddMoreRecovery} variant="primary">
                                            +Add More
                                        </PrimaryButton>
                                    </div>
                                )}
                            </>
                        ))}

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

export default EmpLoanDetails