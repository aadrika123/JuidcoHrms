"use client";

import { RootState } from "@/redux/store";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const ReceiptTable: React.FC = () => {
  const chequebookData = useSelector(
    (state: RootState) => state.receiptDetails.receiptDetails
  );

  console.log(chequebookData);
  return (
    <>
      <div className="overflow-x-auto border-[2px] border-zinc-400">
        <table className="table table-md">
          <thead className="  text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400 ">
            <tr>
              <th className="border border-zinc-400">
                <div className="flex gap-2 font-medium text-center">
                  <span>Sr No.</span>
                  
                </div>
              </th>
              <th className="border border-zinc-400  font-medium">
                <div className="flex gap-2">
                  <span>Receipt No</span>
                </div>
              </th>

              <th className="border border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Receipt Date</span>
                </div>
              </th>

              <th className="border  border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Sub ledger</span>
                </div>
              </th>

              <th className="border   border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Paid by</span>
                </div>
              </th>

              <th className="border   border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Amount (Rs)</span>
                </div>
              </th>

              <th className="border   border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Narration</span>
                </div>
              </th>

              
    
              <th className="border  border-zinc-400  font-medium">
                <div className="flex gap-2">
                  <span>View / Edit / Print </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M5.03514 13.9453H3.57031C3.18181 13.9453 2.80922 13.7909 2.53451 13.5162C2.2598 13.2415 2.10547 12.8689 2.10547 12.4804V8.81835C2.10547 8.42985 2.2598 8.05727 2.53451 7.78256C2.80922 7.50785 3.18181 7.35352 3.57031 7.35352H15.289C15.6775 7.35352 16.0501 7.50785 16.3248 7.78256C16.5995 8.05727 16.7538 8.42985 16.7538 8.81835V12.4804C16.7538 12.8689 16.5995 13.2415 16.3248 13.5162C16.0501 13.7909 15.6775 13.9453 15.289 13.9453H13.8242"
                        stroke="white"
                        strokeWidth="1.7578"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.8242 11.0156H5.03516V16.875H13.8242V11.0156Z"
                        stroke="white"
                        strokeWidth="1.7578"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.03516 7.35349V2.22656H13.8242V7.35349"
                        stroke="white"
                        strokeWidth="1.7578"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {chequebookData?.map((d, index: number) => (
              <tr key={index} className="border border-zinc-400 text-secondary">
                {/* ID */}
                <td className="border border-zinc-400">{d?.id}</td>

                {/* Date */}
                <td className="border border-zinc-400">{d?.receipt_no}</td>

                {/*  Bank Branch */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">{d?.date.toString()}</div>
                </td>

                {/* Bank Name */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    <div className="flex justify-center">{d?.subledger_id}</div>
                  </div>
                </td>

                {/* account number */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    <div className="flex justify-center">{d?.paid_by}</div>
                  </div>
                </td>

                {/* Bank Name */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    <div className="flex justify-center">{d?.amount}</div>
                  </div>
                </td>

                {/* Bank Name */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    <div className="flex justify-center">{d?.narration}</div>
                  </div>
                </td>

                

                {/* View / Print */}
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">

                  <Link href={`/receipt-entry/view/${d.id}`}>
                      <div className="flex justify-center opacity-90">
                      
                    
                        <span className="ml-2 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 14" fill="none">
                            <rect x="0.40876" y="0.40876" width="13.3107" height="13.1825" rx="3.67884" stroke="#726E6E" strokeWidth="0.81752" />
                            <path d="M6.93513 6.37039C7.19504 6.37039 7.44431 6.47364 7.62809 6.65743C7.81188 6.84121 7.91513 7.09048 7.91513 7.35039C7.91513 7.6103 7.81188 7.85957 7.62809 8.04336C7.44431 8.22714 7.19504 8.33039 6.93513 8.33039C6.67522 8.33039 6.42595 8.22714 6.24217 8.04336C6.05838 7.85957 5.95513 7.6103 5.95513 7.35039C5.95513 7.09048 6.05838 6.84121 6.24217 6.65743C6.42595 6.47364 6.67522 6.37039 6.93513 6.37039ZM6.93513 4.90039C8.56846 4.90039 9.96333 5.91632 10.5285 7.35039C9.96333 8.78446 8.56846 9.80039 6.93513 9.80039C5.3018 9.80039 3.90693 8.78446 3.3418 7.35039C3.90693 5.91632 5.3018 4.90039 6.93513 4.90039ZM4.05393 7.35039C4.31796 7.88949 4.72794 8.3437 5.23727 8.66139C5.7466 8.97907 6.33485 9.14749 6.93513 9.14749C7.53541 9.14749 8.12366 8.97907 8.63299 8.66139C9.14232 8.3437 9.5523 7.88949 9.81633 7.35039C9.5523 6.81129 9.14232 6.35708 8.63299 6.03939C8.12366 5.72171 7.53541 5.55329 6.93513 5.55329C6.33485 5.55329 5.7466 5.72171 5.23727 6.03939C4.72794 6.35708 4.31796 6.81129 4.05393 7.35039Z" fill="black" fillOpacity="0.41" />
                          </svg>
                        </span>
                        
                        <span className="ml-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 14" fill="none">
                          <rect x="0.40876" y="0.40876" width="13.3107" height="13.1825" rx="3.67884" stroke="#726E6E" strokeWidth="0.81752" />
                          <path d="M9.73084 5.61487C9.61186 5.73386 9.49637 5.84934 9.49287 5.96483C9.48238 6.07681 9.60136 6.19229 9.71334 6.30078C9.88132 6.47575 10.0458 6.63323 10.0388 6.80471C10.0318 6.97618 9.85332 7.15466 9.67485 7.32964L8.22955 8.77843L7.73262 8.2815L9.21991 6.79771L8.88396 6.46176L8.38703 6.95519L7.07471 5.64287L8.41852 4.30256C8.555 4.16608 8.78247 4.16608 8.91196 4.30256L9.73084 5.12144C9.86732 5.25092 9.86732 5.47839 9.73084 5.61487ZM3.5332 9.18788L6.87874 5.83884L8.19106 7.15116L4.84552 10.5002H3.5332V9.18788Z" fill="black" fillOpacity="0.41" />
                        </svg>
                      </span>


                        
                        <span className="ml-2 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 14" fill="none">
                            <rect x="0.537666" y="0.40876" width="13.3107" height="13.1825" rx="3.67884" stroke="#726E6E" strokeWidth="0.81752" />
                            <path d="M8.16628 6.29997V5.32499H5.56635V6.29997H5.24135V5H8.49127V6.29997H8.16628ZM8.69114 7.43744C8.78322 7.43744 8.86046 7.40635 8.92286 7.34417C8.98526 7.28198 9.01635 7.20474 9.01613 7.11245C9.01613 7.02037 8.98504 6.94323 8.92286 6.88105C8.86068 6.81887 8.78344 6.78767 8.69114 6.78746C8.59906 6.78746 8.52193 6.81865 8.45975 6.88105C8.39757 6.94345 8.36637 7.02058 8.36615 7.11245C8.36615 7.20453 8.39735 7.28177 8.45975 7.34417C8.52215 7.40656 8.59928 7.43766 8.69114 7.43744ZM8.16628 9.67501V8.2002H5.56635V9.67501H8.16628ZM8.49127 10H5.24135V8.70003H4.12891V6.94995C4.12891 6.76579 4.19141 6.61142 4.31643 6.48684C4.44144 6.36226 4.59559 6.29997 4.77889 6.29997H8.95374C9.1379 6.29997 9.29227 6.36226 9.41685 6.48684C9.54143 6.61142 9.60372 6.76579 9.60372 6.94995V8.70003H8.49127V10ZM9.27873 8.37504V6.94995C9.27873 6.85787 9.24764 6.78074 9.18545 6.71856C9.12327 6.65638 9.04603 6.62518 8.95374 6.62496H4.77889C4.68681 6.62496 4.60957 6.65616 4.54717 6.71856C4.48477 6.78096 4.45368 6.85809 4.4539 6.94995V8.37504H5.24135V7.8752H8.49127V8.37504H9.27873Z" fill="#969696" />
                          </svg>
                        </span>
                        

                      </div>
                    </Link>


                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReceiptTable;
