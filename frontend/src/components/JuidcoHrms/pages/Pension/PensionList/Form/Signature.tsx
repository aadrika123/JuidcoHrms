/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, ChangeEvent } from 'react'
import { usePathname, useRouter } from "next/navigation";
import { InnerHeading } from '@/components/Helpers/Heading';
import PrimaryButton from '@/components/Helpers/Button';
import goBack from '@/utils/helper';
import { EmployeeDetailsInterface } from './Refund';
import { useQueryClient } from 'react-query';
import axios from "@/lib/axiosConfig"
import Image from 'next/image';

interface PensionPaymentProps {
    onNext: () => void;
}

const Signature: React.FC<PensionPaymentProps> = ({ onNext }) => {
    const pathName = usePathname();
    const router = useRouter();
    const queryClient = useQueryClient()
    const [imgData, setImgData] = useState<any>({})

    const handleClick = () => {
        sessionStorage.setItem('pen_docs', JSON.stringify(imgData))
        router.push(`${pathName}?page=9`);
        onNext();
    }

    async function uploadImage(file: File) {
        const formData = new FormData()
        formData.append('img', file)
        try {
            const res = await axios({
                url: "/dms/get-url",
                method: "POST",
                data: formData
            })
            return res
        } catch {
            alert("Image upload failed")
        }
    }


    // const fileInputRef = useRef<HTMLInputElement>(null)

    // const handleFileUpload = () => {
    //     // Trigger the hidden file input
    //     if (fileInputRef.current) {
    //         fileInputRef.current.click();
    //     }
    // };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        // console.log(file, event?.target?.name)
        if (file) {
            const data: any = await uploadImage(file)
            // console.log(data?.data?.data)
            setImgData((prev: any) => ({
                ...prev,
                [event?.target?.name]: data?.data?.data
            }))
        }
    };


    const emp_details =
        queryClient.getQueryData<EmployeeDetailsInterface>("emp_details");
    const last_pay_drawn: number =
        Number(emp_details?.emp_join_details?.basic_pay) +
        Number(emp_details?.emp_join_details?.grade_pay);

    return (
        <>
            {/* 1st col start */}

            <div className="border rounded-lg p-10 shadow-md">
                <InnerHeading>Upload 3 copies of signature with preview of the employee</InnerHeading>
                <div className='flex justify-between mt-5'>
                    <div><input type="file" name='signature1' onChange={handleFileChange} />{imgData?.signature1 && (<Image src={imgData?.signature1 || ''} alt='signature1' width={150} height={75} className='p-2' />)}</div>
                    <div><input type="file" name='signature2' onChange={handleFileChange} />{imgData?.signature2 && (<Image src={imgData?.signature2 || ''} alt='signature2' width={150} height={75} className='p-2' />)}</div>
                    <div><input type="file" name='signature3' onChange={handleFileChange} />{imgData?.signature3 && (<Image src={imgData?.signature3 || ''} alt='signature3' width={150} height={75} className='p-2' />)}</div>
                </div>
            </div>

            {/* 2nd col start */}

            <div className="border rounded-lg p-10 shadow-md mt-5">
                <InnerHeading>Upload 3 copies of photo of the employee</InnerHeading>

                {/* <div className='flex justify-between mt-10'>
                    <div className='flex flex-col items-center'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            name='photo1'
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        <svg
                            className='border-2 border-[#9AC0F9] p-3'
                            onClick={handleFileUpload}
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            height="5em"
                            width="5em"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ cursor: 'pointer' }}
                        >
                            <polyline points="16 16 12 12 8 16"></polyline>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                            <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>


                        {signature1 ? (
                            <p style={{ marginTop: '0.5rem' }}>
                                Uploaded File: {signature1.name}
                            </p>
                        ) : (
                            <p>Browse to Upload your Photo</p>
                        )}
                    </div>

                    <div className='flex flex-col items-center'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            name='photo2'
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        <svg
                            className='border-2 border-[#9AC0F9] p-3'
                            onClick={handleFileUpload}
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            height="5em"
                            width="5em"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ cursor: 'pointer' }}
                        >
                            <polyline points="16 16 12 12 8 16"></polyline>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                            <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>


                        {signature1 ? (
                            <p style={{ marginTop: '0.5rem' }}>
                                Uploaded File: {signature1.name}
                            </p>
                        ) : (
                            <p>Browse to Upload your Photo</p>
                        )}
                    </div>

                    <div className='flex flex-col items-center'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            name='photo3'
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        <svg
                            className='border-2 border-[#9AC0F9] p-3'
                            onClick={handleFileUpload}
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            height="5em"
                            width="5em"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ cursor: 'pointer' }}
                        >
                            <polyline points="16 16 12 12 8 16"></polyline>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                            <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>


                        {signature1 ? (
                            <p style={{ marginTop: '0.5rem' }}>
                                Uploaded File: {signature1.name}
                            </p>
                        ) : (
                            <p>Browse to Upload your Photo</p>
                        )}
                    </div>
                </div> */}

                <div className='flex justify-between mt-5'>
                    <div><input type="file" name='photo1' onChange={handleFileChange} />{imgData?.photo1 && (<Image src={imgData?.photo1 || ''} alt='photo1' width={150} height={75} className='p-2' />)}</div>
                    <div><input type="file" name='photo2' onChange={handleFileChange} />{imgData?.photo2 && (<Image src={imgData?.photo2 || ''} alt='photo2' width={150} height={75} className='p-2' />)}</div>
                    <div><input type="file" name='photo3' onChange={handleFileChange} />{imgData?.photo3 && (<Image src={imgData?.photo3 || ''} alt='photo3' width={150} height={75} className='p-2' />)}</div>
                </div>


                {/* <div className="flex items-center justify-end mt-5 gap-5">

                    <PrimaryButton
                        buttonType="button"
                        variant={"cancel"}
                        onClick={goBack}
                    >
                        Back
                    </PrimaryButton>

                    <PrimaryButton
                        // onClick={handleReset}
                        buttonType="button"
                        variant={"cancel"}
                    >
                        Reset
                    </PrimaryButton>

                    <PrimaryButton buttonType="submit" variant="primary">
                        Next
                    </PrimaryButton>
                </div> */}
            </div>

            {/* 3rd col start */}

            <div className=" border rounded-lg p-10 shadow-md mt-5 ">
                <InnerHeading className='flex items-center justify-center'>Declaration Of Beneficiary</InnerHeading>
                <div className='mt-5'>
                    <input type="checkbox" className='mb-5' /> Declaration*
                    <br></br>
                    <span>
                        Whereas the CEO/Standing Committee of the Organization has consented to grant me the sum of Rs {last_pay_drawn} being the amount of family pension due to me and arrears of pension due to Sri./Smt {emp_details?.emp_basic_details.emp_name} of Designation {`Deputy Muncipal Comissioner`} i hereby acknokledge the amount of Rs.{last_pay_drawn}                 </span>
                </div>



                <div className="flex items-center justify-end mt-5 gap-5">

                    <PrimaryButton
                        buttonType="button"
                        variant={"cancel"}
                        onClick={goBack}
                    >
                        Back
                    </PrimaryButton>

                    <PrimaryButton buttonType="submit" variant="primary" onClick={handleClick}>
                        Next
                    </PrimaryButton>
                </div>
            </div>
        </>
    )
}

export default Signature
