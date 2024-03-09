import React from "react";
import Image from "next/image";
import { SidebarLinksProps } from "@/utils/types/types";

// interface UrlTypes {
//   uri: string;
// }

// const URLS: UrlTypes[] = [{
//   name: "/"
// }];
const url = "/hrms";

export const sidebarLinks: SidebarLinksProps = {
  modules: [
    {
      moduleName: "HRMS",
      path: "/",
      icon: (
        <Image
          src="/icons/sidebar/finance.svg"
          alt="finance"
          width={100}
          height={100}
        />
      ),
      subModules: [
        {
          moduleName: "Employee Management",
          icon: (
            <Image
              src="/icons/sidebar/employee.svg"
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}/ems/onboard`,
          subModules: [
            { moduleName: "Dashboard", path: `${url}/ems/dashboard` },
            { moduleName: "On Board", path: `${url}/ems/onboard` },
          ],
          
        },
        {
          moduleName: "Attendance Management",
          icon: (
            <Image
              src="/icons/sidebar/attendance.svg"
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
            <Image
              src="/icons/sidebar/leave.svg"
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Payroll Management",
          icon: (
            <Image
              src="/icons/sidebar/payroll.svg"
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Suspension & Termination Management",
          icon: (
            <Image
              src="/icons/sidebar/suspension.svg"
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Loan Management",
          icon: (
            <Image
              src="/icons/sidebar/loan.svg"
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Grievance Management",
          icon: (
            <Image
              src="/icons/sidebar/termination.svg"
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
            <Image
              src="/icons/sidebar/pension.svg"
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}`,
        },
        
      
        
      ],

    },
  ],
};
