///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : Almaash Alam
// 👉 Component   : SideBar
// 👉 Status      : Close
// 👉 Description : This screen is designed to handle sidebar.
// 👉 Functions   :
//                  1. dropFun -> To handle drop down.
///////////////////////////////////////////////////////////////////////////////////////////////////////////
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/json/sidebar.json";
import { EmployeeSidebarLinks } from "@/json/employee_sidebar";
import { TMSidebarLinks } from "@/json/teamManagementSidebar"
import { usePathname,  } from "next/navigation";
import { InnerHeading } from "@/components/Helpers/Heading";
import ProfileIcon from "@/assets/icons/profile_new.png";
import axios from "axios";

import { BsGrid1X2 } from "react-icons/bs";
import { BsGrid1X2Fill } from "react-icons/bs";
import { ChevronDown } from "lucide-react";
import Cookies from "js-cookie";

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

const Sidebar: React.FC<SideBarProps> = (props) => {
  // const pathName = usePathname();
  const [data, setData] = useState<string | null>();
  const [sidebarLink, setSidebarLink] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const [isTeamManagementOpen, setIsTeamManagementOpen] = useState<boolean>(false);
  const [userPermission, setuserPermission] = useState<unknown>();

  useEffect(() => {
    setData(localStorage.getItem("openPage"));
  }, []);
  // const handleClick = (moduleName: string) => {
  //   localStorage.setItem("openPage", moduleName);
  // };
  console.log("sidebarLink",sidebarLink)

  // useEffect(() => {
  //     if (typeof window !== "undefined") {
  //         const data = sessionStorage.getItem("user_details");
  //         const user_details = JSON.parse(data as string);
  //         console.log(user_details, "user");
  //         if (isTeamManagementOpen) {
  //             setSidebarLink(TMSidebarLinks)
  //         } else {
  //             if (user_details?.user_type !== "Employee") {
  //                 setSidebarLink(sidebarLinks);
  //             } else {
  //                 if (user_details.id !== 72) {
  //                     let updatedSubModules: any
  //                     updatedSubModules = EmployeeSidebarLinks?.modules[0]?.subModules?.filter(module => module.moduleName !== 'Team Management');
  //                     EmployeeSidebarLinks.modules[0].subModules = updatedSubModules
  //                     setSidebarLink(EmployeeSidebarLinks);
  //                 } else {
  //                     setSidebarLink(EmployeeSidebarLinks);
  //                 }

  //             }
  //         }
  //     }
  // }, [isTeamManagementOpen]);


    const Auth = Cookies.get("accesstoken");
    const t0k3n = `Bearer ${Auth}`;


  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("user_details");
      console.log("data",data)
      const user_details = JSON.parse(data as string);
      // console.log(user_details, "user");
      if (isTeamManagementOpen) {
        setSidebarLink(TMSidebarLinks)
      } else {
        if (user_details?.user_type !== "Employee" && user_details?.user_type !== "TL") {
          setSidebarLink(sidebarLinks);
        } else if (user_details?.user_type === "TL") {
          setSidebarLink(EmployeeSidebarLinks);

        } else {
          const updatedSubModules = EmployeeSidebarLinks?.modules[0]?.subModules?.filter(module => module.moduleName !== 'Team Management');
          EmployeeSidebarLinks.modules[0].subModules = updatedSubModules
          setSidebarLink(EmployeeSidebarLinks);

        }
      }
    }
  }, [isTeamManagementOpen]);

  const pathname = usePathname(); // Use Next.js's usePathname for routing
  // const router = useRouter(); // Use Next.js's useRouter for navigation

  console.log("pathname", pathname);

// module api for  /services-by-module


const fetchMenuList = async () => {
  const requestBody = {
    moduleId: 6,
  };

  try {
    // Make API request
    const res = await axios.post(
      `${process.env.backend}/api/menu/by-module`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${Auth}`,
        },
      }
    );

    console.log("res?.datares?.data",res?.data)

    const data = res?.data;

    if (data?.data?.userDetails && data?.data?.permission) {
      const newdata = JSON.stringify(data?.data?.userDetails);
      if (newdata != undefined) {
        localStorage.setItem("userDetail", newdata);
      }

      setuserPermission(data?.data?.permission);
      setUserDetails(data?.data?.userDetails);
    } else {
      console.error("Missing required data in the API response.");
    }
  } catch (error) {
    console.error("Error fetching menu list", error);
  }
};

useEffect(() => {
  fetchMenuList();
}, []);


// console.log('userPermissionuserPermission',userPermission)

  
  // useEffect(() => {
  //   servicesModule(); // Call the function inside useEffect
  // }, [pathname]); // Add pathname as a dependency

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("user_details");
      const user_details = JSON.parse(data as string);
      setUserDetails(user_details);
    }
  }, []);



  // console.log(userDetails,"userDetails")

  return (
    <div className={`${props.className} ${data === "UD&HD" ? "hidden" : ""} `}>
      <div {...props}>
        <section >
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



          {/* 👉 =====menus======  👈*/}
          <div className=" text-sm px-4 overflow-y-auto scrollbar-width-10 scrollbar-track-blue-100 scrollbar-thumb-blue-700 scrollbar-thumb-rounded-full scrollbar-thumb-hover-blue-500 transition-all duration-200">
                  <nav className="relative flex flex-wrap items-center justify-between overflow-x-hidden">
                    <ul
                      id="side-menu"
                      className="w-full float-none flex flex-col "
                    >
                      <SidebarChild items={userPermission} />
                    </ul>
                  </nav>
                </div>

          {/* <div>
            {sidebarLink?.modules?.map((link: any, index: number) => {
              return (
                <div key={index}>
                  <ul className="w-full menu menu-xs p-0 overflow-y-scroll h-[35rem] scrollbar-visible">
                    <ul className="h-lvh">
                      <li>asd
                        <details open className="w-full ">
                          <summary className="text-[1.125rem] p-2 px-6  whitespace-nowrap bg-primary_blue hover:bg-primary_blue rounded-none font-semibold text-white">
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
                                      className={`${data === sub?.moduleName
                                        ? "bg-primary_blue text-white m-2"
                                        : "bg-transparent text-zinc-600"
                                        } ml-2 text-[0.9375rem] p-1 pr-4 pl-3 hover:bg-primary_blue hover:text-white font-semibold`}
                                    >
                                      <i className="w-8 rounded-md p-1.5 bg-primary_blue ">
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
                                                className={`text-[0.9375rem] p-2 ${pathName === link.path
                                                  ? "text-black font-medium bg-black bg-opacity-20 bg-transparent"
                                                  : "text-primary"
                                                  } `}
                                                href={link.path}
                                              >
                                                <i className="w-8 rounded-md p-1.5 bg-primary_blue ">
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
                                    className={`w-full ${pathName === sub.path
                                      ? "bg-primary_blue text-white m-2"
                                      : "bg-transparent text-zinc-600"
                                      } ml-2 p-1 pr-4 hover:bg-primary_blue hover:text-white font-semibold`}
                                  >
                                    <Link href={sub.path} className="w-full">
                                      <i className="w-8 rounded-md p-1.5 bg-primary_blue ">
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
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default Sidebar;










function SidebarChild({ items }: any) {
  return (
    <div className="w-64 min-h-screen ">
      <nav className="space-y-4 ">
        {items?.map((item: any) => <SidebarItem key={item.id} item={item} />)}
      </nav>
    </div>
  );
}

function SidebarItem({ item }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-[#190BC4] hover:text-white  rounded-md transition-colors"
        >
          <div className="flex items-center gap-2 ">
            <BsGrid1X2Fill />

            <span>{item.name}</span>
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="pl-6 mt-3 space-y-1 bg-[#190BC4] rounded-md text-white">
            {item.children.map((child: any) => (
              <SidebarItem key={child.id} item={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.path || "#"}
      className="flex items-center mt-2  gap-2 px-4 py-2 text-sm hover:bg-[#190BC4] hover:text-white rounded-md transition-colors"
    >
      <BsGrid1X2 />
      <span>{item.name}</span>
    </Link>
  );
}


