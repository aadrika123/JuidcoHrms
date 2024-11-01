"use client";

import React, { useState, useEffect } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import Image from "next/image";
import HorizontalStepperPension from "@/components/Helpers/Widgets/StepperPension";
import axios from "@/lib/axiosConfig";

import HeadOffice from "@/assets/svg/icons/headOffice.svg";
import JDOffice from "@/assets/svg/icons/jdOffice.svg";
import PPO from "@/assets/svg/icons/ppo.svg";
import GPO from "@/assets/svg/icons/gpo.svg";
import CPO from "@/assets/svg/icons/cpo.svg";
import PPO1 from "@/assets/svg/icons/ppo1.svg";
import Bank from "@/assets/svg/icons/bank.svg";
import { HRMS_URL } from "@/utils/api/urls";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

export const not_provided = "Not provided";
//--------------------------- GET DECLARATION DETAILS ---------------------------//
export const ulb_name = "Ranchi Muncipal Corporation";
// ---------------------- CURRENT DATE ---------------------------//
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

export const currentDate = `${day}-${month}-${year}`;
// ---------------------- CURRENT DATE ---------------------------//

const ViewPension = ({ emp_id }: { emp_id: string }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [selectedFilter] = useState<number | null>(null);
    const [selectedData] = useState<number | null>(null);
    const [page] = useState<number>(1);

    const steps = [
        { title: "Head of Office" },
        { title: "JD Office" },
        { title: "PPO" },
        { title: "GPO" },
        { title: "CPO" },
        { title: "PPO" },
        { title: "Bank" },
    ];

    const fetchData = async (endpoint: string) => {
        if (endpoint === "null") return [];
        const res = await axios({
            url: `${endpoint}`,
            method: "GET",
        });
        return res.data?.data;
    }

    const useCodeQuery = (endpoint: string) => {
        return useQuery([endpoint, [selectedFilter, selectedData, page]], () =>
            fetchData(endpoint)
        );
    };

    const { data: empPension, error: empLstErr } = useCodeQuery(`${HRMS_URL.PENSION.getById}/${emp_id}`);

    useEffect(() => {
        if (empPension) {
            setActiveStep(empPension?.progress || 0)
        }
    }, [empPension])

    if (empLstErr) toast.error("Failed to fetch data");

    return (
        <div>
            {/* top header code*/}
            <div className="flex items-center justify-between border-b-2 pb-7 mb-10">
                <div className="flex items-center">
                    <PrimaryButton
                        buttonType="button"
                        variant={"cancel"}
                        onClick={goBack}
                        className="border-0 bg-transparent hover:bg-transparent hover:text-[#3592FF] flex items-center"
                    >
                        <i>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="20"
                                viewBox="0 0 25 25"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_949_7008)">
                                    <path
                                        d="M10.6736 7.20536L4 13.9137L10.6736 20.622C10.7339 20.7012 10.8105 20.7665 10.8981 20.8134C10.9858 20.8604 11.0826 20.888 11.1819 20.8943C11.2812 20.9007 11.3806 20.8856 11.4736 20.8501C11.5666 20.8147 11.6508 20.7597 11.7206 20.6888C11.7905 20.618 11.8443 20.533 11.8784 20.4395C11.9125 20.3461 11.9262 20.2464 11.9184 20.1472C11.9107 20.048 11.8817 19.9517 11.8335 19.8646C11.7853 19.7776 11.7189 19.702 11.6389 19.6429L6.64583 14.6081H19.9306C20.1147 14.6081 20.2914 14.535 20.4216 14.4047C20.5518 14.2745 20.625 14.0979 20.625 13.9137C20.625 13.7295 20.5518 13.5529 20.4216 13.4227C20.2914 13.2924 20.1147 13.2193 19.9306 13.2193H6.64583L11.6389 8.18453C11.7687 8.05376 11.8413 7.87677 11.8407 7.69249C11.84 7.50821 11.7662 7.33174 11.6354 7.20189C11.5047 7.07205 11.3277 6.99946 11.1434 7.00012C10.9591 7.00077 10.7826 7.0746 10.6528 7.20536H10.6736Z"
                                        fill="#665DD9"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_949_7008">
                                        <rect
                                            width="25"
                                            height="25"
                                            fill="white"
                                            transform="matrix(0 -1 1 0 0 25)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </i>
                        Back
                    </PrimaryButton>
                </div>
                <div>
                    <SubHeading className="mx-5 my-5 mb-0 text-4xl">
                        View Pension {emp_id}
                    </SubHeading>
                </div>
            </div>

            <div className="border-b border-zinc-300 p-10 shadow-lg m-5">
                <div className="mt-8 p-4">
                    <div className="mt-2 px-2 pr-4 mb-2 flex items-center justify-between text-xs text-secondary">
                        <Image src={HeadOffice} alt="employee" width={40} height={20} />
                        <Image src={JDOffice} alt="employee" width={40} height={20} />
                        <Image src={PPO} alt="employee" width={40} height={20} />
                        <Image src={GPO} alt="employee" width={40} height={20} />
                        <Image src={CPO} alt="employee" width={40} height={20} />
                        <Image src={PPO1} alt="employee" width={40} height={20} />
                        <Image src={Bank} alt="employee" width={40} height={20} />
                    </div>

                    <HorizontalStepperPension steps={steps} activeStep={activeStep} />

                    <div className="mt-2 px-2 pr-4 flex items-center justify-between text-xs text-secondary">
                        <h2>Head of Office</h2>
                        <h2>JD Office</h2>
                        <h2>PPO</h2>
                        <h2>GPO</h2>
                        <h2>CPO</h2>
                        <h2>PPO</h2>
                        <h2>Bank</h2>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ViewPension;
