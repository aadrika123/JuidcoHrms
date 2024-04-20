"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { InnerHeading } from "@/components/Helpers/Heading";
import Input from "@/components/global/atoms/Input";
import { Formik } from "formik";
import * as yup from 'yup';
import "react-calendar/dist/Calendar.css";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import InputBoxWithFileUpload from "@/components/Helpers/InputBoxWithFileUpload";
import receipt from "@/assets/icons/receipt.png";
import axios from "@/lib/axiosConfig";
import { HRMS_URL } from "@/utils/api/urls";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
// import { debug } from "console";

interface ClaimInitialData {
  employee_id: string | number,
  claimType: string,
  orderNo: string,
  fromDate: string,
  toDate: string,
  travelExpenses: string | number,
  distance: string | number,
  foodExpenses: number | string,
  totalAmount: number,
  hotelExpenses: number | string,
  description: string,
  location: string,
  witnessInformation: string,
  supervisorSelection: string,
  thirdPartyInformation: string,
  claimSupervisor: string
}

 const TravelClaimFormSchema = yup.object().shape({
    employee_id: yup.string().notRequired(),
    claimType: yup.string().required("Please choose claim type"),
    orderNo: yup.string().required("Enter Order No"),
    toDate: yup.string().required("Select To Date"),
    fromDate: yup.string().required("Select From Date"),
    distance: yup.number().required("Enter Distance"),
    travelExpenses: yup.number().required("Enter Travel Expense"),
    foodExpenses: yup.number().typeError("Please enter number value").required("Enter Food Expense"),
    hotelExpenses: yup.number().required("Enter Hotel Expense"),
    totalAmount: yup.number().required("Total amount should be atleast 0"),
  });
  const MedicalClaimFormSchema = yup.object().shape({
    employee_id: yup.string().notRequired(),
    claimType: yup.string().required("Please choose claim type"),
    orderNo: yup.string().required("Enter Order No"),
    toDate: yup.string().required("Select a Date"),
    fromDate: yup.string().required("Select CHOOSE Time"),
    description: yup.string().required("Enter Description"),
    location: yup.string().required("Enter Location"),
    witnessInformation: yup.string().required("Enter witness information"),
    supervisorSelection: yup.string().required("Choose Supervisor Selection"),
    totalAmount: yup.number().required("Total amount should be atleast 0").min(0),
  });

const ClaimForm = ({getAllClaimByEmployeeId}:any) => {
  const [foodExpenseAttachment, setFoodExpenseAttachment] = useState<File>();
  const [travelExpenseAttachment, setTravelExpenseAttachment] = useState<File>();
  const [hotelExpenseAttachment, setHotelExpenseAttachment] = useState<File>();
  const [descriptionAttachment, setDescriptionAttachment] = useState<File>();
  const [userDetails, setUserDetails] = useState<any>();
  const [claimType, setClaimType] = useState<string>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("user_details");
      const user_details = JSON.parse(data as string);
      setUserDetails(user_details);
    }
  }, []);

  // console.log(userDetails, "detaild");



  const handleSaveClaim = async (values: ClaimInitialData) => {
    try {
        const formData = new FormData();

        console.log(formData, "formData");
        // // Append form data
        formData.append('employee_id', String(values.employee_id));
        formData.append('claimType', values.claimType);
        formData.append('orderNo', values.orderNo);
        formData.append('fromDate', values.fromDate);
        formData.append('toDate', values.toDate);
        formData.append('travelExpenses', String(values.travelExpenses));
        formData.append('distance', String(values.distance));
        formData.append('foodExpenses', String(values.foodExpenses));
        formData.append('hotelExpenses', String(values.hotelExpenses));
        formData.append('description', values.description);
        formData.append('location', values.location);
        formData.append('witnessInformation', values.witnessInformation);
        formData.append('supervisorSelection', values.supervisorSelection)

        if(claimType=="Travel reimbursement"){
          formData.append('totalAmount', (Number(values.foodExpenses) + Number(values.hotelExpenses) + Number(values.travelExpenses)).toString());
        } else {
          formData.append('totalAmount', String(values.totalAmount));
        }
        
        console.log('foodExpenseAttachment', foodExpenseAttachment);
        if (foodExpenseAttachment) {
          formData.append('foodExpenseAttachment', foodExpenseAttachment);
        }
        if (travelExpenseAttachment) {
          formData.append('travelExpenseAttachment', travelExpenseAttachment);
        }
        if (hotelExpenseAttachment) {
          formData.append('hotelExpenseAttachment', hotelExpenseAttachment);
        }
        if (descriptionAttachment) {
          formData.append('descriptionAttachment', descriptionAttachment);
        }
        
        const res = await axios({
            url: `${HRMS_URL.CLAIM.create}/create`,
            method: "POST",
            data: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (res.data.status) {
            alert("Claim created successfully");
            // window.location.reload();
        }
        console.log("Submitted values:", res.data);
      } catch (error) {
          console.error("Error submitting form:", error);
      }
    };

  const handleChooseFile = (e:any)=>{
    // debugger;
    if(e.target.name=="foodExpenses"){
      setFoodExpenseAttachment(e.target.files[0]);
    } else if(e.target.name=="travelExpenses"){
      setTravelExpenseAttachment(e.target.files[0]);
    } else if(e.target.name=="hotelExpenses"){
      setHotelExpenseAttachment(e.target.files[0]);
    } else if(e.target.name=="description"){
      setDescriptionAttachment(e.target.files[0]);
    }
  }
 
  const initialValues = {
    employee_id: userDetails?.emp_id || 0,
    claimType: "",
    orderNo: "",
    fromDate: "",
    toDate: "",
    travelExpenses: "",
    distance: "",
    foodExpenses: "",
    totalAmount: 0,
    hotelExpenses: "",
    description: "",
    location: "",
    witnessInformation: "",
    supervisorSelection: "",
    thirdPartyInformation: "",
    claimSupervisor: ""
  };

  return (
    <>
      <div
        className={`w-full sm:w-full h-auto mx-5 my-5 flex flex-col relative bg-[#ffffff] p-5 shadow-lg`}
      >
        <InnerHeading className="text-xl flex items-center justify-between">
          <div className="flex items-center">
            <i className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <rect width="32" height="32" rx="9" fill="#665DD9" />
                <path
                  d="M19.6367 6C23.4494 6 25.84 8.37312 25.84 12.2033V14.5066L25.8331 14.6096C25.7828 14.9801 25.4652 15.2656 25.0809 15.2656H25.0722L24.9524 15.256C24.7948 15.2306 24.6484 15.1554 24.5354 15.0397C24.3942 14.8952 24.3172 14.6999 24.3219 14.4979V12.2033C24.3219 9.18452 22.6555 7.5181 19.6367 7.5181H12.2033C9.1758 7.5181 7.5181 9.18452 7.5181 12.2033V19.6455C7.5181 22.6642 9.18452 24.3219 12.2033 24.3219H19.6367C22.6642 24.3219 24.3219 22.6555 24.3219 19.6455C24.3219 19.2262 24.6617 18.8864 25.0809 18.8864C25.5002 18.8864 25.84 19.2262 25.84 19.6455C25.84 23.4669 23.4669 25.84 19.6455 25.84H12.2033C8.37312 25.84 6 23.4669 6 19.6455V12.2033C6 8.37312 8.37312 6 12.2033 6H19.6367ZM11.706 13.4945C11.9073 13.5014 12.0977 13.5879 12.2352 13.7352C12.3726 13.8825 12.4459 14.0784 12.4388 14.2798V20.6226C12.4244 21.0418 12.0728 21.37 11.6536 21.3555C11.2344 21.341 10.9063 20.9895 10.9207 20.5703V14.2187L10.9343 14.1C10.9647 13.9444 11.0439 13.8013 11.162 13.6924C11.3095 13.5564 11.5055 13.4851 11.706 13.4945ZM15.9549 10.5194C16.3741 10.5194 16.7139 10.8592 16.7139 11.2785V20.579C16.7139 20.9982 16.3741 21.338 15.9549 21.338C15.5357 21.338 15.1958 20.9982 15.1958 20.579V11.2785C15.1958 10.8592 15.5357 10.5194 15.9549 10.5194ZM20.1602 16.8448C20.5794 16.8448 20.9193 17.1847 20.9193 17.6039V20.5703C20.9193 20.9895 20.5794 21.3293 20.1602 21.3293C19.741 21.3293 19.4012 20.9895 19.4012 20.5703V17.6039C19.4012 17.1847 19.741 16.8448 20.1602 16.8448Z"
                  fill="white"
                  fillOpacity="0.92"
                />
              </svg>
            </i>
            Apply Claim
          </div>
        </InnerHeading>

        {/* form field  */}

        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={claimType =="Travel reimbursement" ? TravelClaimFormSchema : MedicalClaimFormSchema }
            onSubmit={async(values: ClaimInitialData, { setSubmitting ,resetForm}) => {
              console.log('onSubmit', values);
              handleSaveClaim(values).then(() => {
                console.log('Save claim successful');
                setSubmitting(false);
                getAllClaimByEmployeeId(userDetails?.id);
                resetForm();
                setFoodExpenseAttachment(undefined);
                setHotelExpenseAttachment(undefined);
                setTravelExpenseAttachment(undefined);
                setDescriptionAttachment(undefined);
              })
              .catch((error) => {
                console.error('Error saving claim:', error);
                setSubmitting(false);
              });
            }}
            enableReinitialize={true}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => ( 
              <form onSubmit={handleSubmit} method="post">
                <div className="flex md:flex-row">
                  <div className="w-2/3">
                    <div className="md:w-full border-r-2	">
                      <div className="m-5">
                        <div className="flex flex-col mt-4 text-center">
                          <span className="text-center text-red-400">
                            {/* {errorMsg} */}
                          </span>
                        </div>
                        <div className="mb-6">
                          <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                            <SelectForNoApi
                              onChange={(e)=> {handleChange(e); setClaimType(e.target.value)}}
                              onBlur={handleBlur}
                              value={values?.claimType}
                              label="Claim Type"
                              name="claimType"
                              // placeholder={"Choose Claim Type"}
                              options={[{id: 1, name: "Medical reimbursement"}, {id: 2, name: "Travel reimbursement"}]}
                              touched={touched.claimType}
                              error={errors.claimType}
                            />
                            {values.claimType === "Travel reimbursement" ? (<>
                              <Input
                              label="Order No"
                              placeholder="Enter Order No"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.orderNo}
                              name="orderNo"
                              touched={touched.orderNo}
                              error={errors.orderNo}
                            />
                            
                            <Input
                              label="From"
                              placeholder="From"
                              onChange={handleChange}
                              type="date"
                              value={values.fromDate}
                              name="fromDate"
                              touched={touched.fromDate}
                              error={errors.fromDate}
                            />
                            <Input
                              label="To"
                              placeholder="To"
                              onChange={handleChange}
                              type="date"
                              value={values.toDate}
                              name="toDate"
                              touched={touched.toDate}
                              error={errors.toDate}
                            />

                            <InputBoxWithFileUpload
                              type="number"
                              label="Travel Expense"
                              name="travelExpenses"
                              placeholder="00.00/-"
                              value={values.travelExpenses}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onFileChange={(event)=> {(handleChooseFile(event))}}
                              touched={touched.travelExpenses}
                              error={errors.travelExpenses}
                            />
                            <Input
                              type="number"
                              label="Distance"
                              placeholder="Enter Total Days"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.distance}
                              name="distance"
                              touched={touched.distance}
                              error={errors.distance}
                            />
                            <InputBoxWithFileUpload
                              type="number"
                              label="Food Expense"
                              name="foodExpenses"
                              placeholder="00.00/-"
                              value={values.foodExpenses}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onFileChange={(event)=> {(handleChooseFile(event))}}
                              touched={touched.foodExpenses}
                              error={errors.foodExpenses}
                            />
                            <InputBoxWithFileUpload
                              type="number"
                              label="Hotel Expense"
                              name="hotelExpenses"
                              placeholder="00.00/-"
                              value={values.hotelExpenses}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onFileChange={(event)=> {(handleChooseFile(event))}}
                              touched={touched.hotelExpenses}
                              error={errors.hotelExpenses}
                            />

                            <div className="mt-2">
                              <Input
                                label="Total Amount"
                                placeholder="00.00/-"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={Number(values.travelExpenses)+Number(values.hotelExpenses)+Number(values.foodExpenses)}
                                name="totalAmount"
                                readonly={true}
                              />
                            </div>
                            </>) : (<>
                              <Input
                              label="Order No"
                              placeholder="Enter Order No"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.orderNo}
                              name="orderNo"
                              touched={touched.orderNo}
                              error={errors.orderNo}
                            />
                            
                            <Input
                              label="Date"
                              placeholder="Date"
                              onChange={handleChange}
                              type="date"
                              value={values.fromDate}
                              name="fromDate"
                              touched={touched.fromDate}
                              error={errors.fromDate}
                            />
                            <Input
                              label="Time"
                              placeholder="Time"
                              onChange={handleChange}
                              type="time"
                              value={values.toDate}
                              name="toDate"
                              touched={touched.toDate}
                              error={errors.toDate}
                            />

                            <InputBoxWithFileUpload
                              type="text"
                              label="Description"
                              name="description"
                              placeholder=""
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onFileChange={(event)=> {(handleChooseFile(event))}}
                              touched={touched.description}
                              error={errors.description}
                            />
                            <Input
                              type="text"
                              label="Location"
                              placeholder=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.location}
                              name="location"
                              touched={touched.location}
                              error={errors.location}
                            />
                            
                            <Input
                              type="text"
                              label="Witness Information"
                              placeholder=""
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.witnessInformation}
                              name="witnessInformation"
                              touched={touched.witnessInformation}
                              error={errors.witnessInformation}
                            />
                            
                            <SelectForNoApi
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.supervisorSelection}
                              label="Supervisor Selection"
                              name="supervisorSelection"
                              // placeholder={"Choose Claim Type"}
                              options={[{id: 1, name: "Supervisor 1"}, {id: 2, name: "Supervisor 2"}]}
                              touched={touched.supervisorSelection}
                              error={errors.supervisorSelection}
                            />

                            <div className="mt-2">
                              <Input type="number"
                                label="Total Amount"
                                placeholder="00.00/-"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.totalAmount}
                                name="totalAmount"
                              />
                            </div>
                            </>)}
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="h-full w-full ml-10">
                        {travelExpenseAttachment && (
                          <div style={{position: "relative"}}>
                          <div 
                              style={{
                                position: 'absolute',
                                top: 10, // Adjust the top position as needed
                                right: 10, // Adjust the right position as needed
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                              }}
                            >
                              Travel Expense
                            </div>
                          <Image 
                            src={URL.createObjectURL(travelExpenseAttachment)}
                            alt="receipt image"
                            width={200}
                            height={300}
                          />
                          </div>
                        )}
                        {foodExpenseAttachment && (
                          <div style={{position: "relative", marginTop: '20px'}}>
                          <div 
                              style={{
                                position: 'absolute',
                                top: 10, // Adjust the top position as needed
                                right: 10, // Adjust the right position as needed
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                              }}
                            >
                              Food Expense
                            </div>
                          <Image 
                            src={URL.createObjectURL(foodExpenseAttachment)}
                            alt="receipt image"
                            width={200}
                            height={300}
                          />
                          </div>
                        )}
                        {hotelExpenseAttachment && (
                          <div style={{position: "relative", marginTop: '20px'}}>
                          <div 
                              style={{
                                position: 'absolute',
                                top: 10, // Adjust the top position as needed
                                right: 10, // Adjust the right position as needed
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                              }}
                            >
                              Hotel Expense
                            </div>
                          <Image 
                            src={URL.createObjectURL(hotelExpenseAttachment)}
                            alt="receipt image"
                            width={200}
                            height={300}
                          />
                          </div>
                        )}
                        {descriptionAttachment && (
                          <div style={{position: "relative", marginTop: '20px'}}>
                          <div 
                              style={{
                                position: 'absolute',
                                top: 10, // Adjust the top position as needed
                                right: 10, // Adjust the right position as needed
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                              }}
                            >
                              Description
                            </div>
                          <Image 
                            src={URL.createObjectURL(descriptionAttachment)}
                            alt="receipt image"
                            width={200}
                            height={300}
                          />
                          </div>
                        )}
                        {(!travelExpenseAttachment && !foodExpenseAttachment && !hotelExpenseAttachment && !descriptionAttachment) && (
                          <Image src={receipt} alt="Demo Receipt" />
                        )}
                      </div>

                  </div>
                </div>

                <div className="flex items-center justify-end mt-5 gap-5">
                  <PrimaryButton
                    buttonType="button"
                    variant={"cancel"}
                    onClick={goBack}
                  >
                    Cancel
                  </PrimaryButton>

                  <PrimaryButton buttonType="submit" variant="primary">
                    Apply
                  </PrimaryButton>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ClaimForm;
