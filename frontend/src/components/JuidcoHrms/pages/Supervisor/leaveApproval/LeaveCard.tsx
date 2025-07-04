"use client"

import { useState } from "react"
import EmployeeIcon from "@/assets/icons/employee 1.png"
import Image from "next/image"
import axios from "@/lib/axiosConfig"
import { HRMS_URL } from "@/utils/api/urls"
import Link from "next/link"

export default function LeaveCard(props: any) {
  const { data, setIsUpdated, isUpdated } = props
  const [isLoading, setIsLoading] = useState(false)

  const acceptOrDeny = async (status: number, id: any) => {
    setIsLoading(true)

    try {
      if (status === 1) {
        // For accept, we need to call the new API with additional data
        // First, get the emp_leave_chart_id
        const leaveChartResponse = await axios.get(`/employee/leave-chart-get?employee_id=${data.emp_id}`)

        const emp_leave_chart_id = leaveChartResponse.data?.data.id 
        console.log("leave card ==================> emp_leave_chart_id", emp_leave_chart_id) 
        console.log("leave card ==================> leaveChartResponse", leaveChartResponse) 

        const dataToSend = {
          employee_id: data.emp_id,
          leave_status: status,
          total_days: data.total_days,
          emp_leave_chart_id: emp_leave_chart_id,
          leave_type: data.leave_type_name,
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

      window.location.reload()
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
      <div className="card shadow-lg rounded">
        <div className="card-body flex justify-between space-y-4">
          <div className="flex flex-row gap-2">
            <Image src={EmployeeIcon || "/placeholder.svg"} alt="employee" width={25} height={10} />
            <h2 className="card-title">{data.emp_name}</h2>
          </div>
          <div className="text-sm">
            <p>
              <strong>Employee ID :</strong> {data.emp_id}
            </p>
            <p>
              <strong>Type of Leave : </strong>
              {data.leave_type_name}
            </p>
            <p>
              <strong>Date of leave : </strong>
              {data.leave_from} - {data.leave_to}
            </p>
            <p>
              <strong>Department : </strong>
              {data.dep_name || ""}
            </p>
            <p>
              <strong>Total day(s) of leave : </strong>
              {data.total_days}
            </p>
            <p>
              <strong>Approval Level : </strong> Level {data.leave_status}
            </p>
          </div>
          <div className="card-actions justify-between">
            <Link href={`leave-approval/review/${data.emp_id}`} className="btn btn-outline flex-1">
              Review
            </Link>
            <button
              disabled={isLoading}
              onClick={() => acceptOrDeny(-1, data.id)}
              className="btn btn-outline btn-error flex-1"
            >
              {isLoading ? "Processing..." : "Deny"}
            </button>
            <button disabled={isLoading} onClick={() => acceptOrDeny(1, data.id)} className="btn btn-primary flex-1">
              {isLoading ? "Processing..." : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
