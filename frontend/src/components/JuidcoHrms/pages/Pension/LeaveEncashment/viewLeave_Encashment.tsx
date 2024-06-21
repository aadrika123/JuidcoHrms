"use client";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import Input from "@/components/global/atoms/Input";
import { HRMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";


const ViewLeaveEncashForm = () => {
  const [singleEmpData, setSingleEmpData] = useState<any>();
  // const [approveStatus, setApproveStatus] = useState<any>()
  const router = useSearchParams();
  const id = router.get('id');
  console.log(id, "id")

  

  const getRecordById = async() => {
    try {
      // const employeeId = rowData.employee_id;
      const res = await axios({
        url: `${HRMS_URL.LEAVE_ENCASHMENT.getById}/${id}`,
        method: "GET",
        data: {}
      });
      console.log('getAllLeaveEncashhmentById', res);
      if(res.status) {
        setSingleEmpData(res?.data?.data);
        console.log(res?.data?.data, "singlerecord")
      }
  } catch (error) {
      console.error("Error fetching record by ID:", error);
  }
  };

  const encashLeaveStatus = async(status: number) => {
    const res = await axios({
      url: `${HRMS_URL.LEAVE_ENCASHMENT.update}/${id}`,
      method: "PUT",
      data: { status: status }
    });
    console.log(res);
    // if(res.status) {
    //   setApproveStatus(res?.data?.data?.data);
    // }
  }

  useEffect(() => {
    if (id) {
        getRecordById();
    }
}, [id]);

  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Pension Management
          </SubHeading>
        </div>
      </div>

      <div className=" p-10 shadow-xl" >
        <form>
          <div >
            <div className="w-full">
              <div className="md:w-full border-r-2 ">
                <div className="m-5">
                  <div className="flex flex-col mt-4 text-center">
                    <span className="text-center text-red-400">
                    </span>
                  </div>
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                      <>
                        <Input
                          label="Total Earned Leave"
                          placeholder="Enter Order No"
                          value={singleEmpData?.earned_leave}
                          name="earn leave"
                          readonly
                        />
                        <Input
                          label="Apply for Leave Encashment"
                          placeholder="Enter Order No"
                          value={singleEmpData?.total_days_for_applied}
                          name="apply leave"
                          readonly
                        />
                        <Input
                          label="En_Cash Amount"
                          placeholder="Enter Order No"
                          value={singleEmpData?.grand_total_encashment_amount}
                          name="orderNo"
                          readonly
                        />
                        <Input
                          label="Balance Earn Leave"
                          placeholder="Enter Order No"
                          value={singleEmpData?.leave_balance_after_apply}
                          name="orderNo"
                          readonly
                        />
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {singleEmpData?.status == 0 && 
          (<div className="flex items-center justify-end mt-5 gap-5">
            <Link href={`leave_encashment`}>
              <PrimaryButton
                buttontype="button"
                variant={"cancel"}
                onClick={() => {encashLeaveStatus(2)}}
              >
                Reject
              </PrimaryButton>
            </Link>
            <Link href={`leave_encashment`}>
              <PrimaryButton buttontype="submit" variant="primary" onClick={() => {encashLeaveStatus(1)}}>
                Approve
              </PrimaryButton>
            </Link>
          </div>)
          }
        </form>
      </div>
    </>
  );
};

export default ViewLeaveEncashForm;