/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import dateConvertor from '@/utils/formatter/dateFormatter';

export default function DeclarationOfRefund(props: any) {

    const { ref } = props
    const data = props?.data

    const trimIfNeeded = (string: string): string => {
        return string.length > 25 ? string.slice(0, 25) + "..." : string;

    }

    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Declaration of Refund</b></h5>
            <div className="divider divider-neutral"></div>
            <div className={`flex flex-row justify-between gap-10`}>
                <div className={`flex flex-row justify-between w-full`}>
                    <div className="flex flex-col justify-between">
                        <p><b>Name : </b></p>
                        <p><b>Designation : </b></p>
                        <p><b>Present Address : </b></p>
                        <p><b>Date of Birth : </b></p>
                        <p><b>Retiring from service : </b></p>
                        <p><b>Last Pay Drawn : </b></p>
                        <p><b>Mark Of Identification : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.emp_basic_details?.emp_name || 'N/A'}</p>
                        <p>{trimIfNeeded(data?.emp_join_details?.designation?.name || 'N/A')}</p>
                        <p>{data?.emp_address_details?.address_primary || 'N/A'}</p>
                        <p>{dateConvertor(data?.emp_basic_details?.dob) || 'N/A'}</p>
                        <p>{dateConvertor(data?.last_working_day) || 'N/A'}</p>
                        <p>{(data?.emp_join_details?.basic_pay + data?.emp_join_details?.grade_pay) || 'N/A'}</p>
                        <p>{trimIfNeeded(data?.emp_personal_details?.identification_marks || 'N/A')}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Parent Department : </b></p>
                        <p><b>{`Father's Name / Husband's Name`} : </b></p>
                        <p><b>Department : </b></p>
                        <p><b>Permanent Address : </b></p>
                        <p><b>Date of Joining Service : </b></p>
                        <p><b>Cause of leaving service : </b></p>
                        <p>&nbsp;</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{trimIfNeeded(data?.emp_join_details?.department?.name || 'N/A')}</p>
                        <p>{'N/A'}</p>
                        <p>{trimIfNeeded(data?.emp_join_details?.department?.name || 'N/A')}</p>
                        <p>{trimIfNeeded(data?.emp_address_details?.address_primary_permanent || 'N/A')}</p>
                        <p>{dateConvertor(data?.emp_join_details?.doj) || 'N/A'}</p>
                        <p>{'Retirement'}</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
