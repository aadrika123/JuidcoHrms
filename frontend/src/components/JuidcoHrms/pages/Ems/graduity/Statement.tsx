"use client";
import { useState } from "react";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading, InnerHeading } from "@/components/Helpers/Heading"; // Added InnerHeading import
import BackButton from "@/components/Helpers/Widgets/BackButton";
import Input from "@/components/global/atoms/Input";
// import { HRMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
// import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import { useRouter } from "next/navigation";

const Statement = () => {
  const router = useSearchParams();
  const [data, setData] = useState<any>([]);
  const [state, setState] = useState({
    totalDays: 0,
    totalAmount: 0,
  });
  const id = router.get("id");
  // const dor = new Date(router.get("dor");
  console.log(id, "id");
  // const history = useHistory(); // Initialize useHistory
  const navigate = useRouter();

  const goBack = () => {
    // history.goBack();
    navigate.replace("/pension/gratuity_form");
    console.log("Go back function");
  };

  const getRecordById = async () => {
    try {
      // const employeeId = rowData.employee_id;
      const res = await axios({
        url: `/pension/statement`,
        method: "GET",
        data: {},
      });
      setData(res.data.data.data);
      console.log(res.data.data.data)

      let tDays = 0;
      let tAmount = 0;
      res.data.data.data.forEach((item: any) => {
        tDays = Number(item.no_of_days_present) + tDays;
        tAmount = item.net_pay + tAmount;
      });

      setState({ ...state, totalDays: tDays, totalAmount: tAmount });
    } catch (error) {
      console.error("Error fetching record by ID:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getRecordById(); // Fetch the record when the component mounts
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
                    {/* {COLUMS_EMP_PAY_DRAW_DETAILS.map((item, index) => ( */}
                    <th key={1} className="px-4 py-2 text-left">
                      MONTH
                    </th>
                    <th key={2} className="px-4 py-2 text-left">
                      YEAR
                    </th>
                    <th key={3} className="px-4 py-2 text-left">
                      YEAR NO OF DAYS
                    </th>
                    <th key={4} className="px-4 py-2 text-left">
                      RS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* {data.map((item, index) => ( */}
                  {/* <React.Fragment key={index}> */}
                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">NO OF DAYS</td>
                    <td className=" px-4 py-2 text-left">{data[0]?.year}</td>
                    <td className=" px-4 py-2 text-left">{state.totalDays}</td>
                    <td className=" px-4 py-2 text-left">
                      {state.totalAmount}
                    </td>
                  </tr>
                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">January</td>
                    <td className=" px-4 py-2 text-left">{data[0]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[0]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[0]?.net_pay}</td>
                  </tr>
                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">February</td>
                    <td className=" px-4 py-2 text-left">{data[1]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[1]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[1]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">March</td>
                    <td className=" px-4 py-2 text-left"> {data[2]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[2]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[2]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">April</td>
                    <td className=" px-4 py-2 text-left"> {data[3]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[3]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[3]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">May</td>
                    <td className=" px-4 py-2 text-left">{data[4]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[4]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[4]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">June</td>
                    <td className=" px-4 py-2 text-left">{data[5]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[5]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[5]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">July</td>
                    <td className=" px-4 py-2 text-left">{data[6]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[6]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[6]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">August</td>
                    <td className=" px-4 py-2 text-left">{data[7]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[7]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[7]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">September</td>
                    <td className=" px-4 py-2 text-left">{data[8]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[8]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[8]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">October</td>
                    <td className=" px-4 py-2 text-left">{data[9]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[9]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">{data[9]?.net_pay}</td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">November</td>
                    <td className=" px-4 py-2 text-left">{data[10]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[10]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">
                      {data[10]?.net_pay}
                    </td>
                  </tr>

                  <tr className=" border-b">
                    <td className=" px-4 py-2 text-left">December</td>
                    <td className=" px-4 py-2 text-left">{data[11]?.year}</td>
                    <td className=" px-4 py-2 text-left">
                      {data[11]?.no_of_days_present}
                    </td>
                    <td className=" px-4 py-2 text-left">
                      {data[11]?.net_pay}
                    </td>
                  </tr>
                  {/* </React.Fragment>
                  ))} */}
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
                            <Input label="Total Year of service" />
                            <Input label="Date of Last Working" type="date" />
                            <Input label="Gratuity Amount" />
                            {/* <Input
                              label="cover under the gratuity amount"
                              value=""
                            /> */}
                            <div className="mt-5">
                              <div>
                                <label>cover under the gratuity amount</label>
                              </div>
                              <div className="flex flex-row gap-4">
                                <div className="flex items-center mt-1">
                                  {/* <input
                                    type="checkbox"
                                    id="checkbox1"
                                    name="checkbox1"
                                    className="mr-2"
                                  />
                                  <label htmlFor="checkbox1">Yes</label>
                                </div> */}
                                  {/* <div className="flex items-center mt-1"> */}
                                  <input
                                    className="mr-2"
                                    type="radio"
                                    id="html"
                                    name="fav_language"
                                    value="Yes"
                                  />
                                  <label htmlFor="html">Yes</label>
                                  <input
                                    className="mr-2"
                                    type="radio"
                                    id="css"
                                    name="fav_language"
                                    value="CSS"
                                  />
                                <label htmlFor="css">No</label>
                                  {/* <input
                                    type="checkbox"
                                    id="checkbox2"
                                    name="checkbox2"
                                    className="mr-2"
                                  />
                                  <label htmlFor="checkbox2">NO</label> */}
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

            <PrimaryButton
              onClick={goBack}
              buttonType="button"
              variant="primary"
            >
              Approve
            </PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Statement;
