/***
 * Author: Jaideep
 * Status: Done
 * Uses: Dashboard details for attendace of employee - Dashboard details page
 */

"use client";
import React, { useState, useRef } from "react";
import axios from "axios";

import {
  SubHeading,
  InnerHeading,
  InnerTextHeading,
} from "@/components/Helpers/Heading";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { ApexOptions } from "apexcharts";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import Link from "next/link";
import { FetchAxios, useCodeQuery } from "@/utils/fetchAxios";
import { HRMS_URL } from "@/utils/api/urls";
import toast from "react-hot-toast";

// ----------------- TYPES -----------------------//
interface AttendanceCount {
  present_emp: number;
  absent_emp: number;
}

// ----------------- TYPES -----------------------//

export const DashboardMain = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  // const [fileBlob, setFileBlob] = useState<Blob | null>(null); // State for the downloaded log file
  const datePickerRef = useRef<DatePicker>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const emp_list_url: string = "/ems/emp-list";

  //--------------------------- GET EMPLOYEE NOMINEE DETAILS ---------------------------//
  const fetchConfig: FetchAxios = {
    url: `${HRMS_URL.ATTENDANCE.count}`,
    url_extend: ``,
    method: "GET",
    res_type: 2,
    query_key: "emp_dash_count",
    data: [],
  };
  const { data: count_attendance, error } =
    useCodeQuery<AttendanceCount>(fetchConfig);
  if (error) toast.error("OOps! Failed to get employee attendance details!");

  //--------------------------- GET EMPLOYEE NOMINEE DETAILS ---------------------------//

  // ------------------ FETCH LOG DATA ------------------- //


  const downloadLog = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    console.log("Download button clicked");
  
    setLoading(true); // Start loading spinner
  
    try {
      // Fetch log data from API
      const response = await axios.get(`${process.env.backend}/api/hrms/v1/admin/logs`);
  
      // Extract logs from the response
      const logData = response.data?.data; // ✅ Access 'data' inside response
  
      if (!logData || logData.length === 0) {
        console.warn("No log data available.");
        // toast.warning("No log data available for download.");
        return;
      }
  
      console.log("Data fetched successfully:", logData);
  
      // Format the log data into a readable text format
      const logText = logData
        .map((entry: any, index: number) => {
          return [
            `Log Entry ${index + 1}`,
            `----------------------`,
            `Date: ${entry.date}`,
            `Admin ID: ${entry.adminId}`,
            `Username: ${entry.username}`,
            `Name: ${entry.name}`,
            `Email: ${entry.email}`,
            `Action: ${entry.action}`,
            `Status Code: ${entry.statusCode}`,
            `Request Body: ${JSON.stringify(entry.requestBody, null, 2)}`,
            `Response Body: ${JSON.stringify(entry.responseBody, null, 2)}`,
            ``,
          ].join("\n");
        })
        .join("\n"); // Add a blank line between each log entry
  
      // Create a Blob from the formatted log text
      const blob = new Blob([logText], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
  
      // Create an anchor element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "activity-log.txt"; // The file name to download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      console.log("Activity log downloaded successfully!");
      toast.success("Activity log downloaded successfully!");
    } catch (error) {
      console.error("Failed to fetch/download the log file:", error);
      toast.error("Failed to download the log file. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };
  
  /* -----------------------Chart Implementation   ----------------------------------- */
  const chartOptions = {
    chart: {
      type: "donut",
    },
    series: [count_attendance?.present_emp ?? 0, count_attendance?.absent_emp?? 0],
    labels: ["Present", "Absent"],
    colors: ["#665DD9", "#3592FF"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  const barchartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "90%",
        endingShape: "rounded",
      },
    },
    colors: ["#00599C", "#1A91C1", "#01D8FF"],
    xaxis: {
      categories: ["2021", "2022", "2023", "2024"],
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      labels: {
        useSeriesColors: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Central",
        data: [50, 60, 70, 40],
      },
      {
        name: "State",
        data: [10, 30, 30, 55],
      },
      {
        name: "ULB",
        data: [40, 20, 80, 45],
      },
    ],
    toolbar: {
      tools: {
        download: false,
      },
    },
  };

  return (
    <>
      <div className="flex items-center justify-between border-b-2 pb-7 mb-10">
        <div className="flex items-center">
          <PrimaryButton
            buttonType="button"
            variant={"cancel"}
            onClick={goBack}
            className="border-0 bg-transparent hover:bg-transparent hover:text-[#3592FF] flex items-center"
          >
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              >
                <g clipPath="url(#clip0_949_7008)">
                  <path
                    d="M10.6736 7.20536L4 13.9137L10.6736 20.622C10.7339 20.7012 10.8105 20.7665 10.8981 20.8134C10.9858 20.8604 11.0826 20.888 11.1819 20.8943C11.2812 20.9007 11.3806 20.8856 11.4736 20.8501C11.5666 20.8147 11.6508 20.7597 11.7206 20.6888C11.7905 20.618 11.8443 20.533 11.8784 20.4395C11.9125 20.3461 11.9262 20.2464 11.9184 20.1472C11.9107 20.048 11.8817 19.9517 11.8335 19.8646C11.7853 19.7776 11.7189 19.702 11.6389 19.6429L6.64583 14.6081H19.9306C20.1147 14.6081 20.2914 14.535 20.4216 14.4047C20.5518 14.2745 20.625 14.0979 20.625 13.9137C20.625 13.7295 20.5518 13.5529 20.4216 13.4227C20.2914 13.2924 20.1147 13.2193 19.9306 13.2193H6.64583L11.6389 8.18453C11.7687 8.05376 11.8413 7.87677 11.8407 7.69249C11.84 7.50821 11.7662 7.33174 11.6354 7.20189C11.5047 7.07205 11.3277 6.99946 11.1434 7.00012C10.9591 7.00077 10.7826 7.0746 10.6528 7.20536H10.6736Z"
                    fill="#665DD9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_949_7008">
                    <rect
                      width="25"
                      height="25"
                      fill="white"
                      transform="matrix(0 -1 1 0 0 25)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </i>
            Back
          </PrimaryButton>
        </div>
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            HRMS Dashboard
          </SubHeading>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between">
        {/* -----------------------Doughnut graph   ----------------------------------- */}

        <div
          className={`w-auto md:w-2/5 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5  shadow-lg`}
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
              Today&apos;s Attendance
            </div>

            <div className="flex items-center">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="d MMMM , yyyy"
                ref={datePickerRef}
                className="w-[160px] outline-none bg-white"
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

          <div className="w-full flex flex-col sm:flex-row justify-between">
            <div
              className={`w-full md:w-[44.3%] m-1 flex flex-col relative p-5 max-w-[400px]`}
            >
              <ReactApexChart
                options={chartOptions as ApexOptions}
                series={chartOptions.series as ApexOptions["series"]}
                type="donut"
                height={240}
                width={200}
              />
            </div>

            <div className={`w-full md:w-[56.3%] self-end max-w-[800px]`}>
              <div className="w-full flex flex-col sm:flex-row justify-between ">
                <div
                  className={`w-full md:w-[48.5%] flex flex-col items-center justify-center relative border-r-2 border-[#C1C9EB] `}
                >
                  <span className="text-primary_blue text-3xl font-bold">
                    {count_attendance?.present_emp}
                  </span>
                  <InnerTextHeading className="text-center">
                    Total No. of Present Employees
                  </InnerTextHeading>
                </div>

                <div
                  className={`w-full md:w-[48.5%]  flex flex-col items-center justify-center relative`}
                >
                  <span className="text-[#098DA4] text-3xl font-bold">
                    {count_attendance?.absent_emp}
                  </span>
                  <InnerTextHeading className="text-center">
                    Total No. of Absent Employees
                  </InnerTextHeading>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------Barchart graph   ----------------------------------- */}

        <div
          className={`w-auto md:w-2/5 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
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
              Total No. of Employees
            </div>
            <div className="menu flex items-center  top-0 right-0 ">
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </InnerHeading>

          <div className="w-full flex flex-col sm:flex-row justify-between">
            <div
              className={` md:w-[99.9%] m-1 flex flex-col relative p-5 max-w-[400px]`}
            >
              <ReactApexChart
                options={barchartOptions as ApexOptions}
                series={barchartOptions.series}
                type="bar"
                height={250}
                width={400}
              />
            </div>
          </div>
        </div>

        {/* ----------------------- Activity Log   ----------------------------------- */}

        <div
          className={`w-auto md:w-1/5 h-auto sm:w-full mx-5 my-5 flex flex-col relative`}
        >
          {/* First Box - See the Log * Activity */}

          <div
            className={`bg-[#ffffff] h-[50%] p-5 shadow-lg relative z-10 cursor-pointer ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => downloadLog( setLoading)}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
              </div>
            )}
            <InnerHeading className="text-xl flex items-center justify-between">
              <div className="flex items-center">
                <i className="mr-2 bg-primary_blue rounded">
                  {/* Your SVG icon */}
                </i>
              </div>
              <div className="menu flex items-center top-0 right-0">
                <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
              </div>
            </InnerHeading>

            <InnerHeading className="mt-5 text-center justify-center text-[22px]">
              Activity Log
            </InnerHeading>
          </div>

          {/* Second Box - New Title */}

          <Link
            href={emp_list_url}
            className="bg-[#ffffff] h-[50%] p-5  shadow-lg relative z-10 mt-5"
          >
            <InnerHeading className="text-xl flex items-center justify-between">
              <div className="flex items-center">
                <i className="mr-2 bg-primary_blue rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                  >
                    <rect
                      width="27"
                      height="27"
                      rx="8"
                      // fill="#665DD9"
                    />
                    <path
                      d="M16.5685 5.0625C19.7855 5.0625 21.8025 7.06482 21.8025 10.2965V12.2399L21.7967 12.3268C21.7542 12.6394 21.4863 12.8804 21.1621 12.8804H21.1547L21.0536 12.8723C20.9206 12.8508 20.7971 12.7873 20.7017 12.6898C20.5826 12.5679 20.5176 12.403 20.5216 12.2326V10.2965C20.5216 7.74944 19.1156 6.3434 16.5685 6.3434H10.2965C7.74208 6.3434 6.3434 7.74944 6.3434 10.2965V16.5759C6.3434 19.1229 7.74944 20.5216 10.2965 20.5216H16.5685C19.1229 20.5216 20.5216 19.1156 20.5216 16.5759C20.5216 16.2221 20.8083 15.9354 21.1621 15.9354C21.5158 15.9354 21.8025 16.2221 21.8025 16.5759C21.8025 19.8002 19.8002 21.8025 16.5759 21.8025H10.2965C7.06482 21.8025 5.0625 19.8002 5.0625 16.5759V10.2965C5.0625 7.06482 7.06482 5.0625 10.2965 5.0625H16.5685ZM9.87691 11.386C10.0468 11.3918 10.2074 11.4648 10.3234 11.5891C10.4394 11.7134 10.5012 11.8787 10.4953 12.0485V17.4003C10.4831 17.754 10.1864 18.0309 9.83274 18.0187C9.47903 18.0065 9.20218 17.7099 9.21437 17.3562V11.997L9.22578 11.8969C9.25146 11.7656 9.3183 11.6449 9.4179 11.553C9.54241 11.4382 9.70773 11.378 9.87691 11.386ZM13.4619 8.87575C13.8157 8.87575 14.1024 9.16248 14.1024 9.51619V17.3635C14.1024 17.7172 13.8157 18.004 13.4619 18.004C13.1082 18.004 12.8215 17.7172 12.8215 17.3635V9.51619C12.8215 9.16248 13.1082 8.87575 13.4619 8.87575ZM17.0102 14.2128C17.3639 14.2128 17.6506 14.4996 17.6506 14.8533V17.3562C17.6506 17.7099 17.3639 17.9966 17.0102 17.9966C16.6565 17.9966 16.3697 17.7099 16.3697 17.3562V14.8533C16.3697 14.4996 16.6565 14.2128 17.0102 14.2128Z"
                      fill="white"
                      fillOpacity="0.92"
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

            <InnerHeading className="mt-5 text-center justify-center text-[22px]">
              Employee List
            </InnerHeading>
          </Link>
        </div>
      </div>
    </>
  );
};
