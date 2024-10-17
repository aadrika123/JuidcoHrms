"use client";

import React, { useState } from "react";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { SubHeading } from "@/components/Helpers/Heading";
import Image from "next/image";
import LeaveListIcon from "@/assets/icons/profile_new.png";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/Helpers/Modal/ConfirmationModal";
import * as Yup from "yup";

interface formValuesAddMember {
  emp_id: string;
  supervisor_level: string;
  immediate_supervisor: string;
  task: string;
}

const validationSchema = Yup.object({
  emp_id: Yup.string().required("Employee ID is required"),
  immediate_supervisor: Yup.string().required(
    "Immediate Supervisor is required"
  ),
});

export default function AddMembers() {
  const [empId, setEmpId] = useState<string>("");
  const [confModal, setConfModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<formValuesAddMember | null>(
    null
  );

  const router = useRouter();

  const initialValues: formValuesAddMember = {
    emp_id: "",
    supervisor_level: "",
    immediate_supervisor: "",
    task: "",
  };

  const handleSubmit = (
    values: formValuesAddMember,
    actions: FormikHelpers<formValuesAddMember>
    
  ) => {
    console.log("Form values:", values);
    setConfModal(false);
    router.push('/supervisor/team-members')
   
  };

  const backRoute = () => {
    router.back();
  };

  const handleCancel = () => {
    setConfModal(false);
  };

  const approveHandler = () => {
    if (formValues) {
      setIsLoading(true);
      handleSubmit(formValues, {} as FormikHelpers<formValuesAddMember>);
      setIsLoading(false);
    }
  };

  return (
    <>
      {confModal && (
        <ConfirmationModal
          confirmationHandler={approveHandler}
          handleCancel={handleCancel}
          message={"Are you sure to Submit Request?"}
          loadingState={isLoading}
        />
      )}

      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Add Members
          </SubHeading>
        </div>
      </div>

      <div className="flex bg-white text-black shadow-xl rounded-md pb-10">
        <div className="w-[20%]">
          <Image
            src={LeaveListIcon}
            alt="employee"
            width={150}
            height={20}
            className="mt-12 ml-12"
          />
        </div>
        <div className="w-[35%] pt-12 space-y-2">
          <h1 className="text-2xl pb-4">Jaydeep Gupta</h1>
          <h1>Employee ID - </h1>
          <h1>PAN No - </h1>
          <h1>Role - </h1>
          <h1>Task - </h1>
          <h1>Department - </h1>
        </div>
        <div className="pt-24 space-y-2">
          <h1>Account No - </h1>
          <h1>IFSC Code - </h1>
          <h1>UAN No - </h1>
        </div>
      </div>

      <div className="shadow-xl">
        <div className="m-10">
          <h1 className="text-black">Update Organization Structuring</h1>

          <div className="mt-10">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                setFormValues(values);
                setConfModal(true);
              }}
              validationSchema={validationSchema}
            >
              {({
                values,
                resetForm,
                errors,
                touched,
                validateForm,
                isValid,
              }) => (
                <Form className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4">
                  <div className="flex flex-col text-black text-xl w-full">
                    <label htmlFor="emp_id">Employee ID</label>
                    <span className="flex space-x-2 w-[100%]">
                      <span className="flex flex-col">
                        <Field
                          className="bg-gray-200 h-10 rounded mt-2 w-[26rem]"
                          name="emp_id"
                          type="text"
                        />
                        <ErrorMessage
                          name="emp_id"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </span>
                      <button
                        type="button"
                        className="bg-blue-800 mt-2 px-5 py-1 h-10 text-base text-white rounded hover:bg-gray-600"
                        onClick={() => setEmpId(values.emp_id)}
                      >
                        Continue
                      </button>
                    </span>
                  </div>

                  <div className="flex flex-col text-black text-xl">
                    <label htmlFor="supervisor_level">Supervisor Level</label>
                    <span className="flex flex-col">
                    <Field
                      className="bg-gray-200 h-10 rounded mt-2"
                      name="supervisor_level"
                      type="text"
                    />
                    <ErrorMessage
                      name="supervisor_level"
                      component="div"
                      className="text-red-600"
                    />
                    </span>
                  </div>

                  <div className="flex flex-col text-black text-xl">
                    <label htmlFor="immediate_supervisor">
                      Immediate Supervisor
                    </label>
                    <Field
                      className="bg-gray-200 h-10 rounded mt-2"
                      name="immediate_supervisor"
                      type="text"
                    />
                    <ErrorMessage
                      name="immediate_supervisor"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div className="flex flex-col text-black text-xl">
                    <label htmlFor="task">Task</label>
                    <Field
                      className="bg-gray-200 h-10 rounded mt-2"
                      name="task"
                      type="text"
                    />
                    <ErrorMessage
                      name="task"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  
                  <div className="flex flex-col text-black text-xl">
                  
                  </div>

                  <div className="flex justify-end gap-2 text-black text-xl mt-10 mb-10">
                    <button
                      type="button"
                      className="bg-blue-800 px-8 py-1 text-base text-white rounded hover:bg-gray-600"
                      onClick={backRoute}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="bg-blue-800 px-8 py-1 text-base text-white rounded hover:bg-gray-600"
                      onClick={() => resetForm()}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      onClick={async () => {
                        const formErrors = await validateForm();
                        if (Object.keys(formErrors).length === 0) {
                          setFormValues(values);
                          setConfModal(true);
                        }
                      }}
                      className="bg-blue-800 px-8 py-1 text-base text-white rounded hover:bg-gray-600"
                    >
                      Update
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
