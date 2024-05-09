/**
 * Author: Jaideep
 * status: Open
 *
 */

"use client"
import React from 'react'
import School from "@/assets/icons/school 1.png";
import Emp from "@/assets/icons/employee-badge 1.png";
import Resume from "@/assets/icons/resume 1.png";
import Home from "@/assets/icons/home-address 1.png";
import Education from "@/assets/icons/education 1.png";
import Add from "@/assets/icons/add-friend 1.png";
import Customer from "@/assets/icons/customer-care 1.png";
import Parent from "@/assets/icons/parents 1.png";
import Money from "@/assets/icons/money 1.png";
import Time from "@/assets/icons/time 1.png";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const NavTab = () => {
    const router = useRouter();
    const pathName = usePathname();

    

    const data = [
        {
            name: "Office Details",
            image: School,
            click: "1",
            color: 'bg-teal-200',
        },
        {
            name: "Employee Details",
            image: Emp,
            click: "2",
            color: 'bg-green-200',
        },
        {
            name: "Personal Details",
            image: Resume,
            click: "3",
            color: 'bg-purple-200',
        },
        {
            name: "Address Details",
            image: Home,
            click: "4",
            color: 'bg-cyan-200',
        },
        {
            name: "Education & Training",
            image: Education,
            click: "5",
            color: 'bg-blue-200',
        },
        {
            name: "Joining Information",
            image: Add,
            click: "6",
            color: 'bg-indigo-200',
        },
        {
            name: "Service History",
            image: Customer,
            click: "7",
            color: 'bg-violet-200',
        },
        {
            name: "Family & Nominee",
            image: Parent,
            click: "8",
            color: 'bg-fuchsia-200',
        },
        {
            name: "Salary Information",
            image: Money,
            click: "9",
            color: 'bg-pink-200',
        },
        {
            name: "Time Bound Details",
            image: Time,
            click: "10",
            color: 'bg-rose-200',
        },
    ]

    return (
        <>
             <div className="flex flex-wrap">
            {data.map((item) => (
                <div className="p-5 shadow-lg m-2 cursor-pointer" key={item.click}  onClick={() => router.push(`${pathName}?page=${item.click}`)}>
                    <div className='flex flex-wrap items-center justify-center gap-2 '>
                        <div className={`${item.color} rounded-2xl`}>
                           <Image src={item.image} width={22} height={22} alt="logo" className='mt-[5px] ml-[5px]' />
                        </div>
                        <div>
                        <span className="text-xs"> {item.name}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
       
    )
}

export default NavTab