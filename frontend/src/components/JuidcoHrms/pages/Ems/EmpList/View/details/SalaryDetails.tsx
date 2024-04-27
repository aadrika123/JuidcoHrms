import React from 'react'

export default function SalaryDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4">
            <h5 className="text-xl"><b>Salary Details</b></h5>
            <div className="divider"></div>
            <h6 className="text-lg mb-5"><b><u>Allowances</u></b></h6>
            {data?.emp_salary_allow?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-4' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Name : </b></p>
                            <p><b>WFE Date : </b></p>
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
            ))}
            <h6 className="text-lg my-5"><b><u>Deductions</u></b></h6>
            {data?.emp_salary_deduction?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-4' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Name : </b></p>
                            <p><b>WFE Date : </b></p>
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
            ))}
        </div>
    )
}
