"use client";
import goBack from "@/utils/helper";
import React from "react";

export const NotFound = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              Access Denied!
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we cannot find that page. Kindly contact admin for more details.
            </p>
            <p onClick={goBack} className="text-[#4338CA] cursor-pointer">
              Go Back
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
