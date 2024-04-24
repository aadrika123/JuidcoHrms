"use client";

import React from "react";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { Formik } from "formik";
import { HRMS_URL } from "@/utils/api/urls";
import DropDownList from "@/components/Helpers/DropDownList";
import axios from "@/lib/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

interface EditEmpListProps {
  empId: string;
}

// interface EditEmpListTypes {
//   emp_id: string;
//   emp_basic_details: {
//     emp_name: string;
//   };
//   emp_join_details: {
//     department_id: string | number;
//     pay_scale: number;
//     designation_id: number;
//     pay_band: number;
//     grade_pay: number;
//     task: string;
//     basic_pay: number;
//   };
// }

const EditEmpList: React.FC<EditEmpListProps> = (props) => {
  const queryClient = useQueryClient();

  const fetchData = async (endpoint: string, method: string) => {
    if (endpoint === "null") return [];
    const res = await axios({
      url: `${endpoint}`,
      method: `${method}`,
    });
    return res.data?.data;
  };

  const useCodeQuery = (endpoint: string, id: string, method: string) => {
    return useQuery([endpoint, id], () => fetchData(endpoint, method));
  };

  // get single user data
  const { data: empData, error: empErr } = useCodeQuery(
    `${HRMS_URL.EMS.getById}/${props.empId}`,
    props.empId,
    "GET"
  );

  // Update single user data

  // UPDATE EMPLOYEE DETAILS
  const updateEmpInformation = async (values: any) => {
    try {
      const res = await axios({
        url: `${HRMS_URL.EMS.update}`,
        method: "POST",
        data: {
          emp_id: props.empId,
          ...values,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { mutate } = useMutation(updateEmpInformation, {
    onSuccess: () => {
      toast.success("Updated Employee Information");
    },
    onError: () => {
      alert("Error updating Employee Information");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      goBack();
    },
  });
  if (empErr) return <>Failed</>;

  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Employee List
          </SubHeading>
        </div>
      </div>

      <div className="flex justify-between mb-10">
        <SubHeading>
          Employee Edit
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M18.1212 6.15999C17.8237 6.45749 17.535 6.74624 17.5262 7.03499C17.5 7.31499 17.7975 7.60374 18.0775 7.87499C18.4975 8.31249 18.9087 8.70624 18.8912 9.13499C18.8737 9.56374 18.4275 10.01 17.9812 10.4475L14.3675 14.07L13.125 12.8275L16.8437 9.11749L16.0037 8.27749L14.7612 9.51124L11.48 6.22999L14.84 2.87874C15.1812 2.53749 15.75 2.53749 16.0737 2.87874L18.1212 4.92624C18.4625 5.24999 18.4625 5.81874 18.1212 6.15999ZM2.625 15.0937L10.99 6.71999L14.2712 10.0012L5.90625 18.375H2.625V15.0937Z"
                fill="#555555"
              />
            </svg>
          </i>
        </SubHeading>
        <h5>Steps-1/10</h5>
      </div>

      <div className="border rounded-lg bg-white border-[#D9E4FB] p-6 px-10 shadow-md">
        <SubHeading className="text-[20px] py-4">Employee Details</SubHeading>
        <Formik
          initialValues={{
            emp_id: empData?.emp_id as string,
            emp_name: empData?.emp_basic_details?.emp_name as string,
            department_id: empData?.emp_join_details?.department_id as string,
            pay_band: empData?.emp_join_details?.pay_band as number,
            pay_scale: empData?.emp_join_details?.pay_scale as number,
            designation_id: empData?.emp_join_details?.designation_id as string,
            grade_pay: empData?.emp_join_details?.grade_pay as number,
            task: empData?.emp_join_details?.task as string,
            basic_pay: empData?.emp_join_details?.basic_pay as number,
          }}
          enableReinitialize
          onSubmit={(value) => mutate(value)}
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
              <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-4 ">
                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emp_id}
                  error={errors.emp_id}
                  touched={touched.emp_id}
                  label="Employee ID"
                  name="emp_id"
                  placeholder="Edit Employee ID"
                  disabled
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emp_name}
                  error={errors.emp_name}
                  touched={touched.emp_name}
                  label="Employee Name"
                  required={true}
                  name="emp_name"
                  placeholder={"Enter Employee Name"}
                />

                <DropDownList
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.department_id}
                  error={errors.department_id}
                  touched={touched.department_id}
                  label="Department"
                  name="department_id"
                  placeholder={"Please Select Department"}
                  api={`${HRMS_URL.DEPARTMENT.get}`}
                  required
                />

                <DropDownList
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.designation_id}
                  label="Designation"
                  placeholder="Please Select"
                  name="designation_id"
                  api={`${HRMS_URL.DESIGNATION.get}`}
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pay_scale}
                  error={errors.pay_scale}
                  touched={touched.pay_scale}
                  label="Pay Scale"
                  required={true}
                  name="pay_scale"
                  type="number"
                  placeholder={"Enter Pay Scale"}
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pay_band}
                  error={errors.pay_band}
                  touched={touched.pay_band}
                  label="Basic Pay Band"
                  name="pay_band"
                  type="number"
                  required={true}
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.grade_pay}
                  error={errors.grade_pay}
                  touched={touched.grade_pay}
                  label="Grade Pay "
                  name="grade_pay"
                  type="number"
                  required={true}
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.task}
                  error={errors.task}
                  touched={touched.task}
                  label="Task"
                  name="task"
                  required={true}
                />

                <InputBox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.basic_pay}
                  error={errors.basic_pay}
                  touched={touched.basic_pay}
                  label="Basic Pay "
                  name="basic_pay"
                  type="number"
                  required={true}
                />
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
                  buttonType="submit"
                  variant={"cancel"}
                >
                  Reset
                </PrimaryButton>

                <PrimaryButton buttonType="submit" variant="primary">
                  Save
                </PrimaryButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditEmpList;
