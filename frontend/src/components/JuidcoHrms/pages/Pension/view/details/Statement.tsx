/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export default function Statement(props: any) {

    const { ref } = props
    const data = props?.data?.data

    function getMonthName(monthNumber: number) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Ensure the month number is between 1 and 12
        if (monthNumber < 1 || monthNumber > 12) {
            return "Invalid month number";
        }

        // Return the month name (subtract 1 because array is 0-indexed)
        return monthNames[monthNumber - 1];
    }

    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral">
            <h5 className="text-xl"><b>Payroll Details</b></h5>
            <div className="divider divider-neutral"></div>
            {data?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-5' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Month : </b></p>
                            <p><b>No of days : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{getMonthName(item?.month) || 'N/A'}</p>
                            <p>{item?.present_days || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <p><b>Year : </b></p>
                            <p><b>Rs. : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.year || 'N/A'}</p>
                            <p>{item?.net_pay || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
