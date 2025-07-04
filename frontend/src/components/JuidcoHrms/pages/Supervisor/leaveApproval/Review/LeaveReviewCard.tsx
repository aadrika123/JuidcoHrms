"use client"

import { useState } from "react"
import EmployeeIcon from "@/assets/icons/employee 1.png"
import Image from "next/image"
import axios from "@/lib/axiosConfig"
import { HRMS_URL } from "@/utils/api/urls"

export default function LeaveReviewCard(props: any) {
  const { data, emp, setIsUpdated, isUpdated } = props
  const [isLoading, setIsLoading] = useState(false)

  const acceptOrDeny = async (status: number, id: any) => {
    setIsLoading(true)

    try {
      if (status === 1) {
        // For accept, we need to call the new API with additional data
        // First, get the emp_leave_chart_id
        const leaveChartResponse = await axios.get(`/employee/leave-chart-get?employee_id=${data.employee_id}`)

        const emp_leave_chart_id = leaveChartResponse.data?.data?.id // Adjust based on actual response structure
        console.log("leave reviw card ==================> emp_leave_chart_id", emp_leave_chart_id) 
        console.log("leave card ==================> leaveChartResponse", leaveChartResponse) 

        const dataToSend = {
          employee_id: data.employee_id,
          leave_status: status,
          total_days: data.total_days,
          emp_leave_chart_id: emp_leave_chart_id,
          leave_type: data.emp_leave_type?.id,
          id: id,
        }

        const response = await axios.post(`/employee/leave-update`, dataToSend)
        console.log("Leave updated successfully", response.data)
      } else {
        // For deny, use the original API
        const dataToSend = {
          status,
          id,
        }

        const response = await axios.post(`${HRMS_URL.LEAVE.update}`, dataToSend)
        console.log("Leave denied successfully", response.data)
      }

      setIsUpdated(!isUpdated)
    } catch (error) {
      console.error("Error updating leave:", error)
      // Handle error appropriately - maybe show a toast notification
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {data && (
        <div className="card shadow-lg rounded">
          <div className="card-body flex justify-between space-y-4">
            <div className="flex flex-row gap-2">
              <Image src={EmployeeIcon || "/placeholder.svg"} alt="employee" width={25} height={10} />
              <h2 className="card-title">{emp?.emp_basic_details?.emp_name}</h2>
            </div>
            <div className="text-sm">
              <p>{`Employee ID : ${data?.employee_id}`}</p>
              <p>{`Type of Leave : ${data?.emp_leave_type?.name}`}</p>
              <p>{`Date of leave : ${data?.leave_from} - ${data?.leave_to}`}</p>
              <p>{`Department : ${emp?.emp_join_details?.department?.name || ""}`}</p>
              <p>{`Total day(s) of leave : ${data?.total_days}`}</p>
            </div>
            <div className="card-actions justify-between">
              {data?.leave_status === 0 && (
                <>
                  <button
                    disabled={isLoading}
                    onClick={() => acceptOrDeny(-1, data?.id)}
                    className="btn btn-outline btn-error flex-1"
                  >
                    {isLoading ? "Processing..." : "Deny"}
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={() => acceptOrDeny(1, data?.id)}
                    className="btn btn-primary flex-1"
                  >
                    {isLoading ? "Processing..." : "Accept"}
                  </button>
                </>
              )}
              {data?.leave_status !== 0 && (
                <div
                  className={`flex flex-row justify-center items-center p-2  flex-1 rounded ${data?.leave_status === 1 ? "bg-green-100" : data?.leave_status === -1 ? "bg-red-100" : "bg-blue-100"}`}
                >
                  <h5>{data?.leave_status === 1 ? "Approved" : data?.leave_status === -1 ? "Rejected" : "Pending"}</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!data && <h1>No leave data</h1>}
    </>
  )
}
