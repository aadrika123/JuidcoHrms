/***
 * Author: Jaideep
 * Status: Open
 * Uses: Employee Education details & Employee Training Information - Employee Education page
 */

"use client";

import React, { useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { usePathname, useRouter } from "next/navigation";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import { EmployeeDetailsProps, EmployeeEducationDetailsType } from "@/utils/types/employee.type";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import Button from "@/components/global/atoms/Button";
import EmpEducationTrainingDetails from "./EmpEducationTrainingDetails";


const EmpEducationDetails: React.FC<
  EmployeeDetailsProps<EmployeeEducationDetailsType>
> = (props) => {

  
  const [tabIndex, setTabIndex] = useState<number>(1);
  const pathName = usePathname();
  const router = useRouter();

  // ----------------------- TABLE COLUMNS --------------------------------//


  const COLUMNS_FOR_EDUCATION = [
    {
      HEADER: "Education Level*",
    },
    {
      HEADER: "Subject/Stream*",
    },

    {
      HEADER: "Board/University*",
    },

    {
      HEADER: "Passing Year*",
    },

    {
      HEADER: "Marks in %*",
    },

    {
      HEADER: "Grade/Division*"
    },
  ];

  const COLUMNS_FOR_EMP_TRNG_INFRM = [
    {
      HEADER: "Name of Training",
    },
    {
      HEADER: "Training Type",
    },

    {
      HEADER: "Name of Institution",
    },

    {
      HEADER: "Starting From",
    },

    {
      HEADER: "End To",
    },

    {
      HEADER: "Total Days of Training",
    },
  ];

  const [formData, setFormData] = useState({
    metric_subject: "",
    metric_board: "",
    metric_passing_yr: "",
    metric_marks: "",
    metric_grade: "",
  });

  const [interData, setInterData] = useState({

    inter_subject: "",
    inter_board: "",
    inter_passing_yr: "",
    inter_marks: "",
    inter_grade: "",

  });

  const [gradData, setGradData] = useState({
    grad_subject: "",
    grad_board: "",
    grad_passing_yr: "",
    grad_marks: "",
    grad_grade: "",

  });


  const [pgradData, setPGradData] = useState({
    post_grad_subject: "",
    post_grad_board: "",
    post_grad_passing_yr: "",
    post_grad_marks: "",
    post_grad_grade: "",

  });

  const [empTrainInf, setEmpTrainInf] = useState({
    name_of_training: "",
    training_type: "",
    name_of_inst: "",
    starting_from: "",
    end_to: "",
    tot_day_training: "",
  })

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleIntermediateChange = (fieldName: string, value: string) => {
    setInterData((prevInterData) => ({
      ...prevInterData,
      [fieldName]: value,
    }));
  };

  const handleGradChange = (fieldName: string, value: string) => {
    setGradData((prevGradData) => ({
      ...prevGradData,
      [fieldName]: value,
    }));
  };

  const handlePGradChange = (fieldName: string, value: string) => {
    setPGradData((prevPGradData) => ({
      ...prevPGradData,
      [fieldName]: value,
    }));
  };


  const handleEmpTrainChange = (fieldName: string, value: string) => {
    setEmpTrainInf((prevEmpTrainData) => ({
      ...prevEmpTrainData,
      [fieldName]: value,
    }));
  };

  const saveDataToSessionStorage = () => {
    if (typeof window !== "undefined") {
      const existingEducationDataString = sessionStorage.getItem("emp_education_details");
      const existingEducationData = existingEducationDataString ? JSON.parse(existingEducationDataString) : [];

      const newEducationDetailsData = {
        inter_subject: interData.inter_subject,
        inter_board: interData.inter_board,
        inter_passing_yr: interData.inter_passing_yr,
        inter_marks: interData.inter_marks,
        inter_grade: interData.inter_grade,
        metric_subject: formData.metric_subject,
        metric_board: formData.metric_board,
        metric_passing_yr: formData.metric_passing_yr,
        metric_marks: formData.metric_marks,
        metric_grade: formData.metric_grade,
        grad_subject: gradData.grad_subject,
        grad_board: gradData.grad_board,
        grad_passing_yr: gradData.grad_passing_yr,
        grad_marks: gradData.grad_marks,
        grad_grade: gradData.grad_grade,
        post_grad_subject: pgradData.post_grad_subject,
        post_grad_board: pgradData.post_grad_board,
        post_grad_passing_yr: pgradData.post_grad_passing_yr,
        post_grad_marks: pgradData.post_grad_marks,
        post_grad_grade: pgradData.post_grad_grade,
      };

     

      const updatedEducationData = [...existingEducationData, newEducationDetailsData];

      sessionStorage.setItem("emp_education_details", JSON.stringify(updatedEducationData));

      if (props.setData) {
        props.setData("emp_education_details", updatedEducationData as any);
        props.setData("emp_training_infrm", EmpEducationTrainingDetails as any);
        
      }
      router.push(`${pathName}?page=5`);
    }
  };

  // const saveDataToSessionStorage = () => {
  //   if (typeof window !== "undefined") {
  //     const existingData = JSON.parse(sessionStorage.getItem("emp_education_details")) || [];

  //     const updatedFormData = [
  //       ...existingData,
  //       {
  //         metric: {
  //           metric_subject: formData.metric_subject,
  //           metric_board: formData.metric_board,
  //           metric_passing_yr: formData.metric_passing_yr,
  //           metric_marks: formData.metric_marks,
  //           metric_grade: formData.metric_grade,
  //         },
  //         intermediate: {
  //           inter_subject: interData.inter_subject,
  //           inter_board: interData.inter_board,
  //           inter_passing_yr: interData.inter_passing_yr,
  //           inter_marks: interData.inter_marks,
  //           inter_grade: interData.inter_grade,
  //         },
  //         graduation: {
  //           grad_subject: gradData.grad_subject,
  //           grad_board: gradData.grad_board,
  //           grad_passing_yr: gradData.grad_passing_yr,
  //           grad_marks: gradData.grad_marks,
  //           grad_grade: gradData.grad_grade,
  //         },
  //         post_graduation: {
  //           post_grad_subject: pgradData.post_grad_subject,
  //           post_grad_board: pgradData.post_grad_board,
  //           post_grad_passing_yr: pgradData.post_grad_passing_yr,
  //           post_grad_marks: pgradData.post_grad_marks,
  //           post_grad_grade: pgradData.post_grad_grade,
  //         },
  //       },

  //       {
  //         employer_training_infrm: {
  //           name_of_training: empTrainInf.name_of_training,
  //           training_type: empTrainInf.training_type,
  //           name_of_inst: empTrainInf.name_of_inst,
  //           starting_from: empTrainInf.starting_from,
  //           end_to: empTrainInf.end_to,
  //           tot_day_training: empTrainInf.tot_day_training,

  //         },
  //       }
  //     ];

  //     sessionStorage.setItem("emp_education_details", JSON.stringify(updatedFormData));

  //     if (props.setData) {
  //       props.setData("emp_education_details", updatedFormData);
  //     }

  //     router.push(`${pathName}?page=5`);

  //   }
  // };

  const [tableData, setTableData] = useState<EmployeeEducationDetailsType[]>([]);

  const defaultRowValues = {
    educationLevel: '',
    subjectStream: '',
    boardUniversity: '',
    passingYear: '',
    marksPercentage: '',
    gradeDivision: '',
  };

  const handleRowChange = (rowIndex: number, key: keyof typeof defaultRowValues, value: string) => {
    setTableData((prevTableData) => {
      const updatedTableData = [...prevTableData];
      updatedTableData[rowIndex][key] = value;
      sessionStorage.setItem("emp_education_details", JSON.stringify(updatedTableData)); // Update sessionStorage here
      return updatedTableData;
    });
  };

  const addData = () => {
    if (tableData.length < 2) {
      setTableData((prev) => [...prev, { ...defaultRowValues } as EmployeeEducationDetailsType]);
      const updatedTableData = [...tableData, { ...defaultRowValues }];
      sessionStorage.setItem("emp_education_details", JSON.stringify(updatedTableData));
    }
  };

  return (
    <>
      <SubHeading className="text-[20px] pt-4">
        Employee Education
      </SubHeading>
      <div className="mt-4">
        <table className="table table-md">
          <thead className=" text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400">
            <tr>
              {COLUMNS_FOR_EDUCATION.map((column, index) => (
                <th key={index} className="py-4 px-4">
                  {column.HEADER}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {/* metric field */}

            <tr className="mt-40 mb-4">
              <td className="border py-5 px-5 ">
                Metric
              </td>
              <td className="border">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Metric Subject / Stream"
                  value={formData.metric_subject}
                  onChange={(e) => handleInputChange("metric_subject", e.target.value)}

                />
              </td>
              <td className="border">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Metric Board"
                  value={formData.metric_board}
                  onChange={(e) => handleInputChange("metric_board", e.target.value)}
                />
              </td>
              <td className="border ">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Metric Passing Year"
                  value={formData.metric_passing_yr}
                  onChange={(e) => handleInputChange("metric_passing_yr", e.target.value)}
                />
              </td>
              <td className="border ">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Marks in %"
                  value={formData.metric_marks}
                  onChange={(e) => handleInputChange("metric_marks", e.target.value)}
                />
              </td>
              <td className="border ">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Grade / Division"
                  value={formData.metric_grade}
                  onChange={(e) => handleInputChange("metric_grade", e.target.value)}
                />
              </td>
            </tr>

            {/* Intermediate field */}

            <tr>
              <td className="border py-5 px-5 ">
                Intermediate
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Intermediate Subject / Stream"
                  value={interData.inter_subject}
                  onChange={(e) => handleIntermediateChange("inter_subject", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Intermediate Board / University"
                  value={interData.inter_board}
                  onChange={(e) => handleIntermediateChange("inter_board", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Intermediate Passing Year"
                  value={interData.inter_passing_yr}
                  onChange={(e) => handleIntermediateChange("inter_passing_yr", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Intermediate Marks in %"
                  value={interData.inter_marks}
                  onChange={(e) => handleIntermediateChange("inter_marks", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Intermediate Grade / Division"
                  value={interData.inter_grade}
                  onChange={(e) => handleIntermediateChange("inter_grade", e.target.value)}
                />
              </td>
            </tr>

            {/* Graduation field */}

            <tr>
              <td className="border py-5 px-5 ">
                Graduation
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Graduation Subject / Stream"
                  value={gradData.grad_subject}
                  onChange={(e) => handleGradChange("grad_subject", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Graduation Board / University"
                  value={gradData.grad_board}
                  onChange={(e) => handleGradChange("grad_board", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Graduation Passing Year"
                  value={gradData.grad_passing_yr}
                  onChange={(e) => handleGradChange("grad_passing_yr", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Graduation Marks in %"
                  value={gradData.grad_marks}
                  onChange={(e) => handleGradChange("grad_marks", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Graduation Grade / Division"
                  value={gradData.grad_grade}
                  onChange={(e) => handleGradChange("grad_grade", e.target.value)}
                />
              </td>
            </tr>

            {/* Post Graduation field */}

            <tr>
              <td className="border py-5 px-5 ">
                Post Graduation
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Post Graduation Subject / Stream"
                  value={pgradData.post_grad_subject}
                  onChange={(e) => handlePGradChange("post_grad_subject", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Post Graduation Board / University"
                  value={pgradData.post_grad_board}
                  onChange={(e) => handlePGradChange("post_grad_board", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Post Graduation Passing Year"
                  value={pgradData.post_grad_passing_yr}
                  onChange={(e) => handlePGradChange("post_grad_passing_yr", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Post Graduation Marks in %"
                  value={pgradData.post_grad_marks}
                  onChange={(e) => handlePGradChange("post_grad_marks", e.target.value)}
                />
              </td>
              <td className="border py-2 px-4">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Post Graduation Grade / Division"
                  value={pgradData.post_grad_grade}
                  onChange={(e) => handlePGradChange("post_grad_grade", e.target.value)}
                />
              </td>
            </tr>

          </tbody>
          <tbody>
            {tableData.map((rowData: any, rowIndex) => (
              <tr key={rowIndex}>
                {COLUMNS_FOR_EDUCATION.map((column, colIndex) => {
                  const stateKey: any = Object.keys(defaultRowValues)[colIndex];
                  return (
                    <td key={colIndex} className="border py-2 px-4">
                      <input
                        type="text"
                        className="w-full h-full p-2 bg-transparent outline-none"
                        placeholder={`Enter ${column.HEADER}`}
                        value={rowData[stateKey]}
                        onChange={(e) => handleRowChange(rowIndex, stateKey, e.target.value)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>


        </table>

        
        <div className="w-full flex items-center justify-end mt-3">
          <Button onClick={addData} buttontype="button" variant="primary_rounded">
            + Add More
          </Button>

        </div>

        <div>
        <EmpEducationTrainingDetails setData={props.setData} />
        </div>
      </div>


      <div className="flex items-center justify-end mt-5 gap-5">
        <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
          Back
        </PrimaryButton>

        <PrimaryButton buttonType="button" variant={"cancel"}>
          Reset
        </PrimaryButton>

        <PrimaryButton buttonType="submit" variant="primary" onClick={saveDataToSessionStorage}>
          Save
        </PrimaryButton>
      </div>
    </>
  );
};

export default EmpEducationDetails;