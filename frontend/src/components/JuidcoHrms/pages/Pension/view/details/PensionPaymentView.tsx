/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import dateConvertor from '@/utils/formatter/dateFormatter';

export default function PensionPayment(props: any) {

    const { ref } = props
    const data = props?.data


    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Pension Payment</b></h5>
            <div className="divider divider-neutral"></div>
            <div className={`flex flex-row justify-between gap-10`}>
                <div className={`flex flex-row justify-between w-full`}>
                    <div className="flex flex-col justify-between">
                        <p><b>Pension Payment order No. : </b></p>
                        <p><b>Net Amount : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.payment_order_no || 'N/A'}</p>
                        <p>{data?.pension_amnt || 'N/A'}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Date of Pension : </b></p>
                        <p>&nbsp;</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{dateConvertor(data?.last_working_day) || 'N/A'}</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
