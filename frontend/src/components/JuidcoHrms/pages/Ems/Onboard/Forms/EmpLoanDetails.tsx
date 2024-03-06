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
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
import Button from "@/components/global/atoms/Button";

const EmpLoanDetails: React.FC<
  EmployeeDetailsProps<EmployeeLoanDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [innerTabIndex, setInnerTabIndex] = useState<number>(1);

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

  const [formFields, setFormFields] = useState([getInitialFormData()]);
  const [formPrincipalFields, setFormPrincipalFields] = useState([
    getInitialPrincipalFormData(),
  ]);
  const [formRecoveryFields, setFormRecoveryFields] = useState([
    getInitialRecoveryFormData(),
  ]);

  const handleInputChange = (fieldName: any, value: any, index: any) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };

  const handleInputPrincipalChange = (
    fieldName: any,
    value: any,
    index: any
  ) => {
    setFormPrincipalFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };

  const handleInputRecoveryChange = (
    fieldName: any,
    value: any,
    index: any
  ) => {
    setFormRecoveryFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };

  const handleSubmitFormik = () => {
    if (typeof window !== "undefined") {
      const empDetails = {
        emp_loan_inform: formFields,
        emp_principal_inform: formPrincipalFields,
        emp_recovery_inform: formRecoveryFields,
      };

      sessionStorage.setItem("emp_loan_details", JSON.stringify(empDetails));

      if (props.setData) {
        props.setData("emp_loan_details", empDetails as any);
      }
      router.push(`${pathName}?emp=${empType}&page=11`);
    }
  };

  const addRow = () => {
    setFormFields((prevFields) => [...prevFields, getInitialFormData()]);
    setFormPrincipalFields((prevFields) => [
      ...prevFields,
      getInitialPrincipalFormData(),
    ]);
    setFormRecoveryFields((prevFields) => [
      ...prevFields,
      getInitialRecoveryFormData(),
    ]);
  };

  return (
    <>
      <SubHeading className="text-[20px] py-4">
        Employee Loan & Advance Information
      </SubHeading>

      <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
        <div className="flex-all-center ">
          <input
            id="accounting"
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
            id="function"
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
        {({ values, handleChange, handleBlur, handleSubmit, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {/* -----------------------Employee Loan details for tabIndex === 1 ----------------------------------- */}

            {tabIndex === 1 && (
              <>
                {formFields.map((field, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 mt-4"
                  >
                    {/* <SelectForNoApi
                      onBlur={handleBlur}
                      value={field.loan_name_det}
                      label="Loan Name"
                      name="loan_name_det"
                      onChange={(e: any) => handleInputChange("loan_name_det", e.target.value, index)}

                      placeholder={"Please Select"}
                      options={[
                        { id: 1, name: "Festival Adv." },
                        { id: 2, name: "Motor Cycle Adv." },
                        { id: 3, name: "Moped Adv." },
                        { id: 4, name: "House Building Adv." },
                        { id: 5, name: "Spl House Building Adv." },
                        { id: 6, name: "GPF Adv." },
                      ]}
                    /> */}

                    <div>
                      <span className="text-sm">Loan Name</span>
                      <br />
                      <div className="border w-full p-2 rounded border-black ">
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
                          className="w-full border-none outline-none bg-white border "
                        >
                          <option value="">Please Select</option>
                          <option value="1">Festival Adv.</option>
                          <option value="2">Motor Cycle Adv.</option>
                          <option value="3">Moped Adv.</option>
                          <option value="4">House Building Adv..</option>
                          <option value="5">Spl House Building Adv.</option>
                          <option value="6">GPF Adv.</option>
                        </select>
                      </div>
                    </div>

                    <InputBox
                      onBlur={handleBlur}
                      value={field.loan_account_num}
                      label="Loan Account Number"
                      placeholder="Enter Loan Account Number"
                      name="loan_account_num"
                      type="number"
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
                        handleInputChange("voucher_date", e.target.value, index)
                      }
                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.treasury_voc_num}
                      label="Treasury Voucher Number"
                      placeholder="Enter Treasury Voucher Number"
                      name="treasury_voc_num"
                      onChange={(e: any) =>
                        handleInputChange(
                          "treasury_voc_num",
                          e.target.value,
                          index
                        )
                      }
                      type="number"
                    />
                  </div>
                ))}
              </>
            )}

            {/* -----------------------Employee Loan details for tabIndex === 1 ends ----------------------------------- */}

            {/* -----------------------Employee Loan details for tabIndex === 2 ----------------------------------- */}

            {tabIndex === 2 && (
              <>
                {formFields.map((fields, index) => (
                  <div key={index}>
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
                      {innerTabIndex === 1 && (
                        <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
                          {/* <SelectForNoApi
                              onBlur={handleBlur}
                              value={(fields as any).loan_name_principal}
                              onChange={(e: any) => handleInputPrincipalChange("loan_name_principal", e.target.value, index)}
                              label="Loan Name"
                              name="loan_name_principal"
                              placeholder={"Please Select"}
                              options={[
                                { id: 1, name: "Festival Adv." },
                                { id: 2, name: "Motor Cycle Adv." },
                                { id: 3, name: "Moped Adv." },
                                { id: 4, name: "House Building Adv." },
                                { id: 5, name: "Spl House Building Adv." },
                                { id: 6, name: "GPF Adv." },
                                { id: 7, name: "GIS Adv." },
                              ]}
                            /> */}

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
                                className="w-full border-none outline-none bg-white border"
                              >
                                <option value="">Please Select</option>
                                <option value="1">Festival Adv.</option>
                                <option value="2">Motor Cycle Adv.</option>
                                <option value="3">Moped Adv.</option>
                                <option value="4">House Building Adv..</option>
                                <option value="5">
                                  Spl House Building Adv.
                                </option>
                                <option value="6">GPF Adv.</option>
                                <option value="7">GIS Adv.</option>
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
                            name="tot_amt_released"
                            type="number"
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
                            type="number"
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
                            type="number"
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
                            type="number"
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
                            type="number"
                          />
                        </div>
                      )}
                      {innerTabIndex === 2 && (
                        <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
                          {/* <SelectForNoApi
                              onBlur={handleBlur}
                              value={(fields as any).loan_name_recovery}
                              onChange={(e: any) => handleInputRecoveryChange("loan_name_recovery", e.target.value, index)}
                              label="Loan Name"
                              name="loan_name_recovery"
                              placeholder={"Please Select"}
                              options={[
                                { id: 1, name: "Festival Adv." },
                                { id: 2, name: "Motor Cycle Adv." },
                                { id: 3, name: "Moped Adv." },
                                { id: 4, name: "House Building Adv." },
                                { id: 5, name: "Spl House Building Adv." },
                                { id: 6, name: "GPF Adv." },
                                { id: 7, name: "GIS Adv." },
                              ]}
                            /> */}
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
                                className="w-full border-none outline-none bg-white border"
                              >
                                <option value="">Please Select</option>
                                <option value="1">Festival Adv.</option>
                                <option value="2">Motor Cycle Adv.</option>
                                <option value="3">Moped Adv.</option>
                                <option value="4">House Building Adv..</option>
                                <option value="5">
                                  Spl House Building Adv.
                                </option>
                                <option value="6">GPF Adv.</option>
                                <option value="7">GIS Adv.</option>
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
                            type="number"
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
                            type="number"
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
                            type="number"
                          />
                          <InputBox
                            value={(fields as any).last_paid_install_recovery}
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
                            type="number"
                          />
                          <InputBox
                            value={(fields as any).month_last_install_recovery}
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
                            type="number"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* -----------------------Employee Loan details for tabIndex === 2 ends ----------------------------------- */}

            {/* -----------------------Employee Loan details add row  ----------------------------------- */}

            <div className="w-full flex items-center justify-end mt-3">
              <Button
                onClick={addRow}
                buttontype="button"
                variant="primary_rounded"
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
    </>
  );
};

export default EmpLoanDetails;
