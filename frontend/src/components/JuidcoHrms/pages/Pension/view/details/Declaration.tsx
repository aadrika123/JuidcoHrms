/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import dateConvertor from '@/utils/formatter/dateFormatter';

export default function Declaration(props: any) {

    const { ref } = props
    const data = props?.data
    const empPension = props?.empPension

    const trimIfNeeded = (string: string): string => {
        return string.length > 25 ? string.slice(0, 25) + "..." : string;

    }


    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Declaration to the Chief Account Officer</b></h5>
            <div className="divider divider-neutral"></div>
            <div className={`flex flex-row justify-between gap-10`}>
                <div className={`flex flex-row justify-between w-full`}>
                    <div className="flex flex-col justify-between">
                        <p><b>Name of Pensioner : </b></p>
                        <p><b>Name of Post from which he retired : </b></p>
                        <p><b>Amount : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{trimIfNeeded(data?.emp_basic_details?.emp_name || 'N/A')}</p>
                        <p>{trimIfNeeded(data?.emp_join_details?.designation?.name || 'N/A')}</p>
                        <p>{empPension?.pension_amnt || 0}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Guardian name : </b></p>
                        <p><b>DOB : </b></p>
                        <p><b>Full permanent address : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{trimIfNeeded(empPension?.guardian_name || 'N/A')}</p>
                        <p>{dateConvertor(data?.emp_basic_details?.dob) || 'N/A'}</p>
                        <p>{trimIfNeeded(data?.emp_address_details?.address_primary || 'N/A')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
