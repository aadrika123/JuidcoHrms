"use client";

import React, { useState } from "react";
import Header from "../global/layout/Header";
import Sidebar from "../global/layout/Sidebar";
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    // <>
    //   <main>
    //     {/* <div className="grid grid-cols-10">
    //       <Sidebar className="col-span-2 border-r border-[#12743B] rounded-tr-2xl w-full min-h-screen " />
    //       <div className="col-span-8">
    //         <Header className="border-b  w-full h-[6.5rem] flex items-center justify-between px-5 " />
    //         <section className="p-8 h-screen bg-[#FCFDFF] ">{children}</section>
    //       </div>
    //     </div> */}
    //     <div className="grid grid-cols-10 h-screen">
    //       <div className="col-span-10">
    //         <Header className="bg-white border-b border-b-slate-100 w-full h-[6.5rem] flex items-center justify-between px-5 shadow-md mb-1" />
    //       </div>
    //       <div className="col-span-2 border-r border-slate-300 rounded-br-2xl shadow-xl mx-1">
    //         <Sidebar className="w-full min-h-screen" />
    //       </div>
    //       <div className="col-span-8">
    //         <section className="p-8 h-full bg-[#FCFDFF] overflow-y-auto">
    //           {children}
    //         </section>
    //       </div>
    //     </div>
    //   </main>
    // </>

    <>
      <main>
        {/* <div className={`grid grid-cols-10 h-screen ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          
          <div className="col-span-10">
            <Header className="bg-white border-b border-b-slate-100 w-full h-[6.5rem] flex items-center justify-between px-5 shadow-md mb-1" />
          </div>


          <div className="col-span-2 border-r border-slate-300 rounded-br-2xl shadow-xl mx-1">
            <Sidebar className="w-full min-h-screen" />
          </div>

          <div className="col-span-8" style={{ width: isSidebarCollapsed ? 'calc(100% - 0px)' : 'calc(100% - var(--sidebar-width))' }}>
            <section className={`p-8 h-full bg-[#FCFDFF] overflow-y-auto`}>
              {children}
            </section>
          </div>

        </div> */}
        <div
          className={`grid grid-cols-10  ${isSidebarCollapsed ? "sidebar-collapsed h-0" : ""}`}
        >
          <div className="col-span-10">
            <Header className="bg-white border-b border-b-slate-400 w-full h-[6.5rem] flex items-center justify-between px-5 shadow-md mb-1" />
          </div>
          <div
            className={`col-span-2 border-r border-zinc-400 rounded-br-2xl shadow-xl mx-1 ${isSidebarCollapsed ? "hidden" : ""}`}
          >
            <Sidebar className="w-full min-h-screen" />
          </div>
          <div
            className={`col-span-8 ${isSidebarCollapsed ? "col-span-full p-0" : ""}`}
          >
            <section
              className={`p-8 h-full bg-[#FCFDFF] overflow-y-auto ${isSidebarCollapsed ? "content-collapsed" : ""}`}
            >
              {children}
            </section>
          </div>
        </div>

        <div className="toggle-sidebar" onClick={handleToggleSidebar}>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="19"
              viewBox="0 0 28 19"
              fill="none"
            >
              <path
                d="M6.79957 3.82241V0.0578613H27.6723V3.82241H6.79957ZM6.79957 11.3515V7.58695H27.6723V11.3515H6.79957ZM6.79957 18.8806V15.116H27.6723V18.8806H6.79957ZM2.32685 3.82241C1.90442 3.82241 1.55058 3.64171 1.26532 3.28031C0.980059 2.91892 0.836931 2.47219 0.835938 1.94013C0.835938 1.40682 0.979065 0.960098 1.26532 0.599956C1.55157 0.239815 1.90542 0.0591162 2.32685 0.0578613C2.74927 0.0578613 3.10361 0.23856 3.38986 0.599956C3.67612 0.961352 3.81875 1.40808 3.81776 1.94013C3.81776 2.47344 3.67463 2.9208 3.38837 3.2822C3.10212 3.64359 2.74828 3.82366 2.32685 3.82241ZM2.32685 11.3515C1.90442 11.3515 1.55058 11.1708 1.26532 10.8094C0.980059 10.448 0.836931 10.0013 0.835938 9.46922C0.835938 8.93591 0.979065 8.48919 1.26532 8.12905C1.55157 7.76891 1.90542 7.58821 2.32685 7.58695C2.74927 7.58695 3.10361 7.76765 3.38986 8.12905C3.67612 8.49044 3.81875 8.93717 3.81776 9.46922C3.81776 10.0025 3.67463 10.4499 3.38837 10.8113C3.10212 11.1727 2.74828 11.3528 2.32685 11.3515ZM2.32685 18.8806C1.90442 18.8806 1.55058 18.6999 1.26532 18.3385C0.980059 17.9771 0.836931 17.5304 0.835938 16.9983C0.835938 16.465 0.979065 16.0183 1.26532 15.6581C1.55157 15.298 1.90542 15.1173 2.32685 15.116C2.74927 15.116 3.10361 15.2967 3.38986 15.6581C3.67612 16.0195 3.81875 16.4663 3.81776 16.9983C3.81776 17.5316 3.67463 17.979 3.38837 18.3404C3.10212 18.7018 2.74828 18.8818 2.32685 18.8806Z"
                fill="#555555"
              />
            </svg>
          </i>
        </div>
      </main>

      <style>{`
        .sidebar-collapsed .col-span-2 {
          width: 0;
          overflow: hidden;
        }
        .toggle-sidebar {
          position: absolute;
          top: 2.3rem;
          left: 26rem;
          // left: ${isSidebarCollapsed ? "0" : "var(--sidebar-width)"};
          cursor: pointer;
          padding: 5px;
        }
      `}</style>
    </>
  );
};

export default PageLayout;
