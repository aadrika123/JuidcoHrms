import React from "react";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "@/components/Helpers/Button";
import InputBox from "@/components/Helpers/InputBox";
import { Formik } from "formik";
import goBack from "@/utils/helper";

interface PensionPaymentProps {
  onNext: () => void;
}

const PensionPayment: React.FC<PensionPaymentProps> = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleSubmitFormik = () => {
    console.log("click");
    router.push(`${pathName}?page=8`);
    // onNext()
  };

  const initialValues = {
    emp_name: "",
  };

  return (
    <>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmitFormik}>
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="relative">
              <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
                <InputBox
                  onChange={handleChange}
                  value={values.emp_name}
                  label="Pension Payment order No."
                  name="emp_name"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.emp_name}
                  label="Date of Pension"
                  name="emp_name"
                  type="date"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.emp_name}
                  label="Net Amount"
                  name="emp_name"
                />
              </div>
              <div className="mt-5">
                <input type="checkbox" className="mb-5" /> Declaration*
                <br></br>
                <span>
                  Declare that I have not received any remuneration for serving
                  any capacity either in Government or in local bodies during
                  the period for which amount of pension claimed in the bill is
                  due
                </span>
              </div>

              <div className="flex items-center justify-end mt-5 gap-5">
                <PrimaryButton
                  buttontype="button"
                  variant={"cancel"}
                  onClick={goBack}
                >
                  Back
                </PrimaryButton>

               

                <PrimaryButton buttontype="submit" variant="primary">
                  Next
                </PrimaryButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default PensionPayment;
