import PrimaryButton from "@/components/Helpers/Button";
import React from "react";
import goBack from "@/utils/helper";
import { InnerHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import { Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import { EmployeeDetailsInterface } from "./Refund";
import { currentDate } from "../Index";

interface NominationProps {
  onNext: () => void;
  emp_id: string;
}

interface EmployeeNomineeDetails {
  relation: string;
  nominee_address: string;
  remarks: string;
  date_this: string;
  day_of: string;
  at_place: string;
  nominee_age: string;
}

const Nomination: React.FC<NominationProps> = ({ onNext }) => {
  const pathName = usePathname();
  const router = useRouter();
//   const date = new Date();
//   const day: string = date.toDateString().split(" ")[0];
  const queryClient = useQueryClient();

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
const days = weekday[d.getDay()];

  //--------------------------- GET EMPLOYEE NOMINEE DETAILS ---------------------------//
  const _nominee = queryClient.getQueryData<any>("emp_nominee_details");
  const emp_details =
    queryClient.getQueryData<EmployeeDetailsInterface>("emp_details");
  const nominee = _nominee?.data[0];

  console.log(emp_details);
  const not_provided: string = "not provided";
  const initialValues: EmployeeNomineeDetails = {
    relation: nominee?.relation || not_provided,
    nominee_address:
      emp_details?.emp_address_details.address_primary || not_provided,
    remarks: "",
    date_this: currentDate || not_provided,
    day_of: days || not_provided,
    at_place: "Ranchi" || not_provided,
    nominee_age: "" || not_provided,
  };

  const handleSubmitFormik = () => {
    console.log("click");
    router.push(`${pathName}?page=5`);
    onNext();
  };

  return (
    <>
      <div className="p-10 shadow-lg">
        <InnerHeading className="justify-center items-center mb-10">
          Nomination for unpaid amount on pension
        </InnerHeading>
        <div className="justify-center items-center mb-10">
          Declaration* <input type="checkbox" className="mb-4" />
          <br></br>
          <span>
            I here by nominate the person / persons mentioned below is a members
            of our /myfamily and confirm him as I have no family,right to
            receive any amount of pension as may be sanctioned in the event of
            my death while in service and the right to receive in my death any
            amount of pension and the right to receive in my death any amount
            pension which having been became admissible to me retirement and
            remain unpaid at my death.
          </span>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitFormik}
          enableReinitialize
        >
          {({ values, handleChange, handleSubmit, handleReset }) => (
            <form onSubmit={handleSubmit} className="relative">
              <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
                <InputBox
                  onChange={handleChange}
                  value={values.nominee_address}
                  label="Home Address of Nominee"
                  name="nominee_address"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.relation}
                  label="Relationship with the corporation Employee "
                  name="emp_name"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.nominee_age}
                  label="Age"
                  name="nominee_age"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.remarks}
                  placeholder={"Enter remarks"}
                  label="Remarks"
                  name="remarks"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.date_this}
                  label="Date this"
                  name="date_this"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.day_of}
                  label="Day of"
                  name="day_of"
                />

                <InputBox
                  onChange={handleChange}
                  value={values.at_place}
                  label="(At Place)"
                  name="at_place"
                />

                {/* <InputBox
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
                /> */}
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

export default Nomination;
