"use client";

import React, { useEffect, useRef } from "react";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import { HRMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
// import toast from "react-hot-toast";

import { useReactToPrint } from "react-to-print";

import BasicDetails from "./details/BasicDetails";
import PersonalDetails from "./details/PersonalDetails";
import AddressDetails from "./details/AddressDetails";
import JoiningDetails from "./details/JoiningDetails";
import OfficeDetails from "./details/OfficeDetails";
import NomineeDetails from "./details/NomineeDetails";
import SalaryDetails from "./details/SalaryDetails";
import FamilyDetails from "./details/FamilyDetails";
import EducationDetails from "./details/EducationDetails";
import IncrementDetails from "./details/IncrementDetails";
import PromotionDetails from "./details/PromotionDetails";
import TimeboundDetails from "./details/TimeboundDetails";
import TraningDetails from "./details/TraningDetails";

interface ViewEmpListProps {
    empId: string;
}


const ViewEmpList: React.FC<ViewEmpListProps> = (props) => {
    // const queryClient = useQueryClient();

    const printRef = useRef(null)

    const fetchData = async (endpoint: string, method: string) => {
        if (endpoint === "null") return [];
        const res = await axios({
            url: `${endpoint}`,
            method: `${method}`,
        });
        // console.log(res.data?.data)
        return res.data?.data;
    };

    const useCodeQuery = (endpoint: string, id: string, method: string) => {
        return useQuery([endpoint, id], () => fetchData(endpoint, method));
    };

    // get single user data
    const { data: empData, error: empErr } = useCodeQuery(
        `${HRMS_URL.EMS.getAllById}/${props.empId}`,
        props.empId,
        "GET"
    );


    useEffect(() => {
        if (empErr) {
            console.log('Error while fetching data', empErr)
        }
    }, [])

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    // const handleExport = useReactToPrint({
    //     content: () => printRef.current,
    //     print: async (printIframe) => {
    //         await pdfGenerator(printIframe)
    //     }
    // });

    // const pdfGenerator = async (printIframe: any) => {
    //     console.log(printIframe)
    // }


    return (
        <>
            <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
                <BackButton />
                <div>
                    <SubHeading className="mx-5 my-5 mb-0 text-4xl">
                        Employee List
                    </SubHeading>
                </div>
            </div>

            <div className="flex justify-between mb-10">
                <SubHeading>
                    Employee View
                    <i>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 21 20"
                            fill="none"
                        >
                            <path
                                d="M10 9.1C10.3617 9.1 10.7085 9.2475 10.9642 9.51005C11.22 9.7726 11.3636 10.1287 11.3636 10.5C11.3636 10.8713 11.22 11.2274 10.9642 11.4899C10.7085 11.7525 10.3617 11.9 10 11.9C9.63834 11.9 9.29149 11.7525 9.03576 11.4899C8.78003 11.2274 8.63636 10.8713 8.63636 10.5C8.63636 10.1287 8.78003 9.7726 9.03576 9.51005C9.29149 9.2475 9.63834 9.1 10 9.1ZM10 7C12.2727 7 14.2136 8.45133 15 10.5C14.2136 12.5487 12.2727 14 10 14C7.72727 14 5.78636 12.5487 5 10.5C5.78636 8.45133 7.72727 7 10 7ZM5.99091 10.5C6.3583 11.2701 6.92878 11.919 7.63749 12.3729C8.34621 12.8267 9.16473 13.0673 10 13.0673C10.8353 13.0673 11.6538 12.8267 12.3625 12.3729C13.0712 11.919 13.6417 11.2701 14.0091 10.5C13.6417 9.72986 13.0712 9.08098 12.3625 8.62715C11.6538 8.17331 10.8353 7.93272 10 7.93272C9.16473 7.93272 8.34621 8.17331 7.63749 8.62715C6.92878 9.08098 6.3583 9.72986 5.99091 10.5Z"
                                fill="black"
                                fillOpacity="0.41"
                            />
                        </svg>
                    </i>
                </SubHeading>
            </div>


            <div id="divToPrint" ref={printRef} className="container mx-auto flex flex-col gap-4">

                <BasicDetails data={empData} />
                <PersonalDetails data={empData?.emp_personal_details} />
                <EducationDetails data={empData?.emp_education_details} />
                <div className="page-break" />
                <TraningDetails data={empData?.emp_training_details} />
                <FamilyDetails data={empData?.emp_family_details} />
                <NomineeDetails data={empData?.emp_nominee_details} />
                <div className="page-break" />
                <div className="page-break" />
                <AddressDetails data={empData?.emp_address_details} />
                <JoiningDetails data={empData?.emp_join_details} />
                <OfficeDetails data={empData?.emp_office_details} />
                <div className="page-break" />
                <SalaryDetails data={empData?.emp_salary_details} />
                <IncrementDetails data={empData?.emp_increment_details} />
                <PromotionDetails data={empData?.emp_promotion_details} />
                <div className="page-break" />
                <TimeboundDetails data={empData?.emp_timebound_details} />

            </div>

            <div className="flex justify-end my-4 gap-4">
                <PrimaryButton
                    variant="primary"
                    className=" text-lg  text-center"
                    buttonType="button"
                    onClick={handlePrint}
                >
                    Print
                </PrimaryButton>
                {/* <PrimaryButton
                    variant="primary"
                    className=" text-lg  text-center"
                    buttonType="button"
                    onClick={handleExport}
                >
                    Export
                </PrimaryButton> */}
            </div>


        </>
    );
};

export default ViewEmpList;
