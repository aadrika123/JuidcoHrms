import { InnerHeading, SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import ManagerIcon from "@/assets/icons/manager 1.png";
import EmployeeIcon from "@/assets/icons/employee 1.png";
import React from "react";
import Image from "next/image";

const AttendanceManagement = () => {
  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Employee Dashboard
          </SubHeading>
        </div>
      </div>

      <section className="grid grid-cols-7">
        <div className="col-span-3 grid grid-row-2 w-full h-[40rem] border-4 p-6">
          <div className="w-full h-full border-5">
            <div className="w-full flex items-center justify-between ">
              <div className="flex items-center gap-3">
                <span className="w-16 h-16 rounded-full border border-primary_blue overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src={EmployeeIcon}
                    alt="emp"
                  />
                </span>

                <h2 className=" text-secondary font-medium text-[1.7em]">
                  Welcome to HRMS John Doe
                </h2>
              </div>

              <button>
                <span className=" text-secondary">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Menu_Kebab">
                      <path d="M14.5,12c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,-0 -2.5,-1.12 -2.5,-2.5c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,-0 2.5,1.12 2.5,2.5Zm-1,-0c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,-0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5c0.828,-0 1.5,-0.672 1.5,-1.5Z"></path>
                      <path d="M14.5,4.563c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,-0 -2.5,-1.12 -2.5,-2.5c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,-0 2.5,1.12 2.5,2.5Zm-1,-0c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,-0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5c0.828,-0 1.5,-0.672 1.5,-1.5Z"></path>
                      <path d="M14.5,19.437c0,1.38 -1.12,2.5 -2.5,2.5c-1.38,0 -2.5,-1.12 -2.5,-2.5c0,-1.38 1.12,-2.5 2.5,-2.5c1.38,0 2.5,1.12 2.5,2.5Zm-1,0c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5c0.828,0 1.5,-0.672 1.5,-1.5Z"></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
            <section className="flex gap-3 ">
              <aside className="w-[55%] mt-12 flex flex-col gap-3 font-medium">
                <h4 className="text-secondary ">Employment ID - EMP4242 </h4>
                <h4 className="text-secondary">Role- Software Engineer</h4>
                <h4 className="text-secondary">Task- Develop Web</h4>
                <h4 className="text-secondary">Department- IT</h4>
              </aside>
              <div className="w-full mt-[5em]">
                <span className="mt-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="224"
                    height="7"
                    viewBox="0 0 224 7"
                    fill="none"
                  >
                    <path
                      d="M0.333333 3.36639C0.333333 4.83915 1.52724 6.03306 3 6.03306C4.47276 6.03306 5.66667 4.83915 5.66667 3.36639C5.66667 1.89363 4.47276 0.699727 3 0.699727C1.52724 0.699727 0.333333 1.89363 0.333333 3.36639ZM223 3.86639C223.276 3.86639 223.5 3.64254 223.5 3.36639C223.5 3.09025 223.276 2.86639 223 2.86639V3.86639ZM3 3.86639L223 3.86639V2.86639L3 2.86639V3.86639Z"
                      fill="#007DC4"
                    />
                  </svg>
                </span>

                <div className="w-full  flex border-b-2 border-primary_blue items-end justify-between">
                  <span>
                    <Image src={EmployeeIcon} alt="emp" />
                  </span>
                  <span>
                    <Image className="w-[3.5em]" src={ManagerIcon} alt="emp" />
                  </span>
                  <span>
                    <Image className="w-[4em]" src={ManagerIcon} alt="emp" />
                  </span>
                  <span>
                    <Image className="w-[4.5em]" src={ManagerIcon} alt="emp" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-secondary">
                  <h2>Employee</h2>
                  <h2>Manager-1</h2>
                  <h2>Manager-2</h2>
                  <h2>Manager-3</h2>
                </div>
              </div>
            </section>
          </div>
          <div className="w-full h-full border-5">csadc</div>
        </div>
        <div className=" col-span-4 w-full h-full border-5 p-8">
          <InnerHeading className="text-[1.7em] font-medium w-full flex items-center justify-between">
            <div className="flex items-center">
              <i className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <rect width="32" height="32" rx="9" fill="#665DD9" />
                  <path
                    d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                    fill="white"
                    fillOpacity="0.92"
                  />
                </svg>
              </i>
              Calendar
            </div>
            <div className="menu flex items-center  top-0 right-0 ">
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
              <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </InnerHeading>
        </div>
      </section>
    </>
  );
};

export default AttendanceManagement;
