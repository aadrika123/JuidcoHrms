"use client";

import React, { useState } from "react";
import { SubHeading } from '@/components/Helpers/Heading';
import { Formik } from 'formik';
import { EmployeePresentAddressDetailsType , EmployeeDetailsProps} from '@/utils/types/employee.type';
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { initialEmployeeAddressDetails, employeePresentAddressValidationSchema } from '@/utils/validation/Ems/ems.validation';


const EmpPresentAddress: React.FC<
  EmployeeDetailsProps<EmployeePresentAddressDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();

  // const [empLangTypes, setEmpLangTypes] = useState<
  //   ("read" | "write" | "speak")[]
  // >([]);

  // function updateEmpLangTypes(langType: "read" | "write" | "speak") {
  //   setEmpLangTypes((prev) => {
  //     // Toggle the value in the array
  //     if (prev.includes(langType)) {
  //       return prev.filter((lang) => lang !== langType);
  //     } else {
  //       return [...prev, langType];
  //     }
  //   });
  // }

  const updateEmpLangTypes = ()=>{

  }

  const handleSubmitFormik = (
    values: EmployeePresentAddressDetailsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_address_details", JSON.stringify(values));
      setSubmitting(false);
      if (props.setData) {
        props.setData("EmpAddressDetails", values);
      }
      router.push(`${pathName}?page=5`);
    }
  };

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_address_details")
        ? JSON.parse(sessionStorage.getItem("emp_address_details") ?? "{}")
        : initialEmployeeAddressDetails
      : initialEmployeeAddressDetails;

  return (
    <>
      <SubHeading className="text-[20px] py-4">
        Employee Personal Details
      </SubHeading>
      <Formik
        initialValues={initialValues}
        validationSchema={employeePresentAddressValidationSchema}
        onSubmit={handleSubmitFormik}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
              
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address_primary}
                error={errors.address_primary}
                touched={touched.address_primary}
                label="Address-1*"
                placeholder="Enter Present Address"
                name="address_primary"
              />
             
               <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address_secondary}
                label="Address-2"
                name="address_secondary"
                placeholder={"Enter Present Address"}
              />
               <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.village}
                error={errors.village}
                touched={touched.village}
                label="Village/Town/City*"
                placeholder="Enter Your Village/Town/City"
                name="village"
              />
               <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.post_office}
                label="Post Office"
                placeholder="Enter Your Post Office"
                name="post_office"
              />
                <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
                error={errors.state}
                touched={touched.state}
                label="State*"
                placeholder="Enter Your State"
                name="state"
              />
                <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                error={errors.district}
                touched={touched.district}
                label="District*"
                placeholder="Enter Your District"
                name="district"
              />
                <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.block_ulb}
                label="Block ULB"
                placeholder="Block ULB"
                name="block_ulb"
              />
               <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pin_code}
                error={errors.pin_code}
                touched={touched.pin_code}
                label="Pin Code*"
                placeholder="Pin Code"
                name="pin_code"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.police_station}
                error={errors.police_station}
                touched={touched.police_station}
                label="Police Station*"
                placeholder="Police Station"
                name="police_station"
              />
              <div className="flex items-center gap-5">
                <div className="flex items-center">
                  <input
                    onChange={() => updateEmpLangTypes()}
                    className={`mr-1 bg-white checkbox border border-zinc-500`}
                    name={"read"}
                    id="read"
                    type="checkbox"
                  />
                  <label htmlFor="">If Present & Permanent Address are not same*</label>
                </div>

                
              </div>
  
             
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
                onClick={handleReset}
                buttonType="button"
                variant={"cancel"}
              >
                Reset
              </PrimaryButton>

              <PrimaryButton buttonType="submit" variant="primary">
                Next
              </PrimaryButton>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EmpPresentAddress;