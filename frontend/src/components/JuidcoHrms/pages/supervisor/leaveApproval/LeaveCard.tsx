import React, { useState } from 'react'
import EmployeeIcon from "@/assets/icons/employee 1.png";
import Image from 'next/image';
import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";
import Link from 'next/link';

export default function LeaveCard(props: any) {

    const { data, setIsUpdated, isUpdated } = props
    const [isLoading, setIsLoading] = useState(false)

    const acceptOrDeny = (status: number, id: any) => {
        setIsLoading(true)
        const dataToSend = {
            status,
            id
        }
        try {
            axios.post(`${HRMS_URL.LEAVE.update}`, dataToSend)
                .then((response) => {
                    console.log("Data is returned", response.data);
                    setIsUpdated(!isUpdated)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error.response.data);
                });
        } catch (error) {
            console.log("Error in useEffect:", error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="card shadow-lg rounded">
                <div className="card-body flex justify-start space-y-4">
                    <div className='flex flex-row gap-2'>
                        <Image src={EmployeeIcon} alt="employee" width={25} height={10} />
                        <h2 className="card-title">{data.emp_name}</h2>
                    </div>
                    <div className='text-sm'>
                        <p>{`Employee ID : ${data.emp_id}`}</p>
                        <p>{`Type of Leave : ${data.leave_type_name}`}</p>
                        <p>{`Date of leave : ${data.leave_from} - ${data.leave_to}`}</p>
                        <p>{`Department : ${data.dep_name || ''}`}</p>
                        <p>{`Total day(s) of leave : ${data.total_days}`}</p>
                    </div>
                    <div className="card-actions justify-between">
                        <Link href={`leave-approval/review/${data.emp_id}`} className="btn btn-outline flex-1">Review</Link>
                        <button disabled={isLoading} onClick={() => acceptOrDeny(-1, data.id)} className="btn btn-outline btn-error flex-1">Deny</button>
                        <button disabled={isLoading} onClick={() => acceptOrDeny(1, data.id)} className="btn btn-primary flex-1">Accept</button>
                    </div>
                </div>
            </div>
        </>
    )
}
