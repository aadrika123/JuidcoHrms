import React from 'react'

export default function EducationDetails(props: any) {

    const { data, ref } = props

    return (
        <div ref={ref} className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Education Details</b></h5>
            <div className="divider divider-neutral"></div>
            {data?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-5' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Education Level : </b></p>
                            <p><b>Board : </b></p>
                            <p><b>Marks : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.edu_level || 'N/A'}</p>
                            <p>{item?.board || 'N/A'}</p>
                            <p>{item?.marks || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <p><b>Stream : </b></p>
                            <p><b>Passing Year : </b></p>
                            <p><b>Grade : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.stream || 'N/A'}</p>
                            <p>{item?.passing_year || 'N/A'}</p>
                            <p>{item?.grade || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
