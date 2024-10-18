import React from 'react'
import EmployeeIcon from "@/assets/icons/employee 1.png";
import Image from 'next/image';
import Link from 'next/link';

export default function TeamCard(props: any) {

    const { data } = props

    return (
        <>
            <div className="card shadow-lg rounded">
                <div className="card-body flex justify-between space-y-4">
                    <div className='flex flex-row gap-2'>
                        <Image src={EmployeeIcon} alt="employee" width={25} height={10} />
                        <h2 className="card-title">{data?.emp_basic_details?.emp_name}</h2>
                    </div>
                    <div className='text-sm'>
                        <p>{`Employee ID : ${data?.emp_basic_details?.emp_id}`}</p>
                        <p>{`Department : ${data?.emp_join_details?.department?.name || ''}`}</p>
                    </div>
                    <div className="card-actions justify-between">
                        {/* <button className="btn btn-outline btn flex-1">Leave Details</button> */}
                        <Link href={`leave-approval/review/${data?.emp_basic_details?.emp_id}`} className="btn btn-outline flex-1">Leave Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
