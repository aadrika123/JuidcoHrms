/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import dateConvertor from '@/utils/formatter/dateFormatter';

export default function NominationForUnpaidAmount(props: any) {

    const { ref } = props
    const data = props?.data

    const trimIfNeeded = (string: string): string => {
        return string.length > 25 ? string.slice(0, 25) + "..." : string;
    }

    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Nomination for unpaid amount</b></h5>
            <div className="divider divider-neutral"></div>
            <div className={`flex flex-row justify-between gap-10`}>
                <div className={`flex flex-row justify-between w-full`}>
                    <div className="flex flex-col justify-between">
                        <p><b>Home Address of Nominee : </b></p>
                        <p><b>Age : </b></p>
                        <p><b>Date this : </b></p>
                        <p><b>At Place : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.emp_basic_details?.emp_name || 'N/A'}</p>
                        <p>{trimIfNeeded(data?.emp_join_details?.designation?.name || 'N/A')}</p>
                        <p>{data?.emp_address_details?.address_primary || 'N/A'}</p>
                        <p>{dateConvertor(data?.emp_basic_details?.dob) || 'N/A'}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Relationship with the corporation Employee : </b></p>
                        <p><b>Remarks : </b></p>
                        <p><b>Day of : </b></p>
                        <p>&nbsp;</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{trimIfNeeded(data?.emp_join_details?.department?.name || 'N/A')}</p>
                        <p>{'N/A'}</p>
                        <p>{trimIfNeeded(data?.emp_join_details?.department?.name || 'N/A')}</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
