/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import dateConvertor from '@/utils/formatter/dateFormatter';

export default function CalcSheet(props: any) {

    const [serviceLength, setServiceLength] = useState<number>(0);
    const [empGrossHalf, setEmpGrossHalf] = useState<number>(0);
    const { ref } = props
    const data = props?.data
    const empPension = props?.empPension
    const payroll = props?.payroll

    useEffect(() => {
        if (data) {
            const length = new Date(data?.last_working_day).getFullYear() - new Date(data?.emp_join_details.doj).getFullYear()
            setServiceLength(Math.abs(length))
        }
    }, [data]);

    const last_pay_drawn: number =
        Number(data?.emp_join_details?.basic_pay) +
        Number(data?.emp_join_details?.grade_pay);

    useEffect(() => {
        if (Array.isArray(payroll)) {
            setEmpGrossHalf((payroll[0]?.gross_pay * 50) / 100)
        }
    }, [payroll]);


    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Calculations sheet of pensioner and family pension</b></h5>
            <div className="divider divider-neutral"></div>
            <div className={`flex flex-row justify-between gap-10`}>
                <div className={`flex flex-row justify-between w-full`}>
                    <div className="flex flex-col justify-between">
                        <p><b>Date of Appointmentt : </b></p>
                        <p><b>Total Length Service in year(s) : </b></p>
                        <p><b>Pension admissible : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{dateConvertor(data?.emp_join_details?.doj) || 'N/A'}</p>
                        <p>{serviceLength || 'N/A'}</p>
                        <p>{empPension?.family_pension_amnt || 0}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Date of retirement / death : </b></p>
                        <p><b>Last Pay Drawn : </b></p>
                        <p><b>50 % of last Gross pay : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{dateConvertor(data?.last_working_day) || 'N/A'}</p>
                        <p>{last_pay_drawn || 'N/A'}</p>
                        <p>{empGrossHalf || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
