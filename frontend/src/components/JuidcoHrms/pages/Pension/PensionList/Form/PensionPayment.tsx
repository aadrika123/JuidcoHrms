import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "@/components/Helpers/Button";
import InputBox from "@/components/Helpers/InputBox";
import { Formik } from "formik";
import goBack from "@/utils/helper";
import { HRMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
interface PensionPaymentProps {
  onNext: () => void;
}

const PensionPayment: React.FC<PensionPaymentProps> = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");
  const handleSubmitFormik = () => {
    console.log("click");
    router.push(`${pathName}?page=8`);
    // onNext()
  };

  const initialValues = {
    emp_name: "",
  };

  // --------------------------- OTP VERFICATION -----------------------------//
  const handleSubmitOTP = async () => {
    try {
      const res = await axios({
        url: `${HRMS_URL.OTP.create}`,
        method: "POST",
        data: {
          mobileNumber: mobileNo,
        },
      });
      alert("OTP sent successfully!");
      setOtpSent(true);
      setButtonText("Validate OTP");
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleValidateOTP = async () => {
    try {
      // const res = await axios(`${HRMS_URL.OTP.validate}`, {
      //   mobileNumber: mobileNo,
      //   enteredOtp: otpValue,
      // });

      const res = await axios({
        url: `${HRMS_URL.OTP.validate}`,
        method: "POST",
        data: {
          mobileNumber: mobileNo,
          enteredOtp: otpValue,
        },
      });

      const { status } = res.data.data;

      if (status) {
        // OTP is valid
        alert("OTP verified successfully!");
        setButtonText("Successfully Verified");
      } else {
        // OTP is invalid
        alert("Invalid OTP. Please try again.");
        setButtonText("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      alert("Failed to verify OTP");
      setButtonText("Validate OTP");
    }
  };
  // --------------------------- OTP VERFICATION -----------------------------//
  return (
    <>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmitFormik}>
          {({ values, handleChange, handleSubmit, handleReset }) => (
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
                {/* --------------------------- OTP --------------------- */}
                <div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="mobileNo"
                      className="text-secondary text-sm"
                    >
                      Enter Mobile No.
                    </label>
                    <input
                      type="text"
                      id="mobileNo"
                      value={mobileNo}
                      className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400`}
                      onChange={(e) => {
                        let formattedNumber = e.target.value.trim();
                        if (!formattedNumber.startsWith("+91")) {
                          formattedNumber = "+91" + formattedNumber;
                        }
                        setMobileNo(formattedNumber);
                      }}
                      placeholder="Enter Mobile No."
                    />
                  </div>

                  {/* OTP input section */}

                  {otpSent && (
                    <div className="mt-5">
                      <label htmlFor="otpValue">Enter OTP- </label>
                      <input
                        type="text"
                        id="otpValue"
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        placeholder="Enter OTP"
                        className="border rounded-xl p-2 mb-2 bg-transparent"
                      />

                      <button
                        type="button"
                        onClick={handleValidateOTP}
                        className="bg-[#4245D9] text-white text-md px-4 p-1 rounded-md mt-2 ml-5"
                      >
                        Validate OTP
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={otpSent ? handleValidateOTP : handleSubmitOTP}
                    className="bg-[#4245D9] text-white text-md px-4 p-1 rounded-md mt-2"
                  >
                    {otpSent ? buttonText : "Send OTP"}
                  </button>
                </div>
                {/* --------------------------- OTP --------------------- */}
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

export default PensionPayment;
