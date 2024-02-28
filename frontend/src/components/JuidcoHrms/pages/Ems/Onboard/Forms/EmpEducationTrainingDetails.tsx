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
import { EmployeeDetailsProps, EmployeeEducationTrainingType} from "@/utils/types/employee.type";
import TableFormContainer from "@/components/global/organisms/TableFormContainer";
import Button from "@/components/global/atoms/Button";



const EmpEducationTrainingDetails: React.FC<
  EmployeeDetailsProps<EmployeeEducationTrainingType>
> = (props) => {

  
  const [tabIndex, setTabIndex] = useState<number>(1);
  const pathName = usePathname();
  const router = useRouter();

  // ----------------------- TABLE COLUMNS --------------------------------//

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


  const [empTrainInf, setEmpTrainInf] = useState({
    name_of_training: "",
    training_type: "",
    name_of_inst: "",
    starting_from: "",
    end_to: "",
    tot_day_training: "",
  })

  const handleEmpTrainChange = (fieldName: string, value: string) => {
    setEmpTrainInf((prevEmpTrainData) => ({
      ...prevEmpTrainData,
      [fieldName]: value,
    }));
  };

  const saveDataToSessionStorage = () => {
    if (typeof window !== "undefined") {
     

      const existingTrainingInfrmString = sessionStorage.getItem("emp_training_infrm");
      const existingTrainingInfrm = existingTrainingInfrmString ? JSON.parse(existingTrainingInfrmString) : [];

      const existingTrainingInformation = {
        name_of_training: empTrainInf.name_of_training,
        training_type: empTrainInf.training_type,
        name_of_inst: empTrainInf.name_of_inst,
        starting_from: empTrainInf.starting_from,
        end_to: empTrainInf.end_to,
        tot_day_training: empTrainInf.tot_day_training,
      };

      const updatedTrainingData = [...existingTrainingInfrm, existingTrainingInformation];

      sessionStorage.setItem("emp_training_infrm", JSON.stringify(updatedTrainingData));

      if (props.setData) {
        props.setData("emp_training_infrm", updatedTrainingData as any);
        
      }
      router.push(`${pathName}?page=5`);
    }
  };
 

  const [employeeTrainig, setEmployeeTrainig] = useState<EmployeeEducationTrainingType[]>([]);

  const defaultRowValuesEmployees = {
    name_of_training: '',
    training_type: '',
    name_of_inst: '',
    starting_from: '',
    end_to: '',
    tot_day_training: '',
  };

  const handleRowChanges = (rowIndex: number, key: keyof typeof defaultRowValuesEmployees, value: string) => {
    setEmployeeTrainig((prevTrainig) => {
      const updatedEmployeeTrainig = [...prevTrainig];
      updatedEmployeeTrainig[rowIndex][key] = value;
      sessionStorage.setItem("emp_training_infrm", JSON.stringify(updatedEmployeeTrainig)); // Update sessionStorage here
      return updatedEmployeeTrainig;
    });
  };

  const addDatas = () => {

    if (employeeTrainig.length < 2) {
      setEmployeeTrainig((prev) => [...prev, { ...defaultRowValuesEmployees } as EmployeeEducationTrainingType]);
      const updatedEmpData = [...employeeTrainig, { ...defaultRowValuesEmployees }];
      sessionStorage.setItem("emp_training_infrm", JSON.stringify(updatedEmpData));
    }
  };

  return (
    <>
      <SubHeading className="text-[20px] pt-4 mt-10 mb-4">
        Employee Training Information
      </SubHeading>

      <div className="mt-4">
        <table className="table table-md">
          <thead className=" text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400">
            <tr>
              {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, index) => (
                <th key={index} className="py-4 px-4">
                  {column.HEADER}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="mt-40 mb-4">
              <td className="border ">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Name of Training"
                  value={empTrainInf.name_of_training}
                  onChange={(e) => handleEmpTrainChange("name_of_training", e.target.value)}
                />

              </td>
              <td className="border ">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Training Type"
                  value={empTrainInf.training_type}
                  onChange={(e) => handleEmpTrainChange("training_type", e.target.value)}
                />
              </td>
              <td className="border">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Name of Institution"
                  value={empTrainInf.name_of_inst}
                  onChange={(e) => handleEmpTrainChange("name_of_inst", e.target.value)}
                />
              </td>
              <td className="border">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter When Starting From"
                  value={empTrainInf.starting_from}
                  onChange={(e) => handleEmpTrainChange("starting_from", e.target.value)}
                />
              </td>
              <td className="border ">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter When Ending To"
                  value={empTrainInf.end_to}
                  onChange={(e) => handleEmpTrainChange("end_to", e.target.value)}
                />
              </td>

              <td className="border ">
                <input
                  type="text"
                  className="w-full h-full p-2 bg-transparent outline-none"
                  placeholder="Enter Total Days of Training"
                  value={empTrainInf.tot_day_training}
                  onChange={(e) => handleEmpTrainChange("tot_day_training", e.target.value)}
                />
              </td>
            </tr>

          </tbody>

          <tbody>
            {employeeTrainig.map((rowData: any, rowIndex) => (
              <tr key={rowIndex}>
                {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, colIndex) => {
                  const stateKey: any = Object.keys(defaultRowValuesEmployees)[colIndex];
                  return (
                    <td key={colIndex} className="border py-2 px-4">
                      <input
                        type="text"
                        className="w-full h-full p-2 bg-transparent outline-none"
                        placeholder={`Enter ${column.HEADER}`}
                        value={rowData[stateKey]}
                        onChange={(e) => handleRowChanges(rowIndex, stateKey, e.target.value)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>


        </table>
        <div className="w-full flex items-center justify-end mt-3">
          <Button onClick={addDatas} buttontype="button" variant="primary_rounded">
            + Add More
          </Button>

        </div>
      </div>


{/* 
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
      </div> */}
    </>
  );
};

export default EmpEducationTrainingDetails;