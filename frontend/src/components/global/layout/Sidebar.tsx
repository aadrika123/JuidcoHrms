"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/json/sidebar.json";
import { EmployeeSidebarLinks } from "@/json/employee_sidebar";
import { TMSidebarLinks } from "@/json/teamManagementSidebar"
import { usePathname } from "next/navigation";
import { InnerHeading } from "@/components/Helpers/Heading";
import ProfileIcon from "@/assets/icons/profile_new.png";

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

const Sidebar: React.FC<SideBarProps> = (props) => {
  const pathName = usePathname();
  const [data, setData] = useState<string | null>();
  const [sidebarLink, setSidebarLink] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const [isTeamManagementOpen, setIsTeamManagementOpen] = useState<boolean>(false);

  useEffect(() => {
    setData(localStorage.getItem("openPage"));
  }, []);
  const handleClick = (moduleName: string) => {
    localStorage.setItem("openPage", moduleName);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("user_details");
      const user_details = JSON.parse(data as string);
      console.log(user_details, "user");
      if (isTeamManagementOpen) {
        setSidebarLink(TMSidebarLinks)
    } else {
        if (user_details?.user_type !== "Employee") {
            setSidebarLink(sidebarLinks);
        } else {
            if (user_details.id !== 72) {
                let updatedSubModules: any
                updatedSubModules = EmployeeSidebarLinks?.modules[0]?.subModules?.filter(module => module.moduleName !== 'Team Management');
                EmployeeSidebarLinks.modules[0].subModules = updatedSubModules
                setSidebarLink(EmployeeSidebarLinks);
            } else {
                setSidebarLink(EmployeeSidebarLinks);
            }

        }
    }
    }
  }, [isTeamManagementOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("user_details");
      const user_details = JSON.parse(data as string);
      setUserDetails(user_details);
    }
  }, []);

  const TMSidebarOpen = (name:any) => {
    if (name === 'Team Management') {
        setIsTeamManagementOpen(true)
        console.log(name)
    }
}

  return (
    <div className={`${props.className} ${data === "UD&HD" ? "hidden" : ""}`}>
      <div {...props}>
        <section>
          <div className="flex flex-col items-center justify-center p-5">
            {/* <Image src="/logo/jh-logo.png" width={100} height={100} alt="logo" /> */}
            <Image src={ProfileIcon} width={100} height={100} alt="logo" />
            <br />
            <InnerHeading className="font-bold">
              {userDetails?.user_type}
            </InnerHeading>
            <InnerHeading>{userDetails?.name}</InnerHeading>

            {isTeamManagementOpen && (
                <p onClick={() => setIsTeamManagementOpen(false)} className="border-2 text-zinc-800 rounded-sm p-1 cursor-pointer"> {'<-'} Back to main menu</p>
            )}

          </div>

          <div>
            {sidebarLink?.modules?.map((link: any, index: number) => {
              return (
                <div key={index}>
                  <ul className="w-full menu menu-xs p-0 overflow-y-scroll">
                    <ul className="h-lvh">
                      <li>
                        <details open className="w-full ">
                          <summary className="text-[1.125rem] p-2 px-6  whitespace-nowrap bg-[#4338CA] hover:bg-[#4338CA] rounded-none font-semibold text-white">
                            <i className="w-8 bg-white rounded-md p-1">
                              {link.icon}
                            </i>
                            {link.moduleName}
                          </summary>
                          <ul>
                            {link.subModules?.map((sub: any, index: number) => (
                              <li key={index} className="mt-5 w-[90%] " onClick={() => TMSidebarOpen(sub.moduleName)}>
                                {sub.dropdown === true ? (
                                  <details open={data === sub?.moduleName}>
                                    <summary
                                      className={`${
                                        data === sub?.moduleName
                                          ? "bg-[#4338CA] text-white m-2"
                                          : "bg-transparent text-zinc-600"
                                      } ml-2 text-[0.9375rem] p-1 pr-4 hover:bg-[#4338CA] hover:text-white font-semibold`}
                                    >
                                      <i className="w-8 rounded-md p-1.5 bg-[#4338CA] ">
                                        {sub.icon}
                                      </i>
                                      {sub.moduleName}
                                    </summary>
                                    <div className="bg-[#E2DFFD] p-1 m-2 mt-[-8px] ">
                                      <ul>
                                        {sub.subModules?.map(
                                          (link: any, i: number) => (
                                            <li
                                              onClick={() =>
                                                handleClick(sub.moduleName)
                                              }
                                              key={i}
                                              className={`mt-3 ml-5`}
                                            >
                                              <Link
                                                className={`text-[0.9375rem] p-2 ${
                                                  pathName === link.path
                                                    ? "text-black font-medium bg-black bg-opacity-20 bg-transparent"
                                                    : "text-primary"
                                                } `}
                                                href={link.path}
                                              >
                                                <i className="w-8 rounded-md p-1.5 bg-[#4338CA] ">
                                                  {link.icon}
                                                </i>
                                                {link.moduleName}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </details>
                                ) : (
                                  <li
                                    className={`w-full ${
                                      pathName === sub.path
                                        ? "bg-[#4338CA] text-white m-2"
                                        : "bg-transparent text-zinc-600"
                                    } ml-2 p-1 pr-4 hover:bg-[#4338CA] hover:text-white font-semibold`}
                                  >
                                    <Link href={sub.path} className="w-full">
                                      <i className="w-8 rounded-md p-1.5 bg-[#4338CA] ">
                                        {sub.icon}
                                      </i>
                                      <span className="text-[0.9375rem] w-full">
                                        {sub.moduleName}
                                      </span>
                                    </Link>
                                  </li>
                                )}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
