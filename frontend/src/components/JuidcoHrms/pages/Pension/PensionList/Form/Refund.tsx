"use client";

import React from "react";

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

interface RefundProps {
    onNext: () => void;
}

const Refund: React.FC<RefundProps> = ({ onNext }) => {
    const pathName = usePathname();
    const router = useRouter();
    const empType = useSearchParams();

    const handleSubmitFormik = () => {
        router.push(`${pathName}?page=3`);
        onNext();
    }

    const initialValues = {
        emp_name: "",
    }


    return (
        <>
            

            <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 pb-30 pt-20 shadow-md">

                <SubHeading className="text-[20px] py-4">Declaration for Refund</SubHeading>
                <Formik
                    initialValues={initialValues}
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
                            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Name of the Employee"
                                    name="emp_name"

                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Parent Department"
                                    name="emp_name"

                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Designation"
                                    name="emp_name"

                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Father's Name / Husband's Name"
                                    name="emp_name"

                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Present Address"
                                    name="emp_name"

                                />


                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Name of Department under working"
                                    name="emp_name"

                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Date of Birth"
                                    name="emp_name"

                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Permanent Address"
                                    name="emp_name"
                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Date of Joining Service / Retiring for from service"
                                    name="emp_name"
                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Date of Joining Service"
                                    name="emp_name"
                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Last Pay Drawn: Basic Pay + Grade Pay"
                                    name="emp_name"
                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Cause of leaving service"
                                    name="emp_name"
                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="OTP verification from employee"
                                    name="emp_name"
                                />

                                <InputBox
                                    onChange={handleChange}
                                    value={values.emp_name}
                                    label="Mark Of Identification"
                                    name="emp_name"
                                />


                            </div>
                            <div className="mt-5">
                                <input type="checkbox" /> Declaration*
                                <br></br>

                                <div className='mt-5'>
                                    To Whomever it will be concerned
                                    <br></br>
                                    <br></br>
                                    Where the Municipal Commissioner /Standing Committee of__ has consented to grant me the sum of Rs._____per month as to amount of my pension with effect from ____ I here by acknowledge that in subject to revision ,if the same being found to be in excess of that to which I am entitled under the rules , and I promise to raise no objection to such revision,I further promise to refund amount paid to me in excess of that to which I may be eventually found entitled.
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
            </div>
        </>
    );
};

export default Refund;