/***
 * Author: Anil
 * Status: Open
 * Uses: LEave approval page for supervisor.
 */

"use client";

import React, { useEffect, useState } from "react";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { SubHeading } from "@/components/Helpers/Heading";
import Loader from "@/components/global/atoms/Loader";
import Image from "next/image";
import LeaveListIcon from "@/assets/icons/LeaveList.png";
// import PrimaryButton from "@/components/Helpers/Button";
import LeaveList from "@/components/JuidcoHrms/pages/Supervisor/leaveApproval/LeaveList";
import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";

export default function LeaveApproval() {
  const [loading, setLoading] = useState(false);
  // const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [leaveList, setLeaveList] = useState<any>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  let emp_id: string | null;

  useEffect(() => {
    const userDetails = JSON.parse(
      sessionStorage.getItem("user_details") || "{}"
    );
    emp_id = userDetails?.emp_id;
  }, []);

  const fetchLeave = () => {
    try {
      setLoading(true);
      axios(`${HRMS_URL.LEAVE.get}/${emp_id}`)
        .then((response) => {
          setLeaveList(response.data?.data?.data);
          console.log("Data is returned", response.data?.data?.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.response.data);
        });
    } catch (error) {
      console.log("Error in useEffect:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [isUpdated]);

  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Leave Approval
          </SubHeading>
        </div>
      </div>

      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/2">
          <Loader />
        </div>
      )}

            {!loading && (
                <>

                    <div className="card w-full shadow-md rounded-sm">
                        <div className="card-body flex flex-row justify-between">
                            <div className="flex justify-between">
                                <SubHeading>
                                    <Image src={LeaveListIcon} alt="employee" width={40} height={20} />
                                    <span className="ml-4 text-lg">List of Total Requests</span>
                                </SubHeading>
                            </div>
                            <section className="flex items-end gap-2 justify-end">
                                <div className="flex justify-center items-center flex-col w-20">
                                    <h1 className="text-lg text-sky-600 font-bold">{leaveList?.length || 0}</h1>
                                    <p className="text-sm">Total no. of requests</p>
                                </div>
                                <div className="divider lg:divider-horizontal" />
                                {/* <div className="flex flex-col gap-2">
                                    <label htmlFor="search-by" className="text-secondary text-lg">
                                        Search By
                                    </label>
                                    <select
                                        // onChange={(e) => setSelectedFilter(parseInt(e.target.value))}
                                        className="p-3 rounded-lg shadow-inner border-2 border-zinc-400 w-64 bg-white"
                                    >
                                        <option disabled selected>
                                            Select Search By
                                        </option>
                                        <option value={0}>Department</option>
                                        <option value={1}>Designation</option>
                                    </select>
                                </div>
                                <PrimaryButton
                                    variant="primary"
                                    className="flex items-center gap-2 text-lg"
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M12.5001 16.5667C12.5334 16.8167 12.4501 17.0833 12.2584 17.2583C12.1813 17.3356 12.0898 17.3969 11.989 17.4387C11.8882 17.4805 11.7801 17.502 11.6709 17.502C11.5618 17.502 11.4537 17.4805 11.3529 17.4387C11.2521 17.3969 11.1605 17.3356 11.0834 17.2583L7.74178 13.9167C7.65089 13.8278 7.58178 13.7192 7.53986 13.5992C7.49793 13.4792 7.48433 13.3511 7.50011 13.225V8.95833L3.50844 3.85C3.37312 3.67628 3.31205 3.45605 3.3386 3.23744C3.36514 3.01883 3.47714 2.81962 3.65011 2.68333C3.80844 2.56667 3.98344 2.5 4.16678 2.5H15.8334C16.0168 2.5 16.1918 2.56667 16.3501 2.68333C16.5231 2.81962 16.6351 3.01883 16.6616 3.23744C16.6882 3.45605 16.6271 3.67628 16.4918 3.85L12.5001 8.95833V16.5667ZM5.86678 4.16667L9.16678 8.38333V12.9833L10.8334 14.65V8.375L14.1334 4.16667H5.86678Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                    Search record
                                </PrimaryButton> */}
                            </section>
                        </div>
                    </div>

          <div className="card w-full shadow-md rounded-sm">
            <div className="card-body">
              {leaveList?.length === 0 && <h1>No pending leave requests</h1>}
              <LeaveList
                data={leaveList}
                setIsUpdated={setIsUpdated}
                isUpdated={isUpdated}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
