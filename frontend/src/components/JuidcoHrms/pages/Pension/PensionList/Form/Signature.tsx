"use client"
import React, { useRef, useState, ChangeEvent } from 'react'
import { usePathname, useRouter } from "next/navigation";
import { InnerHeading } from '@/components/Helpers/Heading';
import PrimaryButton from '@/components/Helpers/Button';
import goBack from '@/utils/helper';
import { EmployeeDetailsInterface } from './Refund';
import { useQueryClient } from 'react-query';

interface PensionPaymentProps {
    onNext: () => void;
}

const Signature: React.FC<PensionPaymentProps> = ({ onNext }) => {
    const pathName = usePathname();
    const router = useRouter();
    const queryClient = useQueryClient()

    const handleClick = () => {
        router.push(`${pathName}?page=9`);
        onNext();
    }

    // const fileInputRef = useRef(null);
    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileUpload = () => {
    //     fileInputRef.current.click();
    // };

    // const handleFileChange = (event: any) => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file); 
    // };


    const fileInputRef = useRef<HTMLInputElement>(null); // Explicitly define type for fileInputRef
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Define type for selectedFile

    const handleFileUpload = () => {
        // Trigger the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Handle file selection
        const file = event.target.files?.[0]; // Access files safely using optional chaining
        setSelectedFile(file || null); // Update selectedFile state with the selected file
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
                    <div><input type="file" /></div>
                    <div><input type="file" /></div>
                    <div><input type="file" /></div>

                </div>
                <div className="flex items-center justify-end mt-5 gap-5">

                    <PrimaryButton
                        buttontype="button"
                        variant={"cancel"}
                        onClick={goBack}
                    >
                        Back
                    </PrimaryButton>

                    <PrimaryButton
                        // onClick={handleReset}
                        buttontype="button"
                        variant={"cancel"}
                    >
                        Reset
                    </PrimaryButton>

                    <PrimaryButton buttontype="submit" variant="primary">
                        Next
                    </PrimaryButton>
                </div>
            </div>

            {/* 2nd col start */}

            <div className="border rounded-lg p-10 shadow-md mt-5">
                <InnerHeading>Upload 3 copies of signature with preview of the employee</InnerHeading>

                <div className='flex justify-between mt-10'>
                    <div className='flex flex-col items-center'>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        {/* SVG Icon for Upload */}
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


                        {/* Display uploaded file name or path */}
                        {selectedFile ? (
                            <p style={{ marginTop: '0.5rem' }}>
                                Uploaded File: {selectedFile.name}
                            </p>
                        ) : (
                            <p>Browse to Upload your Photo</p>
                        )}
                    </div>

                    <div className='flex flex-col items-center'>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        {/* SVG Icon for Upload */}
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


                        {/* Display uploaded file name or path */}
                        {selectedFile ? (
                            <p style={{ marginTop: '0.5rem' }}>
                                Uploaded File: {selectedFile.name}
                            </p>
                        ) : (
                            <p>Browse to Upload your Photo</p>
                        )}
                    </div>

                    <div className='flex flex-col items-center'>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        {/* SVG Icon for Upload */}
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


                        {/* Display uploaded file name or path */}
                        {selectedFile ? (
                            <p style={{ marginTop: '0.5rem' }}>
                                Uploaded File: {selectedFile.name}
                            </p>
                        ) : (
                            <p>Browse to Upload your Photo</p>
                        )}
                    </div>
                </div>



                <div className="flex items-center justify-end mt-5 gap-5">

                    <PrimaryButton
                        buttontype="button"
                        variant={"cancel"}
                        onClick={goBack}
                    >
                        Back
                    </PrimaryButton>

                    <PrimaryButton
                        // onClick={handleReset}
                        buttontype="button"
                        variant={"cancel"}
                    >
                        Reset
                    </PrimaryButton>

                    <PrimaryButton buttontype="submit" variant="primary">
                        Next
                    </PrimaryButton>
                </div>
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
                        buttontype="button"
                        variant={"cancel"}
                        onClick={goBack}
                    >
                        Back
                    </PrimaryButton>

                    <PrimaryButton buttontype="submit" variant="primary" onClick={handleClick}>
                        Next
                    </PrimaryButton>
                </div>
            </div>
        </>
    )
}

export default Signature
