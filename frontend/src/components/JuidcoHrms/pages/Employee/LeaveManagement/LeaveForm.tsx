/***
 * Author: Jaideep
 * Status: Open
 * Uses: Leave details for employee - Apply leave details page
 */

"use client";
import React, { useState, useEffect } from "react";
import { InnerHeading } from "@/components/Helpers/Heading";
import Input from "@/components/global/atoms/Input";
import { Formik } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
// import axios from 'axios';
import axios from "@/lib/axiosConfig";
import DropDownList from "@/components/Helpers/DropDownList";
import { HRMS_URL } from "@/utils/api/urls";
import toast, { Toaster } from "react-hot-toast";

interface LeaveInitialData {
  emp_leave_type_id: string | number;
  employee_id: string | number;
  leave_from: string | number;
  leave_to: string | number;
  total_days: string | number;
  leave_reason: string | number;
  file_upload: string | number;
}

const LeaveForm = () => {
  const [value] = useState(new Date());
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [, setTotalDays] = useState<number>(0);
  const [daysDiff, setDaysDiff] = useState<number>(0);
  const [leaveData, setLeaveData] = useState<any>();
  const [leaveChartData, setLeaveChartData] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const [checkLeaveCount, setCheckLeaveCount] = useState<boolean>(false);

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
        axios(`${HRMS_URL.LEAVECHART.get}?employee_id=${empId}`)
          .then((response) => {
            setLeaveChartData(response.data?.data);
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

  // logic to handle total days calculation
  const calculateDaysDiff = (values: LeaveInitialData) => {
    const { leave_from, leave_to, emp_leave_type_id } = values;

    if (leave_from && leave_to) {
      const firstDate = new Date(leave_from);
      const secondDate = new Date(leave_to);

      firstDate.setHours(0, 0, 0, 0);
      secondDate.setHours(0, 0, 0, 0);

      if (secondDate < firstDate) {
        toast.error("Leave 'to' date must be greater than leave 'from' date.");
        return;
      }

      const differenceBtwDates = secondDate.getTime() - firstDate.getTime();
      const aDayInMs = 24 * 60 * 60 * 1000;

      const diff = Math.round(differenceBtwDates / aDayInMs) + 1;
      if (
        (emp_leave_type_id === 1 && diff > leaveChartData?.sick_leave) ||
        (emp_leave_type_id === 2 && diff > leaveChartData?.earned_leave) ||
        (emp_leave_type_id === 3 && diff > leaveChartData?.personal_leave) ||
        (emp_leave_type_id === 4 && diff > leaveChartData?.commuted_leave) ||
        (emp_leave_type_id === 5 && diff > leaveChartData?.leave_not_due) ||
        (emp_leave_type_id === 6 &&
          diff > leaveChartData?.extraordinary_leave) ||
        (emp_leave_type_id === 7 && diff > leaveChartData?.privileged_leave) ||
        (emp_leave_type_id === 8 &&
          diff > leaveChartData?.leave_entitlements_for_vacation) ||
        (emp_leave_type_id === 9 && diff > leaveChartData?.leave_on_adoption) ||
        (emp_leave_type_id === 10 &&
          diff > leaveChartData?.leave_to_female_on_adoption) ||
        (emp_leave_type_id === 11 && diff > leaveChartData?.child_care_leave) ||
        (emp_leave_type_id === 12 && diff > leaveChartData?.wrill) ||
        (emp_leave_type_id === 13 &&
          diff > leaveChartData?.special_casual_leave) ||
        (emp_leave_type_id === 14 && diff > leaveChartData?.study_leave) ||
        (emp_leave_type_id === 15 && diff > leaveChartData?.ad_hoc_employees) ||
        (emp_leave_type_id === 16 && diff > leaveChartData?.leave_salary) ||
        (emp_leave_type_id === 17 &&
          diff > leaveChartData?.special_casual_leave) ||
        (emp_leave_type_id === 18 && diff > leaveChartData?.paternity_leave)
      ) {
        setCheckLeaveCount(true);
        toast.error(`Total leave days must not exceed from balance leave.`);
        return;
      } else {
        setCheckLeaveCount(false);
      }

      setDaysDiff(diff);
      setTotalDays(diff);
    }
  };
  useEffect(() => {
    if (empId) {
      try {
        axios(`${HRMS_URL.LEAVEGET.get}?employee_id=${empId}`)
          .then((response) => {
            setLeaveData(response?.data?.data);
            console.log("Data is returned", response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error.response.data);
          });
      } catch (error) {
        console.log("Error in useEffect:", error);
      }
    }
  }, [empId]);

  const handleLogin = async (values: LeaveInitialData) => {
    const actualTotalDays = tabIndex === 1 ? daysDiff : daysDiff * 0.5;

    try {
      const res = await axios({
        url: `${HRMS_URL.LEAVEGET.create}`,
        method: "POST",
        data: {
          ...values,
          employee_id: empId,
          total_days: actualTotalDays,
          half_day: tabIndex === 0 ? true : false,
          file_upload: selectedFileName,
        },
      });

      if (
        res.data.data.data ===
        "Leave request overlaps with existing leave request."
      ) {
        toast.error("Leave request overlaps with existing leave request.");
      } else {
        toast.success("Leave Applied Successfully");
        window.location.reload();
      }
      console.log("Submitted values:", res.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Leave Apply Failed");
    }
  };

  // logic to handle date status

  const tileContent = ({ date, view }: any) => {
    if (view === "month" && leaveData?.leave_from && leaveData?.leave_to) {
      const currentDate = new Date(date);
      const leaveFromDate = new Date(leaveData.leave_from);
      const leaveToDate = new Date(leaveData.leave_to);

      // Set time to start of day for accurate comparison
      currentDate.setHours(0, 0, 0, 0);
      leaveFromDate.setHours(0, 0, 0, 0);
      leaveToDate.setHours(0, 0, 0, 0);

      if (currentDate >= leaveFromDate && currentDate <= leaveToDate) {
        return (
          <div
            className="highlighted-date"
            style={{
              backgroundColor:
                leaveData.leave_status === 3
                  ? "green"
                  : leaveData.leave_status === -1
                    ? "red"
                    : "orange",
              borderRadius: "50%",
              width: "10px",
              height: "10px",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        );
      }
    }
    return null;
  };

  const [selectedFileName, setSelectedFileName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const size = file.size;
    const fileType = file.type;

    const acceptedFileTypes = ["image/png", "image/jpeg"];

    if (!acceptedFileTypes.includes(fileType)) {
      alert("Please upload a PNG or JPEG file.");
      return;
    }

    if (size / 1024 >= 2048) {
      alert("Cannot upload more than 2MB data!");
    } else {
      setSelectedFileName(file ? file.name : "");
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      alert("Cannot select past dates!");
      return false;
    }
    return true;
  };

  const initialValues = {
    emp_leave_type_id: "",
    employee_id: userDetails?.emp_id,
    leave_from: "",
    leave_to: "",
    total_days: "",
    leave_reason: "",
    file_upload: "",
  };

  const tileDisabled = ({ date }: any) => {
    if (leaveData && leaveData.leave_from && leaveData.leave_to) {
      const leaveFromDate = new Date(leaveData.leave_from);
      const leaveToDate = new Date(leaveData.leave_to);
      leaveFromDate.setHours(0, 0, 0, 0);
      leaveToDate.setHours(0, 0, 0, 0);

      const currentDate = new Date(date);
      currentDate.setHours(0, 0, 0, 0);

      return currentDate >= leaveFromDate && currentDate <= leaveToDate;
    }
    return false;
  };

  return (
    <>
      <Toaster />
      <div
        className={`w-full sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
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
                <rect
                  width="32"
                  height="32"
                  rx="9"
                  // fill="#665DD9"
                />
                <path
                  d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                  fill="white"
                  fillOpacity="0.92"
                />
              </svg>
            </i>
            Apply Leave
          </div>
        </InnerHeading>

        {/* form field  */}

        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/5 border-r-2	">
            <div className="m-5">
              <Formik
                initialValues={initialValues}
                onSubmit={(values: LeaveInitialData) => {
                  handleLogin(values);
                }}
                enableReinitialize={true}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-4 text-center">
                      <span className="text-center text-red-400">
                        {/* {errorMsg} */}
                      </span>
                    </div>
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                        <DropDownList
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.emp_leave_type_id}
                          // error={errors.leave_type}
                          // touched={touched.leave_type}
                          label="Leave Type"
                          name="emp_leave_type_id"
                          placeholder={"Choose Leave Type"}
                          api={`${HRMS_URL.LEAVETYPE.get}`}
                          // required
                        />

                        <Input
                          label="Employee ID"
                          placeholder="Enter Employee ID"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.employee_id}
                          name="emp_id"
                        />

                        <Input
                          label="From"
                          placeholder="From"
                          onChange={(e) => {
                            if (handleDateChange(e)) {
                              handleChange(e);
                            }
                          }}
                          type="date"
                          onBlur={() => calculateDaysDiff(values)}
                          value={values.leave_from}
                          name="leave_from"
                        />

                        <Input
                          label="To"
                          placeholder="To"
                          onChange={(e) => {
                            if (handleDateChange(e)) {
                              handleChange(e);
                            }
                          }}
                          type="date"
                          onBlur={() => calculateDaysDiff(values)}
                          value={values.leave_to}
                          name="leave_to"
                        />

                        <div className="flex">
                          <div className="flex-all-center">
                            <input
                              id="halfDay"
                              type="radio"
                              onChange={() => setTabIndex(0)}
                              name="radio-1"
                              className="radio border border-zinc-600"
                            />
                            <label
                              htmlFor="accounting"
                              className=" cursor-pointer"
                            >
                              Half Day
                            </label>
                          </div>

                          <div className="flex-all-center m-5">
                            <input
                              id="fullDay"
                              onChange={() => setTabIndex(1)}
                              type="radio"
                              name="radio-1"
                              className="radio  border-zinc-600"
                              defaultChecked
                            />
                            <label
                              htmlFor="function"
                              className=" cursor-pointer"
                            >
                              Full Day
                            </label>
                          </div>
                        </div>

                        <Input
                          label="Total Days"
                          placeholder="Enter Total Days"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={
                            tabIndex === 0
                              ? daysDiff * 0.5
                              : daysDiff.toString()
                          }
                          readonly={true}
                          name="total_days"
                        />
                      </div>

                      <div className="relative ">
                        <Input
                          label="Reason For Leave"
                          placeholder="Type Here Reason of leave .."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.leave_reason}
                          name="leave_reason"
                          // className="border-0 h-[10rem] w-full focus:outline-none pr-12"
                          type="textarea"
                          className="text-area"
                        />

                        <div className="right-0 flex items-start gap-3 ">
                          <label htmlFor="file_upload">
                            <span className="cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="mt-[-3rem] mx-2 border-r-4"
                              >
                                <path
                                  d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                                  fill="#969393"
                                />
                              </svg>
                            </span>
                            <div className="flex justify-between items-center">
                              {imagePreview && (
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="ml-1 w-5 h-5 rounded-full object-cover border border-gray-300"
                                />
                              )}
                              {selectedFileName && (
                                <span className="ml-2">{selectedFileName}</span>
                              )}
                            </div>
                          </label>
                          {/* Hidden file input */}
                          <input
                            type="file"
                            id="file_upload"
                            name="file_upload"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end mt-5 gap-5">
                      <PrimaryButton
                        buttonType="button"
                        variant={"cancel"}
                        onClick={goBack}
                      >
                        Back
                      </PrimaryButton>

                      {daysDiff && daysDiff != 0 && !checkLeaveCount ? (
                        <PrimaryButton buttonType="submit" variant="primary">
                          Apply
                        </PrimaryButton>
                      ) : (
                        <PrimaryButton
                          buttonType="button"
                          onClick={() => {
                            if (!daysDiff) {
                              toast.error("Failed to send Leave Request");
                            } else {
                              toast.error("Kindly fill complete Leave Form");
                            }
                          }}
                          variant="disabled"
                        >
                          Apply
                        </PrimaryButton>
                      )}
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>

          {/* calendar integration */}

          <div className="md:w-2/5">
            <div className="m-5 w-full">
              <Calendar
                value={value}
                tileContent={tileContent}
                tileDisabled={tileDisabled}
              />

              <div className="flex flex-col mt-5">
                <div className="text-sm">
                  <span>Type of Leave - {leaveData?.emp_leave_type?.name}</span>
                </div>
                <div className="text-sm">
                  <span>
                    Date of Leave - {leaveData?.leave_from} to{" "}
                    {leaveData?.leave_to}
                  </span>
                </div>

                <div className="text-sm">
                  <span>Total days of leave - {leaveData?.total_days}</span>
                </div>
                <div className="text-sm">
                  <span className="text-sm">
                    Status of leave-{" "}
                    {leaveData?.leave_status === -1 ? (
                      <span className="text-red-600">
                        {leaveData ? (
                          <>{leaveData.leave_status === -1 ? "Rejected" : ""}</>
                        ) : null}
                      </span>
                    ) : (
                      <span className="text-green-600">
                        {leaveData ? (
                          <>
                            {leaveData.leave_status === 3
                              ? "Approve"
                              : "Pending"}
                          </>
                        ) : null}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveForm;
