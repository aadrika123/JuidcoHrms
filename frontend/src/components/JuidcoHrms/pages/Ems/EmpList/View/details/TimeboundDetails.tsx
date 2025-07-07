import React from 'react'
import dateConvertor from '@/utils/formatter/dateFormatter'

export default function TimeboundDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Timebound Details</b></h5>
            <div className="divider divider-neutral"></div>
            {data?.map((item: any, index: number) => (
                <div key={index}>
                    <h6 className="text-lg mb-5"><b><u>Pay Scale</u></b></h6>
                    <div className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-4' : ''}`}>
                        <div className={`flex flex-row justify-between w-full`}>
                            <div className="flex flex-col justify-between">
                                <p><b>From : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.pay_scale?.from || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col justify-between">
                                <p><b>To : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.pay_scale?.to || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-row justify-between gap-10 mt-5`}>
                        <div className={`flex flex-row justify-between w-full`}>
                            <div className="flex flex-col justify-between">
                                <p><b>Increment Amount : </b></p>
                                <p><b>Vide Order No. : </b></p>
                                <p><b>Remarks : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.inc_amt || 'N/A'}</p>
                                <p>{item?.vide_order_no || 'N/A'}</p>
                                <p>{item?.remarks || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col justify-between">
                                <p><b>Basic Pay After Inc. : </b></p>
                                <p><b>Vide Order Date : </b></p>
                                <p>&nbsp;</p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.b_after_pay || 'N/A'}</p>
                                <p>{dateConvertor(item?.vide_order_date) || 'N/A'}</p>
                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
