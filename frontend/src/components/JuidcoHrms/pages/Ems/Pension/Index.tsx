/***
 * Author: Rahul
 * Status: Done
 * Uses: Dashboard details gratuity of employee - gratuity table details
 */
"use client";
import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
// import Image from "next/image";
// import EmployeeIcon from "@/assets/icons/search_salary_slip.png";
// import { RiFilter2Line } from "react-icons/ri";
// import { useReactToPrint } from "react-to-print";
// import axios from "@/lib/axiosConfig";

const Gratuity_table = () => {

  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
          Pension Management
          </SubHeading>
        </div>
      </div>
      
      
      
  
    
    </>
  );
};

export default Gratuity_table;
