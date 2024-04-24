/***
 * Author: Jaideep
 * Status: Closed
 * Description: Designed to manage login form design.
 */

"use client";
import React from "react";
import dynamic from "next/dynamic";
// import Login from ".";
// import Lottie from "lottie-react";

import img from "../../lotties/loginImage.json";
import lock from "../../lotties/lock.json";
const LoginPage = dynamic(() => import("./Login"), {
    ssr: false,
  });

const Lottie = dynamic(() => import("lottie-react"), {
    ssr: false
})
const HeroLoginPage = () => {
  return (
    <>
      <div className="h-screen border-2 border-red-200 flex flex-col justify-between bg-gray-100 darks:bg-gray-900 border-b darks:bg-opacity-40">
        <header className="border-b border-gray-200  bg-white darks:bg-white-600 darks:border-gray-800 text-black">
          <div className="container mx-auto xl:max-w-6xl py-2">
            {/* Navbar */}
            <nav
              className="flex flex-row flex-nowrap items-center justify-between mt-0 py-2 px-6"
              id="desktop-menu"
            >
              {/* logo */}
              <a className="flex items-center py-2 ltr:mr-4 rtl:ml-4 text-xl">
                <div className="flex flex-col">
                  <div>
                    <span className="font-bold text-xl uppercase">
                      {/* {data?.brand_tag}  */} Human Resource Management
                      System
                    </span>
                    <span className="text-lg opacity-0">s</span>
                    <span className="hidden text-gray-700 darks:text-gray-200">
                      {/* {data?.brand_tag == "AMC" ? "AMC" : "JUIDCO"} */}
                    </span>
                  </div>
                </div>
              </a>
              {/* menu , curantaly: Unavailable */}
            </nav>
          </div>
        </header>

        <main>
          <div className=" md:py-12 bg-gray-100 darks:bg-gray-900 darks:bg-opacity-40">
            <div className="container mx-auto px-4 xl:max-w-6xl">
              <div className="flex flex-wrap -mx-4 flex-row ">
                <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                  <LoginPage />
                </div>
                <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                  <div className="text-center  lg:mt-0">
                    <div className="relative">
                      <Lottie
                        animationData={lock}
                        loop={true}
                        className="w-[20%] ml-[8rem] absolute"
                      />
                      <div className="absolute top-2/4 ">
                        <Lottie
                          animationData={img}
                          loop={true}
                          className="m-0 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t p-6 border-gray-200 darks:bg-gray-800 darks:border-gray-800 text-black">
          <div className="container mx-auto px-4 xl:max-w-6xl ">
            <div className="mx-auto px-4">
              <div className="flex flex-wrap flex-row -mx-4">
                <div className="flex-shrink  max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-left md:rtl:text-right">
                  <ul className="ltr:pl-0 rtl:pr-0 space-x-4">
                    <li className="inline-block ltr:mr-3 rtl:ml-3">
                      <a className="hover:text-indigo-500" href="#">
                        Support |
                      </a>
                    </li>
                    <li className="inline-block ltr:mr-3 rtl:ml-3">
                      <a className="hover:text-indigo-500" href="#">
                        Help Center |
                      </a>
                    </li>
                    <li className="inline-block ltr:mr-3 rtl:ml-3">
                      <a className="hover:text-indigo-500" href="#">
                        Privacy |
                      </a>
                    </li>
                    <li className="inline-block ltr:mr-3 rtl:ml-3">
                      <a className="hover:text-indigo-500" href="#">
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-right md:rtl:text-left">
                  <p className="mb-0 mt-3 md:mt-0">
                    <a href="#" className="hover:text-indigo-500">
                      UD&HD
                    </a>{" "}
                    | All right reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HeroLoginPage;
