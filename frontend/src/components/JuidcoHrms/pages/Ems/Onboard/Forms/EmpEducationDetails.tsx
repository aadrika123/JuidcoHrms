/***
 * Author: Jaideep
 * Status: Open
 * Uses: Employee Education details & Employee Training Information - Employee Education page
 */

"use client";

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import TableFormContainer, {
  COLUMNS,
} from "@/components/global/organisms/TableFormContainer";
import Button from "@/components/global/atoms/Button";
import { EmployeeDetailsProps, EmployeeEducationDetailsType } from "@/utils/types/employee.type";

const EmpEducationDetails: React.FC<
  EmployeeDetailsProps<EmployeeEducationDetailsType>
> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [employeeEducationDetails, setEmployeeEducationDetails] = useState([]);
  const pathName = usePathname();
  const router = useRouter();

  const getInitialFormData: any = () => ({
    name_of_training: "",
    training_type: "",
    name_of_inst: "",
    starting_from: "",
    end_to: "",
    tot_day_training: "",
  });

  const [tableData, setTableData] = useState<EmployeeEducationDetailsType[]>([getInitialFormData()]);

  const handleInputChange = (fieldName: string, value: string | number, nestedKey?: string, rowIndex?: number | string) => {
    setTableData((prevFormData) => {
      const updatedData = [...prevFormData];
      if (nestedKey !== undefined && rowIndex !== undefined) {
        if (typeof updatedData[rowIndex][fieldName] !== 'object') {
          updatedData[rowIndex][fieldName] = { [nestedKey]: value };
        } else {
          updatedData[rowIndex][fieldName][nestedKey] = value;
        }
      } else {
        updatedData[rowIndex][fieldName] = value;
      }
      return updatedData;
    });
  };


  // const handleSubmitForm = (values: any) => {
  //   if (typeof window !== "undefined") {
  //     sessionStorage.setItem("emp_education_details", JSON.stringify(values));
  //     sessionStorage.setItem("emp_eduaction_train_details", JSON.stringify(tableData));

  //     if (props.setData) {
  //       props.setData("emp_education_details", values, tabIndex);
  //       // props.setData("emp_timebound_details", tableData as any);

  //     }
  //     router.push(`${pathName}?page=6`);
  //   }
  // };

  const handleSubmitForm = (values: any) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_education_details", JSON.stringify(values));
      sessionStorage.setItem("emp_eduaction_train_details", JSON.stringify(tableData));
  
      if (props.setData) {
        props.setData("emp_education_details", values, tabIndex);
        props.setData("emp_eduaction_train_details", tableData as any);
      }
  
      router.push(`${pathName}?page=6`);
    }
  };
  


  const COLUMNS_FOR_EDUCATION: COLUMNS[] = [
    // {
    //   HEADER: "Education Level*",
    //   ACCESSOR: "edu_level",
    //   isRequired: true

    // },
    {
      HEADER: "Subject/Stream*",
      ACCESSOR: "stream",
      isRequired: true

    },
    {
      HEADER: "Board/University*",
      ACCESSOR: "board",
      isRequired: true

    },
    {
      HEADER: "Passing Year*",
      ACCESSOR: "passing_year",
      isRequired: true

    },
    {
      HEADER: "Marks in %*",
      ACCESSOR: "marks",
      isRequired: true
    },
    {
      HEADER: "Grade/Division*",
      ACCESSOR: "grade",
      isRequired: true


    },
  ];

  const COLUMNS_FOR_EMP_TRNG_INFRM = [
    {
      HEADER: "Name of Training",
      // ACCESSOR: "name_of_training",
      isRequired: true,
      placeholder: "Name of Training"

    },
    {
      HEADER: "Training Type",
      // ACCESSOR: "training_type",
      isRequired: true,
      placeholder: "Name of Institution"
    },

    {
      HEADER: "Name of Institution",
      // ACCESSOR: "name_of_institution",
      isRequired: true,
      placeholder: "Name of Institution"

    },

    {
      HEADER: "Starting From",
      // ACCESSOR: "starting_from",
      isRequired: true,

    },

    {
      HEADER: "End To",
      // ACCESSOR: "end_to",
      isRequired: true,

    },

    {
      HEADER: "Total Days of Training",
      // ACCESSOR: "total_days_of_train",
      isRequired: true,
      placeholder: "Total Days of Training"

    },
  ];


  function getStateData(key: string, values: any, index?: number) {
    setEmployeeEducationDetails((prev: any) => ({ ...prev, [key]: values }));
    setTabIndex(index || tabIndex);
  }

  const addRow = () => {
    // saveDataToSessionStorage();
    setTableData((prevData) => [...prevData, getInitialFormData()]);
  };


  const labels: string[] = ['Metric', 'Inter', 'Grad', 'Post Grad'];

  return (
    <div>
      <SubHeading className="text-[20px] pt-4">Employee Education</SubHeading>

      <TableFormContainer
        columns={COLUMNS_FOR_EDUCATION}
        getData={[]}
        subHeading={" "}
        setData={getStateData}
        session_key="emp_education_data_details"
        labels={labels}

      />


      {/* <div>
        <SubHeading className="text-[20px] pt-4 mb-4">
          Employee Training Information
        </SubHeading>
        <TableFormContainer columns={COLUMNS_FOR_EMP_TRNG_INFRM}
          getData={[]}
          subHeading={" "}
          setData={getStateData}
          session_key="emp_eduaction_training_details"
        />
      </div> */}

      <SubHeading className="text-[20px] pt-4 mt-10 mb-4">
        Employee Training Information
      </SubHeading>
      <div>
        <table>
          <thead className="text-[1rem] bg-primary_green text-white ">
            <tr>
              {COLUMNS_FOR_EMP_TRNG_INFRM?.map((cols, index: number) => (
                <>
                  <th
                    key={index}
                    className={`border  border-zinc-400 p-3 font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
                  >
                    <div className="flex gap-2">
                      <span>{cols.HEADER}</span>
                    </div>
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData: any, rowIndex) => (
              <tr key={rowIndex} className="border py-2 px-4 ">
                {/* <td className="border py-3 px-10 text-center ">
                  <span>{rowIndex + 1}</span>
                </td> */}
                {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, colIndex) => {
                  const stateKey: any = Object.keys(getInitialFormData())[colIndex];
                  return (
                    <td key={colIndex} className="border">
                     {colIndex === 0 ? (
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder={`Enter ${column.placeholder}`}
                          value={rowData[stateKey]}
                          onChange={(e) => handleInputChange(stateKey, e.target.value, undefined, rowIndex)}
                        />
                      ) : null
                      }
                     
                      {colIndex === 1 ? (
                        <select
                          value={rowData[stateKey]}
                          onChange={(e) => handleInputChange(stateKey, e.target.value, undefined, rowIndex)}
                        >
                          <option>Please Select Option</option>
                          <option value="Basic">Basic</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advance">Advance</option>
                        </select>
                      ) : null}


                      {colIndex === 2 ? (
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder={`Enter ${column.placeholder}`}
                          value={rowData[stateKey]}
                          onChange={(e) => handleInputChange(stateKey, e.target.value, undefined, rowIndex)}
                        />
                      ) : null
                      }

                      {colIndex === 3 ? (
                        <div className=' inline-flex items-center pt-1 pb-1 mx-2 my-2'>
                          <React.Fragment>
                            <p className="mr-2">From:</p>
                            <input
                              type="date"
                              className="w-full h-full p-2 bg-transparent border border-gray-300"
                              placeholder="Enter Starting From"
                              onChange={(e) => handleInputChange(stateKey, e.target.value, "from", rowIndex)}
                              value={rowData[stateKey]?.from || ''}
                            />
                          </React.Fragment>
                        </div>
                      ) : null
                      }

                      {colIndex === 4 ? (
                        <div className=' inline-flex items-center pt-1 pb-1 mx-2 my-2'>
                          <React.Fragment>
                            <p className="ml-2 mr-2">To:</p>
                            <input
                              type="date"
                              className="w-full h-full p-2 bg-transparent border border-gray-300"
                              placeholder="Enter End To"
                              onChange={(e) => handleInputChange(stateKey, e.target.value, "to", rowIndex)}
                              value={rowData[stateKey]?.to || ''}
                            />
                          </React.Fragment>
                        </div>
                      ) : null
                      }

                      {colIndex === 5 ? (
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder={`Enter ${column.placeholder}`}
                          value={rowData[stateKey]}
                          onChange={(e) => handleInputChange(stateKey, e.target.value, undefined, rowIndex)}
                        />
                      ) : null
                      }
                    </td>

                    // : (
                    // <input
                    //   type="text"
                    //   className="w-full h-full bg-transparent outline-none"
                    //   placeholder={`Enter ${column.placeholder}`}
                    //   value={colIndex === 0 ? rowIndex + 1 : rowData[stateKey]}
                    //   onChange={(e) => handleInputChange(stateKey, e.target.value, undefined, rowIndex)}
                    // />



                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>

        <div className="w-full flex items-center justify-end mt-3">
          <Button onClick={addRow} buttontype="button" variant="primary_rounded">
            Add
          </Button>
        </div>

      </div>

      <div className="flex items-center justify-end mt-5 gap-5">
        <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
          Back
        </PrimaryButton>

        <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton>

        <PrimaryButton
          onClick={() => handleSubmitForm(employeeEducationDetails)}
          buttonType="submit"
          variant="primary"
        >
          Next
        </PrimaryButton>
      </div>




    </div>
  );
};

export default EmpEducationDetails;