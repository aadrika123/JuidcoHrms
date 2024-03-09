import React from "react";
import Header from "../global/layout/Header";
import Sidebar from "../global/layout/Sidebar";
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <main>
        <div className="grid grid-cols-10">
          <Sidebar className="col-span-2 border-r  rounded-tr-2xl w-full min-h-screen " />
          <div className="col-span-8">
            <Header className="border-b  w-full h-[6.5rem] flex items-center justify-between px-5 " />
            <section className="p-8 h-screen bg-[#FCFDFF] ">{children}</section>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageLayout;
