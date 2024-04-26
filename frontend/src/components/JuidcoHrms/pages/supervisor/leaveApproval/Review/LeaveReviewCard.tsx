import React, { useState } from 'react'
import EmployeeIcon from "@/assets/icons/employee 1.png";
import Image from 'next/image';
import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";

export default function LeaveReviewCard(props: any) {

    const { data, emp, setIsUpdated, isUpdated } = props
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
            {data && (
                <div className="card shadow-lg rounded">
                    <div className="card-body flex justify-start space-y-4">
                        <div className='flex flex-row gap-2'>
                            <Image src={EmployeeIcon} alt="employee" width={25} height={10} />
                            <h2 className="card-title">{emp?.emp_basic_details?.emp_name}</h2>
                        </div>
                        <div className='text-sm'>
                            <p>{`Employee ID : ${data?.employee_id}`}</p>
                            <p>{`Type of Leave : ${data?.emp_leave_type?.name}`}</p>
                            <p>{`Date of leave : ${data?.leave_from} - ${data?.leave_to}`}</p>
                            <p>{`Department : ${emp?.emp_join_details?.department?.name || ''}`}</p>
                            <p>{`Total day(s) of leave : ${data?.total_days}`}</p>
                        </div>
                        <div className="card-actions justify-between">
                            {data?.leave_status === 0 && (
                                <>
                                    <button disabled={isLoading} onClick={() => acceptOrDeny(-1, data?.id)} className="btn btn-outline btn-error flex-1">Deny</button>
                                    <button disabled={isLoading} onClick={() => acceptOrDeny(1, data?.id)} className="btn btn-primary flex-1">Accept</button>
                                </>
                            )}
                            {data?.leave_status !== 0 && (
                                <div className={`flex flex-row justify-center items-center p-2  flex-1 rounded ${data?.leave_status === 1 ? 'bg-green-100' : data?.leave_status === -1 ? 'bg-red-100' : 'bg-blue-100'}`}>
                                    <h5>{data?.leave_status === 1 ? 'Approved' : data?.leave_status === -1 ? 'Rejected' : 'Pending'}</h5>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {!data && (
                <h1>No leave data</h1>
            )}
        </>
    )
}
