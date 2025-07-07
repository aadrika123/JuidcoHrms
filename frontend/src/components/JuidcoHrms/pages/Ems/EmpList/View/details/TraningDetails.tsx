import React from 'react'

export default function TraningDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Training Details</b></h5>
            <div className="divider divider-neutral"></div>
            {data?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-5' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Name : </b></p>
                            <p><b>Institute : </b></p>
                            <p><b>From : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.name_of_training || 'N/A'}</p>
                            <p>{item?.name_of_inst || 'N/A'}</p>
                            <p>{item?.end_to?.to || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <p><b>Type : </b></p>
                            <p><b>Total Days : </b></p>
                            <p><b>To</b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.training_type || 'N/A'}</p>
                            <p>{item?.tot_day_training || 'N/A'}</p>
                            <p>{item?.starting_from?.from || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
