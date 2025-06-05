"use client";

import React, { useState } from "react";
import Header from "../global/layout/Header";
import Sidebar from "../global/layout/Sidebar";
import AutoLogoutProvider from "./AutoLogoutProvider";
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <AutoLogoutProvider timeout={30 * 60 * 1000}>
     
      <>
        <main>
          <div className={`${isSidebarCollapsed ? "sidebar-collapsed h-0" : "flex"}`}>
            <div className="col-span-10 fixed top-0 w-full left-0 z-50">
              <Header
                className="bg-white border-b border-b-slate-400 w-full h-20 flex items-center justify-between px-5 shadow-md mb-1"
                handleToggleSidebar={handleToggleSidebar}
              />
            </div>

            <div
              className={`border-r border-zinc-400 rounded-br-2xl shadow-xl mx-1 ${
                isSidebarCollapsed ? "hidden" : "w-[22%]"
              }`}
            >
              <Sidebar className="w-full overflow-auto mt-10 scrollbar-hide" />
            </div>

            <div className={`w-full ${isSidebarCollapsed ? "col-span-full p-0" : ""}`}>
              <section
                className={`p-4 bg-[#FCFDFF] overflow-y-auto ${
                  isSidebarCollapsed ? "content-collapsed" : ""
                }`}
                style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}
              >
                {children}
              </section>
            </div>
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
            cursor: pointer;
            padding: 5px;
          }
        `}</style>
      </>
    </AutoLogoutProvider>
  );
};

export default PageLayout;