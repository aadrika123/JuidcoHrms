import React from 'react'

export default function PromotionDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4">
            <h5 className="text-xl"><b>Promotion Details</b></h5>
            <div className="divider"></div>
            {data?.map((item: any, index: number) => (
                <div key={index}>
                    <h6 className="text-lg mb-5"><b><u>Designation</u></b></h6>
                    <div className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-4' : ''}`}>
                        <div className={`flex flex-row justify-between w-full`}>
                            <div className="flex flex-col justify-between">
                                <p><b>From : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.designation?.from || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col justify-between">
                                <p><b>To : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.designation?.to || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <h6 className="text-lg my-5"><b><u>Scale</u></b></h6>
                    <div className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-4' : ''}`}>
                        <div className={`flex flex-row justify-between w-full`}>
                            <div className="flex flex-col justify-between">
                                <p><b>From : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.scale?.from || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col justify-between">
                                <p><b>To : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.scale?.to || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-row justify-between gap-10 mt-5`}>
                        <div className={`flex flex-row justify-between w-full`}>
                            <div className="flex flex-col justify-between">
                                <p><b>Vide Order No. : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.vide_order_no|| 'N/A'}</p>
                            </div>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-col justify-between">
                                <p><b>Vide Order Date : </b></p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p>{item?.vide_order_date || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
