import React from "react";
import Image from "next/image";
import { SidebarLinksProps } from "@/utils/types/types";
import HomeIcon from "@/assets/icons/sidebar/hrms.svg";
import EmployeeManagementIcon from "@/assets/icons/sidebar/employee.svg";
import DashboardIcon from "@/assets/icons/sidebar/ion_home.svg";
import OnBoardIcon from "@/assets/icons/sidebar/mdi_user-add.svg";
import AttendanceIcon from "@/assets/icons/sidebar/attendance.svg";
import LeaveIcon from "@/assets/icons/sidebar/leave.svg";
import PayrollIcon from "@/assets/icons/sidebar/payroll.svg";
import SuspensionIcon from "@/assets/icons/sidebar/suspension.svg";
import LoanIcon from "@/assets/icons/sidebar/loan.svg";
import TerminationIcon from "@/assets/icons/sidebar/termination.svg";
import PensionIcon from "@/assets/icons/sidebar/pension.svg";
import GrievanceIcon from "@/assets/icons/sidebar/grievance.svg";

// interface UrlTypes {
//   uri: string;
// }

// const URLS: UrlTypes[] = [{
//   name: "/"
// }];
const url = "";

export const sidebarLinks: SidebarLinksProps = {
  modules: [
    {
      moduleName: "HRMS",
      path: "/",
      icon: <Image src={HomeIcon} alt="finance" width={100} height={100} />,
      dropdown: false,
      subModules: [
        {
          moduleName: "Employee Management",
          icon: (
            <Image
              src={EmployeeManagementIcon}
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}/ems/onboard`,
          subModules: [
            {
              moduleName: "Dashboard",
              path: `${url}/ems/dashboard`,
              icon: (
                <Image
                  src={DashboardIcon}
                  alt="masters"
                  width={100}
                  height={100}
                />
              ),
            },
            {
              moduleName: "On Board",
              path: `${url}/ems/onboard`,
              icon: (
                <Image
                  src={OnBoardIcon}
                  alt="masters"
                  width={100}
                  height={100}
                />
              ),
            },
          ],
        },
        {
          moduleName: "Attendance Management",
          icon: (
            <Image
              src={AttendanceIcon}
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Leave Management",
          icon: (
            <Image src={LeaveIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Payroll Management",
          icon: (
            <Image src={PayrollIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Suspension Management",
          icon: (
            <Image
              src={SuspensionIcon}
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Loan Management",
          icon: <Image src={LoanIcon} alt="masters" width={100} height={100} />,
          path: `${url}`,
        },
        {
          moduleName: "Termination Management",
          icon: (
            <Image
              src={TerminationIcon}
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Pension Management",
          icon: (
            <Image src={PensionIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Grievance Management",
          icon: (
            <Image src={GrievanceIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
        },
      ],
    },
  ],
};
