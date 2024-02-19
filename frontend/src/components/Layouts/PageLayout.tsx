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
          <Sidebar className="col-span-2 border-r border-[#12743B] rounded-tr-2xl w-full min-h-screen " />
          <div className="col-span-8">
            <Header className="border-b border-b-[#12743B] w-full h-[6.5rem] flex items-center justify-between px-5 " />
            <section className="p-8 h-screen bg-[#f3f9f2]">{children}</section>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageLayout;
