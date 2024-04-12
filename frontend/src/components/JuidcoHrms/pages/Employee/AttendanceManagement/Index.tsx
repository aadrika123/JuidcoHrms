/**
 * Author : Krish
 * status: Open
 * Use: Employee Attendance Management
 */

"use client";

import { InnerHeading, SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
// import ManagerIcon from "@/assets/icons/manager 1.png";
import EmployeeIcon from "@/assets/icons/employee 1.png";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import HorizontalStepper from "@/components/Helpers/Widgets/Stepper";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import { HRMS_URL } from "@/utils/api/urls";
import HolidayIcon from "@/assets/svg/icons/holiday.svg";
import TableListContainer from "@/components/global/organisms/TableListContainer";
import { COLUMNS } from "@/components/global/organisms/TableListContainer";
import Loader from "@/components/global/atoms/Loader";

// function formatDate(timestamp: string) {
//   const date = new Date(timestamp);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
//   const day = String(date.getDate()).padStart(2, "0");
//   const formattedDate = `${year}-${month}-${day}`;
//   return formattedDate;
// }

const AttendanceManagement = () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("./Segments/MapIndex"), {
        loading: () => (
          <div
            className="bg-slate-100 animate-pulse rounded-lg"
            style={{ height: "35vh", width: "100%" }}
          >
            <Loader />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  function formatDate(timestamp: string) {
    const time1 = new Date(timestamp);

    const timeZoneFromDB = -0.0; //time zone value from database
    //get the timezone offset from local time in minutes
    const tzDifference = timeZoneFromDB * 60 + time1.getTimezoneOffset();
    //convert the offset to milliseconds, add to targetTime, and make a new Date
    const date = new Date(time1.getTime() + tzDifference * 60 * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate, "dvkmd");
    return formattedDate;
  }

  const Calendar = React.useMemo(
    () =>
      dynamic(() => import("./Segments/CalendarIndex"), {
        loading: () => (
          <div
            className="bg-slate-100 animate-pulse rounded-l transition-all"
            style={{ height: "50vh", width: "100%" }}
          >
            <Loader />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const [selectedMonth, setSelectedMonth] = useState("fsdf");
  const [attndData, setAttnd] = useState<any>();
  const [attndDataHistory, setAttndHistory] = useState<any>();
  const [eventList, setEventList] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>();
  const [employeeDetails, setEmployeeDetails] = useState<any>();
  const [department, setDepartment] = useState<any[]>([]);

  // ----------->> GET CURRENT USER DETAILS <<--------------------------------//
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("user_details");
      const userDetails = JSON.parse(data as string);
      setUserDetails(userDetails);
    }
  }, []);

  console.log(userDetails);
  // ----------->> EMPLOYEE ATTENDANCE DETAILS <<--------------------------------//
  const fetchAttendance = async (emp_id: string) => {
    const res = await axios({
      url: `${HRMS_URL.ATTENDANCE.get}?emp_id=${emp_id}`,
      method: "GET",
    });

    const res2 = await axios({
      url: `${HRMS_URL.ATTENDANCE.getAll}?emp_id=${emp_id}`,
      method: "GET",
    });

    const data = res.data?.data?.data;
    const data2 = res2.data?.data?.data;
    setAttndHistory(data2);
    setAttnd(data);
  };

  console.log(attndData, "main_atnd");

  // ----------->> FILTER ATTENDANCE FOR CALENDAR <<--------------------------------//

  function getSelectedMonthFromCalendar(month: string) {
    setSelectedMonth(month);
  }

  const filterAttendanceorCalendar = () => {
    const events: any = [];

    attndData?.map((element: any) => {
      if (
        element?.status !== 1 &&
        element?.status !== 2 &&
        element?.status !== 3 &&
        element?.status !== 4
      ) {
        events.push({
          title: "",
          date: formatDate(element.date),
          display: "background",
          color: "red",
        });
      } else if (element?.status === 1) {
        events.push({
          title: "",
          date: formatDate(element.date),
          display: "background",
          color: "orange",
        });
      } else if (element?.status === 2) {
        events.push({
          title: "",
          date: formatDate(element.date),
          display: "background",
          color: "green",
        });
      } else if (element?.status === 3) {
        events.push({
          title: "",
          date: formatDate(element.date),
          display: "background",
          color: "blue",
        });
      } else if (element?.status === 4) {
        events.push({
          title: "",
          date: formatDate(element.date),
          display: "background",
          color: "white",
        });
      }
    });

    return events;
  };

  React.useEffect(() => {
    fetchAttendance(userDetails?.emp_id);
  }, [userDetails?.emp_id]);

  React.useEffect(() => {
    const events = filterAttendanceorCalendar();
    setEventList(events);
  }, [attndData]);

  const data = [
    {
      id: 1,
      label: "Less than 8 hour",
      bgColor: "bg-[#FFFBEB]",
      buttonColor: "bg-[#F59E0B]",
    },
    {
      id: 2,
      label: "8 hour working",
      bgColor: "bg-[#FDF4FF]",
      buttonColor: "bg-[#12743B]",
    },
    {
      id: 3,
      label: "Absent",
      bgColor: "bg-[#FEF2F2]",
      buttonColor: "bg-[#DC2626]",
    },
    {
      id: 4,
      label: "Leaves Approved",
      bgColor: "bg-[#F0FFF5]",
      buttonColor: "bg-[#1560BD]",
    },
    {
      id: 5,
      label: "others",
      bgColor: "bg-[#F6F6F6]",
      buttonColor: "bg-[#4A4A4A]",
    },
  ];

  // ----------->> FILTER HOLIDAY DETAILS <<--------------------------------//
  const fetchData = async (endpoint: string) => {
    if (endpoint === "null") return [];
    const res = await axios({
      url: `${endpoint}`,
      method: "GET",
    });
    // setLoading(false);
    return res.data?.data?.data;
  };
  const useCodeQuery = (endpoint: string) => {
    return useQuery([endpoint], () => fetchData(endpoint));
  };
  const { data: holidays2024 = [], isLoading } = useCodeQuery(
    `${HRMS_URL.HOLIDAY.get}`
  );

  const filterHolidays = selectedMonth
    ? holidays2024.filter(
        (holidays: any) => holidays.date.substring(0, 7) === selectedMonth
      )
    : [];

  const steps = [
    { title: "Rina Jha" },
    { title: "csdc" },
    { title: "cscgf" },
    { title: "Mlkdvm" },
  ];
  const activeStep = 1;

  //---------------------->> EMPLOYEE LOG TIME <<-----------------------------//

  //---------------------->> EMPLOYEE BASIC DETAILS <<-----------------------------//

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${HRMS_URL.DEPARTMENT.get}`,
        method: "GET",
      });
      const data = res?.data?.data?.data;
      setDepartment(data);
    })();
  }, [userDetails?.emp_id]);

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${HRMS_URL.EMS.getById}/${userDetails?.emp_id}`,
        method: "GET",
      });
      const data = res?.data?.data;
      setEmployeeDetails(data);
    })();
  }, [userDetails?.emp_id]);

  const EMP_LIST_COLS: COLUMNS[] = [
    {
      HEADER: "Employee In",
      ACCESSOR: "emp_in",
      TYPE: "time",
    },
    {
      HEADER: "Employee Out",
      ACCESSOR: "emp_out",
      TYPE: "time",
    },
    {
      HEADER: "Date",
      ACCESSOR: "date",
      TYPE: "date",
    },
  ];

  // const log_data = [
  //   {
  //     emp_in: "10:00 AM",
  //     emp_out: "07:00 PM",
  //     created_at: "2024-04-03",
  //   },
  // ];

  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Employee Dashboard
          </SubHeading>
        </div>
      </div>

      <section className="grid grid-cols-7 gap-4">
        <div className="col-span-3 grid grid-row-2 w-full max-h-[50rem] shadow-md p-6">
          <div className="w-full h-full ">
            <div className="w-full flex items-center justify-between ">
              <div className="flex items-center gap-3">
                <span className="w-16 h-16 rounded-full border border-primary_blue overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src={EmployeeIcon}
                    alt="emp"
                  />
                </span>

                <h2 className=" text-secondary font-medium text-[1.7em]">
                  Welcome to HRMS {userDetails?.name}
                </h2>
              </div>

              <button>
                <span className=" text-secondary">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Menu_Kebab">
                      <path d="M14.5,12c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,-0 -2.5,-1.12 -2.5,-2.5c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,-0 2.5,1.12 2.5,2.5Zm-1,-0c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,-0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5c0.828,-0 1.5,-0.672 1.5,-1.5Z"></path>
                      <path d="M14.5,4.563c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,-0 -2.5,-1.12 -2.5,-2.5c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,-0 2.5,1.12 2.5,2.5Zm-1,-0c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,-0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5c0.828,-0 1.5,-0.672 1.5,-1.5Z"></path>
                      <path d="M14.5,19.437c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,0 -2.5,-1.12 -2.5,-2.5c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,0 2.5,1.12 2.5,2.5Zm-1,0c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5c0.828,0 1.5,-0.672 1.5,-1.5Z"></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
            <section className="flex gap-3 ">
              <aside className="w-[55%] mt-12 flex flex-col gap-3 font-medium">
                <h4 className="text-secondary ">
                  Employment ID - {userDetails?.emp_id}
                </h4>
                <h4 className="text-secondary">
                  Role - {userDetails?.role[0]}
                </h4>
                <h4 className="text-secondary">
                  Task- {employeeDetails?.emp_join_details?.task}
                </h4>
                <h4 className="text-secondary">
                  Department-{" "}
                  {
                    department[employeeDetails?.emp_join_details?.department_id]
                      ?.name
                  }
                </h4>
              </aside>
              <div className="w-full ">
                <div className="mt-12">
                  <HorizontalStepper steps={steps} activeStep={activeStep} />
                  <div className="mt-2 px-2  pr-4 flex items-center justify-between text-xs text-secondary">
                    <h2>{userDetails?.name}</h2>
                    <h2>sadads</h2>
                    <h2>Ijcasd</h2>
                    <h2>dca</h2>
                  </div>
                </div>

                {/* <div className="w-full mt-6  flex border-b-2 border-primary_blue items-end justify-between">
                  <span>
                    <Image src={EmployeeIcon} alt="emp" />
                  </span>
                  <span>
                    <Image className="w-[3.5em]" src={ManagerIcon} alt="emp" />
                  </span>
                  <span>
                    <Image className="w-[4em]" src={ManagerIcon} alt="emp" />
                  </span>
                  <span>
                    <Image className="w-[4.5em]" src={ManagerIcon} alt="emp" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-secondary">
                  <h2>Employee</h2>
                  <h2>Manager-1</h2>
                  <h2>Manager-2</h2>
                  <h2>Manager-3</h2>
                </div> */}
              </div>
            </section>
          </div>
          <div className="w-full h-full overflow-hidden rounded-lg">
            <Map />
          </div>
        </div>
        <div className=" col-span-4 w-full h-full shadow-md p-8">
          <InnerHeading className="text-[1.7em] font-medium w-full flex items-center justify-between">
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
              Calendar
            </div>
            <div className="menu flex items-center  top-0 right-0 ">
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </InnerHeading>

          <div className="mt-6 grid grid-cols-2">
            <div className=" rounded-lg text-secondary">
              <Suspense fallback={<Loader />}>
                <Calendar
                  eventList={eventList}
                  setSelectedMonth={getSelectedMonthFromCalendar}
                />
              </Suspense>
            </div>

            <div className="px-6">
              <div className="">
                <div className="font-bold mb-4 text-secondary">Category</div>
                <div className="flex flex-wrap">
                  {data.map((item) => (
                    <div
                      key={item.id}
                      className={`${item.bgColor} flex rounded-full items-center h-6 px-2 py-4 mb-2 whitespace-nowrap`}
                    >
                      <span
                        className={`${item.buttonColor} rounded-full w-5 h-5`}
                      ></span>
                      <span className="rounded-full py-2 m-2 text-xs">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="font-bold mb-4 mt-8 text-secondary">
                  Holidays List
                </div>
                <div className="flex flex-wrap">
                  {isLoading ? (
                    <>
                      {[1, 2, 3, 4]?.map((index: number) => (
                        <div
                          key={index}
                          className="bg-indigo-200 text-secondary flex rounded-full items-center w-32 h-6 p-3 py-6 mb-3 ml-3 animate-pulse"
                        ></div>
                      ))}
                    </>
                  ) : selectedMonth && filterHolidays.length < 1 ? (
                    <span>No holidays this month.</span>
                  ) : (
                    filterHolidays?.map((holiday: any, index: number) => (
                      <div
                        key={index}
                        className="bg-indigo-200 text-secondary flex rounded-full items-center h-6 p-3 py-6 mb-3 ml-3"
                      >
                        <span className="rounded-full w-5 h-5">
                          <Image src={HolidayIcon} alt="emp" />
                        </span>
                        <span className="rounded-full py-2 m-2 text-center text-xs">
                          {holiday.date} <br /> {holiday.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[4rem]">
        <h2 className="text-[1.63544rem] text-secondary font-semibold">
          Log Time
        </h2>
        <div>
          <div className="mt-2">
            <TableListContainer
              columns={EMP_LIST_COLS}
              tableData={attndDataHistory || []}
              sl_no
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AttendanceManagement;
