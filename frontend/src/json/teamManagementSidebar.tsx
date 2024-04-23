import React from "react";
import Image from "next/image";
import { SidebarLinksProps } from "@/utils/types/types";
import HolidayIcon from "@/assets/icons/emp_sidebar/holiday.svg";
// interface UrlTypes {
//   uri: string;
// }

// const URLS: UrlTypes[] = [{
//   name: "/"
// }];
const url = "";

export const TMSidebarLinks: SidebarLinksProps = {
    modules: [

        {
            moduleName: "Team Management",
            icon: (
                <Image src={HolidayIcon} alt="masters" width={100} height={100} />
            ),
            path: `${url}/supervisor/leave-approval`,
            dropdown: true,
            subModules: [
                {
                    moduleName: "Assign Task",
                    icon: (
                        <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                    ),
                    path: `${url}`,
                    dropdown: true,
                    subModules: [
                        {
                            moduleName: "Assign Multiple Tasks",
                            icon: (
                                <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                            ),
                            path: `${url}`,
                        },
                    ]
                },
                {
                    moduleName: "Approvals",
                    icon: (
                        <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                    ),
                    path: `${url}`,
                    dropdown: true,
                    subModules: [
                        {
                            moduleName: "Leave",
                            icon: (
                                <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                            ),
                            path: `${url}/supervisor/leave-approval`,
                        },
                        {
                            moduleName: "Traning",
                            icon: (
                                <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                            ),
                            path: `${url}`,
                        },
                        {
                            moduleName: "Claims",
                            icon: (
                                <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                            ),
                            path: `${url}`,
                        },
                        {
                            moduleName: "Time Sheet",
                            icon: (
                                <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                            ),
                            path: `${url}`,
                        },
                    ]
                },
                {
                    moduleName: "Performance Review",
                    icon: (
                        <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                    ),
                    path: `${url}`,
                },
                {
                    moduleName: "Request to HR",
                    icon: (
                        <Image src={HolidayIcon} alt="masters" width={100} height={100} />
                    ),
                    path: `${url}`,
                },
            ],
        },
    ],
};
