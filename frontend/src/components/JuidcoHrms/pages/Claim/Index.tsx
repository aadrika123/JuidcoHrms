"use client";

/**
 * | Author- Anjali Singh
 * | Created On- 09-04-2024
 * | Created for- Claim Form
 * | Status: Open
 */

import React, { useEffect, useRef, useState } from "react";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { SubHeading, InnerHeading } from "@/components/Helpers/Heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HorizontalStepper from "@/components/Helpers/Widgets/Stepper";
import Claim_Form from "@/components/JuidcoHrms/pages/Claim/ClaimForm"
import { HRMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import "primereact/resources/themes/lara-light-indigo/theme.css";

const ClaimFormMain = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [claimHistory, setClaimHistory] = useState<any>();
    const [userDetails, setUserDetails] = useState<any>();
    const [trackClaimId, setTrackClaimId] = useState<number>(0);
    const [trackClaim, setTrackClaim] = useState<any>();
    const datePickerRef = useRef<DatePicker>(null);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    // Static steps data
    const steps = [
        { title: "Employee", status: 0 },
        { title: "Manager-1", status: 1 },
        { title: "Manager-2", status: 2 },
        { title: "Manager-3", status: 3 },
    ];

    const getAllClaimByEmployeeId = async (employee_id: number) => {
        const res = await axios({
            url: `${HRMS_URL.CLAIM.get}/${employee_id}`,
            method: "GET",
            data: {},
        });
        console.log('getAllClaimByEmployeeId', res);
        if (res.status) {
            // claimsData(res.data.data.data);
            setClaimHistory(res?.data?.data?.data);
            setTrackClaimId(res?.data?.data?.data[0].id);
            console.log('getAllClaimByEmployeeId1', res?.data?.data?.data[0].id)
        }
    }

    const getClaimById = async (id: number) => {
        const res = await axios({
            url: `${HRMS_URL.CLAIM.getById}/${id}`,
            method: "GET",
            data: {},
        });
        console.log('getClaimById', res);
        if (res.status) {
            setTrackClaim(res?.data?.data);
        }
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            const data = sessionStorage.getItem("user_details");
            const user_details = JSON.parse(data as string);
            console.log('sessionStorage', user_details);
            setUserDetails(user_details);
        }
    }, []);

    useEffect(() => {
        if (userDetails?.id) {
            getAllClaimByEmployeeId(userDetails?.id);
        }

    }, [userDetails?.id]);

    useEffect(() => {
        if (trackClaimId) {
            getClaimById(Number(trackClaimId));
        }
    }, [trackClaimId]);
    const orderNoBodyTemplate = (rowData: any) => {
        return (<span className="text-blue-600 dark:text-blue-500 cursor-pointer" onClick={() => setTrackClaimId(rowData.id)}>
            #{rowData.orderNo}
        </span>);
    };
    const statusBodyTemplate = (rowData: any) => {
        if (rowData?.status == 3)
            return <Tag value={`Settled`} severity={`success`}></Tag>
        else return <Tag value={`Pending`} severity={`danger`}></Tag>
    };
    return (
        <div>
            <>
                <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
                    <BackButton />
                    <div>
                        <SubHeading className="mx-5 my-5 mb-0 text-4xl">Claim</SubHeading>
                    </div>
                </div>

                {/* Claim status code */}
                <div className="w-full flex flex-col sm:flex-row justify-between">
                    <div className="w-auto md:w-6/12 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg">
                        <InnerHeading className="text-xl flex items-center justify-between">
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
                                Claim Status
                            </div>
                            <div className="flex items-center">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="d MMMM , yyyy"
                                    ref={datePickerRef}
                                    className="w-[160px] outline-none"
                                />

                                <i
                                    className="cursor-pointer "
                                    onClick={() => {
                                        if (datePickerRef.current) {
                                            datePickerRef.current.setOpen(true);
                                        }
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M3.48879 4.89772C3.69213 4.69244 4.02178 4.69103 4.22512 4.89913L8.76386 9.53237C8.9672 9.73977 8.9665 10.0748 8.76247 10.2808C8.66115 10.3831 8.5279 10.4353 8.39535 10.4353C8.2614 10.4353 8.12816 10.3831 8.02683 10.2794L3.4881 5.64618C3.28476 5.43878 3.28545 5.1037 3.48879 4.89772ZM12.565 4.8992C12.7684 4.6911 13.098 4.69251 13.3013 4.89779C13.5054 5.10378 13.5061 5.43885 13.3034 5.64625L10.2894 8.72332C10.1881 8.82702 10.0541 8.87922 9.92089 8.87922C9.78833 8.87922 9.65509 8.82702 9.55376 8.72473C9.34973 8.51875 9.34904 8.18367 9.55168 7.97627L12.565 4.8992Z"
                                            fill="black"
                                        />
                                    </svg>
                                </i>
                            </div>
                            <div className="menu flex items-center  top-0 right-0 ">
                                <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                                <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                                <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
                            </div>
                        </InnerHeading>
                        <div></div>
                        <div className="w-full flex flex-col sm:flex-row justify-between">
                            <div className="md:w-[99.9%] m-1 flex flex-col relative p-5 max-w-5px">
                                <div className="mt-12">
                                    <HorizontalStepper steps={steps} activeStep={trackClaim?.status} />
                                    <div className="mt-2 px-2 flex items-center justify-between texy-xs text-secondary">
                                        <h2>Employee</h2>
                                        <h2>Manager-1</h2>
                                        <h2>Manager-2</h2>
                                        <h2>Manager-3</h2>
                                    </div>
                                </div>
                                <br />
                                <span className="text-sm p-1">Type of Claim- {trackClaim?.claimType}</span>
                                <span className="text-sm p-1">Date of Claim- {trackClaim?.createdAt}</span>
                                <span className="text-sm p-1">Total amount of Claim- {trackClaim?.totalAmount}</span>
                                <span className="text-sm p-1">Status of Claim- {statusBodyTemplate(trackClaim)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Claim history code */}
                    <div className="w-auto md:w-6/12 sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg">
                        <InnerHeading className="text-xl flex items-center justify-between">
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
                                Claim History
                            </div>
                            <div className="menu flex items-center  top-0 right-0 ">
                                <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                                <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                                <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
                            </div>
                        </InnerHeading>

                        <div className="ml-94">
                            <div className="mr-[50px] text-[20px] text-[#1E8EBB] font-bold text-right">
                                {claimHistory && claimHistory.length}
                            </div>
                            <div className="text-[15px] text-right">Total No of Claim</div>
                        </div>

                        {/* Claim History table */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                            <DataTable value={claimHistory} size="small" paginator rows={5} rowsPerPageOptions={[5]}>
                                <Column field="orderNo" header="Claim No" style={{ width: '15%' }} body={orderNoBodyTemplate}></Column>
                                <Column field="claimType" header="Claim Type" style={{ width: '15%' }}></Column>
                                <Column field="createdAt" header="Date" style={{ width: '15%' }}></Column>
                                <Column field="totalAmount" header="Amount" style={{ width: '15%' }}></Column>
                                <Column field="Status" header="status" style={{ width: '15%' }} body={statusBodyTemplate}></Column>
                            </DataTable>
                        </div>

                    </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row justify-between">
                    <Claim_Form />
                </div>
            </>
        </div>
    );
};

export default ClaimFormMain;


