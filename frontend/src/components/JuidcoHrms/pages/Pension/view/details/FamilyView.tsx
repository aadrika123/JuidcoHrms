/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export default function FamilyView(props: any) {

    const { ref } = props
    const data = props?.data?.data

    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral">
            <h5 className="text-xl"><b>Family Details</b></h5>
            <div className="divider divider-neutral"></div>
            {data?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-5' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Name : </b></p>
                            <p><b>DOB : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.name || 'N/A'}</p>
                            <p>{item?.dob || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <p><b>Relation : </b></p>
                            <p><b>Dependent : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.relation || 'N/A'}</p>
                            <p>{item?.dependent || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
