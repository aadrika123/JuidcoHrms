import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Formik } from "formik";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { InnerHeading, SubHeading } from "@/components/Helpers/Heading";
import { useQueryClient } from "react-query";
import { EmployeeDetailsInterface } from "./Refund";
import { not_provided } from "../Index";

interface CalSheetProps {
  onNext: () => void;
}

interface CalculationSheetInterface {
  date_of_appointment: string;
  date_of_retirement: string;
  total_lenght_service: string;
  last_pay_drawn: string;
  pension_admissible: string;
  last_gross_pay: string;
}

const CalculationSheet: React.FC<CalSheetProps> = ({ onNext }) => {
  const pathName = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmitFormik = () => {
    router.push(`${pathName}?page=6`);
    onNext();
  };

  const basic_data =
    queryClient.getQueryData<EmployeeDetailsInterface>("emp_details");

  const initialValues: CalculationSheetInterface = {
    date_of_appointment: basic_data?.emp_join_details.doj || not_provided,
    date_of_retirement: "",
    total_lenght_service: "",
    last_pay_drawn: "" || not_provided,
    pension_admissible: "",
    last_gross_pay: "",
  };

  return (
    <>
      <div className="shadow-md p-6 rounded-md">
        <SubHeading>
          Calculations sheet of pensioner and family pension
        </SubHeading>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitFormik}
          enableReinitialize
        >
          {({ values, handleChange, handleSubmit, handleReset }) => (
            <form onSubmit={handleSubmit} className="relative mt-8">
              <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
                <InputBox
                  onChange={handleChange}
                  value={values.date_of_appointment}
                  label="Date of Appointment"
                  name="date_of_appointment"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.date_of_retirement}
                  label="Date of retirement / death "
                  placeholder="Enter Date of retirement"
                  name="emp_name"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.total_lenght_service}
                  label="Total Length Service"
                  placeholder="Enter Total Length Service"
                  name="total_lenght_service"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.last_pay_drawn}
                  label="Last Pay Drawn"
                  name="last_pay_drawn"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.pension_admissible}
                  label="Pension admissible (after pension calculation the field will be reflected)"
                  placeholder="Enter Pension admissible"
                  name="pension_admissible"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.last_gross_pay}
                  label="50 % of last Gross pay"
                  placeholder="Enter 50 % of last Gross pay"
                  name="last_gross_pay"
                />

                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    Family Pension admissible
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center">
                      <input
                        // onChange={() => updateConfirmationOrder("yes")}
                        // checked={confirmationOrder === "yes"}
                        // className={`mr-1 bg-white checkbox border border-zinc-500 ${confirmationOrder === 'yes' ? 'checked-bg-red' : ''}`}
                        className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent"
                        id="yes"
                        name="confirmation_order"
                        type="checkbox"
                      />

                      <label htmlFor="yes">Yes</label>
                    </div>

                    <div className="flex items-center">
                      <input
                        // onChange={() => updateConfirmationOrder("no")}
                        // checked={confirmationOrder === "no"}
                        // className={`mr-1 bg-white checkbox checked:bg-[#4338CA] border border-zinc-500`}
                        // className={`mr-1 bg-white checkbox ${confirmationOrder === 'yes' ? 'checked:bg-red-500' : 'checked:bg-[#4338CA]'} border border-zinc-500`}
                        className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent"
                        id="no"
                        name="confirmation_order"
                        type="checkbox"
                      />
                      <label htmlFor="no">No</label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <InnerHeading className="justify-center items-center mt-5 mb-5">
                  SANCTION ORDER
                </InnerHeading>
                <input type="checkbox" className="mb-5" /> Declaration*
                <div>
                  <span>
                    1. The undersigned having satisfied on the report of office
                    that the service of Sri/Smt has been thoroughly satisfactory
                    ,here by orders the grant of full pension of rs with 2
                    options a. Pension admissible or b. Pension admissible +
                    Family Pension admissible per month. The grant of pension
                    shall commence from-
                  </span>
                  <br />
                  <span>
                    2. The order is subject to the condition that the condition
                    that the amount of pension .If afterwards found to be in
                    excess of the amount to which the pensioner is entitled
                    under the rules he / she will be called upon to refund the
                    excess
                  </span>
                  <br />
                  <span>
                    3. A declaration from the officer accepting this condition
                    has been obtained and attached with the application form.
                  </span>
                  <br />
                  <span>4. After declaration submit button activated.</span>
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
    </>
  );
};

export default CalculationSheet;
