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
              src="/icons/sidebar/masters.svg"
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
      ],
    },
  ],
};
