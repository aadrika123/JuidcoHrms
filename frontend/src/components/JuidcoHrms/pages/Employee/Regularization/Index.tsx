/* eslint-disable @typescript-eslint/no-explicit-any */
/***
 * Author: Anil
 * Status: Open
 * Uses: Regularization details for employee.
 */

"use client";

import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  InnerHeading,
  InnerTextHeading,
  SubHeading,
} from "@/components/Helpers/Heading";
import LeaveForm from "./RegularizationForm";
// import Stepper from 'react-stepper-horizontal';
import HorizontalStepper from "@/components/Helpers/Widgets/Stepper";
import axios from "@/lib/axiosConfig";
// import axios from 'axios';
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { HRMS_URL } from "@/utils/api/urls";
import Loader from "@/components/global/atoms/Loader";
import { CircularProgress } from "@mui/material";

interface LeaveData {
  emp_leave_type: {
    id: number;
    name: string;
  };
  emp_id: string | number;
  leave_from: string | number;
  leave_to: string | number;
  total_days: number;
  leave_reason: string | number;
  file_upload: string | number;
  leave_status: number;
  half_day: boolean;
}

interface LeaveTotalData {
  id: number;
  tot_leave_allow_year: number;
  tot_bal_leave_year: number;
  tot_prev_leave_approv: number;
  sick_leave: number;
  earned_leave: number;
  personal_leave: number;
  commuted_leave: number;
  leave_not_due: number;
  extraordinary_leave: number;
  privileged_leave: number;
  leave_entitlements_for_vacation: number;
  leave_on_adoption: number;
  leave_to_female_on_adoption: number;
  child_care_leave: number;
  wrill: number;
  special_leave_on_enquiry: number;
  study_leave: number;
  ad_hoc_employees: number;
  leave_salary: number;
  special_casual_leave: number;
  paternity_leave: number;
}

const Regularization = () => {
  const [manData, setManData] = useState<LeaveData>();
  const [leaveData, setLeaveData] = useState<LeaveTotalData>();
  const [activeStep, setActiveStep] = useState(0);
  // const [leaveAllData, setLeaveAllData] = useState<any>([]);
  // const [showMore, setShowMore] = useState(false);
  // const [showMoreLeave, setShowMoreLeave] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leaveLoading, setLeaveLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any>();
  const [parentTeam, setParentTeam] = useState<any>([]);
  const [steps, setSteps] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("user_details");
      const user_details = JSON.parse(data as string);
      setUserDetails(user_details);
    }
  }, []);

  const empId = userDetails?.emp_id;

  useEffect(() => {
    if (empId) {
      try {
        axios(`${HRMS_URL.LEAVECHART.get}?employee_id=${empId}&regularization=true`)
          .then((response) => {
            setLeaveData(response.data?.data);
            console.log("Data is returned", response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error.response.data);
          });
      } catch (error) {
        console.log("Error in useEffect:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [empId]);

  useEffect(() => {
    if (empId) {
      try {
        axios(`${HRMS_URL.LEAVEGET.get}?employee_id=${empId}&regularization=true`)
          .then((response) => {
            setManData(response?.data?.data);
            // console.log("Data is returned", response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error.response.data);
          });
      } catch (error) {
        console.log("Error in useEffect:", error);
      }
    }
  }, [empId]);

  // console.log("manData", manData);

  useEffect(() => {
    if (empId) {
      setLeaveLoading(true)
      try {
        axios
          .get(`${HRMS_URL.LEAVEGET.getAll}?employee_id=${empId}&regularization=true`)
          .then((response) => {
            // setLeaveAllData(response?.data?.data);
            console.log("Data is returned", response.data.data);
            setLeaveLoading(false)
          })
          .catch((error) => {
            setLeaveLoading(false)
            console.error("Error fetching data:", error.response?.data);
          });
      } catch (error) {
        console.log("Error in useEffect:", error);
      }
    }
  }, [empId]);

  // console.log("leaveAllData", leaveAllData);

  useEffect(() => {
    if (manData?.leave_status !== -1) {
      setActiveStep(Number(manData?.leave_status));
    }
  }, [manData?.leave_status]);

  // const steps = [
  //   { title: "Employee" },
  //   { title: "Manager-1" },
  //   { title: "Manager-2" },
  //   { title: "Manager-3" },
  // ];

  // const togglePopup = () => {
  //   setShowMore(!showMore);
  // };

  // const closePopup = () => {
  //   setShowMore(false);
  // };

  // const togglePopup2 = () => {
  //   setShowMoreLeave(!showMoreLeave);
  // };

  // const closePopup2 = () => {
  //   setShowMoreLeave(false);
  // };

  const dates = new Date().toLocaleDateString();
  const [month, day, year] = dates.split("/");

  const formattedDay = day.padStart(2, "0");
  const formattedMonth = month.padStart(2, "0");

  const dateObject = new Date(`${year}-${formattedMonth}-${formattedDay}`);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[dateObject.getMonth()];

  const formattedDate = `${formattedDay} ${monthName}, ${year}`;

  // console.log("manData", manData?.half_day);

  const constructSteps = (data: any[]) => {
    const flattenArray = data?.flat()
    const constructedSteps = flattenArray.map((item: any) => ({ title: item?.emp_basic_details?.emp_name }))
    setSteps([
      { title: userDetails?.name },
      ...constructedSteps
    ])
  }
  // const activeStep = 0;

  const fetchTeam = async (emp: string) => {
    const res = await axios({
      url: `${HRMS_URL.TEAM_PARENT.getById}/${emp}`,
      method: "GET",
    });
    setParentTeam(res?.data?.data)
  }


  useEffect(() => {
    if (userDetails?.emp_id) {
      fetchTeam(userDetails?.emp_id)
    }
  }, [userDetails])

  useEffect(() => {
    if (parentTeam?.length > 0) {
      constructSteps(parentTeam)
    }
  }, [parentTeam])

  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Apply for Regularization
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
          <div className="w-full flex flex-col sm:flex-row justify-between">
            {/* Leave Chart Code */}
            <div
              className={`w-auto md:w-6/12 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
            >
              <InnerHeading className="text-xl flex items-center justify-between">
                <div className="flex items-center">
                  <i className="mr-2 bg-primary_blue rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <rect width="32" height="32" rx="9"
                      // fill="#665DD9"
                      />
                      <path
                        d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                        fill="white"
                        fillOpacity="0.92"
                      />
                    </svg>
                  </i>
                  Regularization Chart
                </div>
                <div className="flex items-center">{formattedDate}</div>

                <div className="menu flex items-center  top-0 right-0 ">
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
                </div>
              </InnerHeading>

              {/* leave chart code */}

              <div className="w-full flex flex-col sm:flex-row justify-between">
                <div className={`w-full  self-end max-w-[800px] mt-10 mb-10`}>
                  <div className="w-full flex flex-col sm:flex-row justify-between ">
                    <div
                      className={`w-full md:w-[33%] flex flex-col items-center justify-center relative border-r-2 border-[#C1C9EB] `}
                    >
                      <span className="text-primary_blue text-3xl font-bold">
                        {leaveData?.tot_leave_allow_year || 0}
                      </span>
                      <InnerTextHeading className="text-center">
                        Total No. of <br />
                        Regularizations Allowed in an Year
                      </InnerTextHeading>
                    </div>
                    <div
                      className={`w-full  md:w-[33%]  flex flex-col items-center justify-center border-r-2 border-[#C1C9EB] relative`}
                    >
                      <span className="text-[#098DA4] text-3xl font-bold">
                        {leaveData?.tot_bal_leave_year || 0}
                      </span>
                      <InnerTextHeading className="text-center">
                        Total No. of <br /> Balance Regularization in an Year
                      </InnerTextHeading>
                    </div>
                    <div
                      className={`w-full p-1 md:w-[37%] flex flex-col items-center justify-center relative `}
                    >
                      <span className="text-primary_blue text-3xl font-bold">
                        {Number(leaveData?.tot_leave_allow_year) -
                          Number(leaveData?.tot_bal_leave_year) || 0}
                      </span>
                      <InnerTextHeading className="text-center">
                        Total No. of <br /> Previously Approved Regularizations
                      </InnerTextHeading>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regularization Status Code */}
            <div
              className={`w-auto md:w-6/12 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
            >
              <InnerHeading className="text-xl flex items-center justify-between">
                <div className="flex items-center">
                  <i className="mr-2 bg-primary_blue rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <rect width="32" height="32" rx="9"
                      // fill="#665DD9"
                      />
                      <path
                        d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                        fill="white"
                        fillOpacity="0.92"
                      />
                    </svg>
                  </i>
                  Regularization Status
                </div>
                <div className="menu flex items-center  top-0 right-0 ">
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
                </div>
              </InnerHeading>
              <div></div>
              {leaveLoading && (
                <div className="flex justify-center items-center h-full">
                  <CircularProgress />
                </div>
              )}
              {!leaveLoading && (<div className="w-full flex flex-col sm:flex-row justify-between">
                <div
                  className={` md:w-[99.9%] m-1 flex flex-col relative p-5 max-w-5xl`}
                >
                  <div className="mt-12">
                    <HorizontalStepper steps={steps} activeStep={activeStep} />
                  </div>
                  <br />
                  <span className="text-sm">
                    Type of Regularization-{" "}
                    <span className="text-green-600">
                      {manData?.emp_leave_type?.name}
                    </span>
                  </span>
                  <span className="text-sm">
                    Date of Regularization- {manData?.leave_from} to {manData?.leave_to}
                  </span>
                  <span className="text-sm">
                    Total day of Regularization- {manData?.total_days}{" "}
                  </span>
                  <span className="text-sm">
                    Status of Regularization-{" "}
                    {manData?.leave_status == null ? null : (
                      manData.leave_status === -1 ? (
                        <span className="text-red-600">Rejected</span>
                      ) : (
                        <span className="text-green-600">
                          {manData.leave_status === 1 ? "Approve" : "Pending"}
                        </span>
                      )
                    )}
                  </span>
                </div>
              </div>)}
            </div>
          </div>
          {/* form design fields */}
          <div className="w-full flex flex-col sm:flex-row justify-between">
            <LeaveForm />
          </div>
        </>
      )}
    </>
  );
};

export default Regularization;
