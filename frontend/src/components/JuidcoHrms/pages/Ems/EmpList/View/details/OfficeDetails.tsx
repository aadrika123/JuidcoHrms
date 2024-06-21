import React from 'react'

export default function OfficeDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4 border-neutral">
            <h5 className="text-xl"><b>Office Details</b></h5>
            <div className="divider divider-neutral"></div>
            <div className="flex flex-row justify-between gap-10">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Office Name : </b></p>
                        <p><b>DDO Code : </b></p>
                        <p><b>District : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.office_name || 'N/A'}</p>
                        <p>{data?.ddo_code || 'N/A'}</p>
                        <p>{data?.district?.name || 'N/A'}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Office Code : </b></p>
                        <p><b>DDO Designation : </b></p>
                        <p>&nbsp;</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.office_code || 'N/A'}</p>
                        <p>{data?.ddo_designation || 'N/A'}</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
