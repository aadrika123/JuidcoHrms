"use client"
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TableFormContainer from '@/components/global/organisms/TableFormContainer';
import { COLUMNS } from '@/components/global/organisms/TableFormContainer';
import PrimaryButton from '@/components/Helpers/Button';
import goBack from '@/utils/helper';
import { InnerHeading } from '@/components/Helpers/Heading';

interface PensionPaymentProps {
    onPrev: () => void;
}

const FamilyDeclaration: React.FC<PensionPaymentProps> = ({ onPrev }) => {
    const pathName = usePathname();
    const router = useRouter();
    const [session, setSession] = useState<number>(0);
    const [tabIndex, setTabIndex] = useState<number>(1);
    const [employeeFamilyDetails, setEmployeeFamilyDetails] = useState([]);
    const [isValidate, setIsValidate] = useState<boolean>(true);

    const COLUMS_EMP_NOMINEE_DETAILS: COLUMNS[] = [
        {
            HEADER: "SL. No.",
            ACCESSOR: "sl_no",
            isRequired: false,
            sl_no: true,
        },
        {
            HEADER: "Name ",
            ACCESSOR: "nominee_name",
            isRequired: true,
        },
        {
            HEADER: "Relation",
            ACCESSOR: "relation",
            isRequired: true,
        },

        {
            HEADER: "D.O.B",
            ACCESSOR: "percentage",
            isRequired: true,
            type: "date",
        },

        {
            HEADER: "Married or Unmarried(in case of daughter only)",
            ACCESSOR: "address",
            isRequired: true,
        },
        
    ];

    function getStateData(key: string, values: any, index?: number) {
        setEmployeeFamilyDetails((prev: any) => ({ ...prev, [key]: values }));
        setTabIndex(index || tabIndex);
    }

    const handleClick = () => {
        // router.push(`${pathName}?page=10`);
        onPrev();
    }


  return (
    <div>
          
          <div className='p-10 shadow-lg mb-10 '>
              
              <TableFormContainer
                  setData={getStateData}
                  columns={COLUMS_EMP_NOMINEE_DETAILS}
                  getData={[]}
                  subHeading={"Employee Family Information"}
                  session_key={"emp_nominee_details"}
                  setSession={session}
                  validate={setIsValidate}
              // resetTable={resetTable}
              />
          </div>
          <div className='p-10 shadow-lg mb-10 mt-5'>
              <InnerHeading className='flex items-center justify-center mb-5'>Certificate of dues if found outstanding against corporation employee.</InnerHeading>
              <input type="checkbox" /> Declaration*
              <br></br>

            <div className='mt-10'>
            Should any amount whether due to excess or overdrawal of pay ,allowance or unrefunded balance of advances of pay travelling allowances,on transfer,motor car  or cycle ,House Building etc or dues on account of house rent or otherwise outstanding for recovery of any amount from me,I shall be called upon to pay.              </div>
          </div>

          <div className="flex items-center justify-end mt-5 gap-5">
              
              <PrimaryButton
                  buttonType="button"
                  variant={"cancel"}
                  onClick={goBack}
              >
                  Back
              </PrimaryButton>

              <PrimaryButton

                  buttonType="button"
                  variant={"cancel"}
              >
                  Reset
              </PrimaryButton>

              <PrimaryButton buttonType="submit" variant="primary" >
                  Next
              </PrimaryButton>
          </div>

    </div>
  )
}

export default FamilyDeclaration
