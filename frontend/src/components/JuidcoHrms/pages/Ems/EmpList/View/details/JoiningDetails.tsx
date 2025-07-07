import React from 'react'

export default function JoiningDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Joining Details</b></h5>
            <div className="divider divider-neutral"></div>
            <div className="flex flex-row justify-between gap-10">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Department : </b></p>
                        <p><b>Date of Joining : </b></p>
                        <p><b>Grade Pay : </b></p>
                        <p><b>Pay Band : </b></p>
                        <p><b>Account No. : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.department?.name || 'N/A'}</p>
                        <p>{data?.doj || 'N/A'}</p>
                        <p>{data?.grade_pay || 'N/A'}</p>
                        <p>{data?.pay_band || 'N/A'}</p>
                        <p>{data?.acc_number || 'N/A'}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Designation : </b></p>
                        <p><b>Effective Pay Commission : </b></p>
                        <p><b>Basic Pay : </b></p>
                        <p><b>Pay Scale : </b></p>
                        <p><b>IFSC : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.designation?.name || 'N/A'}</p>
                        <p>{data?.effective_pay_commision || 'N/A'}</p>
                        <p>{data?.basic_pay || 'N/A'}</p>
                        <p>{data?.pay_scale || 'N/A'}</p>
                        <p>{data?.ifsc || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
