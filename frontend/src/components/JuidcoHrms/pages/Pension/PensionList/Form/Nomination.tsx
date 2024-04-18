import PrimaryButton from '@/components/Helpers/Button';
import React from 'react';
import goBack from '@/utils/helper';
import { InnerHeading, SubHeading } from '@/components/Helpers/Heading';
import InputBox from '@/components/Helpers/InputBox';
import { Formik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NominationProps {
    onNext: () => void;
}
const Nomination: React.FC<NominationProps> = ({ onNext }) => {

    const pathName = usePathname();
    const router = useRouter();

    const initialValues = {
        emp_name: "",
    }

    const handleSubmitFormik = () => {
        console.log("click")
        router.push(`${pathName}?page=5`);
        onNext();

    }

  return (
      <>
         

          <div className='p-10 shadow-lg'>
              
              <InnerHeading className='justify-center items-center mb-10'>Nomination for unpaid amount on pension</InnerHeading>
              <div className='justify-center items-center mb-10'>
                  Declaration* <input type="checkbox" className='mb-4' />
                  <br></br>
                  <span>
                      I here by nominate the person / persons mentioned below is a members of our /my family and confirm him as I have no family,right to receive any amount of pension  as may be sanctioned in the event of my death while in service and the right to receive in my death any amount of pension and the right to receive in my death any amount pension which having been became admissible to me retirement and remain unpaid at my death.
                  </span>
              </div>
              
              <Formik
                  initialValues={initialValues}
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
                      <form onSubmit={handleSubmit} className="relative">
                          <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">

                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="Home Address of Nominee"
                                  name="emp_name"

                              />

                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="Relationship with the corporation Employee "
                                  name="emp_name"

                              />

                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="Age"
                                  name="emp_name"

                              />

                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="Remarks"
                                  name="emp_name"

                              />

                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="Date this"
                                  name="emp_name"

                              />


                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="Day of"
                                  name="emp_name"

                              />

                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="(At Place)"
                                  name="emp_name"

                              />

                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="Witness with full signature and address"
                                  name="emp_name"
                              />

                              <InputBox
                                  onChange={handleChange}
                                  value={values.emp_name}
                                  label="Signature of Corporation employed"
                                  name="emp_name"
                              />

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

          </div>
          
    </>
  )
}

export default Nomination
