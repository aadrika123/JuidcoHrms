import React from 'react'

export default function FamilyDetails(props: any) {

    const { data } = props

    // const dateConvertor = (dateString: string) => {
    //     const date = new Date(dateString);

    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');

    //     const formattedDate = `${year}-${month}-${day}`;
    //     return formattedDate
    // }

    return (
        <div className="rounded border-2 p-4 border-neutral text-black">
            <h5 className="text-xl"><b>Family Details</b></h5>
            <div className="divider divider-neutral"></div>
            {data?.map((item: any, index: number) => (
                <div key={index} className={`flex flex-row justify-between gap-10 ${index !== 0 ? 'mt-5' : ''}`}>
                    <div className={`flex flex-row justify-between w-full`}>
                        <div className="flex flex-col justify-between">
                            <p><b>Name : </b></p>
                            <p><b>dob : </b></p>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p>{item?.name || 'N/A'}</p>
                            <p>{item?.dob || 'N/A'}</p>
                            {/* <p>{dateConvertor(data?.emp_basic_details.dob) || 'N/A'}</p> */}
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <p><b>Relation : </b></p>
                            <p><b>dependent : </b></p>
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
