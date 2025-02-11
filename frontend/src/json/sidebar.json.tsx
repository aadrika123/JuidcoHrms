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
      dropdown: true,
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
          dropdown: true,
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
        // {
        //   moduleName: "Attendance Management",
        //   icon: (
        //     <Image
        //       src={AttendanceIcon}
        //       alt="masters"
        //       width={100}
        //       height={100}
        //     />
        //   ),
        //   path: `${url}/comingsoon`,
        // },
        // {
        //   moduleName: "Leave Management",
        //   icon: (
        //     <Image src={LeaveIcon} alt="masters" width={100} height={100} />
        //   ),
        //   path: `${url}`,
        //   dropdown: true,
        //   subModules: [
        //     {
        //       moduleName: "Leave Encashment",
        //       path: `${url}/pension/leave_encashment`,
        //       icon: (
        //         <Image
        //           src={DashboardIcon}
        //           alt="masters"
        //           width={100}
        //           height={100}
        //         />
        //       ),
        //     },
        //   ],
        // },
        {
          moduleName: "Payroll Management",
          icon: (
            <Image src={PayrollIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
          dropdown: true,
          subModules: [
            {
              moduleName: "Payroll",
              path: `${url}/ems/payroll-management`,
              icon: (
                <Image
                  src={PayrollIcon}
                  alt="payroll"
                  width={100}
                  height={100}
                />
              ),
            },
          ],
        },
        // {
        //   moduleName: "Suspension Management",
        //   icon: (
        //     <Image
        //       src={SuspensionIcon}
        //       alt="masters"
        //       width={100}
        //       height={100}
        //     />
        //   ),
        //   path: `${url}/comingsoon`,
        // },
        // {
        //   moduleName: "Loan Management",
        //   icon: <Image src={LoanIcon} alt="masters" width={100} height={100} />,
        //   path: `${url}/comingsoon`,
        // },
        // {
        //   moduleName: "Termination Management",
        //   icon: (
        //     <Image
        //       src={TerminationIcon}
        //       alt="masters"
        //       width={100}
        //       height={100}
        //     />
        //   ),
        //   path: `${url}/comingsoon`,
        // },
        {
          moduleName: "Pension Management",
          icon: (
            <Image src={PensionIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
          dropdown: true,
          subModules: [
            {
              moduleName: "Pension Management",
              path: `${url}/ems/pension-management`,
              icon: (
                <Image
                  src={PensionIcon}
                  alt="pension"
                  width={100}
                  height={100}
                />
              ),
            },
            {
              moduleName: "Processed Pension",
              path: `${url}/ems/processed-pension`,
              icon: (
                <Image
                  src={PensionIcon}
                  alt="pension"
                  width={100}
                  height={100}
                />
              ),
            },
          ],

          // path: `${url}/pension/gratuity_from`,

          // subModules: [
          //   {
          //     moduleName: "Dashboard",
          //     path: `${url}/ems/dashboard`,
          //     icon: (
          //       <Image
          //         src={DashboardIcon}
          //         alt="masters"
          //         width={100}
          //         height={100}
          //       />
          //     ),
          //   },

          // ],
        },
        // {
        //   moduleName: "Grievance Management",
        //   icon: (
        //     <Image src={GrievanceIcon} alt="masters" width={100} height={100} />
        //   ),
        //   path: `${url}/comingsoon`,
        // },
      ],
    },
  ],
};
