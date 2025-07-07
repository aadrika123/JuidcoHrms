import React from 'react'

export default function NomineeDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Nominee Details</b></h5>
            <div className="divider divider-neutral"></div>
            {data?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-5' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Nominee Name : </b></p>
                            <p><b>Percentage : </b></p>
                            <p><b>Minor : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.nominee_name || 'N/A'}</p>
                            <p>{item?.percentage || 'N/A'}</p>
                            <p>{item?.minor || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <p><b>Relation : </b></p>
                            <p><b>Address : </b></p>
                            <p>&nbsp;</p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.relation || 'N/A'}</p>
                            <p>{item?.address || 'N/A'}</p>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
