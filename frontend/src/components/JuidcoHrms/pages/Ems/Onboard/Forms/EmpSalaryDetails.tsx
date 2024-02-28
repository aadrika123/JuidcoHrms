"use client"
import TableFormContainer from '@/components/global/organisms/TableFormContainer'
import React, { useState } from 'react'
import { EmployeeDetailsProps, EmployeeEducationDetailsType } from '@/utils/types/employee.type';
import { COLUMNS } from '@/components/global/organisms/TableFormContainer';
import PrimaryButton from '@/components/Helpers/Button';
import goBack from "@/utils/helper";


const EmpSalaryDetails: React.FC<
    EmployeeDetailsProps<EmployeeEducationDetailsType>
> = (props) => {

    const [tabIndex, setTabIndex] = useState<number>(1);

    const [employeeTrainingDetails, setEmployeeTrainingDetails] = useState([]);


    const COLUMNS_FOR_SLRY_INFRM_INFRM: COLUMNS[] = [
        {
            HEADER: "SL.No.",
            ACCESSOR: "sl_no",
            isRequired: false,
            sl_no: true,
        },
        {
            HEADER: "Name",
            ACCESSOR: "name",
            isRequired: true
        },

        {
            HEADER: "WFE Date",
            ACCESSOR: "wfe_date",
            isRequired: true,
            type: "date",
        },

        {
            HEADER: "Amount in %",
            ACCESSOR: "amount_in",
            isRequired: true
        },
    ];

    const COLUMNS_FOR_SLRY_DEDUCTION_INFRM_INFRM: COLUMNS[] = [
        {
            HEADER: "SL.No.",
            ACCESSOR: "sl_no",
            isRequired: false,
            sl_no: true,
        },
        {
            HEADER: "Name",
            ACCESSOR: "name",
            isRequired: true
        },

        {
            HEADER: "WFE Date",
            ACCESSOR: "wfe_date",
            isRequired: true,
            type: "date",
        },

        {
            HEADER: "A/C No.",
            ACCESSOR: "acnt_no",
            isRequired: true
        },
        {
            HEADER: "Amount in %",
            ACCESSOR: "amount_in",
            isRequired: true
        },
    ];


    function getStateData(key: string, values: any, index?: number) {
        setEmployeeTrainingDetails((prev: any) => ({ ...prev, [key]: values }));
        setTabIndex(index || tabIndex);
    }

    return (
        <div>
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
                        Allowances
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
                        Deductions
                    </label>
                </div>
            </div>

            {tabIndex === 1 &&

                <TableFormContainer columns={COLUMNS_FOR_SLRY_INFRM_INFRM}
                    getData={[]}
                    subHeading={"Employee Salary Information "}
                    setData={getStateData}
                    session_key="emp_salary_details"
                />
            }


            {tabIndex === 2 &&

                <TableFormContainer columns={COLUMNS_FOR_SLRY_DEDUCTION_INFRM_INFRM}
                    getData={[]}
                    subHeading={"Employee  Information "}
                    setData={getStateData}
                    session_key="emp_salary_details"
                />
            }
            <div className="flex items-center justify-end mt-5 gap-5">
                <PrimaryButton
                    buttonType="button"
                    variant={"cancel"}
                    onClick={goBack}
                >
                    Back
                </PrimaryButton>

                {/* <PrimaryButton
                    onClick={handleReset}
                    buttonType="button"
                    variant={"cancel"}
                >
                    Reset
                </PrimaryButton> */}

                <PrimaryButton buttonType="submit" variant="primary">
                    Next
                </PrimaryButton>
            </div>
        </div>

    )
}

export default EmpSalaryDetails