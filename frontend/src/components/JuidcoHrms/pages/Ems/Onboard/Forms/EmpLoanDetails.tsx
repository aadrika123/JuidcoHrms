// /***
//  * Author: Jaideep
//  * Status: Done
//  * Uses: Employee Loan details - Employee Loan & Advance Information page
//  */

// "use client";

// import React, { useState } from "react";
// import { SubHeading } from "@/components/Helpers/Heading";
// import {
//   EmployeeLoanDetailsType,
//   EmployeeDetailsProps,
// } from "@/utils/types/employee.type";
// import { initialEmployeeLoanDetails } from "@/utils/validation/Ems/ems.validation";
// import { Formik } from "formik";
// import InputBox from "@/components/Helpers/InputBox";
// import PrimaryButton from "@/components/Helpers/Button";
// import goBack from "@/utils/helper";
// import { usePathname, useRouter } from "next/navigation";
// import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
// import Button from "@/components/global/atoms/Button";

// const EmpLoanDetails: React.FC<
//   EmployeeDetailsProps<EmployeeLoanDetailsType>
// > = (props) => {
//   const pathName = usePathname();
//   const router = useRouter();

//   const [confirmationOrder, setConfirmationOrder] = useState('no');

//   const handleSubmitFormik = (
//     values: EmployeeLoanDetailsType,
//     { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
//   ) => {
//     if (typeof window !== "undefined") {
//       const formData = { ...values };

//       sessionStorage.setItem("emp_join_details", JSON.stringify(formData));
//       setSubmitting(false);

//       if (props.setData) {
//         props.setData("emp_join_details", formData);
//       }
//       router.push(`${pathName}?page=11`);
//     }
//   };

//   const initialValues =
//     typeof window !== "undefined"
//       ? sessionStorage.getItem("emp_join_details")
//         ? JSON.parse(sessionStorage.getItem("emp_join_details") ?? "{}")
//         : initialEmployeeLoanDetails
//       : initialEmployeeLoanDetails;

//   const [tabIndex, setTabIndex] = useState<number>(1);
//   const [innerTabIndex, setInnerTabIndex] = useState<number>(1);

//   const [additionalForms, setAdditionalForms] = useState<Array<number>>([1]);
//   const [additionalForms2, setAdditionalForms2] = useState<Array<number>>([1]);

//   const handleAddMore = () => {
//     if (additionalForms.length < 6) {
//       setAdditionalForms((prevForms) => [...prevForms, prevForms.length + 1]);

//     }
//   };

//   const handleAddMoreRecovery = () => {
//     if (additionalForms.length < 6) {
//       setAdditionalForms2((prevForms) => [...prevForms, prevForms.length + 1]);

//     }
//   };



//   return (
//     <>
//       <SubHeading className="text-[20px] py-4">
//         Employee Loan & Advance Information
//       </SubHeading>

//       <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
//         <div className="flex-all-center ">
//           <input
//             id="accounting"
//             type="radio"
//             onChange={() => setTabIndex(1)}
//             name="radio-1"
//             className="radio border border-zinc-600"
//             defaultChecked
//           />
//           <label htmlFor="accounting" className=" cursor-pointer">
//             Loan Details
//           </label>
//         </div>

//         <div className="flex-all-center ">
//           <input
//             id="function"
//             onChange={() => setTabIndex(2)}
//             type="radio"
//             name="radio-1"
//             className="radio  border-zinc-600"
//           />
//           <label htmlFor="function" className=" cursor-pointer">
//             Recovery Details
//           </label>
//         </div>
//       </div>

//       <Formik
//         initialValues={initialValues}
//         // validationSchema={employeeJoinValidationSchema}
//         onSubmit={handleSubmitFormik}
//       >
//         {({
//           values,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           handleReset,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             {tabIndex === 1 &&
//               additionalForms.map((formIndex, arrayIndex: number) => (
//                 <div
//                   key={arrayIndex}
//                   className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 mt-4 "
//                 >
//                   <SelectForNoApi
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.loan_name}
//                     label="Loan Name"
//                     name="loan_name"
//                     placeholder={"Please Select"}
//                     options={[
//                       { id: 1, name: "loan 1" },
//                       { id: 2, name: "loan 2" },
//                     ]}
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.loan_account_num}
//                     label="Loan Account Number"
//                     placeholder="Enter Loan Account Number"
//                     name="loan_account_num"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.sanc_order_num}
//                     label="Sanc Order Number"
//                     placeholder="Enter Sanc Order Number"
//                     name="sanc_order_num"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dos}
//                     label="Date of Sanction"
//                     name="dos"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.san_authority}
//                     label="Sanctioning Authority"
//                     placeholder="Enter Sanctioning Authority"
//                     name="san_authority"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dod}
//                     label="Date of Disbursement"
//                     name="dod"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dis_treasury_name}
//                     label="Disbursing Treasury Name"
//                     placeholder="Enter Disbursing Treasury Name"
//                     name="dis_treasury_name"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.voucher_date}
//                     label="Voucher Date"
//                     name="voucher_date"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.treasury_voc_num}
//                     label="Treasury Voucher Number"
//                     placeholder="Enter Treasury Voucher Number"
//                     name="treasury_voc_num"
//                   />
//                   {arrayIndex === additionalForms.length - 1 && (
//                     <div className="flex items-center justify-end mt-5 gap-5">
//                       <PrimaryButton
//                         buttonType="button"
//                         onClick={handleAddMore}
//                         variant="primary"
//                       >
//                         +Add More
//                       </PrimaryButton>
//                     </div>
//                   )}

//                   {/* <PrimaryButton
//                     buttonType="button"
//                     onClick={() => setConfirmationOrder('yes')}
//                     variant="primary"
//                     className="w-[20%]"
//                   >
//                     +Add More
//                   </PrimaryButton>

//                   {confirmationOrder === 'yes' && (
//                     <>
//                       <SelectForNoApi
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.loan_name}
//                     label="Loan Name"
//                     name="loan_name"
//                     placeholder={"Please Select"}
//                     options={[
//                       { id: 1, name: "loan 1" },
//                       { id: 2, name: "loan 2" },
//                     ]}
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.loan_account_num}
//                     label="Loan Account Number"
//                     placeholder="Enter Loan Account Number"
//                     name="loan_account_num"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.sanc_order_num}
//                     label="Sanc Order Number"
//                     placeholder="Enter Sanc Order Number"
//                     name="sanc_order_num"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dos}
//                     label="Date of Sanction"
//                     name="dos"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.san_authority}
//                     label="Sanctioning Authority"
//                     placeholder="Enter Sanctioning Authority"
//                     name="san_authority"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dod}
//                     label="Date of Disbursement"
//                     name="dod"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dis_treasury_name}
//                     label="Disbursing Treasury Name"
//                     placeholder="Enter Disbursing Treasury Name"
//                     name="dis_treasury_name"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.voucher_date}
//                     label="Voucher Date"
//                     name="voucher_date"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.treasury_voc_num}
//                     label="Treasury Voucher Number"
//                     placeholder="Enter Treasury Voucher Number"
//                     name="treasury_voc_num"
//                   />
//                     </>
//                   )} */}
//                 </div>
//               ))}

// {tabIndex === 2 &&
//   additionalForms2.map((formIndex, arrayIndexRec) => (
//     <>
//       <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
//         <div className="flex-all-center">
//           <input
//             id="principal"
//             type="radio"
//             onChange={() => setInnerTabIndex(1)}
//             name="inner-radio-2"
//             className="radio border border-zinc-600"
//             defaultChecked
//           />
//           <label htmlFor="principal" className="cursor-pointer">
//             Principal Component
//           </label>
//         </div>

//         <div className="flex-all-center">
//           <input
//             id="recovery"
//             onChange={() => setInnerTabIndex(2)}
//             type="radio"
//             name="inner-radio-2"
//             className="radio border-zinc-600"
//           />
//           <label htmlFor="recovery" className="cursor-pointer">
//             Recovery Details
//           </label>
//         </div>
//       </div>

//       {innerTabIndex === 1 && (
//         <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
//           <SelectForNoApi
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.loan_name_principal}
//             label="Loan Name"
//             name="loan_name_principal"
//             placeholder={"Please Select"}
//             options={[
//               { id: 1, name: "loan 1" },
//               { id: 2, name: "loan 2" },
//             ]}
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.tot_amt_released}
//             label="Loan Amount Released (Rs)"
//             placeholder="Enter Loan Amount Released(Rs)"
//             name="tot_amt_released"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.total_install}
//             label="Total Installment Fixed(Rs)"
//             placeholder="Enter Total Installment Fixed(Rs)"
//             name="total_install"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.monthly_install}
//             label="Monthly Installment Amount(Rs)"
//             placeholder="Enter Monthly Installment Amount(Rs)"
//             name="monthly_install"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.last_paid_install}
//             label="Last Paid Installment Number"
//             placeholder="Last Paid Installment Number"
//             name="last_paid_install"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.month_last_install}
//             label="Month In Which last Installment was paid"
//             name="month_last_install"
//             type="date"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.total_amnt}
//             label="Total Amount Paid Towards Principal(Rs)"
//             placeholder="Enter Total Amount Paid Towards Principal(Rs)"
//             name="total_amnt"
//           />
//         </div>
//       )}

//       {innerTabIndex === 2 && (
//         <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
//           <SelectForNoApi
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.loan_name_recovery}
//             label="Loan Name"
//             name="loan_name_recovery"
//             placeholder={"Please Select"}
//             options={[
//               { id: 1, name: "loan 1" },
//               { id: 2, name: "loan 2" },
//             ]}
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.total_int_amount}
//             label=" Total Interest Amount To Be Recovered (Rs)"
//             placeholder="Enter Total Interest Amount To Be Recovered (Rs)"
//             name="total_int_amount"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.total_install_recovery}
//             label="Total No. Of Installments"
//             placeholder="Enter Total No. Of Installments"
//             name="total_install_recovery"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.monthly_install_recovery}
//             label="Monthly Installment Amount(Rs)"
//             placeholder="Enter Monthly Installment Amount(Rs)"
//             name="monthly_install_recovery"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.last_paid_install_recovery}
//             label="Last paid Installment Number."
//             placeholder="Enter Last paid Installment Number."
//             name="last_paid_install_recovery"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.month_last_install_recovery}
//             label="Month In Which last Installment was paid"
//             placeholder="Enter Month In Which last Installment was paid"
//             name="month_last_install_recovery"
//             type="date"
//           />
//           <InputBox
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.total_amnt_recovery}
//             label="Total Amount Paid Towards Interest(Rs)"
//             placeholder="Enter Total Amount Paid Towards Interest(Rs)"
//             name="total_amnt_recovery"
//           />
//         </div>
//       )}

//       {arrayIndexRec === additionalForms2.length - 1 && (
//         <div className="flex items-center justify-end mt-5 gap-5">
//           <PrimaryButton
//             buttonType="button"
//             onClick={handleAddMoreRecovery}
//             variant="primary"
//           >
//             +Add More
//           </PrimaryButton>
//         </div>
//       )}
//     </>
//   ))}

//             <div className="flex items-center justify-end mt-5 gap-5">
//               <PrimaryButton
//                 buttonType="button"
//                 variant={"cancel"}
//                 onClick={goBack}
//               >
//                 Back
//               </PrimaryButton>

//               <PrimaryButton
//                 onClick={handleReset}
//                 buttonType="button"
//                 variant={"cancel"}
//               >
//                 Reset
//               </PrimaryButton>

//               <PrimaryButton buttonType="submit" variant="primary">
//                 Next
//               </PrimaryButton>
//             </div>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default EmpLoanDetails;













// /***
//  * Author: Jaideep
//  * Status: Done
//  * Uses: Employee Loan details - Employee Loan & Advance Information page
//  */

// "use client";

// import React, { useState } from "react";
// import { SubHeading } from "@/components/Helpers/Heading";
// import {
//   EmployeeLoanDetailsType,
//   EmployeeDetailsProps,
// } from "@/utils/types/employee.type";
// import { initialEmployeeLoanDetails } from "@/utils/validation/Ems/ems.validation";
// import { Formik } from "formik";
// import InputBox from "@/components/Helpers/InputBox";
// import PrimaryButton from "@/components/Helpers/Button";
// import goBack from "@/utils/helper";
// import { usePathname, useRouter } from "next/navigation";
// import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
// import Button from "@/components/global/atoms/Button";

// const EmpLoanDetails: React.FC<
//   EmployeeDetailsProps<EmployeeLoanDetailsType>
// > = (props) => {
//   const pathName = usePathname();
//   const router = useRouter();


//   const handleSubmitFormik = (
//     values: EmployeeLoanDetailsType,
//     { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
//   ) => {
//     if (typeof window !== "undefined") {
//       const formData = { ...values };

//       sessionStorage.setItem("emp_join_details", JSON.stringify(formData));
//       setSubmitting(false);

//       if (props.setData) {
//         props.setData("emp_join_details", formData);
//       }
//       router.push(`${pathName}?page=11`);
//     }
//   };

//   const initialValues =
//     typeof window !== "undefined"
//       ? sessionStorage.getItem("emp_join_details")
//         ? JSON.parse(sessionStorage.getItem("emp_join_details") ?? "{}")
//         : initialEmployeeLoanDetails
//       : initialEmployeeLoanDetails;

//   const [tabIndex, setTabIndex] = useState<number>(1);
//   const [innerTabIndex, setInnerTabIndex] = useState<number>(1);

//   const [additionalForms, setAdditionalForms] = useState<Array<number>>([1]);
//   const [additionalForms2, setAdditionalForms2] = useState<Array<number>>([1]);

//   const handleAddMore = () => {
//     if (additionalForms.length < 6) {
//       setAdditionalForms((prevForms) => [...prevForms, prevForms.length + 1]);

//     }
//   };

//   const handleAddMoreRecovery = () => {
//     if (additionalForms.length < 6) {
//       setAdditionalForms2((prevForms) => [...prevForms, prevForms.length + 1]);

//     }
//   };

//   const [data, setData] = useState([
//     {
//       key: "1"
//     }

//   ])

//   const [state, setState] = useState([])
//   const [idx, setIdx] = useState(0);

//   console.log("first", state)

//   return (
//     <>
//       <SubHeading className="text-[20px] py-4">
//         Employee Loan & Advance Information
//       </SubHeading>

//       <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
//         <div className="flex-all-center ">
//           <input
//             id="accounting"
//             type="radio"
//             onChange={() => setTabIndex(1)}
//             name="radio-1"
//             className="radio border border-zinc-600"
//             defaultChecked
//           />
//           <label htmlFor="accounting" className=" cursor-pointer">
//             Loan Details
//           </label>
//         </div>

//         <div className="flex-all-center ">
//           <input
//             id="function"
//             onChange={() => setTabIndex(2)}
//             type="radio"
//             name="radio-1"
//             className="radio  border-zinc-600"
//           />
//           <label htmlFor="function" className=" cursor-pointer">
//             Recovery Details
//           </label>
//         </div>
//       </div>

//       {data.map((item, index) => 
//       <Formik

//         initialValues={initialValues}
//         onSubmit={(values: any) => {
//           setState((prev: any) => [...prev, { ...values }])
//           sessionStorage.setItem("emp_join_details", JSON.stringify(state));

//           setIdx(idx+1);
//         }}


//       >
//         {({
//           values,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           handleReset,
//         }) => (
//           <form id={`xyz${index}`} onSubmit={handleSubmit}>
//             {tabIndex === 1 &&
//               additionalForms.map((formIndex, arrayIndex: number) => (
//                 <div
//                   key={arrayIndex}
//                   className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 mt-4 "
//                 >
//                   <SelectForNoApi
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.loan_name}
//                     label="Loan Name"
//                     name="loan_name"
//                     placeholder={"Please Select"}
//                     options={[
//                       { id: 1, name: "loan 1" },
//                       { id: 2, name: "loan 2" },
//                     ]}
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.loan_account_num}
//                     label="Loan Account Number"
//                     placeholder="Enter Loan Account Number"
//                     name="loan_account_num"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.sanc_order_num}
//                     label="Sanc Order Number"
//                     placeholder="Enter Sanc Order Number"
//                     name="sanc_order_num"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dos}
//                     label="Date of Sanction"
//                     name="dos"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.san_authority}
//                     label="Sanctioning Authority"
//                     placeholder="Enter Sanctioning Authority"
//                     name="san_authority"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dod}
//                     label="Date of Disbursement"
//                     name="dod"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.dis_treasury_name}
//                     label="Disbursing Treasury Name"
//                     placeholder="Enter Disbursing Treasury Name"
//                     name="dis_treasury_name"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.voucher_date}
//                     label="Voucher Date"
//                     name="voucher_date"
//                     type="date"
//                   />
//                   <InputBox
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.treasury_voc_num}
//                     label="Treasury Voucher Number"
//                     placeholder="Enter Treasury Voucher Number"
//                     name="treasury_voc_num"
//                   />



//                 </div>
//               ))}

//             {tabIndex === 2 &&
//               additionalForms2.map((formIndex, arrayIndexRec , arrayIndex) => (
//                 <>
//                   <div className="flex items-center gap-12 text-secondary mt-4 mb-8">
//                     <div className="flex-all-center">
//                       <input
//                         id="principal"
//                         type="radio"
//                         onChange={() => setInnerTabIndex(1)}
//                         name="inner-radio-2"
//                         className="radio border border-zinc-600"
//                         defaultChecked
//                       />
//                       <label htmlFor="principal" className="cursor-pointer">
//                         Principal Component
//                       </label>
//                     </div>

//                     <div className="flex-all-center">
//                       <input
//                         id="recovery"
//                         onChange={() => setInnerTabIndex(2)}
//                         type="radio"
//                         name="inner-radio-2"
//                         className="radio border-zinc-600"
//                       />
//                       <label htmlFor="recovery" className="cursor-pointer">
//                         Recovery Details
//                       </label>
//                     </div>
//                   </div>

//                   {innerTabIndex === 1 && (
//                     <div key={arrayIndex}
//                     className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
//                       <SelectForNoApi
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.loan_name_principal}
//                         label="Loan Name"
//                         name="loan_name_principal"
//                         placeholder={"Please Select"}
//                         options={[
//                           { id: 1, name: "loan 1" },
//                           { id: 2, name: "loan 2" },
//                         ]}
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.tot_amt_released}
//                         label="Loan Amount Released (Rs)"
//                         placeholder="Enter Loan Amount Released(Rs)"
//                         name="tot_amt_released"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.total_install}
//                         label="Total Installment Fixed(Rs)"
//                         placeholder="Enter Total Installment Fixed(Rs)"
//                         name="total_install"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.monthly_install}
//                         label="Monthly Installment Amount(Rs)"
//                         placeholder="Enter Monthly Installment Amount(Rs)"
//                         name="monthly_install"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.last_paid_install}
//                         label="Last Paid Installment Number"
//                         placeholder="Last Paid Installment Number"
//                         name="last_paid_install"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.month_last_install}
//                         label="Month In Which last Installment was paid"
//                         name="month_last_install"
//                         type="date"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.total_amnt}
//                         label="Total Amount Paid Towards Principal(Rs)"
//                         placeholder="Enter Total Amount Paid Towards Principal(Rs)"
//                         name="total_amnt"
//                       />
//                     </div>
//                   )}

//                   {innerTabIndex === 2 && (
//                     <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
//                       <SelectForNoApi
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.loan_name_recovery}
//                         label="Loan Name"
//                         name="loan_name_recovery"
//                         placeholder={"Please Select"}
//                         options={[
//                           { id: 1, name: "loan 1" },
//                           { id: 2, name: "loan 2" },
//                         ]}
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.total_int_amount}
//                         label=" Total Interest Amount To Be Recovered (Rs)"
//                         placeholder="Enter Total Interest Amount To Be Recovered (Rs)"
//                         name="total_int_amount"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.total_install_recovery}
//                         label="Total No. Of Installments"
//                         placeholder="Enter Total No. Of Installments"
//                         name="total_install_recovery"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.monthly_install_recovery}
//                         label="Monthly Installment Amount(Rs)"
//                         placeholder="Enter Monthly Installment Amount(Rs)"
//                         name="monthly_install_recovery"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.last_paid_install_recovery}
//                         label="Last paid Installment Number."
//                         placeholder="Enter Last paid Installment Number."
//                         name="last_paid_install_recovery"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.month_last_install_recovery}
//                         label="Month In Which last Installment was paid"
//                         placeholder="Enter Month In Which last Installment was paid"
//                         name="month_last_install_recovery"
//                         type="date"
//                       />
//                       <InputBox
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.total_amnt_recovery}
//                         label="Total Amount Paid Towards Interest(Rs)"
//                         placeholder="Enter Total Amount Paid Towards Interest(Rs)"
//                         name="total_amnt_recovery"
//                       />
//                     </div>
//                   )}

//                   {arrayIndexRec === additionalForms2.length - 1 && (
//                     <div className="flex items-center justify-end mt-5 gap-5">
//                       <PrimaryButton
//                         buttonType="button"
//                         onClick={handleAddMoreRecovery}
//                         variant="primary"
//                       >
//                         +Add More
//                       </PrimaryButton>
//                     </div>
//                   )}
//                 </>
//               ))}


//           </form>
//         )}
//       </Formik>)}

//       <div className="flex items-center justify-end mt-5 gap-5">
//         <button form={`xyz${idx}`} type="submit" 
//         onClick={() => setData((prev) => [...prev, {key: "2"}])}
//         >+Add more</button>

//       </div>
//       <div className="flex items-center justify-end mt-5 gap-5">
//         <PrimaryButton
//           buttonType="button"
//           variant={"cancel"}
//           onClick={goBack}
//         >
//           Back
//         </PrimaryButton>

//         {/* <PrimaryButton
//           onClick={handleReset}
//           buttonType="button"
//           variant={"cancel"}
//         >
//           Reset
//         </PrimaryButton> */}

//         <PrimaryButton buttonType="submit" variant="primary">
//           Next
//         </PrimaryButton>
//       </div>
//     </>
//   );
// };

// export default EmpLoanDetails;















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
import { initialEmployeeLoanDetails } from "@/utils/validation/Ems/ems.validation";
import { Formik } from "formik";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
import Button from "@/components/global/atoms/Button";

const EmpLoanDetails: React.FC<
  EmployeeDetailsProps<EmployeeLoanDetailsType>
> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
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
  const [formPrincipalFields, setFormPrincipalFields] = useState([getInitialPrincipalFormData()]);
  const [formRecoveryFields, setFormRecoveryFields] = useState([getInitialRecoveryFormData()]);

  const handleInputChange = (fieldName: any, value: any, index: any) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };

  const handleInputPrincipalChange = (fieldName: any, value: any, index: any) => {
    setFormPrincipalFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };


  const handleInputRecoveryChange = (fieldName: any, value: any, index: any) => {
    setFormRecoveryFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][fieldName] = value;
      return updatedFields;
    });
  };


  // const saveDataToSessionStorage = () => {
  //   if (typeof window !== "undefined") {
  //     sessionStorage.setItem("emp_loan_details", JSON.stringify(formFields, formPrincipalFields));

  //     if (props.setData) {
  //       props.setData("emp_loan_details", formFields as any);
  //     }
  //   }
  // };

  const saveDataToSessionStorage = () => {
    if (typeof window !== "undefined") {

      sessionStorage.setItem("emp_loan_details", JSON.stringify(formFields));
      sessionStorage.setItem("emp_principal_details", JSON.stringify(formPrincipalFields));
      sessionStorage.setItem("emp_recovery_details", JSON.stringify(formRecoveryFields));

      if (props.setData) {
        props.setData("emp_loan_details", formFields as any);
        props.setData("emp_principal_details", formPrincipalFields as any);
        props.setData("emp_recovery_details", formRecoveryFields as any);
      }
    }
  };


  const addRow = () => {
    saveDataToSessionStorage();
    setFormFields((prevFields) => [...prevFields, getInitialFormData()]);
    setFormPrincipalFields((prevFields) => [...prevFields, getInitialPrincipalFormData()]);
    setFormRecoveryFields((prevFields) => [...prevFields, getInitialRecoveryFormData()]);
  };

  const handleSubmitFormik = () => {

  }

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
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => (
          <form onSubmit={handleSubmit}>

            {tabIndex === 1 && (
              <>
                {formFields.map((field, index) => (

                  <div key={index} className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 mt-4">
                    <SelectForNoApi
                      onBlur={handleBlur}
                      value={field.loan_name_det}
                      label="Loan Name"
                      name="loan_name_det"
                      placeholder={"Please Select"}
                      options={[
                        { id: 1, name: "loan 1" },
                        { id: 2, name: "loan 2" },
                      ]}
                      onChange={(e: any) => handleInputChange("loan_name_det", e.target.value, index)}

                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.loan_account_num}
                      label="Loan Account Number"
                      placeholder="Enter Loan Account Number"
                      name="loan_account_num"
                      type="number"
                      onChange={(e: any) => handleInputChange("loan_account_num", e.target.value, index)}
                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.sanc_order_num}
                      label="Sanc Order Number"
                      placeholder="Enter Sanc Order Number"
                      name="sanc_order_num"
                      onChange={(e: any) => handleInputChange("sanc_order_num", e.target.value, index)}

                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.dos}
                      label="Date of Sanction"
                      name="dos"
                      type="date"
                      onChange={(e: any) => handleInputChange("dos", e.target.value, index)}

                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.san_authority}
                      label="Sanctioning Authority"
                      placeholder="Enter Sanctioning Authority"
                      name="san_authority"
                      onChange={(e: any) => handleInputChange("san_authority", e.target.value, index)}

                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.dod}
                      label="Date of Disbursement"
                      name="dod"
                      type="date"
                      onChange={(e: any) => handleInputChange("dod", e.target.value, index)}

                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.dis_treasury_name}
                      label="Disbursing Treasury Name"
                      placeholder="Enter Disbursing Treasury Name"
                      name="dis_treasury_name"
                      onChange={(e: any) => handleInputChange("loan_name", e.target.value, index)}

                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.voucher_date}
                      label="Voucher Date"
                      name="voucher_date"
                      type="date"
                      onChange={(e: any) => handleInputChange("voucher_date", e.target.value, index)}

                    />
                    <InputBox
                      onBlur={handleBlur}
                      value={field.treasury_voc_num}
                      label="Treasury Voucher Number"
                      placeholder="Enter Treasury Voucher Number"
                      name="treasury_voc_num"
                      onChange={(e: any) => handleInputChange("treasury_voc_num", e.target.value, index)}
                      type="number"

                    />
                  </div>
                ))}

              </>
            )}

            {tabIndex === 2 && (
              <>
                {
                  formFields.map((fields, index) => (
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
                        {innerTabIndex === 1 && (
                          <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">

                            <SelectForNoApi
                              onBlur={handleBlur}
                              value={(fields as any).loan_name_principal}
                              onChange={(e: any) => handleInputPrincipalChange("loan_name_principal", e.target.value, index)}
                              label="Loan Name"
                              name="loan_name_principal"
                              placeholder={"Please Select"}
                              options={[
                                { id: 1, name: "loan 1" },
                                { id: 2, name: "loan 2" },
                              ]}
                            />
                            <InputBox
                              value={(fields as any).tot_amt_released}
                              onChange={(e: any) => handleInputPrincipalChange("tot_amt_released", e.target.value, index)}
                              onBlur={handleBlur}
                              label="Loan Amount Released (Rs)"
                              placeholder="Enter Loan Amount Released(Rs)"
                              name="tot_amt_released"
                              type="number"
                            />
                            <InputBox
                              value={(fields as any).total_install}
                              onChange={(e: any) => handleInputPrincipalChange("total_install", e.target.value, index)}
                              onBlur={handleBlur}
                              label="Total Installment Fixed(Rs)"
                              placeholder="Enter Total Installment Fixed(Rs)"
                              name="total_install"
                              type="number"

                            />
                            <InputBox
                              value={(fields as any).monthly_install}
                              onChange={(e: any) => handleInputPrincipalChange("monthly_install", e.target.value, index)} onBlur={handleBlur}
                              label="Monthly Installment Amount(Rs)"
                              placeholder="Enter Monthly Installment Amount(Rs)"
                              name="monthly_install"
                              type="number"

                            />
                            <InputBox
                              value={(fields as any).last_paid_install}
                              onChange={(e: any) => handleInputPrincipalChange("last_paid_install", e.target.value, index)}
                              onBlur={handleBlur}
                              label="Last Paid Installment Number"
                              placeholder="Last Paid Installment Number"
                              name="last_paid_install"
                              type="number"

                            />
                            <InputBox
                              value={(fields as any).month_last_install}
                              onChange={(e: any) => handleInputPrincipalChange("month_last_install", e.target.value, index)}
                              onBlur={handleBlur}
                              label="Month In Which last Installment was paid"
                              name="month_last_install"
                              type="date"

                            />
                            <InputBox
                              value={(fields as any).total_amnt}
                              onChange={(e: any) => handleInputPrincipalChange("total_amnt", e.target.value, index)} onBlur={handleBlur}
                              label="Total Amount Paid Towards Principal(Rs)"
                              placeholder="Enter Total Amount Paid Towards Principal(Rs)"
                              name="total_amnt"
                              type="number"

                            />
                          </div>
                        )}
                        {innerTabIndex === 2 && (
                          <div className="grid grid-cols-2 2xl:grid-cols-2 gap-x-6 gap-4 ">
                            <SelectForNoApi
                              onBlur={handleBlur}
                              value={(fields as any).loan_name_recovery}
                              onChange={(e: any) => handleInputRecoveryChange("loan_name_recovery", e.target.value, index)}
                              label="Loan Name"
                              name="loan_name_recovery"
                              placeholder={"Please Select"}
                              options={[
                                { id: 1, name: "loan 1" },
                                { id: 2, name: "loan 2" },
                              ]}
                            />
                            <InputBox
                              value={(fields as any).total_int_amount}
                              onChange={(e: any) => handleInputRecoveryChange("total_int_amount", e.target.value, index)}
                              onBlur={handleBlur}
                              label=" Total Interest Amount To Be Recovered (Rs)"
                              placeholder="Enter Total Interest Amount To Be Recovered (Rs)"
                              name="total_int_amount"
                              type="number"
                            />
                            <InputBox
                              value={(fields as any).total_install_recovery}
                              onChange={(e: any) => handleInputRecoveryChange("total_install_recovery", e.target.value, index)} onBlur={handleBlur}
                              label="Total No. Of Installments"
                              placeholder="Enter Total No. Of Installments"
                              name="total_install_recovery"
                              type="number"

                            />
                            <InputBox
                              value={(fields as any).monthly_install_recovery}
                              onChange={(e: any) => handleInputRecoveryChange("monthly_install_recovery", e.target.value, index)} onBlur={handleBlur}
                              label="Monthly Installment Amount(Rs)"
                              placeholder="Enter Monthly Installment Amount(Rs)"
                              name="monthly_install_recovery"
                              type="number"

                            />
                            <InputBox
                              value={(fields as any).last_paid_install_recovery}
                              onChange={(e: any) => handleInputRecoveryChange("last_paid_install_recovery", e.target.value, index)} onBlur={handleBlur}
                              label="Last paid Installment Number."
                              placeholder="Enter Last paid Installment Number."
                              name="last_paid_install_recovery"
                              type="number"

                            />
                            <InputBox
                              value={(fields as any).month_last_install_recovery}
                              onChange={(e: any) => handleInputRecoveryChange("month_last_install_recovery", e.target.value, index)} onBlur={handleBlur}
                              label="Month In Which last Installment was paid"
                              placeholder="Enter Month In Which last Installment was paid"
                              name="month_last_install_recovery"
                              type="date"
                            />
                            <InputBox
                              value={(fields as any).total_amnt_recovery}
                              onChange={(e: any) => handleInputRecoveryChange("total_amnt_recovery", e.target.value, index)} onBlur={handleBlur}
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

            <div className="w-full flex items-center justify-end mt-3">
              <Button onClick={addRow} buttontype="button" variant="primary_rounded">
                Add
              </Button>
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

export default EmpLoanDetails;

