/***
 * Author: Jaideep
 * Status: Open
 * Uses: Statement Form Design
 */

import PrimaryButton from '@/components/Helpers/Button'
import React from 'react';
import goBack from '@/utils/helper';
import { InnerHeading, SubHeading } from '@/components/Helpers/Heading';
import { COLUMNS } from '@/components/global/organisms/TableFormContainer';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface StatementProps {
    onNext: () => void;
}

const Statement: React.FC<StatementProps> = ({ onNext }) => {

    const router = useRouter()
    const pathName = usePathname()

    const COLUMS_EMP_PAY_DRAW_DETAILS: COLUMNS[] = [
        
        {
            HEADER: "Month ",
            ACCESSOR: "nominee_name",
            isRequired: true,
        },
        {
            HEADER: "Year Rs.",
            ACCESSOR: "relation",
            isRequired: true,
        },

        {
            HEADER: "Year No. of Day",
            ACCESSOR: "percentage",
            isRequired: true,
            type: "number",
        },

        {
            HEADER: "Rs.",
            ACCESSOR: "address",
            isRequired: true,
        },
    ];

    const handleClick = () => {
        router.push(`${pathName}?page=4`);
        onNext();
    }

  return (
    <>
         
          <div className='shadow-md p-10'>
              <InnerHeading>Statement showing the pay drawn during the 12 month :</InnerHeading>

              <div className="overflow-x-auto">
                  <table className="table-auto w-full mt-10">
                      <thead>
                          <tr>
                              {COLUMS_EMP_PAY_DRAW_DETAILS.map((item, index) => (
                                  <th key={index} className="px-4 py-2 text-left">{item.HEADER}</th>
                              ))}
                          </tr>
                      </thead>
                      <tbody>
                          <tr className=" border-b">
                              <td className=" px-4 py-2 text-left">Nos. of day</td>
                              <td className=" px-4 py-2 text-left">1</td>
                              <td className=" px-4 py-2 text-left">2</td>
                              <td className=" px-4 py-2 text-left">3</td>
                          </tr>
                          
                          <tr className=" border-b">
                              <td className=" px-4 py-2 text-left">January</td>
                              <td className=" px-4 py-2 text-left">1</td>
                              <td className=" px-4 py-2 text-left">2</td>
                              <td className=" px-4 py-2 text-left">3</td>
                          </tr>
                          <tr className=" border-b">
                              <td className=" px-4 py-2 text-left">February</td>
                              <td className=" px-4 py-2 text-left">1</td>
                              <td className=" px-4 py-2 text-left">2</td>
                              <td className=" px-4 py-2 text-left">3</td>
                          </tr>

                          <tr className=" border-b">
                              <td className=" px-4 py-2 text-left">March</td>
                              <td className=" px-4 py-2 text-left">1</td>
                              <td className=" px-4 py-2 text-left">2</td>
                              <td className=" px-4 py-2 text-left">3</td>
                          </tr>

                          <tr className=" border-b">
                              <td className=" px-4 py-2 text-left">April</td>
                              <td className=" px-4 py-2 text-left">1</td>
                              <td className=" px-4 py-2 text-left">2</td>
                              <td className=" px-4 py-2 text-left">3</td>
                          </tr>

                          <tr className=" border-b">
                              <td className=" px-4 py-2 text-left">May</td>
                              <td className=" px-4 py-2 text-left">1</td>
                              <td className=" px-4 py-2 text-left">2</td>
                              <td className=" px-4 py-2 text-left">3</td>
                          </tr>    
                      </tbody>
                  </table>
              </div>
              <span> Remarks 
                  <input type="text" placeholder='Please Enter Remarks' className='border mt-5 mx-4 p-2 mb-5' /><br></br>
                  (The undersigned having satisfied about the above particular ,recommend the grant of the pension of Rs.....pension calculation....... only. )
              </span>

              <div className="flex items-center justify-end mt-5 gap-5">
                  <PrimaryButton
                      buttonType="button"
                      variant={"cancel"}
                      onClick={goBack}
                  >
                      Back
                  </PrimaryButton>

                  <PrimaryButton
                    //   onClick={handleReset}
                      buttonType="button"
                      variant={"cancel"}
                  >
                      Reset
                  </PrimaryButton>

                  <PrimaryButton buttonType="submit" variant="primary" onClick={handleClick}>
                      Next
                  </PrimaryButton>
              </div>
          </div>
    </>
  )
}

export default Statement
