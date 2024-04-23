import React from "react";
import Image from "next/image";
import { SidebarLinksProps } from "@/utils/types/types";
import HomeIcon from "@/assets/icons/sidebar/hrms.svg";
import AttendanceIcon from "@/assets/icons/sidebar/attendance.svg";
import LeaveIcon from "@/assets/icons/emp_sidebar/leave.svg";
import ApplicatonIcon from "@/assets/icons/emp_sidebar/application.svg";
import HolidayIcon from "@/assets/icons/emp_sidebar/holiday.svg";
import PayrollIcon from "@/assets/icons/emp_sidebar/payroll.svg";
import PayslipIcon from "@/assets/icons/emp_sidebar/payslip.svg";
import SurveyIcon from "@/assets/icons/emp_sidebar/survey.svg";
import AppraisalIcon from "@/assets/icons/emp_sidebar/apprasel.svg";
import GrivIcon from "@/assets/icons/emp_sidebar/griv.svg";
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
      dropdown: true,
      subModules: [
        {
          dropdown: false,
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
          icon: (
            <Image src={LeaveIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}/employee/leave-management`,
        },
        {
          moduleName: "Payroll",
          icon: (
            <Image src={PayrollIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
          
        },
        {
          moduleName: "Download Pay slip",
          icon: (
            <Image src={PayslipIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}/download/payslip_from`,
          // subModules: [
          //   {
          //     moduleName: "Dowload_from",
          //     icon: (
          //       <Image
          //         src={AttendanceIcon}
          //         alt="masters"
          //         width={100}
          //         height={100}
          //       />
          //     ),
          //     path: `${url}/download/payslip_from`,
          //   },
            
          // ],
        }

        
        ,
        {
          moduleName: "Applications",
          icon: (
            <Image
              src={ApplicatonIcon}
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: `${url}/payroll/claim_form`,
          subModules: [
            {
              moduleName: "Claims",
              icon: (
                <Image
                  src={AttendanceIcon}
                  alt="masters"
                  width={100}
                  height={100}
                />
              ),
              path: `${url}/payroll/claim_form`,
            },
          ],
        },
        {
          moduleName: "Grievances",
          icon: <Image src={GrivIcon} alt="masters" width={100} height={100} />,
          path: `${url}`,
        },
        {
          moduleName: "Appraisal",
          icon: (
            <Image src={AppraisalIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Survey & Feedback",
          icon: (
            <Image src={SurveyIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
        },

        {
          moduleName: "Holiday List",
          icon: (
            <Image src={HolidayIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}`,
        },
        {
          moduleName: "Graduity",
          icon: (
            <Image src={HolidayIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}/pension/gratuity_form`,
        },

        {
          moduleName: "Pension",
          icon: (
            <Image src={HolidayIcon} alt="masters" width={100} height={100} />
          ),
          path: `${url}/pension/leave_encashment`,
        },
        {
            moduleName: "Team Management",
            icon: (
                <Image src={HolidayIcon} alt="masters" width={100} height={100} />
            ),
            path: `${url}`,
            dropdown: false,
        },
      ],
    },
  ],
};
