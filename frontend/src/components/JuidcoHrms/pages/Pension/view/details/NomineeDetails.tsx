/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'
import { bufferToBase64 } from '../../PensionList/Form/Nominee'

export default function PenNomineeDetails(props: any) {

    const { ref, singleImg, jointImg } = props
    const data = props?.data?.data

    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral text-black">
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
            <div className='flex flex-row gap-4 mt-4'>
                {singleImg && (
                    <Image
                        src={`data:${singleImg?.mimeType};base64,${bufferToBase64(singleImg?.buffer?.data)}`}
                        alt="single"
                        width={100}
                        height={70}
                        className="m-3"
                    />
                )}

                {jointImg && (
                    < Image
                        src={`data:${jointImg?.mimeType};base64,${bufferToBase64(jointImg?.buffer?.data)}`}
                        alt="joint"
                        width={100}
                        height={70}
                        className="m-3"
                    />
                )}
            </div>
        </div>
    )
}
