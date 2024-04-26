import React from 'react'
import dateConvertor from '@/utils/formatter/dateFormatter';

export default function BasicDetails(props: any) {

    const { data } = props

    return (
        <div className="rounded border-2 p-4">
            <h5 className="text-xl"><b>Basic Details</b></h5>
            <div className="divider"></div>
            <div className="flex flex-row justify-between gap-10">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Employee ID : </b></p>
                        <p><b>Contact No. : </b></p>
                        <p><b>Aadhar No. : </b></p>
                        <p><b>DOB : </b></p>
                        <p><b>Epic No. (Voter ID) : </b></p>
                        <p><b>GPS : </b></p>
                        <p><b>Weight : </b></p>
                        <p><b>Mode of Recruitment : </b></p>
                        <p><b>Employee Type : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.emp_id || 'N/A'}</p>
                        <p>{data?.emp_basic_details.contact_no || 'N/A'}</p>
                        <p>{data?.emp_basic_details.aadhar_no || 'N/A'}</p>
                        <p>{dateConvertor(data?.emp_basic_details.dob) || 'N/A'}</p>
                        <p>{data?.emp_basic_details.epic_no || 'N/A'}</p>
                        <p>{data?.emp_basic_details.gps || 'N/A'}</p>
                        <p>{data?.emp_basic_details.weight || 'N/A'}</p>
                        <p>{data?.emp_basic_details.mode_of_recruitment || 'N/A'}</p>
                        <p>{data?.emp_basic_details.emp_type || 'N/A'}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Name : </b></p>
                        <p><b>Emergency Contact No. : </b></p>
                        <p><b>Gender : </b></p>
                        <p><b>Aadhar No. : </b></p>
                        <p><b>CPS : </b></p>
                        <p><b>Height : </b></p>
                        <p><b>PRAN : </b></p>
                        <p>&nbsp;</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.emp_basic_details.emp_name || 'N/A'}</p>
                        <p>{data?.emp_basic_details.emg_contact_no || 'N/A'}</p>
                        <p>{data?.emp_basic_details.gender || 'N/A'}</p>
                        <p>{data?.emp_basic_details.aadhar_no || 'N/A'}</p>
                        <p>{data?.emp_basic_details.cps || 'N/A'}</p>
                        <p>{data?.emp_basic_details.height || 'N/A'}</p>
                        <p>{data?.emp_basic_details.pran || 'N/A'}</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
