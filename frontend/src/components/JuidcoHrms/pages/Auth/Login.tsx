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
import CryptoJS from "crypto-js"
import UseSystemUniqueID from "@/components/hooks/useGenerateSystemUniqueId";


interface LoginInitialData {
  user_id: string;
  password: string;
}

interface CaptchaData {
  captcha_code: string;
  captcha_id: string;
}

const secretKey = "c2ec6f788fb85720bf48c8cc7c2db572596c585a15df18583e1234f147b1c2897aad12e7bebbc4c03c765d0e878427ba6370439d38f39340d7e";

function encryptPassword(plainPassword: string): string {
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

function decryptCaptcha(encryptedText: string): string {
  const key = CryptoJS.enc.Latin1.parse(
    CryptoJS.SHA256(secretKey).toString(CryptoJS.enc.Latin1)
  );
  const ivString = CryptoJS.SHA256(secretKey).toString().substring(0, 16);
  const iv = CryptoJS.enc.Latin1.parse(ivString);

  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}



const Login = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();
  const [errrrr, setErrrrr] = useState<boolean>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [captchaImage, setCaptchaImage] = useState<string>("");
  const { uniqueId, fingerprint } = UseSystemUniqueID();

  const LoginSchema = Yup.object().shape({
    user_id: Yup.string().required("User Id is required"),
    password: Yup.string().required("Password is required"),
  });

  const drawCaptcha = (captchaText: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 70;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#E3F2FD";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
      ctx.strokeStyle = `rgba(0, 0, 0, 0.3)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw text
    ctx.font = "bold 30px Arial";
    for (let i = 0; i < captchaText.length; i++) {
      ctx.save();
      const x = 20 + i * 30;
      const y = 40 + Math.random() * 10;
      const angle = (Math.random() - 0.5) * 0.6;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.9 + 0.1})`;
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }

    // Set image
    setCaptchaImage(canvas.toDataURL());
  };

  const fetchCaptcha = React.useCallback(async () => {
    try {
      const res = await axios.post(`${process.env.backend}/api/login-Captcha`);
      const captchaData = res.data.data;
      const decryptedCaptcha = decryptCaptcha(captchaData.captcha_code);
      setCaptchaData(captchaData);
      drawCaptcha(decryptedCaptcha);
      setCaptchaInput("");
      setCaptchaError(null);
    } catch (error) {
      console.error("Failed to fetch captcha:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchCaptcha();
    const interval = setInterval(fetchCaptcha, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchCaptcha]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (values: LoginInitialData) => {
    if (!captchaInput.trim()) {
      setCaptchaError("Please enter captcha");
      return;
    }
    
    if (!captchaData) {
      setCaptchaError("Captcha not loaded");
      return;
    }
    try {
      activateWorkingAnimation();

      const payload = {
        email: values.user_id,
        password: encryptPassword(values.password),
        captcha_code: encryptPassword(captchaInput),
        captcha_id: captchaData.captcha_id,
        moduleId: 6,
        systemUniqueId: fingerprint,
      };

      const res = await axios({
        url: `${process.env.backend}/api/login`,
        method: "POST",
        data: payload,
      });

      const data = res.data.data;

      if (data) {
        localStorage.setItem("user_details", JSON.stringify(data?.userDetails));
        Cookies.set("emp_id", data?.userDetails?.emp_id);
        Cookies.set("accesstoken", data?.token);
        localStorage.setItem("accesstoken", data?.token);

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
            setErrrrr(true);
          }
        }
      } else {
        hideWorkingAnimation();
        fetchCaptcha();
        if (res.data?.message?.toLowerCase().includes('captcha')) {
          setErrorMsg("Invalid Captcha. Please try again.");
        } else {
          setErrorMsg(res.data?.message);
        }
      }
    } catch (error: any) {
      hideWorkingAnimation();
      if (error.response?.data?.message) {
        const errorMessage = error.response.data.message.toLowerCase();
        if (errorMessage.includes('captcha') || errorMessage.includes('invalid captcha')) {
          setErrorMsg("Invalid Captcha. Please try again.");
        } else {
          setErrorMsg(error.response.data.message);
        }
      } else {
        setErrorMsg("Something Went Wrong!!");
      }
      fetchCaptcha();
      console.error(error);
    }
  };

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
                <>

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
                          autoComplete="off"
                          name="user_id"
                          className="border-1"
                          onCopy={(e) => e.preventDefault()}
                          onPaste={(e) => e.preventDefault()}
                          onCut={(e) => e.preventDefault()}
                        />
                      </div>
                      
                      {/* Password Input with Eye Icon */}
                      <div className="relative">
                        <Input
                          label="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          error={errors.password}
                          touched={touched.password}
                          autoComplete="off"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="mt-1 border-1 pr-10"
                          onCopy={(e) => e.preventDefault()}
                          onPaste={(e) => e.preventDefault()}
                          onCut={(e) => e.preventDefault()}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none mt-3"
                        >
                          {showPassword ? (
                            // Eye Open Icon (Hide Password)
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                          ) : (
                            // Eye Closed Icon (Show Password)
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Captcha Display */}
                    <div className="mt-4 mb-2">
                      <label className="block text-sm font-medium text-gray-700">Captcha</label>
                      <div className="flex items-center gap-2 mt-2">
                        {captchaImage ? (
                          <img
                            src={captchaImage}
                            alt="Captcha"
                            className="w-48 h-14 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="w-48 h-14 border border-gray-300 rounded flex items-center justify-center bg-gray-100">
                            Loading captcha...
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={fetchCaptcha}
                          className="p-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                          </svg>
                        </button>
                      </div>
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
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;