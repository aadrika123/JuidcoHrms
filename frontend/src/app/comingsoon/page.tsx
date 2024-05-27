import goBack from "@/utils/helper";
import React from "react";

const Page = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              Coming Soon
            </h1>
            <p onClick={goBack} className="text-[#4338CA] cursor-pointer">
            Go Back
          </p>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Page;
