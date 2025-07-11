/***
 * Author: Jaideep
 * Status: Closed
 * Description: Designed to manage login form design.
 */

// demo login -> vishal.bhaskar@sparrowsoftech.com,  pass -> $2y$10$8HVjnR2QQfsl2I5c8HwTKOaP9./IKc2e3ghUC4kwI.uF72.1h//eq

"use client";

import Button from "@/components/global/atoms/Button";
import Input from "@/components/global/atoms/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducers/auth.reducer";
import Cookies from "js-cookie";
import { HRMS_URL } from "@/utils/api/urls";
import { useWorkingAnimation } from "@/components/Helpers/Widgets/useWorkingAnimation";
import CryptoJS from "crypto-js";
import useCaptchaGenerator from "@/components/JuidcoHrms/pages/Auth/useCaptchaGenerator";


interface LoginInitialData {
  user_id: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const [errrrr, setErrrrr] = useState<boolean>();
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  // const [hide, setHide] = useState(true);

  const LoginSchema = Yup.object().shape({
    user_id: Yup.string().required("User Id is required"),
    password: Yup.string().required("Password is required"),
  });
  const [captchaInput, setCaptchaInput] = useState("");
  const {
    captchaImage,
    // captchaInputField,
    verifyCaptcha,
    generateRandomCaptcha,
  } = useCaptchaGenerator();

  function encryptPassword(plainPassword: string): string {
    const secretKey = "c2ec6f788fb85720bf48c8cc7c2db572596c585a15df18583e1234f147b1c2897aad12e7bebbc4c03c765d0e878427ba6370439d38f39340d7e";

    const key = CryptoJS.enc.Latin1.parse(
      CryptoJS.SHA256(secretKey).toString(CryptoJS.enc.Latin1)
    );

    const ivString = CryptoJS.SHA256(secretKey).toString().substring(0, 16);
    const iv = CryptoJS.enc.Latin1.parse(ivString);

    const encrypted = CryptoJS.AES.encrypt(plainPassword, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }


  ///////////////// Handling Login Logics /////////////

  const handleLogin = async (values: LoginInitialData) => {
    if (!verifyCaptcha(captchaInput)) {
      setCaptchaError("Captcha is incorrect");
       setCaptchaInput(""); 
      generateRandomCaptcha(); // Optionally refresh it
      return;
    } else {
      setCaptchaError(null); // clear previous error if any
    }
    try {
      activateWorkingAnimation();
      const res = await axios({
        url: `${process.env.backend}/api/login`,
        method: "POST",
        data: {
          email: values.user_id,
          password: encryptPassword(values.password),
        },
      });

      const data = res.data.data;
      sessionStorage.setItem("user_details", JSON.stringify(data?.userDetails));
      Cookies.set("emp_id", data?.userDetails?.emp_id);

      //! EMPLOYEE ID WILL COME FROM USER TABLE
      if (data) {
        Cookies.set("accesstoken", data?.token);

        const res2 = await axios({
          url: `${HRMS_URL.ATTENDANCE.create}`,
          method: "POST",
          data: {
            emp_id: data?.userDetails?.emp_id,
          },
          headers: {
            Authorization: "Bearer " + data?.token,
          },
        });

        if (res2) {
          const attnd_details = res2?.data?.data;
          sessionStorage.setItem(
            "attnd_details",
            JSON.stringify(attnd_details || null)
          );
        }

        if (typeof window !== "undefined") {
          const storedData = sessionStorage.getItem("user_details");
          const data = storedData && JSON.parse(storedData);
          if (data?.user_type === "Employee") {
            setErrrrr(false)
            dispatch(login(data)), "a";
            if (typeof window !== "undefined")
              window.location.replace("/hrms/employee/attendance-management");
          } else if (data?.user_type === "TL") {
            setErrrrr(false)
            dispatch(login(data)), "a";
            if (typeof window !== "undefined")
              window.location.replace("/hrms/employee/attendance-management");
          } else if (data?.user_type === 'Admin') {
            setErrrrr(false)
            dispatch(login(data));
            if (typeof window !== "undefined")
              window.location.replace("/hrms/ems/dashboard");
          }
          else {
            setErrrrr(true)
            hideWorkingAnimation();
          }
        }
      } else {
        hideWorkingAnimation();
        setErrorMsg("You have entered wrong credentials !!");
      }
    } catch (error) {
      hideWorkingAnimation();
      setErrorMsg("Something Went Wrong!!");
      console.log(error);
    }
  };

  // const handleHideShowPass = () => {
  //   setHide(!hide);
  // };

  return (
    <>
      {workingAnimation}

      {errrrr && (
        <p className="bg-red-600 text-white pt-2 p-2 rounded mb-4 fixed top-14 left-0 right-0 z-50 text-center flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2">
            <polygon points="12,2 22,22 2,22" fill="yellow" stroke="black" strokeWidth="2" />
            <text x="12" y="17" fontSize="12" textAnchor="middle" fill="black" fontFamily="Arial">!</text>
          </svg>
          <span>
            Permission Denied. You are not authorized to access this page. Please contact your administrator for more information.
          </span>
        </p>
      )}
      <div className="max-w-full w-full px-2 sm:px-12 lg:pr-20 mb-12 lg:mb-0">
        <div className="relative">
          <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white darks:bg-gray-800 shadow-xl">
            <Formik
              initialValues={{
                user_id: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values: LoginInitialData) => {
                handleLogin(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="text-center">
                    <h1 className="text-2xl leading-normal mb-3 font-bold text-gray-800 darks:text-gray-300 text-center">
                      Welcome Back
                    </h1>
                  </div>
                  <div className="flex flex-col mt-4 text-center">
                    <span className="text-center text-red-400">{errorMsg}</span>
                  </div>
                  <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
                  <div className="mb-6">
                    <div className="mt-1 mb-6">
                      <Input
                        label="Username"
                        placeholder="Username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user_id}
                        error={errors.user_id}
                        touched={touched.user_id}
                        name="user_id"
                        autoComplete="off"
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        className="border-black focus:outline-none"
                      />
                    </div>
                    <Input
                      label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password}
                      touched={touched.password}
                      name="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      onCopy={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      className="mt-1 border-black focus:border-0 visible:border-0 focus:outline-none"



                    // type={hide ? "password" : "text"}
                    // icon={
                    //   hide ? (
                    //     <svg
                    //       onClick={handleHideShowPass}
                    //       xmlns="http://www.w3.org/2000/svg"
                    //       width="25"
                    //       height="25"
                    //       viewBox="0 0 52 50"
                    //       fill="none"
                    //     >
                    //       <path
                    //         d="M3.49755 2.5L48.4975 47.5M20.6083 19.7841C19.3017 21.134 18.4976 22.973 18.4976 25C18.4976 29.1423 21.8555 32.5 25.9975 32.5C28.0538 32.5 29.9168 31.6725 31.2715 30.3325M12.2476 11.6179C7.4993 14.7509 3.88263 19.4599 2.14258 25C5.3282 35.1427 14.804 42.5 25.998 42.5C30.9703 42.5 35.6035 41.0485 39.497 38.546M23.4975 7.62347C24.32 7.54182 25.1543 7.5 25.998 7.5C37.1923 7.5 46.668 14.8573 49.8535 25C49.1518 27.235 48.1443 29.3345 46.8805 31.25"
                    //         stroke="black"
                    //         strokeOpacity="0.6"
                    //         strokeWidth="3.5"
                    //         strokeLinecap="round"
                    //         strokeLinejoin="round"
                    //       />
                    //     </svg>
                    //   ) : (
                    //     <svg
                    //       onClick={handleHideShowPass}
                    //       xmlns="http://www.w3.org/2000/svg"
                    //       width="25"
                    //       height="25"
                    //       viewBox="0 0 61 61"
                    //       fill="none"
                    //     >
                    //       <path
                    //         d="M37.9794 30.0859C37.9794 34.2282 34.6217 37.5859 30.4794 37.5859C26.3374 37.5859 22.9795 34.2282 22.9795 30.0859C22.9795 25.9437 26.3374 22.5859 30.4794 22.5859C34.6217 22.5859 37.9794 25.9437 37.9794 30.0859Z"
                    //         stroke="black"
                    //         strokeOpacity="0.35"
                    //         strokeWidth="3.5"
                    //         strokeLinecap="round"
                    //         strokeLinejoin="round"
                    //       />
                    //       <path
                    //         d="M30.4808 12.5859C19.2866 12.5859 9.81094 19.9431 6.62524 30.0859C9.81089 40.2287 19.2866 47.5859 30.4808 47.5859C41.6748 47.5859 51.1505 40.2287 54.3363 30.0859C51.1505 19.9432 41.6748 12.5859 30.4808 12.5859Z"
                    //         stroke="black"
                    //         strokeOpacity="0.35"
                    //         strokeWidth="3.5"
                    //         strokeLinecap="round"
                    //         strokeLinejoin="round"
                    //       />
                    //     </svg>
                    //   )
                    // }
                    />
                  </div>
                  <div className="mt-4 mb-2">
                    <label className="block text-sm font-medium text-gray-700">Captcha</label>
                    <img
                      src={captchaImage}
                      alt="Captcha"
                      className="w-48 h-14 mt-2 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      onClick={generateRandomCaptcha}
                      className="mt-1 text-sm text-blue-500 underline"
                    >
                      Refresh Captcha
                    </button>
                  </div>
                  {/* Captcha Input */}
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Enter Captcha"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="w-full p-2 border rounded border-black focus:outline-none"
                      autoComplete="off"
                      spellCheck={false}
                      onPaste={(e) => e.preventDefault()}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                    />
                    {captchaError && (
                      <p className="text-sm text-red-500 mt-1">{captchaError}</p>
                    )}
                  </div>


                  <div className="grid mt-6">
                    <Button
                      className="w-[100%] flex justify-center mt-6"
                      variant="primary"
                      buttontype="submit"
                    >
                      <svg
                        xmlnsXlink="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2 bi bi-box-arrow-in-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>
                      Log in
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
            <div className="my-2">
              <div className="flex flex-col items-center justify-center flex-wrap gapx-x-2 gap-y-2 w-full poppins">
                <span
                  className="text-gray-700 text-sm font-semibold cursor-pointer w-full text-center"
                  onClick={() => {
                    // setmobileCardStatus(true)
                  }}
                >
                  Forgot Password
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
