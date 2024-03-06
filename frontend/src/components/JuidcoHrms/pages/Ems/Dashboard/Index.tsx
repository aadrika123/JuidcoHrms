/***
 * Author: Jaideep
 * Status: Done
 * Uses: Dashboard details for attendace of employee - Dashboard details page
 */

"use client";
import React from "react";
import {
  SubHeading,
  InnerHeading,
  InnerTextHeading,
} from "@/components/Helpers/Heading";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { ApexOptions } from "apexcharts";

export const DashboardMain = () => {
  {
    /* -----------------------Chart Implementation   ----------------------------------- */
  }

  const chartOptions = {
    chart: {
      type: "donut",
    },
    series: [90, 10],
    labels: ["Present", "Absent"],
    colors: ["#12743B", "#00E640"],
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
        columnWidth: "40%",
        endingShape: "rounded",
      },
    },
    colors: ["#12743B", "#00E640"],
    xaxis: {
      categories: ["2021", "2022", "2023", "2024"],
    },
    legend: {
      show: false,
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

  {
    /* -----------------------Chart Implementation   ----------------------------------- */
  }

  return (
    <>
      <SubHeading className="mx-5 my-5 mb-0 text-4xl">
        Employee Management System
      </SubHeading>
      <div className="w-full flex flex-col sm:flex-row justify-between">
        {/* -----------------------Doughnut graph   ----------------------------------- */}

        <div
          className={`w-auto md:w-2/5 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 rounded-[19.516px] shadow-lg`}
        >
          <InnerHeading className="text-xl flex items-center justify-between">
            <div className="flex items-center">
              <i className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                >
                  <rect width="39" height="39" rx="11.4169" fill="#12743B" />
                  <path
                    d="M24.3866 7.46216C29.0334 7.46216 31.9469 10.3544 31.9469 15.0224V17.8296L31.9384 17.9551C31.8772 18.4066 31.4901 18.7547 31.0218 18.7547H31.0112L30.8651 18.743C30.6731 18.712 30.4946 18.6202 30.3569 18.4794C30.1848 18.3032 30.091 18.0651 30.0967 17.8189V15.0224C30.0967 11.3433 28.0657 9.31234 24.3866 9.31234H15.3271C11.6374 9.31234 9.61706 11.3433 9.61706 15.0224V24.0926C9.61706 27.7717 11.648 29.792 15.3271 29.792H24.3866C28.0764 29.792 30.0967 27.761 30.0967 24.0926C30.0967 23.5816 30.5109 23.1675 31.0218 23.1675C31.5327 23.1675 31.9469 23.5816 31.9469 24.0926C31.9469 28.7499 29.0546 31.6422 24.3973 31.6422H15.3271C10.6591 31.6422 7.76688 28.7499 7.76688 24.0926V15.0224C7.76688 10.3544 10.6591 7.46216 15.3271 7.46216H24.3866ZM14.721 16.5961C14.9664 16.6044 15.1984 16.71 15.366 16.8895C15.5335 17.069 15.6228 17.3077 15.6142 17.5531V25.2835C15.5966 25.7944 15.1681 26.1943 14.6572 26.1767C14.1463 26.1591 13.7464 25.7306 13.764 25.2197V17.4787L13.7805 17.334C13.8176 17.1444 13.9141 16.97 14.058 16.8373C14.2379 16.6715 14.4766 16.5846 14.721 16.5961ZM19.8994 12.9702C20.4103 12.9702 20.8245 13.3844 20.8245 13.8953V25.2303C20.8245 25.7412 20.4103 26.1554 19.8994 26.1554C19.3885 26.1554 18.9743 25.7412 18.9743 25.2303V13.8953C18.9743 13.3844 19.3885 12.9702 19.8994 12.9702ZM25.0246 20.6793C25.5355 20.6793 25.9497 21.0935 25.9497 21.6044V25.2197C25.9497 25.7306 25.5355 26.1448 25.0246 26.1448C24.5137 26.1448 24.0995 25.7306 24.0995 25.2197V21.6044C24.0995 21.0935 24.5137 20.6793 25.0246 20.6793Z"
                    fill="white"
                    fillOpacity="0.92"
                  />
                </svg>
              </i>
              Today&apos;s Attendance
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
                series={chartOptions.series}
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
                  <span className="text-[#12743B] text-3xl font-bold">90</span>
                  <InnerTextHeading className="text-center">
                    Total No. of Present Employees
                  </InnerTextHeading>
                </div>

                <div
                  className={`w-full md:w-[48.5%]  flex flex-col items-center justify-center relative`}
                >
                  <span className="text-[#00E640] text-3xl font-bold">10</span>
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
          className={`w-auto md:w-2/5 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 rounded-[19.516px] shadow-lg`}
        >
          <InnerHeading className="text-xl flex items-center justify-between">
            <div className="flex items-center">
              <i className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                >
                  <rect width="39" height="39" rx="11.4169" fill="#12743B" />
                  <path
                    d="M24.3866 7.46216C29.0334 7.46216 31.9469 10.3544 31.9469 15.0224V17.8296L31.9384 17.9551C31.8772 18.4066 31.4901 18.7547 31.0218 18.7547H31.0112L30.8651 18.743C30.6731 18.712 30.4946 18.6202 30.3569 18.4794C30.1848 18.3032 30.091 18.0651 30.0967 17.8189V15.0224C30.0967 11.3433 28.0657 9.31234 24.3866 9.31234H15.3271C11.6374 9.31234 9.61706 11.3433 9.61706 15.0224V24.0926C9.61706 27.7717 11.648 29.792 15.3271 29.792H24.3866C28.0764 29.792 30.0967 27.761 30.0967 24.0926C30.0967 23.5816 30.5109 23.1675 31.0218 23.1675C31.5327 23.1675 31.9469 23.5816 31.9469 24.0926C31.9469 28.7499 29.0546 31.6422 24.3973 31.6422H15.3271C10.6591 31.6422 7.76688 28.7499 7.76688 24.0926V15.0224C7.76688 10.3544 10.6591 7.46216 15.3271 7.46216H24.3866ZM14.721 16.5961C14.9664 16.6044 15.1984 16.71 15.366 16.8895C15.5335 17.069 15.6228 17.3077 15.6142 17.5531V25.2835C15.5966 25.7944 15.1681 26.1943 14.6572 26.1767C14.1463 26.1591 13.7464 25.7306 13.764 25.2197V17.4787L13.7805 17.334C13.8176 17.1444 13.9141 16.97 14.058 16.8373C14.2379 16.6715 14.4766 16.5846 14.721 16.5961ZM19.8994 12.9702C20.4103 12.9702 20.8245 13.3844 20.8245 13.8953V25.2303C20.8245 25.7412 20.4103 26.1554 19.8994 26.1554C19.3885 26.1554 18.9743 25.7412 18.9743 25.2303V13.8953C18.9743 13.3844 19.3885 12.9702 19.8994 12.9702ZM25.0246 20.6793C25.5355 20.6793 25.9497 21.0935 25.9497 21.6044V25.2197C25.9497 25.7306 25.5355 26.1448 25.0246 26.1448C24.5137 26.1448 24.0995 25.7306 24.0995 25.2197V21.6044C24.0995 21.0935 24.5137 20.6793 25.0246 20.6793Z"
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

          <div className="bg-[#ffffff] h-[50%] p-5 rounded-[19.516px] shadow-lg relative z-10">
            <InnerHeading className="text-xl flex items-center justify-between">
              <div className="flex items-center">
                <i className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="39"
                    height="39"
                    viewBox="0 0 39 39"
                    fill="none"
                  >
                    <rect width="39" height="39" rx="11.4169" fill="#12743B" />
                    <path
                      d="M24.3866 7.46216C29.0334 7.46216 31.9469 10.3544 31.9469 15.0224V17.8296L31.9384 17.9551C31.8772 18.4066 31.4901 18.7547 31.0218 18.7547H31.0112L30.8651 18.743C30.6731 18.712 30.4946 18.6202 30.3569 18.4794C30.1848 18.3032 30.091 18.0651 30.0967 17.8189V15.0224C30.0967 11.3433 28.0657 9.31234 24.3866 9.31234H15.3271C11.6374 9.31234 9.61706 11.3433 9.61706 15.0224V24.0926C9.61706 27.7717 11.648 29.792 15.3271 29.792H24.3866C28.0764 29.792 30.0967 27.761 30.0967 24.0926C30.0967 23.5816 30.5109 23.1675 31.0218 23.1675C31.5327 23.1675 31.9469 23.5816 31.9469 24.0926C31.9469 28.7499 29.0546 31.6422 24.3973 31.6422H15.3271C10.6591 31.6422 7.76688 28.7499 7.76688 24.0926V15.0224C7.76688 10.3544 10.6591 7.46216 15.3271 7.46216H24.3866ZM14.721 16.5961C14.9664 16.6044 15.1984 16.71 15.366 16.8895C15.5335 17.069 15.6228 17.3077 15.6142 17.5531V25.2835C15.5966 25.7944 15.1681 26.1943 14.6572 26.1767C14.1463 26.1591 13.7464 25.7306 13.764 25.2197V17.4787L13.7805 17.334C13.8176 17.1444 13.9141 16.97 14.058 16.8373C14.2379 16.6715 14.4766 16.5846 14.721 16.5961ZM19.8994 12.9702C20.4103 12.9702 20.8245 13.3844 20.8245 13.8953V25.2303C20.8245 25.7412 20.4103 26.1554 19.8994 26.1554C19.3885 26.1554 18.9743 25.7412 18.9743 25.2303V13.8953C18.9743 13.3844 19.3885 12.9702 19.8994 12.9702ZM25.0246 20.6793C25.5355 20.6793 25.9497 21.0935 25.9497 21.6044V25.2197C25.9497 25.7306 25.5355 26.1448 25.0246 26.1448C24.5137 26.1448 24.0995 25.7306 24.0995 25.2197V21.6044C24.0995 21.0935 24.5137 20.6793 25.0246 20.6793Z"
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
              See the Log *<br /> Activity
            </InnerHeading>
          </div>

          {/* Second Box - New Title */}

          <div className="bg-[#ffffff] h-[50%] p-5 rounded-[19.516px] shadow-lg relative z-10 mt-5">
            <InnerHeading className="text-xl flex items-center justify-between">
              <div className="flex items-center">
                <i className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="39"
                    height="39"
                    viewBox="0 0 39 39"
                    fill="none"
                  >
                    <rect width="39" height="39" rx="11.4169" fill="#12743B" />
                    <path
                      d="M24.3866 7.46216C29.0334 7.46216 31.9469 10.3544 31.9469 15.0224V17.8296L31.9384 17.9551C31.8772 18.4066 31.4901 18.7547 31.0218 18.7547H31.0112L30.8651 18.743C30.6731 18.712 30.4946 18.6202 30.3569 18.4794C30.1848 18.3032 30.091 18.0651 30.0967 17.8189V15.0224C30.0967 11.3433 28.0657 9.31234 24.3866 9.31234H15.3271C11.6374 9.31234 9.61706 11.3433 9.61706 15.0224V24.0926C9.61706 27.7717 11.648 29.792 15.3271 29.792H24.3866C28.0764 29.792 30.0967 27.761 30.0967 24.0926C30.0967 23.5816 30.5109 23.1675 31.0218 23.1675C31.5327 23.1675 31.9469 23.5816 31.9469 24.0926C31.9469 28.7499 29.0546 31.6422 24.3973 31.6422H15.3271C10.6591 31.6422 7.76688 28.7499 7.76688 24.0926V15.0224C7.76688 10.3544 10.6591 7.46216 15.3271 7.46216H24.3866ZM14.721 16.5961C14.9664 16.6044 15.1984 16.71 15.366 16.8895C15.5335 17.069 15.6228 17.3077 15.6142 17.5531V25.2835C15.5966 25.7944 15.1681 26.1943 14.6572 26.1767C14.1463 26.1591 13.7464 25.7306 13.764 25.2197V17.4787L13.7805 17.334C13.8176 17.1444 13.9141 16.97 14.058 16.8373C14.2379 16.6715 14.4766 16.5846 14.721 16.5961ZM19.8994 12.9702C20.4103 12.9702 20.8245 13.3844 20.8245 13.8953V25.2303C20.8245 25.7412 20.4103 26.1554 19.8994 26.1554C19.3885 26.1554 18.9743 25.7412 18.9743 25.2303V13.8953C18.9743 13.3844 19.3885 12.9702 19.8994 12.9702ZM25.0246 20.6793C25.5355 20.6793 25.9497 21.0935 25.9497 21.6044V25.2197C25.9497 25.7306 25.5355 26.1448 25.0246 26.1448C24.5137 26.1448 24.0995 25.7306 24.0995 25.2197V21.6044C24.0995 21.0935 24.5137 20.6793 25.0246 20.6793Z"
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
              List of *<br /> Employees
            </InnerHeading>
          </div>
        </div>
      </div>
    </>
  );
};
