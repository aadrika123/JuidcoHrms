import React from "react";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "@/components/Helpers/Button";
import InputBox from "@/components/Helpers/InputBox";
import { Formik } from "formik";
import goBack from "@/utils/helper";

interface PensionPaymentProps {
  onNext: () => void;
}

const PensionPayment: React.FC<PensionPaymentProps> = ({ onNext }) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleSubmitFormik = (value: any) => {
    sessionStorage.setItem('pen_pension_payment', JSON.stringify(value))
    router.push(`${pathName}?page=8`);
    onNext()
  };

  const initialValues = {
    pay_order_no: "",
    pension_date: "",
    net_amount: "",
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
                  value={values.pay_order_no}
                  label="Pension Payment order No."
                  name="pay_order_no"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.pension_date}
                  label="Date of Pension"
                  name="pension_date"
                  type="date"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.net_amount}
                  label="Net Amount"
                  name="net_amount"
                  type="number"
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
                  buttonType="button"
                  variant={"cancel"}
                  onClick={goBack}
                >
                  Back
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
  );
};

export default PensionPayment;
