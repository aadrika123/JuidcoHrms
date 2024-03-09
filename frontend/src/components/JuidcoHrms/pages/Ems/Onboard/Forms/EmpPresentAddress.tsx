/***
 * Author: Jaideep
 * Status: Done
 * Uses: Employee Address details - Employee Present Address page
 */

"use client";

import React, { useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import { Formik } from "formik";
import {
  EmployeePresentAddressDetailsType,
  EmployeeDetailsProps,
} from "@/utils/types/employee.type";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  initialEmployeeAddressDetails,
  employeePresentAddressValidationSchema,
} from "@/utils/validation/Ems/ems.validation";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

const EmpPresentAddress: React.FC<
  EmployeeDetailsProps<EmployeePresentAddressDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const empType = useSearchParams().get("emp");
  const [confirmationOrder, setConfirmationOrder] = useState("");

  const updateConfirmationOrder = (value: string) => {
    setConfirmationOrder(value);
  };

  const handleSubmitFormik = (
    values: EmployeePresentAddressDetailsType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    Object.keys(values).forEach((key) => {
      const val = values[key as keyof typeof values];
      if (
        val ==
        initialEmployeeAddressDetails[
          key as keyof typeof initialEmployeeAddressDetails
        ]
      ) {
        delete values[key as keyof typeof values];
      }
    });
    if (typeof window !== "undefined") {
      let formData;

      if (confirmationOrder === "yes") {
        formData = [
          { type: "present", ...values },
          { type: "permanent", ...values },
        ];
      } else {
        formData = [{ type: "present", ...values }];
      }

      sessionStorage.setItem("emp_address_details", JSON.stringify(formData));
      setSubmitting(false);

      if (props.setData) {
        props.setData("emp_address_details", formData as any);
      }
      router.push(`${pathName}?emp=${empType}&page=5`);
    }
  };

  const initialValues =
    typeof window !== "undefined"
      ? sessionStorage.getItem("emp_address_details")
        ? JSON.parse(sessionStorage.getItem("emp_address_details") ?? "{}")
        : initialEmployeeAddressDetails
      : initialEmployeeAddressDetails;

  return (
    <>
      <SubHeading className="text-[20px] py-4">
        Employee Present Address
      </SubHeading>
      <Formik
        initialValues={initialValues}
        validationSchema={employeePresentAddressValidationSchema}
        onSubmit={handleSubmitFormik}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
              {/* -----------------------Present Address fields----------------------------------- */}

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address_primary}
                error={errors.address_primary}
                touched={touched.address_primary}
                label="Address-1"
                required={true}
                placeholder="Enter Present Address"
                name="address_primary"
              />

              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address_secondary}
                label="Address-2"
                name="address_secondary"
                placeholder={"Enter Present Address"}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.village}
                error={errors.village}
                touched={touched.village}
                label="Village/Town/City"
                required={true}
                placeholder="Enter Your Village/Town/City"
                name="village"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.post_office}
                label="Post Office"
                placeholder="Enter Your Post Office"
                name="post_office"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
                error={errors.state}
                touched={touched.state}
                label="State"
                required={true}
                placeholder="Enter Your State"
                name="state"
              />
              {/* <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                error={errors.district}
                touched={touched.district}
                label="District"
                required={true}
                placeholder="Enter Your District"
                name="district"

              /> */}

              <SelectForNoApi
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                error={errors.district}
                touched={touched.district}
                label="District"
                required={true}
                name="district"
                placeholder={"Choose District"}
                options={[
                  { id: 1, name: "Deoghar" },
                  { id: 2, name: "Dumka" },
                  { id: 3, name: "Bokaro" },
                  { id: 4, name: "Giridih" },
                  { id: 5, name: "Koderma" },
                  { id: 6, name: "Godda" },
                  { id: 7, name: "Chatra" },
                  { id: 8, name: "Dhanbad" },
                  { id: 9, name: "Gharwha" },
                  { id: 10, name: "East-Singhbhum" },
                  { id: 11, name: "Jamtara" },
                  { id: 12, name: "Saraikela-Kharsawan" },
                  { id: 13, name: "Ranchi" },
                  { id: 14, name: "Pakur" },
                  { id: 15, name: "Latehar" },
                  { id: 16, name: "Hazaribagh" },
                  { id: 17, name: "Lohardaga" },
                  { id: 18, name: "Palamu" },
                  { id: 19, name: "Ramghar" },
                  { id: 20, name: "Simdega" },
                  { id: 21, name: "West-Singhbhum" },
                  { id: 22, name: "Sahebganj" },
                  { id: 23, name: "Gumla" },
                  { id: 24, name: "Khunti" },
                ]}
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.block_ulb}
                label="Block ULB"
                placeholder="Block ULB"
                name="block_ulb"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pin_code}
                error={errors.pin_code}
                touched={touched.pin_code}
                label="Pin Code"
                required={true}
                placeholder="Pin Code"
                name="pin_code"
                type="number"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.police_station}
                error={errors.police_station}
                touched={touched.police_station}
                label="Police Station"
                required={true}
                placeholder="Police Station"
                name="police_station"
              />
              <div className="flex items-center gap-5">
                <div className="flex items-center">
                  <input
                    onChange={(e) =>
                      updateConfirmationOrder(e.target.checked ? "yes" : "no")
                    }
                    checked={confirmationOrder === "yes"}
                    className={`mr-1 bg-white checkbox border border-zinc-500`}
                    id="yes"
                    name="emp_address_same"
                    type="checkbox"
                  />
                  <label htmlFor="">
                    If Present & Permanent Address are not same
                  </label>
                </div>
              </div>
              {/* -----------------------Present Address fields ends----------------------------------- */}

              {/* -----------------------Present Address fields if confirmationOrder === yes ----------------------------------- */}

              {confirmationOrder === "yes" && (
                <>
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address_primary_permanent}
                    error={errors.address_primary_permanent}
                    touched={touched.address_primary_permanent}
                    label="Address-1"
                    placeholder="Enter Permanent Address"
                    name="address_primary_permanent"
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address_secondary_permanent}
                    label="Address-2"
                    name="address_secondary_permanent"
                    placeholder={"Enter Permanent Address"}
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.village_permanent}
                    error={errors.village_permanent}
                    touched={touched.village_permanent}
                    label="Village/Town/City"
                    placeholder="Enter Your Permanent Village/Town/City"
                    name="village_permanent"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.post_office_permanent}
                    label="Post Office"
                    placeholder="Enter Your Permanent Post Office"
                    name="post_office_permanent"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state_permanent}
                    error={errors.state_permanent}
                    touched={touched.state_permanent}
                    label="State"
                    placeholder="Enter Your Permanent State"
                    name="state_permanent"
                  />
                  {/* <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.district_permanent}
                    error={errors.district_permanent}
                    touched={touched.district_permanent}
                    label="District"
                    placeholder="Enter Your Permanent District"
                    name="district_permanent"
                  /> */}

                  <SelectForNoApi
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.district_permanent}
                    error={errors.district_permanent}
                    touched={touched.district_permanent}
                    label="District"
                    name="district_permanent"
                    placeholder={"Choose District"}
                    options={[
                      { id: 1, name: "Deoghar" },
                      { id: 2, name: "Dumka" },
                      { id: 3, name: "Bokaro" },
                      { id: 4, name: "Giridih" },
                      { id: 5, name: "Koderma" },
                      { id: 6, name: "Godda" },
                      { id: 7, name: "Chatra" },
                      { id: 8, name: "Dhanbad" },
                      { id: 9, name: "Gharwha" },
                      { id: 10, name: "East-Singhbhum" },
                      { id: 11, name: "Jamtara" },
                      { id: 12, name: "Saraikela-Kharsawan" },
                      { id: 13, name: "Ranchi" },
                      { id: 14, name: "Pakur" },
                      { id: 15, name: "Latehar" },
                      { id: 16, name: "Hazaribagh" },
                      { id: 17, name: "Lohardaga" },
                      { id: 18, name: "Palamu" },
                      { id: 19, name: "Ramghar" },
                      { id: 20, name: "Simdega" },
                      { id: 21, name: "West-Singhbhum" },
                      { id: 22, name: "Sahebganj" },
                      { id: 23, name: "Gumla" },
                      { id: 24, name: "Khunti" },
                    ]}
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.block_ulb_permanent}
                    label="Block ULB"
                    placeholder="Enter Your Permanent Block ULB"
                    name="block_ulb_permanent"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pin_code_permanent}
                    error={errors.pin_code_permanent}
                    touched={touched.pin_code_permanent}
                    label="Pin Code"
                    placeholder="Enter Your Permanent Pin Code"
                    name="pin_code_permanent"
                    type="number"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.police_station_permanent}
                    error={errors.police_station_permanent}
                    touched={touched.police_station_permanent}
                    label="Police Station"
                    placeholder="Enter Your Permanent Police Station"
                    name="police_station_permanent"
                  />
                </>
              )}

              {/* -----------------------Present Address fields if confirmationOrder === yes ends ----------------------------------- */}
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
    </>
  );
};

export default EmpPresentAddress;
