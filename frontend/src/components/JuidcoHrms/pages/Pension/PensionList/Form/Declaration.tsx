import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { InnerHeading, SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import { Formik } from "formik";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { useQueryClient } from "react-query";
import { EmployeeDetailsInterface } from "./Refund";
import { not_provided } from "../Index";
import { formatDate } from "@fullcalendar/core/index.js";
import { HRMS_URL } from "@/utils/api/urls";
import DropDownList from "@/components/Helpers/DropDownList";

interface DecProps {
  onNext: () => void;
}

interface PensionerInterface {
  pensioner_name: string;
  guardian_name: string;
  post_retired: string;
  dob: string;
  class_of_pension: string;
  permanent_address: string;
  cash: string;
  remarks: string;
  amount: string;
}

const Declaration: React.FC<DecProps> = ({ onNext }) => {
  const pathName = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const emp_data =
    queryClient.getQueryData<EmployeeDetailsInterface>("emp_details");
  console.log(emp_data);

  const handleSubmitFormik = () => {
    console.log("click");
    router.push(`${pathName}?page=7`);
    onNext();
  };

  const dob = formatDate(emp_data?.emp_basic_details.dob as string);
  const initialValues: PensionerInterface = {
    pensioner_name: emp_data?.emp_basic_details.emp_name || not_provided,
    guardian_name: "",
    post_retired: emp_data?.emp_join_details.designation_id || not_provided,
    dob: dob || not_provided,
    class_of_pension: "",
    permanent_address:
      emp_data?.emp_address_details.address_primary || not_provided,
    cash: "",
    remarks: "",
    amount: "",
  };

  return (
    <>
      <div>
        <InnerHeading className="justify-center items-center mt-5 mb-5">
          Declaration to the Chief Account Officer
        </InnerHeading>

        <div>
          <Formik initialValues={initialValues} onSubmit={handleSubmitFormik}>
            {({ values, handleChange, handleSubmit, handleReset }) => (
              <form onSubmit={handleSubmit} className="relative">
                <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
                  <InputBox
                    onChange={handleChange}
                    value={values.pensioner_name}
                    label="Name of Pensioner"
                    name="pensioner_name"
                  />

                  <InputBox
                    onChange={handleChange}
                    value={values.guardian_name}
                    label="Guardian name"
                    name="guardian_name"
                  />

                  <DropDownList
                    onChange={handleChange}
                    value={values.post_retired}
                    label="Name of Post from which he retired"
                    name="post_retired"
                    api={HRMS_URL.DESIGNATION.get || ""}
                    placeholder={""}
                    disabled
                  />

                  <InputBox
                    onChange={handleChange}
                    value={values.dob}
                    label="DOB"
                    name="dob"
                    type="date"
                  />

                  <InputBox
                    onChange={handleChange}
                    value={values.class_of_pension}
                    label="Class of Pension And No.& Date of sanction order"
                    name="class_of_pension"
                    type="date"
                  />

                  <InputBox
                    onChange={handleChange}
                    value={values.permanent_address}
                    label="Full permanent address"
                    name="permanent_address"
                  />

                  <InputBox
                    onChange={handleChange}
                    value={values.cash}
                    label="Cash"
                    name="cash"
                  />

                  <InputBox
                    onChange={handleChange}
                    value={values.remarks}
                    label="Remarks"
                    name="remarks"
                  />

                  <InputBox
                    onChange={handleChange}
                    value={values.amount}
                    label="Amount"
                    name="amount"
                  />
                </div>

                <div className="mt-5">
                  TO
                  <br></br>
                  <SubHeading className="justify-center items-center mt-5">
                    The Chief Account Officer
                  </SubHeading>
                  <InnerHeading className="justify-center items-center mt-5 mb-5">
                    ULB Name{" "}
                  </InnerHeading>
                  <span>
                    Until further Notice on the expiration of every month, be
                    pleased to pay to Sri/Smt..............The Amount of Rs
                    .................................being the amount of pension
                    upon the production of the under and a receipt according to
                    the usual form
                  </span>
                  <div className="flex justify-between mt-5">
                    <div>The payment should commence form :-</div>
                    <div>Date- 18/04/2024</div>
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
  );
};

export default Declaration;
