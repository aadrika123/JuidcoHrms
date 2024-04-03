import React from "react";
import Image from "next/image";
import { SidebarLinksProps } from "@/utils/types/types";
import HomeIcon from "@/assets/icons/sidebar/hrms.svg";
import AttendanceIcon from "@/assets/icons/sidebar/attendance.svg";
import LeaveIcon from "@/assets/icons/emp_sidebar/leave.svg";
// interface UrlTypes {
//   uri: string;
// }

// const URLS: UrlTypes[] = [{
//   name: "/"
// }];
const url = "";

export const EmployeeSidebarLinks: SidebarLinksProps = {
  modules: [
    {
      moduleName: "HRMS",
      path: "/",
      icon: <Image src={HomeIcon} alt="finance" width={100} height={100} />,
      subModules: [
        {
          dropdown: false,
          moduleName: "Employee",
          icon: (
            <Image src={LeaveIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
          subModules: [
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
              path: `${url}/employee/attendance-management`,
            },
            {
              moduleName: "Apply for Leave",
              path: `${url}/employee/leave-management`,
              icon: (
                <Image src={LeaveIcon} alt="masters" width={100} height={100} />
              ),
            },
          ],
        },
        {
          moduleName: "Payroll",
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
      ],
    },
  ],
};
