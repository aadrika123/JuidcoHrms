import React from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InnerHeading, SubHeading } from '@/components/Helpers/Heading';
import InputBox from '@/components/Helpers/InputBox';
import { Formik } from 'formik';
import PrimaryButton from '@/components/Helpers/Button';
import goBack from '@/utils/helper';

interface DecProps {
    onNext: () => void;
}

const Declaration: React.FC<DecProps> = ({ onNext }) => {
    const pathName = usePathname();
    const router = useRouter();

    const handleSubmitFormik = () => {
        console.log("click")
        router.push(`${pathName}?page=7`);
        onNext();

    }

    const initialValues = {
        emp_name: "",
    }


  return (
      <>
          <div>
              <InnerHeading className='justify-center items-center mt-5 mb-5'>Declaration to the Chief Account Officer</InnerHeading>

              <div>
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
                                      label="Name of Pensioner"
                                      name="emp_name"

                                  />

                                  <InputBox
                                      onChange={handleChange}
                                      value={values.emp_name}
                                      label="Guardian name"
                                      name="emp_name"

                                  />

                                  <InputBox
                                      onChange={handleChange}
                                      value={values.emp_name}
                                      label="Name of Post from which he retired"
                                      name="emp_name"

                                  />

                                  <InputBox
                                      onChange={handleChange}
                                      value={values.emp_name}
                                      label="DOB"
                                      name="emp_name"

                                  />

                                  <InputBox
                                      onChange={handleChange}
                                      value={values.emp_name}
                                      label="Class of Pension And No.& Date of sanction order"
                                      name="emp_name"
                                      type='date'

                                  />


                                  <InputBox
                                      onChange={handleChange}
                                      value={values.emp_name}
                                      label="Full permanent address"
                                      name="emp_name"

                                  />

                                  <InputBox
                                      onChange={handleChange}
                                      value={values.emp_name}
                                      label="Cash"
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
                                      label="Amount"
                                      name="emp_name"
                                  />
                              </div>

                              <div className="mt-5">
                                   TO
                                  <br></br>

                                  <SubHeading className='justify-center items-center mt-5'>The Chief Account Officer</SubHeading>
                                  <InnerHeading className='justify-center items-center mt-5 mb-5'>ULB Name </InnerHeading>

                                  <span>
                                      Until further Notice on the expiration of every month, be pleased to pay to Sri/Smt..............The Amount of Rs .................................being the amount of pension upon the production of the under and a receipt according to the usual form
                                  </span>

                                  <div className='flex justify-between mt-5'>
                                      <div>
                                          The payment should commence form :-
                                      </div>
                                      <div>
                                          Date- 18/04/2024
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
              </div>
        </div>
    </>
  )
}

export default Declaration
