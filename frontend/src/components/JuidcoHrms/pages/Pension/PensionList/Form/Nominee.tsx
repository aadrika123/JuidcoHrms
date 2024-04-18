"use client"
import PrimaryButton from '@/components/Helpers/Button'
import React, { useState } from 'react';
import { COLUMNS } from '@/components/global/organisms/TableFormContainer';
import goBack from '@/utils/helper';
import { SubHeading } from '@/components/Helpers/Heading';
import TableFormContainer from '@/components/global/organisms/TableFormContainer';
import ProfileIcon from "@/assets/icons/profile_new.png";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NomineeProps {
    onNext: () => void;
}


const Nominee: React.FC<NomineeProps> = ({ onNext }) => {

    const [session, setSession] = useState<number>(0);
    const [tabIndex, setTabIndex] = useState<number>(1);
    const [employeeFamilyDetails, setEmployeeFamilyDetails] = useState([]);
    const [isValidate, setIsValidate] = useState<boolean>(true);
    const router = useRouter();
    const pathName = usePathname();



    const COLUMS_EMP_NOMINEE_DETAILS: COLUMNS[] = [
        {
            HEADER: "SL. No.",
            ACCESSOR: "sl_no",
            isRequired: false,
            sl_no: true,
        },
        {
            HEADER: "Nominee Name ",
            ACCESSOR: "nominee_name",
            isRequired: true,
        },
        {
            HEADER: "Relation",
            ACCESSOR: "relation",
            isRequired: true,
        },

        {
            HEADER: "Percentage",
            ACCESSOR: "percentage",
            isRequired: true,
            type: "number",
        },

        {
            HEADER: "Address",
            ACCESSOR: "address",
            isRequired: true,
        },
        {
            HEADER: "Minor",
            ACCESSOR: "minor",
            isRequired: true,
            type: "radio",
        },
    ];

    function getStateData(key: string, values: any, index?: number) {
        setEmployeeFamilyDetails((prev: any) => ({ ...prev, [key]: values }));
        setTabIndex(index || tabIndex);
    }

    const hanldeClick = () => {
        router.push(`${pathName}?page=2`);
        onNext();
    }

  return (
    <>
          
          <div className='p-10 shadow-lg'>
              
              <div className='flex gap-10 m-5'>
                  <Image src={ProfileIcon} width={100} height={100} alt="logo" />
                  <Image src={ProfileIcon} width={100} height={100} alt="logo" />
              </div>

              <div className='p-10 shadow-lg mb-10'>
                  <TableFormContainer
                      setData={getStateData}
                      columns={COLUMS_EMP_NOMINEE_DETAILS}
                      getData={[]}
                      subHeading={"Employee Nominee Details  "}
                      session_key={"emp_nominee_details"}
                      setSession={session}
                      validate={setIsValidate}
                  // resetTable={resetTable}
                  />
              </div>

              <input type="checkbox" /> Declaration*
              <br></br>

              <div className='mt-10'>
                  Whereas the municipal commissioner,ULB_Name ____ has consented provisionally to advance to me the sum of Rs._____dynamic fetch____________ a month ,in anticipation of the completion of the enquiries necessary to enable the Corporation to fix the amount of my pension I heleby acknowledge that in accepting this advance I fully understand that my pension is subject to revision on the completion of the necessary formal enquiries ,and I promise to raise no objection to such supervision on the ground that the provision pension no to be paid to me exceeds the pension to which I may be eventually found entitled .In further promise to repay amount advanced to me in excess of the pension to which I may be eventually found entitled.In further promise to repay amount advanced to me in excess of the pension to which I may be eventually found entitled.
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

                  <PrimaryButton buttonType="submit" variant="primary" onClick={hanldeClick}>
                      Next
                  </PrimaryButton>
              </div>

          </div> 

    </>
  )
}

export default Nominee
