"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/json/sidebar.json";
import { usePathname } from "next/navigation";
interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

const Sidebar: React.FC<SideBarProps> = (props) => {
  const pathName = usePathname();
  const [data, setData] = useState<string | null>();

  useEffect(()=> {
    setData(localStorage.getItem('openPage'));
  },[])
  const handleClick = (moduleName: string) => {
    localStorage.setItem('openPage', moduleName);
  };

  return (
    <div {...props}>
      <section>
        <div className="w-full flex items-center justify-center p-5">
          <Image src="/logo/jh-logo.png" width={100} height={100} alt="logo" />
        </div>

        <div>
          {sidebarLinks.modules?.map((link, index: number) => {
            return (
              <div key={index}>
                <ul className="w-full menu menu-xs p-0 overflow-hidden">
                  <ul className="h-lvh">
                    <li>
                      <details open className="w-full">
                        <summary className="text-[1.125rem] p-2 px-6 whitespace-nowrap bg-[#12743B] hover:bg-[#12743B] rounded-none font-semibold text-white">
                          <i className="w-8 bg-white rounded-md p-1">
                            {link.icon}
                          </i>
                          {link.moduleName}
                        </summary>
                        <ul>
                          {link.subModules?.map((sub, index: number) => (
                            <li key={index} className="mt-5 w-[90%]">
                              <details open={data === sub?.moduleName} >
                                <summary
                                  className={`${
                                    pathName.startsWith(sub.path)
                                      ? " bg-[#12743B]"
                                      : " bg-transparent text-zinc-600"
                                  } ml-2 text-[0.9375rem] p-1 pr-4 hover:bg-[#12743B] hover:text-white font-semibold text-white`}
                                >
                                  <i className="w-8 rounded-md p-1.5 bg-primary_green ">
                                    {sub.icon}
                                  </i>
                                  {sub.moduleName}
                                </summary>
                                <ul>
                                  {sub.subModules?.map((link, i: number) => (
                                    <li onClick={() => handleClick(sub.moduleName)} key={i} className={`mt-3 ml-5`}>
                                      <Link
                                        className={`text-[0.9375rem] p-2 ${
                                          pathName === link.path
                                            ? "text-black font-medium bg-black bg-opacity-20"
                                            : "text-primary"
                                        } `}
                                        href={link.path}
                                      >
                                        {link.moduleName}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </details>
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
  );
};

export default Sidebar;
