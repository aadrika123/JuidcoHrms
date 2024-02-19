"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { formatString } from "@/utils/helper";
interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

const Header: React.FC<SideBarProps> = (props) => {
  const pathName = usePathname();

  // _________ Bread Crumb ________________//
  const breadCrumb = pathName
    .split("/")
    .filter((k) => k !== "")
    .map((part, index) => {
      const replaced = part.includes("finance")
        ? part.replace("finance", "Financial Accounts Management System")
        : part;

      const bread = replaced.replace(/\d+$/, "");

      return (
        <React.Fragment key={index}>
          {index > 0 && (
            <img className="px-2" src="/icons/svg/right.svg" alt=">" />
          )}
          {formatString(bread)}
        </React.Fragment>
      );
    });
  // _________ Bread Crumb ________________//

  return (
    <div {...props}>
      <div className="flex justify-center flex-col">
        <h1 className="text-[2rem] text-primary font-bold">
          Human Resource Management System
        </h1>
        <div className="text-sm breadcrumbs p-0">
          <ul className="text-[#625e5eb7]">
            <li>
              <a className="text-primary font-medium">E-Governance</a>
            </li>
            <li>{breadCrumb}</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-5">
        {/* <SearchBox /> */}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39"
            height="39"
            viewBox="0 0 34 34"
            fill="none"
          >
            <g filter="url(#filter0_d_319_2861)">
              <rect
                x="2"
                y="1"
                width="30"
                height="29"
                rx="10"
                fill="#12743B"
                shapeRendering="crispEdges"
              />
              <path
                d="M17 23.625C17.825 23.625 18.5 22.95 18.5 22.125H15.5C15.5 22.95 16.1675 23.625 17 23.625ZM21.5 19.125V15.375C21.5 13.0725 20.27 11.145 18.125 10.635V10.125C18.125 9.5025 17.6225 9 17 9C16.3775 9 15.875 9.5025 15.875 10.125V10.635C13.7225 11.145 12.5 13.065 12.5 15.375V19.125L11 20.625V21.375H23V20.625L21.5 19.125Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_319_2861"
                x="0.4"
                y="0.9"
                width="33.2"
                height="32.2"
                filterUnits="userSpaceOnUse"
                colorInterpolation="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1.5" />
                <feGaussianBlur stdDeviation="0.8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.596078 0 0 0 0 0.596078 0 0 0 0 0.607843 0 0 0 0.34 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_319_2861"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_319_2861"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </span>
        <span className="w-9">
          <Image
            src="/icons/profile.png"
            width={100}
            height={100}
            alt="profile"
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
