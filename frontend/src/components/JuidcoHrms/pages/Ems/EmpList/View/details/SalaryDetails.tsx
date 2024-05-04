import React from 'react'

export default function SalaryDetails(props: any) {

    const { data } = props

    const allowanceFullForm = (name: string) => {
        switch (name) {
            case 'DA':
                return 'Dearness Allowance'
            case 'HRA':
                return 'House Rent Allowance'
            case 'DP(A)':
                return 'Dearness Pay'
            case 'IR(A)':
                return 'Interim Relief'
            case 'IA(A)':
                return 'Interim Allowance'
            case 'CA(A)':
                return 'Conveyance Allowance'
            case 'SP(A)':
                return 'Special Allowance'
            case 'MA(A)':
                return 'Medical Allowance'
            case 'SA(A)':
                return 'Statutory Allowance'
            default:
                return name
        }
    }

    const deductionFullForm = (name: string) => {
        switch (name) {
            case 'GPF':
                return 'Government Provident Fund'
            case 'EPF':
                return 'Employee Provident Fund'
            case 'PT':
                return 'Professional Tax'
            case 'IT':
                return 'Tax Deduction at Source'
            case 'Vol EPF(A)':
                return 'voluntary Employee Provident Fund'
            case 'ESIC':
                return "Employees' State Insurance Corporation"
            default:
                return name
        }
    }


    return (
        <div className="rounded border-2 p-4">
            <h5 className="text-xl"><b>Salary Details</b></h5>
            <div className="divider"></div>
            <h6 className="text-lg mb-5 "><b><u>Allowances</u></b></h6>
            {/* {data?.emp_salary_allow?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-4' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Name : </b></p>
                            <p><b>WEF Date : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.name || 'N/A'}</p>
                            <p>{item?.wfe_date || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <p><b>Amount : </b></p>
                            <p>&nbsp;</p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.amount_in || 'N/A'}</p>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            ))} */}
            {data?.emp_salary_allow?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-4' : ''}`}>
                    <div className={`flex flex-row justify-between w-full gap-20`}>
                        <div className=' flex-1'>
                            <p><b>{allowanceFullForm(item?.name) || 'N/A'}</b></p>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-row justify-between flex-1">
                            <p><b>WEF Date : </b></p>
                            <p>{item?.wfe_date || 'N/A'}</p>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-row justify-between flex-1">
                            <p><b>Amount : </b></p>
                            <p>{item?.amount_in || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="divider"></div>
            <h6 className="text-lg my-5"><b><u>Deductions</u></b></h6>
            {data?.emp_salary_deduction?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-4' : ''}`}>
                    <div className={`flex flex-row justify-between w-full gap-20`}>
                        <div className="flex-1">
                            <p><b>{deductionFullForm(item?.name) || 'N/A'}</b></p>
                        </div>
                        <div className="divider divider-horizontal divider-"></div>
                        <div className="flex flex-row justify-between flex-1">
                            <p><b>WEF Date : </b></p>
                            <p>{item?.wfe_date || 'N/A'}</p>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-row justify-between flex-1">
                            <p><b>Amount : </b></p>
                            <p>{item?.amount_in || 'N/A'}</p>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}
