/***
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Loan details - Employee Loan & Advance Information page
 */

"use client";

import React, { useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import {
  EmployeeLoanDetailsType,
  EmployeeDetailsProps,
} from "@/utils/types/employee.type";
// import { initialEmployeeLoanDetails } from "@/utils/validation/Ems/ems.validation";
import { Formik } from "formik";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
import Button from "@/components/global/atoms/Button";

const EmpLoanDetails: React.FC<
  EmployeeDetailsProps<EmployeeLoanDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [innerTabIndex, setInnerTabIndex] = useState<number>(1);
  const [addedRows, setAddedRows] = useState<number>(0);

  const getInitialFormData = () => ({
    loan_name_det: "",
    loan_account_num: "",
    sanc_order_num: "",
    dos: "",
    san_authority: "",
    dod: "",
    dis_treasury_name: "",
    voucher_date: "",
    treasury_voc_num: "",
  });

  const getInitialPrincipalFormData = () => ({
    loan_name_principal: "",
    tot_amt_released: "",
    total_install: "",
    monthly_install: "",
    last_paid_install: "",
    month_last_install: "",
    total_amnt: "",
  });

  const getInitialRecoveryFormData = () => ({
    loan_name_recovery: "",
    total_int_amount: "",
    total_install_recovery: "",
    monthly_install_recovery: "",
    last_paid_install_recovery: "",
    month_last_install_recovery: "",
    total_amnt_recovery: "",
  });

  // const [formFields, setFormFields] = useState([getInitialFormData()]);
  // const [formPrincipalFields, setFormPrincipalFields] = useState([
  //   getInitialPrincipalFormData(),
  // ]);
  // const [formRecoveryFields, setFormRecoveryFields] = useState([
  //   getInitialRecoveryFormData(),
  // ]);

  const storedEmpDetails =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_loan_details")
      : null;

  const initialEmpDetails = storedEmpDetails
    ? JSON.parse(storedEmpDetails)
    : {
        emp_loan_inform: [getInitialFormData()],
        emp_principal_inform: [getInitialPrincipalFormData()],
        emp_recovery_inform: [getInitialRecoveryFormData()],
      };

  const [formFields, setFormFields] = useState(
    initialEmpDetails.emp_loan_inform
  );
  const [formPrincipalFields, setFormPrincipalFields] = useState(
    initialEmpDetails.emp_principal_inform
  );
  const [formRecoveryFields, setFormRecoveryFields] = useState(
    initialEmpDetails.emp_recovery_inform
  );

  const handleInputChange = (
    fieldName: keyof (typeof formFields)[0],
    value: any,
    index: number
  ) => {
    setFormFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };

  const handleInputPrincipalChange = (
    fieldName: keyof (typeof formPrincipalFields)[0],
    value: any,
    index: any
  ) => {
    setFormPrincipalFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };

  const handleInputRecoveryChange = (
    fieldName: keyof (typeof formRecoveryFields)[0],
    value: any,
    index: number
  ) => {
    setFormRecoveryFields((prevFields: any) => {
      const updatedFields: typeof formRecoveryFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };

  // const handleSubmitFormik = () => {
  //   if (typeof window !== "undefined") {
  //     const empDetails = {
  //       emp_loan_inform: formFields,
  //       emp_principal_inform: formPrincipalFields,
  //       emp_recovery_inform: formRecoveryFields,
  //     };

  //     sessionStorage.setItem("emp_loan_details", JSON.stringify(empDetails));

  //     if (props.setData) {
  //       props.setData("emp_loan_details", empDetails as any);
  //     }
  //     router.push(`${pathName}?emp=${empType}&page=11`);
  //   }
  // };

  const handleSubmitFormik = () => {
    formFields?.forEach((element: any) => {
      Object.keys(element).forEach((key) => {
        const val = element[key as keyof typeof element];
        if (
          val == getInitialFormData()[key as keyof typeof getInitialFormData]
        ) {
          delete element[key as keyof typeof element];
        }
      });
    });

    formPrincipalFields?.forEach((element: any) => {
      Object.keys(element).forEach((key) => {
        const val = element[key as keyof typeof element];
        if (
          val ==
          getInitialPrincipalFormData()[
            key as keyof typeof getInitialPrincipalFormData
          ]
        ) {
          delete element[key as keyof typeof element];
        }
      });
    });

    formRecoveryFields?.forEach((element: any) => {
      Object.keys(element).forEach((key) => {
        const val = element[key as keyof typeof element];
        if (
          val ==
          getInitialRecoveryFormData()[
            key as keyof typeof getInitialRecoveryFormData
          ]
        ) {
          delete element[key as keyof typeof element];
        }
      });
    });

    if (typeof window !== "undefined") {
      const empDetails = {
        emp_loan_inform: formFields,
        emp_principal_inform: formPrincipalFields,
        emp_recovery_inform: formRecoveryFields,
      };

      sessionStorage.setItem("emp_loan_details", JSON.stringify(empDetails));

      if (props.setData) {
        console.log(
          Object.keys(empDetails.emp_loan_inform[0]).length === 0 &&
            empDetails.emp_loan_inform[0].constructor === Object,
          "izi"
        );
        if (
          (Object.keys(empDetails.emp_loan_inform[0]).length === 0 &&
            empDetails.emp_loan_inform[0].constructor === Object) ||
          (Object.keys(empDetails.emp_principal_inform[0]).length === 0 &&
            empDetails.emp_principal_inform[0].constructor === Object) ||
          (Object.keys(empDetails.emp_recovery_inform[0]).length === 0 &&
            empDetails.emp_recovery_inform[0].constructor === Object)
        ) {
          null;
        } else props.setData("emp_loan_details", empDetails as any);
      }
      router.push(`${pathName}?emp=${empType}&page=11`);
    }
  };

  const addRow = () => {
    if (addedRows < 7) {
      setAddedRows((prevRows) => prevRows + 1);

      if (tabIndex === 1) {
        setFormFields((prevFields: any) => [
          ...prevFields,
          getInitialFormData(),
        ]);
      } else if (tabIndex === 2 && innerTabIndex === 1) {
        setFormPrincipalFields((prevFields: any) => [
          ...prevFields,
          getInitialPrincipalFormData(),
        ]);
      } else if (tabIndex === 2 && innerTabIndex === 2) {
        setFormRecoveryFields((prevFields: any) => [
          ...prevFields,
          getInitialRecoveryFormData(),
        ]);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Loan & Advance Information{" "}
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                d="M9.07937 1.81587C13.0843 1.81587 16.3429 5.07446 16.3429 9.07937C16.3429 13.0843 13.0843 16.3429 9.07937 16.3429C5.07446 16.3429 1.81587 13.0843 1.81587 9.07937C1.81587 5.07446 5.07446 1.81587 9.07937 1.81587ZM9.07937 0C4.06483 0 0 4.06483 0 9.07937C0 14.0939 4.06483 18.1587 9.07937 18.1587C14.0939 18.1587 18.1587 14.0939 18.1587 9.07937C18.1587 4.06483 14.0939 0 9.07937 0ZM13.619 8.17143H9.9873V4.53968H8.17143V8.17143H4.53968V9.9873H8.17143V13.619H9.9873V9.9873H13.619V8.17143Z"
                fill="#6565DD"
              />
            </svg>
          </i>
        </SubHeading>
        <h5>Steps-11/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-10 px-10 shadow-md">
        <SubHeading className="text-[20px] py-4">
          Employee Loan & Advance Information
        </SubHeading>

        <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
          <div className="flex-all-center ">
            <input
              id="loan details"
              type="radio"
              onChange={() => setTabIndex(1)}
              name="radio-1"
              className="radio border border-zinc-600"
              defaultChecked
            />
            <label htmlFor="accounting" className=" cursor-pointer">
              Loan Details
            </label>
          </div>

          <div className="flex-all-center ">
            <input
              id="recovery details"
              onChange={() => setTabIndex(2)}
              type="radio"
              name="radio-1"
              className="radio  border-zinc-600"
            />
            <label htmlFor="function" className=" cursor-pointer">
              Recovery Details
            </label>
          </div>
        </div>

        <Formik
          initialValues={getInitialFormData()}
          onSubmit={handleSubmitFormik}
        >
          {({ handleBlur, handleSubmit, handleReset }) => (
            <form onSubmit={handleSubmit}>
              {/* -----------------------Employee Loan details for tabIndex === 1 ----------------------------------- */}

              {tabIndex === 1 && (
                <div>
                  {formFields.map((field: any, index: any) => (
                    <div key={index}>
                      <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 mt-4">
                        <div>
                          <span className="text-sm">Loan Name</span>
                          <br />
                          <div className="border w-full p-2 rounded border-black">
                            <select
                              value={field.loan_name_det}
                              name="loan_name_det"
                              onChange={(e: any) =>
                                handleInputChange(
                                  "loan_name_det",
                                  e.target.value,
                                  index
                                )
                              }
                              className="w-full border-none outline-none"
                            >
                              <option value="">Please Select</option>
                              <option value="Festival Adv.">
                                Festival Adv.
                              </option>
                              <option value="Motor Cycle Adv.">
                                Motor Cycle Adv.
                              </option>
                              <option value="Moped Adv.">Moped Adv.</option>
                              <option value="House Building Adv.">
                                House Building Adv.
                              </option>
                              <option value="Spl House Building Adv.">
                                Spl House Building Adv.
                              </option>
                              <option value="GPF Adv.">GPF Adv.</option>
                            </select>
                          </div>
                        </div>

                        <InputBox
                          onBlur={handleBlur}
                          value={field.loan_account_num}
                          label="Loan Account Number"
                          placeholder="Enter Loan Account Number"
                          name="loan_account_num"
                          type="text"
                          maxLength={15}
                          onKeyPress={(e: any) => {
                            if (!(e.key >= "0" && e.key <= "9")) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e: any) =>
                            handleInputChange(
                              "loan_account_num",
                              e.target.value,
                              index
                            )
                          }
                        />
                        <InputBox
                          onBlur={handleBlur}
                          value={field.sanc_order_num}
                          label="Sanc Order Number"
                          placeholder="Enter Sanc Order Number"
                          name="sanc_order_num"
                          maxLength={10}
                          onKeyPress={(e: any) => {
                            if (!(e.key >= "0" && e.key <= "9")) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e: any) =>
                            handleInputChange(
                              "sanc_order_num",
                              e.target.value,
                              index
                            )
                          }
                        />
                        <InputBox
                          onBlur={handleBlur}
                          value={field.dos}
                          label="Date of Sanction"
                          name="dos"
                          type="date"
                          onChange={(e: any) =>
                            handleInputChange("dos", e.target.value, index)
                          }
                        />
                        <InputBox
                          onBlur={handleBlur}
                          value={field.san_authority}
                          label="Sanctioning Authority"
                          placeholder="Enter Sanctioning Authority"
                          name="san_authority"
                          maxLength={20}
                          onKeyPress={(e: any) => {
                            if (
                              !(
                                (e.key >= "a" && e.key <= "z") ||
                                (e.key >= "A" && e.key <= "Z") ||
                                e.key === " "
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e: any) =>
                            handleInputChange(
                              "san_authority",
                              e.target.value,
                              index
                            )
                          }
                        />
                        <InputBox
                          onBlur={handleBlur}
                          value={field.dod}
                          label="Date of Disbursement"
                          name="dod"
                          type="date"
                          onChange={(e: any) =>
                            handleInputChange("dod", e.target.value, index)
                          }
                        />
                        <InputBox
                          onBlur={handleBlur}
                          value={field.dis_treasury_name}
                          label="Disbursing Treasury Name"
                          placeholder="Enter Disbursing Treasury Name"
                          name="dis_treasury_name"
                          maxLength={30}
                          onKeyPress={(e: any) => {
                            if (
                              !(
                                (e.key >= "a" && e.key <= "z") ||
                                (e.key >= "A" && e.key <= "Z") ||
                                e.key === " "
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e: any) =>
                            handleInputChange(
                              "dis_treasury_name",
                              e.target.value,
                              index
                            )
                          }
                        />
                        <InputBox
                          onBlur={handleBlur}
                          value={field.voucher_date}
                          label="Voucher Date"
                          name="voucher_date"
                          type="date"
                          onChange={(e: any) =>
                            handleInputChange(
                              "voucher_date",
                              e.target.value,
                              index
                            )
                          }
                        />
                        <InputBox
                          onBlur={handleBlur}
                          value={field.treasury_voc_num}
                          label="Treasury Voucher Number"
                          placeholder="Enter Treasury Voucher Number"
                          name="treasury_voc_num"
                          maxLength={15}
                          onKeyPress={(e: any) => {
                            if (!(e.key >= "0" && e.key <= "9")) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e: any) =>
                            handleInputChange(
                              "treasury_voc_num",
                              e.target.value,
                              index
                            )
                          }
                          type="text"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* -----------------------Employee Loan details for tabIndex === 1 ends ----------------------------------- */}

              {/* -----------------------Employee Loan details for tabIndex === 2 ----------------------------------- */}

              {tabIndex === 2 && (
                <>
                  {/* {formPrincipalFields.map((fields, index) => ( */}
                  <div>
                    <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
                      <div className="flex-all-center">
                        <input
                          id="principal"
                          type="radio"
                          onChange={() => setInnerTabIndex(1)}
                          name="inner-radio-2"
                          className="radio border border-zinc-600"
                          defaultChecked
                        />
                        <label htmlFor="principal" className="cursor-pointer">
                          Principal Component
                        </label>
                      </div>

                      <div className="flex-all-center">
                        <input
                          id="recovery"
                          onChange={() => setInnerTabIndex(2)}
                          type="radio"
                          name="inner-radio-2"
                          className="radio border-zinc-600"
                        />
                        <label htmlFor="recovery" className="cursor-pointer">
                          Recovery Details
                        </label>
                      </div>
                    </div>

                    <div>
                      {formPrincipalFields.map((fields: any, index: any) => (
                        <div key={`formPrincipalField-${index}`}>
                          {innerTabIndex === 1 && (
                            <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 mt-4 ">
                              <div>
                                <span className="text-sm">Loan Name</span>
                                <br />
                                <div className="border w-full p-2 rounded border-black">
                                  <select
                                    value={(fields as any).loan_name_principal}
                                    name="loan_name_principal"
                                    onChange={(e: any) =>
                                      handleInputPrincipalChange(
                                        "loan_name_principal",
                                        e.target.value,
                                        index
                                      )
                                    }
                                    className="w-full border-none outline-none"
                                  >
                                    <option value="">Please Select</option>
                                    <option value="Festival Adv.">
                                      Festival Adv.
                                    </option>
                                    <option value="Motor Cycle Adv.">
                                      Motor Cycle Adv.
                                    </option>
                                    <option value="Moped Adv.">
                                      Moped Adv.
                                    </option>
                                    <option value="House Building Adv.">
                                      House Building Adv.
                                    </option>
                                    <option value="Spl House Building Adv.">
                                      Spl House Building Adv.
                                    </option>
                                    <option value="GPF Adv.">GPF Adv.</option>
                                    <option value="GIS Adv.">GIS Adv.</option>
                                  </select>
                                </div>
                              </div>

                              <InputBox
                                value={(fields as any).tot_amt_released}
                                onChange={(e: any) =>
                                  handleInputPrincipalChange(
                                    "tot_amt_released",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Loan Amount Released (Rs)"
                                placeholder="Enter Loan Amount Released(Rs)"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                                name="tot_amt_released"
                                type="text"
                              />
                              <InputBox
                                value={(fields as any).total_install}
                                onChange={(e: any) =>
                                  handleInputPrincipalChange(
                                    "total_install",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Total Installment Fixed(Rs)"
                                placeholder="Enter Total Installment Fixed(Rs)"
                                name="total_install"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                                type="text"
                              />
                              <InputBox
                                value={(fields as any).monthly_install}
                                onChange={(e: any) =>
                                  handleInputPrincipalChange(
                                    "monthly_install",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Monthly Installment Amount(Rs)"
                                placeholder="Enter Monthly Installment Amount(Rs)"
                                name="monthly_install"
                                type="text"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <InputBox
                                value={(fields as any).last_paid_install}
                                onChange={(e: any) =>
                                  handleInputPrincipalChange(
                                    "last_paid_install",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Last Paid Installment Number"
                                placeholder="Last Paid Installment Number"
                                name="last_paid_install"
                                type="text"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <InputBox
                                value={(fields as any).month_last_install}
                                onChange={(e: any) =>
                                  handleInputPrincipalChange(
                                    "month_last_install",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Month In Which last Installment was paid"
                                name="month_last_install"
                                type="date"
                              />
                              <InputBox
                                value={(fields as any).total_amnt}
                                onChange={(e: any) =>
                                  handleInputPrincipalChange(
                                    "total_amnt",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Total Amount Paid Towards Principal(Rs)"
                                placeholder="Enter Total Amount Paid Towards Principal(Rs)"
                                name="total_amnt"
                                type="text"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}

                      {formRecoveryFields.map((fields: any, index: any) => (
                        <div key={`formRecoveryField-${index}`}>
                          {innerTabIndex === 2 && (
                            <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4  mt-4">
                              <div>
                                <span className="text-sm">Loan Name</span>
                                <br />
                                <div className="border w-full p-2 rounded border-black">
                                  <select
                                    value={(fields as any).loan_name_recovery}
                                    name="loan_name_recovery"
                                    onChange={(e: any) =>
                                      handleInputRecoveryChange(
                                        "loan_name_recovery",
                                        e.target.value,
                                        index
                                      )
                                    }
                                    className="w-full border-none outline-none"
                                  >
                                    <option value="">Please Select</option>
                                    <option value="Festival Adv.">
                                      Festival Adv.
                                    </option>
                                    <option value="Motor Cycle Adv.">
                                      Motor Cycle Adv.
                                    </option>
                                    <option value="Moped Adv.">
                                      Moped Adv.
                                    </option>
                                    <option value="House Building Adv.">
                                      House Building Adv.
                                    </option>
                                    <option value="Spl House Building Adv.">
                                      Spl House Building Adv.
                                    </option>
                                    <option value="GPF Adv.">GPF Adv.</option>
                                    <option value="GIS Adv.">GIS Adv.</option>
                                  </select>
                                </div>
                              </div>
                              <InputBox
                                value={(fields as any).total_int_amount}
                                onChange={(e: any) =>
                                  handleInputRecoveryChange(
                                    "total_int_amount",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label=" Total Interest Amount To Be Recovered (Rs)"
                                placeholder="Enter Total Interest Amount To Be Recovered (Rs)"
                                name="total_int_amount"
                                type="text"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <InputBox
                                value={(fields as any).total_install_recovery}
                                onChange={(e: any) =>
                                  handleInputRecoveryChange(
                                    "total_install_recovery",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Total No. Of Installments"
                                placeholder="Enter Total No. Of Installments"
                                name="total_install_recovery"
                                type="text"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <InputBox
                                value={(fields as any).monthly_install_recovery}
                                onChange={(e: any) =>
                                  handleInputRecoveryChange(
                                    "monthly_install_recovery",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Monthly Installment Amount(Rs)"
                                placeholder="Enter Monthly Installment Amount(Rs)"
                                name="monthly_install_recovery"
                                type="text"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <InputBox
                                value={
                                  (fields as any).last_paid_install_recovery
                                }
                                onChange={(e: any) =>
                                  handleInputRecoveryChange(
                                    "last_paid_install_recovery",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Last paid Installment Number."
                                placeholder="Enter Last paid Installment Number."
                                name="last_paid_install_recovery"
                                type="text"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <InputBox
                                value={
                                  (fields as any).month_last_install_recovery
                                }
                                onChange={(e: any) =>
                                  handleInputRecoveryChange(
                                    "month_last_install_recovery",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Month In Which last Installment was paid"
                                placeholder="Enter Month In Which last Installment was paid"
                                name="month_last_install_recovery"
                                type="date"
                              />
                              <InputBox
                                value={(fields as any).total_amnt_recovery}
                                onChange={(e: any) =>
                                  handleInputRecoveryChange(
                                    "total_amnt_recovery",
                                    e.target.value,
                                    index
                                  )
                                }
                                onBlur={handleBlur}
                                label="Total Amount Paid Towards Interest(Rs)"
                                placeholder="Enter Total Amount Paid Towards Interest(Rs)"
                                name="total_amnt_recovery"
                                type="text"
                                maxLength={30}
                                onKeyPress={(e: any) => {
                                  if (!(e.key >= "0" && e.key <= "9")) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* ))} */}
                </>
              )}

              {/* -----------------------Employee Loan details for tabIndex === 2 ends ----------------------------------- */}

              {/* -----------------------Employee Loan details add row  ----------------------------------- */}

              <div className="w-full flex items-center justify-end mt-3">
                <Button
                  onClick={addRow}
                  buttontype="button"
                  variant="primary_rounded"
                  className="bg-[#4245D9]"
                >
                  Add
                </Button>
              </div>

              {/* -----------------------Employee Loan details add row  ----------------------------------- */}

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

export default EmpLoanDetails;
