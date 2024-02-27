"use client"

import { SubHeading, InnerHeading } from '@/components/Helpers/Heading';
import ReactApexChart from 'react-apexcharts';


export const DashboardMain = () => {

    const chartOptions = {
        chart: {
            type: 'donut',
        },
        series: [90, 10],
        labels: ['Present', 'Absent'],
        colors: ['#12743B', '#00E640'],
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false
        },

    };

    const barchartOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false
              }
        },

        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
            },
        },
        colors: ['#12743B', '#00E640'],
        xaxis: {
            categories: ['2021', '2022', '2023', '2024'],
        },
        // yaxis: {
        //     title: {
        //         text: 'Values',
        //     },
        // },
        legend: {
            // position: 'top',
            show: false
        },
        dataLabels: {
            enabled: false,
        },
        series: [
            {
                name: 'Government',
                data: [50, 60, 70, 40],
            },
            {
                name: 'Central',
                data: [10, 30, 30, 55],
            },
            {
                name: 'ULB',
                data: [40, 20, 80, 45],
            },
        ],
        toolbar: {
            tools: {
                download: false,
            },
        },
       

    };



    return (
        <>
            <SubHeading className='mx-5 my-5 mb-0 text-4xl'>
                Employee Management System
            </SubHeading>
            <div className="w-full flex flex-col sm:flex-row justify-between">

                <div className={`w-full md:w-[43.1%] h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 rounded-[19.516px] shadow-lg px-10 py-10 `}>

                    <InnerHeading className='text-red'>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                                <rect width="39" height="39" rx="11.4169" fill="#12743B" />
                                <path d="M24.3866 7.46216C29.0334 7.46216 31.9469 10.3544 31.9469 15.0224V17.8296L31.9384 17.9551C31.8772 18.4066 31.4901 18.7547 31.0218 18.7547H31.0112L30.8651 18.743C30.6731 18.712 30.4946 18.6202 30.3569 18.4794C30.1848 18.3032 30.091 18.0651 30.0967 17.8189V15.0224C30.0967 11.3433 28.0657 9.31234 24.3866 9.31234H15.3271C11.6374 9.31234 9.61706 11.3433 9.61706 15.0224V24.0926C9.61706 27.7717 11.648 29.792 15.3271 29.792H24.3866C28.0764 29.792 30.0967 27.761 30.0967 24.0926C30.0967 23.5816 30.5109 23.1675 31.0218 23.1675C31.5327 23.1675 31.9469 23.5816 31.9469 24.0926C31.9469 28.7499 29.0546 31.6422 24.3973 31.6422H15.3271C10.6591 31.6422 7.76688 28.7499 7.76688 24.0926V15.0224C7.76688 10.3544 10.6591 7.46216 15.3271 7.46216H24.3866ZM14.721 16.5961C14.9664 16.6044 15.1984 16.71 15.366 16.8895C15.5335 17.069 15.6228 17.3077 15.6142 17.5531V25.2835C15.5966 25.7944 15.1681 26.1943 14.6572 26.1767C14.1463 26.1591 13.7464 25.7306 13.764 25.2197V17.4787L13.7805 17.334C13.8176 17.1444 13.9141 16.97 14.058 16.8373C14.2379 16.6715 14.4766 16.5846 14.721 16.5961ZM19.8994 12.9702C20.4103 12.9702 20.8245 13.3844 20.8245 13.8953V25.2303C20.8245 25.7412 20.4103 26.1554 19.8994 26.1554C19.3885 26.1554 18.9743 25.7412 18.9743 25.2303V13.8953C18.9743 13.3844 19.3885 12.9702 19.8994 12.9702ZM25.0246 20.6793C25.5355 20.6793 25.9497 21.0935 25.9497 21.6044V25.2197C25.9497 25.7306 25.5355 26.1448 25.0246 26.1448C24.5137 26.1448 24.0995 25.7306 24.0995 25.2197V21.6044C24.0995 21.0935 24.5137 20.6793 25.0246 20.6793Z" fill="white" fill-opacity="0.92" />
                            </svg>
                        </i>
                        Today Attendance
                        <div className="menu absolute top-0 right-0 mt-10 mx-10">
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
                        </div>
                    </InnerHeading>

                    <div className="w-full flex flex-col sm:flex-row justify-between">

                        <div className={`w-full md:w-[44.3%] h-auto m-1 flex flex-col relative  p-5 `}>
                            <ReactApexChart options={chartOptions} series={chartOptions.series} type="donut" height={220} width={220} />
                        </div>

                        <div className={`w-full md:w-[56.3%] self-end`}>

                            <div className="w-full flex flex-col sm:flex-row justify-between ">

                                <div className={`w-full md:w-[48.5%] h-auto flex flex-col items-center justify-center relative border-r-2 border-[#C1C9EB] `}>
                                    <span className='text-[#12743B] text-3xl font-bold'>94</span>
                                    <InnerHeading className="text-center">
                                        Total No. of Present Employee
                                    </InnerHeading>
                                </div>

                                <div className={`w-full md:w-[48.5%] h-auto flex flex-col items-center justify-center relative`}>
                                    <span className='text-[#00E640] text-3xl font-bold'>34</span>
                                    <InnerHeading className="text-center">
                                        Total No. of Present Employee
                                    </InnerHeading>
                                </div>

                            </div>


                        </div>

                    </div>

                </div>

                <div className={`w-full md:w-[43.1%] h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 rounded-[19.516px] shadow-lg px-10 py-10 `}>
                    <InnerHeading>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                                <rect width="39" height="39" rx="11.4169" fill="#12743B" />
                                <path d="M24.3866 7.46216C29.0334 7.46216 31.9469 10.3544 31.9469 15.0224V17.8296L31.9384 17.9551C31.8772 18.4066 31.4901 18.7547 31.0218 18.7547H31.0112L30.8651 18.743C30.6731 18.712 30.4946 18.6202 30.3569 18.4794C30.1848 18.3032 30.091 18.0651 30.0967 17.8189V15.0224C30.0967 11.3433 28.0657 9.31234 24.3866 9.31234H15.3271C11.6374 9.31234 9.61706 11.3433 9.61706 15.0224V24.0926C9.61706 27.7717 11.648 29.792 15.3271 29.792H24.3866C28.0764 29.792 30.0967 27.761 30.0967 24.0926C30.0967 23.5816 30.5109 23.1675 31.0218 23.1675C31.5327 23.1675 31.9469 23.5816 31.9469 24.0926C31.9469 28.7499 29.0546 31.6422 24.3973 31.6422H15.3271C10.6591 31.6422 7.76688 28.7499 7.76688 24.0926V15.0224C7.76688 10.3544 10.6591 7.46216 15.3271 7.46216H24.3866ZM14.721 16.5961C14.9664 16.6044 15.1984 16.71 15.366 16.8895C15.5335 17.069 15.6228 17.3077 15.6142 17.5531V25.2835C15.5966 25.7944 15.1681 26.1943 14.6572 26.1767C14.1463 26.1591 13.7464 25.7306 13.764 25.2197V17.4787L13.7805 17.334C13.8176 17.1444 13.9141 16.97 14.058 16.8373C14.2379 16.6715 14.4766 16.5846 14.721 16.5961ZM19.8994 12.9702C20.4103 12.9702 20.8245 13.3844 20.8245 13.8953V25.2303C20.8245 25.7412 20.4103 26.1554 19.8994 26.1554C19.3885 26.1554 18.9743 25.7412 18.9743 25.2303V13.8953C18.9743 13.3844 19.3885 12.9702 19.8994 12.9702ZM25.0246 20.6793C25.5355 20.6793 25.9497 21.0935 25.9497 21.6044V25.2197C25.9497 25.7306 25.5355 26.1448 25.0246 26.1448C24.5137 26.1448 24.0995 25.7306 24.0995 25.2197V21.6044C24.0995 21.0935 24.5137 20.6793 25.0246 20.6793Z" fill="white" fill-opacity="0.92" />
                            </svg>
                        </i>
                        Total No. of Employee
                        <div className="menu absolute top-0 right-0 mt-10 mx-10">
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
                        </div>
                    </InnerHeading>
                    <ReactApexChart options={barchartOptions} series={barchartOptions.series} type="bar" height={250} width={600} />

                </div>

                <div className={`w-full md:w-[13.1%] h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 rounded-[19.516px] shadow-lg  }`}>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                            <rect width="27" height="27" rx="7.90404" fill="#12743B" />
                            <path d="M16.8831 5.16626C20.1 5.16626 22.1171 7.16858 22.1171 10.4003V12.3437L22.1112 12.4306C22.0688 12.7432 21.8009 12.9841 21.4766 12.9841H21.4693L21.3681 12.976C21.2352 12.9546 21.1116 12.8911 21.0163 12.7935C20.8972 12.6716 20.8322 12.5068 20.8362 12.3363V10.4003C20.8362 7.8532 19.4301 6.44716 16.8831 6.44716H10.6111C8.05665 6.44716 6.65797 7.8532 6.65797 10.4003V16.6796C6.65797 19.2267 8.06401 20.6254 10.6111 20.6254H16.8831C19.4375 20.6254 20.8362 19.2193 20.8362 16.6796C20.8362 16.3259 21.1229 16.0392 21.4766 16.0392C21.8303 16.0392 22.1171 16.3259 22.1171 16.6796C22.1171 19.9039 20.1148 21.9063 16.8904 21.9063H10.6111C7.3794 21.9063 5.37708 19.9039 5.37708 16.6796V10.4003C5.37708 7.16858 7.3794 5.16626 10.6111 5.16626H16.8831ZM10.1915 11.4898C10.3614 11.4955 10.522 11.5686 10.638 11.6929C10.754 11.8171 10.8158 11.9824 10.8098 12.1523V17.5041C10.7976 17.8578 10.501 18.1347 10.1473 18.1225C9.7936 18.1103 9.51675 17.8136 9.52895 17.4599V12.1008L9.54036 12.0006C9.56604 11.8693 9.63288 11.7486 9.73248 11.6568C9.85698 11.5419 10.0223 11.4818 10.1915 11.4898ZM13.7765 8.97951C14.1302 8.97951 14.417 9.26624 14.417 9.61995V17.4673C14.417 17.821 14.1302 18.1077 13.7765 18.1077C13.4228 18.1077 13.1361 17.821 13.1361 17.4673V9.61995C13.1361 9.26624 13.4228 8.97951 13.7765 8.97951ZM17.3248 14.3166C17.6785 14.3166 17.9652 14.6033 17.9652 14.957V17.4599C17.9652 17.8136 17.6785 18.1004 17.3248 18.1004C16.971 18.1004 16.6843 17.8136 16.6843 17.4599V14.957C16.6843 14.6033 16.971 14.3166 17.3248 14.3166Z" fill="white" fill-opacity="0.92" />
                        </svg>
                        <div className="menu absolute top-0 right-0 mt-4 mx-3">
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full mb-1"></div>
                            <div className="dot w-1 h-1 bg-gray-700 rounded-full"></div>
                        </div>
                    </i>
                    <InnerHeading className='mt-5 text-center text-xl text-[#000]'>
                        See the Log * Activity
                    </InnerHeading>

                    <h2 className='text-[#00E640] mt-4' >21 Feb - 2024</h2>
                    <InnerHeading><b className='text-[#12743B]'>admin - </b>  added a new record</InnerHeading>

                    <h2 className='text-[#00E640] mt-2'>21 Feb - 2024</h2>
                    <InnerHeading><b className='text-[#12743B]'>admin - </b>  added a new record</InnerHeading>




                    {/* <div className='h-[12rem] bg-[#ffffff] p-5 rounded-[19.516px] shadow-lg px-2 py-2 mt-4'>
                        <h2 className='text-[#00E640]'>21 Feb - 2024</h2>
                        <InnerHeading><b className='text-[#12743B]'>admin</b>  added a new record</InnerHeading>

                        <h2 className='text-[#00E640]'>21 Feb - 2024</h2>
                        <InnerHeading><b className='text-[#12743B]'>admin</b>  added a new record</InnerHeading>
                    </div> */}
                </div>

            </div>
        </>
    )
}

