/***
 * Author: Jaideep
 * Status: Open
 * Uses: Leave details for employee - Apply leave details page consist of leave chart of employee, leave status , calendar tracking for leave and leave appply form.
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  InnerHeading,
  InnerTextHeading,
  SubHeading,
} from "@/components/Helpers/Heading";
import LeaveForm from "./LeaveForm";
// import Stepper from 'react-stepper-horizontal';
import HorizontalStepper from "@/components/Helpers/Widgets/Stepper";
import axios from "@/lib/axiosConfig";
// import axios from 'axios';
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { HRMS_URL } from "@/utils/api/urls";
import Loader from "@/components/global/atoms/Loader";

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

const LeaveReq = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [manData, setManData] = useState<LeaveData>();
  const [leaveData, setLeaveData] = useState<LeaveTotalData>();
  const [activeStep, setActiveStep] = useState(0);
  const datePickerRef = useRef<DatePicker>(null);

  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    try {
      axios(`${HRMS_URL.LEAVECHART.get}`)
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
  }, []);

  useEffect(() => {
    try {
      axios(`${HRMS_URL.LEAVEGET.get}`)
        .then((response) => {
          setManData(response.data?.data);
          console.log("Data is returned", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.response.data);
        });
    } catch (error) {
      console.log("Error in useEffect:", error);
    }
  }, []);

  // ================UPDATE LEAVE===================//

  // async function leaveUpdate() {
  //   try {
  //     const res = await axios ({

  //     })
  //   } catch (error) {
      
  //   }
  // }
  // ===================================//

  const steps = [
    { title: "Employee" },
    { title: "Manager-1" },
    { title: "Manager-2" },
    { title: "Manager-3" },
  ];

  useEffect(() => {
    if (manData?.leave_status !== -1) {
      setActiveStep(Number(manData?.leave_status));
    }
  }, [manData?.leave_status]);

  // useEffect(() => {
  //     if (leaveData && manData) {
  //         setDataLoaded(true);
  //     }
  // }, [leaveData, manData]);

  const togglePopup = () => {
    setShowMore(!showMore);
  };

  const closePopup = () => {
    setShowMore(false);
  };

  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Apply for Leave
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
                  <i className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <rect width="32" height="32" rx="9" fill="#665DD9" />
                      <path
                        d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                        fill="white"
                        fillOpacity="0.92"
                      />
                    </svg>
                  </i>
                  Leave Chart
                </div>
                <div className="flex items-center">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="d MMMM , yyyy"
                    ref={datePickerRef}
                    className="w-[160px] outline-none"
                  />

                  <i
                    className="cursor-pointer "
                    onClick={() => {
                      if (datePickerRef.current) {
                        datePickerRef.current.setOpen(true);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3.48879 4.89772C3.69213 4.69244 4.02178 4.69103 4.22512 4.89913L8.76386 9.53237C8.9672 9.73977 8.9665 10.0748 8.76247 10.2808C8.66115 10.3831 8.5279 10.4353 8.39535 10.4353C8.2614 10.4353 8.12816 10.3831 8.02683 10.2794L3.4881 5.64618C3.28476 5.43878 3.28545 5.1037 3.48879 4.89772ZM12.565 4.8992C12.7684 4.6911 13.098 4.69251 13.3013 4.89779C13.5054 5.10378 13.5061 5.43885 13.3034 5.64625L10.2894 8.72332C10.1881 8.82702 10.0541 8.87922 9.92089 8.87922C9.78833 8.87922 9.65509 8.82702 9.55376 8.72473C9.34973 8.51875 9.34904 8.18367 9.55168 7.97627L12.565 4.8992Z"
                        fill="black"
                      />
                    </svg>
                  </i>
                </div>

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
                      <span className="text-[#574CDD] text-3xl font-bold">
                        {leaveData?.tot_leave_allow_year || 0}
                      </span>
                      <InnerTextHeading className="text-center">
                        Total No. of <br />
                        Leave Allow in a Year
                      </InnerTextHeading>
                    </div>
                    <div
                      className={`w-full  md:w-[33%]  flex flex-col items-center justify-center border-r-2 border-[#C1C9EB] relative`}
                    >
                      <span className="text-[#098DA4] text-3xl font-bold">
                        {leaveData?.tot_bal_leave_year || 0}
                      </span>
                      <InnerTextHeading className="text-center">
                        Total No. of <br /> Balance Leave in a Year
                      </InnerTextHeading>
                    </div>
                    <div
                      className={`w-full p-1 md:w-[37%] flex flex-col items-center justify-center relative `}
                    >
                      <span className="text-[#574CDD] text-3xl font-bold">
                        {Number(leaveData?.tot_leave_allow_year) -
                          Number(leaveData?.tot_bal_leave_year) || 0}
                      </span>
                      <InnerTextHeading className="text-center">
                        Total No. of <br /> Previously Approved Leaves
                      </InnerTextHeading>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1">
                  {leaveData?.sick_leave} Sick Leave
                </span>
                <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1">
                  {leaveData?.earned_leave} Earned Leave
                </span>
                {/* <span className='bg-[#F0FFF5] text-xs rounded-xl p-2 m-1'>{leaveData?.personal_leave} Personal Leave</span> */}
                <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1">
                  {leaveData?.leave_entitlements_for_vacation} Vacation Leave
                </span>

                <span>
                  <button
                    onClick={togglePopup}
                    className="flex items-center bg-[#F1F1F1] text-xs rounded-xl p-[6px] m-1 "
                  >
                    <i className="m-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                      >
                        <ellipse
                          cx="5.52235"
                          cy="5.16062"
                          rx="5.0663"
                          ry="4.88035"
                          fill="#92A0A8"
                        />
                      </svg>
                    </i>
                    More
                    <i className="mx-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                      >
                        <path
                          d="M4.07116 8.09102L7.2356 4.64648L3.82005 1.50868L4.52326 0.743223L8.69782 4.57831L4.83017 8.78831L4.07116 8.09102ZM0.415608 8.26144L3.58005 4.81689L0.164501 1.67909L0.86771 0.913637L5.04227 4.74873L1.17462 8.95873L0.415608 8.26144Z"
                          fill="#555555"
                        />
                      </svg>
                    </i>
                  </button>

                  {showMore && (
                    <div className="fixed top-0 right-0 w-auto h-auto p-4 bg-gray-100 border border-gray-300 shadow-md z-50 bg-white">
                      {/* Close button */}
                      <button
                        className="absolute top-2 right-2"
                        onClick={closePopup}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      {/* Popup content */}
                      <div className="col col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.sick_leave} Sick Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.earned_leave} Earned Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.personal_leave} Personal Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.commuted_leave} Commuted Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.leave_not_due} Leave Not Due
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.extraordinary_leave} Extraordinary Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.privileged_leave} Privileged Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.leave_entitlements_for_vacation} Leave
                          Entitlement for Vacation
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.child_care_leave} Child Care Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.wrill} Wrill{" "}
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.special_leave_on_enquiry} Special Leave on
                          Enquiry
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.study_leave} Study Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.ad_hoc_employees} AD Hoc Employees
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.leave_salary} Leave Salary
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.special_casual_leave} Special Casual Leave
                        </span>
                        <span className="bg-[#F0FFF5] text-xs rounded-xl p-2 m-1 leading-5">
                          {leaveData?.paternity_leave} Paternity Leave
                        </span>
                      </div>
                    </div>
                  )}
                </span>
              </div>
            </div>

            {/* Leave Status Code */}
            <div
              className={`w-auto md:w-6/12 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
            >
              <InnerHeading className="text-xl flex items-center justify-between">
                <div className="flex items-center">
                  <i className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <rect width="32" height="32" rx="9" fill="#665DD9" />
                      <path
                        d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                        fill="white"
                        fillOpacity="0.92"
                      />
                    </svg>
                  </i>
                  Leave Status
                </div>
                <div className="menu flex items-center  top-0 right-0 ">
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                  <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
                </div>
              </InnerHeading>
              <div></div>
              <div className="w-full flex flex-col sm:flex-row justify-between">
                <div
                  className={` md:w-[99.9%] m-1 flex flex-col relative p-5 max-w-5xl`}
                >
                  {/* <Stepper
                                        steps={steps.map((step, index) => ({
                                            ...step,
                                            title: (
                                                <span className={activeStep === index ? 'animate-blink' : ''}>
                                                    {step.title}
                                                </span>
                                            ),
                                            style: {
                                                background: activeStep === index ? '#1659DD' : 'transparent',
                                                color: activeStep === index ? '#fff' : '#000',
                                            },

                                        }))}
                                        activeStep={activeStep}
                                        completeColor="#80808059"
                                        completeBarColor="#10B981"
                                        circleFontColor="#fff"
                                        activeTitleColor="#000"
                                        size={25}
                                        circleFontSize={0}
                                        activeStepCircleSize={25}
                                    /> */}

                  <div className="mt-12">
                    <HorizontalStepper steps={steps} activeStep={activeStep} />
                    <div className="mt-2 px-2  pr-4 flex items-center justify-between text-xs text-secondary">
                      {/* <h2>{userDetails?.name}</h2> */}
                      <h2>Employee</h2>
                      <h2>Manager-1</h2>
                      <h2>Manager-2</h2>
                      <h2>Manager-3 </h2>
                    </div>
                  </div>
                  <br />
                  <span className="text-sm">
                    Type of Leave-{" "}
                    <span className="text-green-600">
                      {manData?.emp_leave_type.name}
                    </span>
                  </span>
                  <span className="text-sm">
                    Date of Leave- {manData?.leave_from} to {manData?.leave_to}
                  </span>
                  <span className="text-sm">
                    Total day of leave- {manData?.total_days}{" "}
                  </span>
                  <span className="text-sm">
                    Status of leave-{" "}
                    <span className="text-green-600">
                      {manData ? (
                        <>
                          {manData.leave_status === 3 ? "Approve" : "Pending"}
                        </>
                      ) : (
                        <></>
                      )}
                    </span>
                  </span>
                </div>
              </div>
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

export default LeaveReq;
