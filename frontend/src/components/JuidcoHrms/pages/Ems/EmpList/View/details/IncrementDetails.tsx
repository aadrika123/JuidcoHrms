import React from 'react'

export default function IncrementDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Increment Details</b></h5>
            <div className="divider divider-neutral"></div>
            {data?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-5' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Scale : </b></p>
                            <p><b>Increment Amount : </b></p>
                            <p><b>Vide Order No. : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.scale || 'N/A'}</p>
                            <p>{item?.inc_amount || 'N/A'}</p>
                            <p>{item?.vide_order_no || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <p><b>Increment Date : </b></p>
                            <p><b>Basic Pay After Increment : </b></p>
                            <p><b>Vide Order Date : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.inc_date || 'N/A'}</p>
                            <p>{item?.basic_pay_after_inc || 'N/A'}</p>
                            <p>{item?.vide_order_date || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
