/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'

export default function SignatureView(props: any) {

    const { ref } = props
    const data = props?.data

    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral">
            <h5 className="text-xl"><b>Signature Details</b></h5>
            <div className="divider divider-neutral"></div>

            <div className='flex flex-row gap-4 mt-4 flex-wrap'>
                {data?.signature_doc_1 && (
                    <div className='flex flex-col items-center justify-end h-full'>
                        <Image
                            src={data?.signature_doc_1}
                            alt="single"
                            width={100}
                            height={70}
                            className="m-3"
                        />
                        <p>Signature 1</p>
                    </div>
                )}

                {data?.signature_doc_2 && (
                    <div className='flex flex-col items-center justify-end h-full'>
                        <Image
                            src={data?.signature_doc_2}
                            alt="single"
                            width={100}
                            height={70}
                            className="m-3"
                        />
                        <p>Signature 2</p>
                    </div>
                )}

                {data?.signature_doc_3 && (
                    <div className='flex flex-col items-center justify-end h-full'>
                        <Image
                            src={data?.signature_doc_3}
                            alt="single"
                            width={100}
                            height={70}
                            className="m-3"
                        />
                        <p>Signature 3</p>
                    </div>
                )}

                {data?.photo_doc_1 && (
                    <div className='flex flex-col items-center justify-end h-full'>
                        <Image
                            src={data?.photo_doc_1}
                            alt="single"
                            width={100}
                            height={70}
                            className="m-3"
                        />
                        <p>Photo 1</p>
                    </div>
                )}

                {data?.photo_doc_2 && (
                    <div className='flex flex-col items-center justify-end h-full'>
                        <Image
                            src={data?.photo_doc_2}
                            alt="single"
                            width={100}
                            height={70}
                            className="m-3"
                        />
                        <p>Photo 2</p>
                    </div>
                )}

                {data?.photo_doc_3 && (
                    <div className='flex flex-col items-center justify-end h-full'>
                        <Image
                            src={data?.photo_doc_3}
                            alt="single"
                            width={100}
                            height={70}
                            className="m-3"
                        />
                        <p>Photo 3</p>
                    </div>
                )}
            </div>
        </div>
    )
}
