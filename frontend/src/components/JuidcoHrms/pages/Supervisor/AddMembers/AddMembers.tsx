"use client"


import React, { useEffect, useState } from "react";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import { SubHeading } from "@/components/Helpers/Heading";
import Image from "next/image";
import LeaveListIcon from "@/assets/icons/profile_new.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/Helpers/Modal/ConfirmationModal";
import * as Yup from "yup";
import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface formValuesAddMember {
  emp_id: string;
  supervisor_level: string;
  parent_emp: string;
  task: string;
}

const empId = Cookies.get('emp_id')

const validationSchema = Yup.object({
  emp_id: Yup.string().required("Employee ID is required"),
  parent_emp: Yup.string().required(
    "Immediate Supervisor is required"
  ),
});

export default function AddMembers() {
  const [empLoading, setEmpLoading] = useState<boolean>(false);
  const [confModal, setConfModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<formValuesAddMember | null>(
    null
  );
  const [empData, setEmpData] = useState<any>({});
  const [heirarchyData, setHeirarchyData] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>({});
  // let userDetails: any

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserDetails(sessionStorage.getItem('user_details') ? JSON.parse(String(sessionStorage.getItem('user_details'))) : {})
    }
  }, [])

  const router = useRouter();

  const initialValues: formValuesAddMember = {
    emp_id: "",
    supervisor_level: "",
    parent_emp: "",
    task: "",
  };

  const handleSubmit = (
    values: formValuesAddMember,
    // actions: FormikHelpers<formValuesAddMember>

  ) => {
    setConfModal(false);
    axios.post(`${HRMS_URL.TEAM.create}`, values)
      .then((response) => {
        console.log(response?.data)
        toast.success('Team meber added successfully')
        router.push('/supervisor/team-members')
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response.data);
      })
      .finally(() => setEmpLoading(false))

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
      handleSubmit(formValues);
      setIsLoading(false);
    }
  };

  const fetchEmployee = (emp_id: string) => {
    setEmpLoading(true)
    axios(`${HRMS_URL.EMP.get}?emp_id=${emp_id}`)
      .then((response) => {
        setEmpData(response?.data?.data[0])
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response.data);
      })
      .finally(() => setEmpLoading(false))
  }

  const fetchHeirarchy = (emp_id: string) => {
    setEmpLoading(true)
    axios(`${HRMS_URL.TEAM.getById}/${emp_id}`)
      .then((response) => {
        const flattenedData = response?.data?.data?.flat(Infinity);
        // console.log("ababababab", flattenedData);
        setHeirarchyData(flattenedData)
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response.data);
      })
      .finally(() => setEmpLoading(false))
  }

  useEffect(() => {
    if (heirarchyData?.length === 0 && empId) {
      fetchHeirarchy(empId)
    }
  }, [empId])

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
          <h1 className="text-2xl pb-4">{empData?.emp_basic_details?.emp_name}</h1>
          <h1>Employee ID - {empData?.emp_id} </h1>
          <h1>PAN No - {empData?.emp_basic_details?.pan_no}</h1>
          <h1>Role - {empData?.emp_join_details?.designation?.name}</h1>
          <h1>Task - {empData?.emp_join_details?.task || 'N/A'}</h1>
          <h1>Department - {empData?.emp_join_details?.department?.name}</h1>
        </div>
        <div className="pt-24 space-y-2">
          <h1>Account No - {empData?.emp_join_details?.ifsc}</h1>
          <h1>IFSC Code - {empData?.emp_join_details?.acc_number}</h1>
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
                validateForm,
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
                        onClick={() => fetchEmployee(values.emp_id)}
                      >
                        {empLoading ? 'Fetching...' : 'Search'}
                      </button>
                    </span>
                  </div>

                  <div className="flex flex-col text-black text-xl">
                    <label htmlFor="supervisor_level">Supervisor Level</label>
                    <span className="flex flex-col">
                      <Field
                        className="bg-gray-200 h-10 rounded mt-2"
                        name="supervisor_level"
                        as='select'
                      >
                        <option value={""} >
                          Select
                        </option>
                        {[1].map((item, index) => (
                          <option key={index} value={item} >
                            {item}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="supervisor_level"
                        component="div"
                        className="text-red-600"
                      />
                    </span>
                  </div>
                  {/* <div className="flex flex-col text-black text-xl">
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
                  </div> */}

                  <div className="flex flex-col text-black text-xl">
                    <label htmlFor="immediate_supervisor">
                      Immediate Supervisor
                    </label>
                    <Field
                      as='select'
                      className="bg-gray-200 h-10 rounded mt-2"
                      name="parent_emp"
                    >
                      <option value={""} >
                        Select
                      </option>
                      <option value={empId} >
                        {empId} ({userDetails?.name})
                      </option>
                      {heirarchyData?.map((item, index) => (
                        <option key={index} value={item?.emp_basic_details?.emp_id} >
                          {item?.emp_basic_details?.emp_id} ({item?.emp_basic_details?.emp_name})
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="parent_emp"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  {/* <div className="flex flex-col text-black text-xl">
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
                  </div> */}

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
                      Create
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
