// "use client";
// import { useState } from "react";
// import PrimaryButton from "@/components/Helpers/Button";
// import { SubHeading, InnerHeading } from "@/components/Helpers/Heading"; // Added InnerHeading import
// import BackButton from "@/components/Helpers/Widgets/BackButton";
// import Input from "@/components/global/atoms/Input";
// // import { HRMS_URL } from "@/utils/api/urls";
// import axios from "@/lib/axiosConfig";
// // import { useRouter } from "next/router";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect } from "react";
// // import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom

// const Statement = () => {
//   const router = useSearchParams();
//   const [data, setData] = useState();
//   const id = router.get("id");
//   console.log(id, "id");
//   //   const history = useHistory(); // Initialize useHistory

//   const goBack = () => {
//     // history.goBack();
//     console.log("Go back function");
//   };

//   const getRecordById = async () => {
//     try {
//       // const employeeId = rowData.employee_id;
//       const res = await axios({
//         url: `/pension/statement`,
//         method: "GET",
//         data: {},
//       });
//       console.log("getAllLeaveEncashhmentById", res);
//     } catch (error) {
//       console.error("Error fetching record by ID:", error);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getRecordById(); // Fetch the record when the component mounts
//     }
//   }, [id]);

//   return (
//     <>
//       <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
//         <BackButton />
//         <div>
//           <SubHeading className="mx-5 my-5 mb-0 text-4xl">
//             Pension Management
//           </SubHeading>
//         </div>
//       </div>

//       <div className=" p-10 shadow-xl">
//         <form>
//           <div className="shadow-md p-10">
//             <InnerHeading>
//               Statement showing the pay drawn during the 12 month :
//             </InnerHeading>

//             <div className="overflow-x-auto">
//               <table className="table-auto w-full mt-10">
//                 <thead>
//                   <tr>
//                     {/* {COLUMS_EMP_PAY_DRAW_DETAILS.map((item, index) => ( */}
//                     <th key={1} className="px-4 py-2 text-left">
//                       MONTH
//                     </th>
//                     <th key={2} className="px-4 py-2 text-left">
//                       YEAR
//                     </th>
//                     <th key={3} className="px-4 py-2 text-left">
//                       YEAR NO OF DAYS
//                     </th>
//                     <th key={4} className="px-4 py-2 text-left">
//                       RS
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {data.map((item, index) => (
//                     <React.Fragment key={index}>
//                       <tr className=" border-b">
//                         <td className=" px-4 py-2 text-left">NO OF DAYS</td>
//                         <td className=" px-4 py-2 text-left"></td>
//                         <td className=" px-4 py-2 text-left"></td>
//                         <td className=" px-4 py-2 text-left"></td>
//                       </tr>
//                       <tr className=" border-b">
//                         <td className=" px-4 py-2 text-left">January</td>
//                         <td className=" px-4 py-2 text-left">1</td>
//                         <td className=" px-4 py-2 text-left">2</td>
//                         <td className=" px-4 py-2 text-left">3</td>
//                       </tr>
                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">February</td>
                      //   <td className=" px-4 py-2 text-left">
                      //     {item.data.data}
                      //   </td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">March</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">April</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">May</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">July</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">August</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">September</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">October</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">November</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>

                      // <tr className=" border-b">
                      //   <td className=" px-4 py-2 text-left">December</td>
                      //   <td className=" px-4 py-2 text-left">1</td>
                      //   <td className=" px-4 py-2 text-left">2</td>
                      //   <td className=" px-4 py-2 text-left">3</td>
                      // </tr>
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//               <div>
//                 <div className="w-full">
//                   <div className="md:w-full border-r-2 ">
//                     <div className="m-5">
//                       <div className="flex flex-col mt-4 text-center">
//                         <span className="text-center text-red-400"></span>
//                       </div>
//                       <div className="mb-6">
//                         <div className="grid grid-cols-2 gap-x-6 gap-4 ">
//                           <>
//                             <Input label="Total Year of service" value="" />
//                             <Input label="Date of Last Working" value="" />
//                             <Input label="Gratuity Amount" value="" />
//                             {/* <Input
//                               label="cover under the gratuity amount"
//                               value=""
//                             /> */}
//                             <div className="mt-5">
//                               <div>
//                                 <label>cover under the gratuity amount</label>
//                               </div>
//                               <div className="flex flex-row gap-4">
//                                 <div className="flex items-center mt-1">
//                                   <input
//                                     type="checkbox"
//                                     id="checkbox1"
//                                     name="checkbox1"
//                                     className="mr-2"
//                                   />
//                                   <label htmlFor="checkbox1">Yes</label>
//                                 </div>
//                                 <div className="flex items-center mt-1">
//                                   <input
//                                     type="checkbox"
//                                     id="checkbox2"
//                                     name="checkbox2"
//                                     className="mr-2"
//                                   />
//                                   <label htmlFor="checkbox2">NO</label>
//                                 </div>
//                               </div>
//                             </div>
//                           </>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-end mt-5 gap-5">
//             <PrimaryButton
//               buttonType="button"
//               variant={"cancel"}
//               onClick={goBack}
//             >
//               Reject
//             </PrimaryButton>

//             <PrimaryButton buttonType="submit" variant="primary">
//               Approve
//             </PrimaryButton>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Statement;
"use client";
import { useState } from "react";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading, InnerHeading } from "@/components/Helpers/Heading";
import BackButton from "@/components/Helpers/Widgets/BackButton";
import Input from "@/components/global/atoms/Input";
import axios from "@/lib/axiosConfig";
import { useRouter } from "next/router"; // Corrected import statement
import React, { useEffect } from "react";
// import { useRouter } from "next/router";

const Statement = () => {
  const router = useRouter(); // Fixed typo in variable name
  const [data, setData] = useState([]);
  const id = router.query.id; // Use router.query.id to get the id from query parameters

  const goBack = () => {
    console.log("Go back function");
  };

  const getRecordById = async () => {
    try {
      const res = await axios({
        url: `/pension/statement`,
        method: "GET",
        data: {},
      });
      console.log("getAllLeaveEncashhmentById", res);
      setData(res.data); // Assuming res.data contains the data to be displayed
    } catch (error) {
      console.error("Error fetching record by ID:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getRecordById();
    }
  }, [id]);

  return (
    <>
      <div className="flex items-end justify-between border-b-2 pb-7 mb-10">
        <BackButton />
        <div>
          <SubHeading className="mx-5 my-5 mb-0 text-4xl">
            Pension Management
          </SubHeading>
        </div>
      </div>

      <div className=" p-10 shadow-xl">
        <form>
          <div className="shadow-md p-10">
            <InnerHeading>
              Statement showing the pay drawn during the 12 month :
            </InnerHeading>

            <div className="overflow-x-auto">
              <table className="table-auto w-full mt-10">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">MONTH</th>
                    <th className="px-4 py-2 text-left">YEAR</th>
                    <th className="px-4 py-2 text-left">YEAR NO OF DAYS</th>
                    <th className="px-4 py-2 text-left">RS</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">NO OF DAYS</td>
                        <td className=" px-4 py-2 text-left"></td>
                        <td className=" px-4 py-2 text-left"></td>
                        <td className=" px-4 py-2 text-left"></td>
                      </tr>
                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">January</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>
                      {/* Add the rest of the months here */}
                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">February</td>
                        <td className=" px-4 py-2 text-left">
                        
                        </td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">March</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">April</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">May</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">July</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">August</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">September</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">October</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">November</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>

                      <tr className=" border-b">
                        <td className=" px-4 py-2 text-left">December</td>
                        <td className=" px-4 py-2 text-left">1</td>
                        <td className=" px-4 py-2 text-left">2</td>
                        <td className=" px-4 py-2 text-left">3</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div>
                <div className="w-full">
                  <div className="md:w-full border-r-2 ">
                    <div className="m-5">
                      <div className="flex flex-col mt-4 text-center">
                        <span className="text-center text-red-400"></span>
                      </div>
                      <div className="mb-6">
                        <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                          <>
                            <Input label="Total Year of service" value="" />
                            <Input label="Date of Last Working" value="" />
                            <Input label="Gratuity Amount" value="" />
                            <div className="mt-5">
                              <div>
                                <label>cover under the gratuity amount</label>
                              </div>
                              <div className="flex flex-row gap-4">
                                <div className="flex items-center mt-1">
                                  <input
                                    type="checkbox"
                                    id="checkbox1"
                                    name="checkbox1"
                                    className="mr-2"
                                  />
                                  <label htmlFor="checkbox1">Yes</label>
                                </div>
                                <div className="flex items-center mt-1">
                                  <input
                                    type="checkbox"
                                    id="checkbox2"
                                    name="checkbox2"
                                    className="mr-2"
                                  />
                                  <label htmlFor="checkbox2">NO</label>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end mt-5 gap-5">
            <PrimaryButton
              buttonType="button"
              variant={"cancel"}
              onClick={goBack}
            >
              Reject
            </PrimaryButton>

            <PrimaryButton buttonType="submit" variant="primary">
              Approve
            </PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Statement;
