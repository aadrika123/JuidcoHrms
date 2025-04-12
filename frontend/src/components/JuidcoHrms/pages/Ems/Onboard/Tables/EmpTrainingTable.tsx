/***
 * Author: Krish
 * Status: Open
 * Uses: EMployee promotion details is a section of Emp Service details
 */

import React, { useEffect, useState } from "react";
import Button from "../../../../../global/atoms/Button";

import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import { Toaster } from "react-hot-toast";
import { calculateTotalDays, removeObj } from "@/utils/helper";
import { SubHeading } from "@/components/Helpers/Heading";
import axios from "@/lib/axiosConfig";

interface TableFormProps {
  setData: (key: string, values: any, index?: number | undefined) => void;
  setSession: boolean;
  validate: (value: boolean) => void;
  resetTable: number;
}

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   isRequired?: boolean;
// }

// const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
//   return (
//     <>
//       <input
//         className={` p-2 bg-transparent outline-none rounded-xl ${isRequired && "placeholder-zinc-400"}`}
//         type="text"
//         {...props}
//       />
//     </>
//   );
// };

const EmployeeTrainingTable: React.FC<TableFormProps> = (props) => {
  const getInitialFormData: any = () => ({
    sl_no: "",
    name_of_training: "",
    training_type: "",
    name_of_inst: "",
    starting_from: "",
    end_to: "",
    tot_day_training: "",
    upload_edu: "",
  });
  const [addedRows, setAddedRows] = useState<number>(0);
  const [tableData, setTableData] = useState<any[]>(
    JSON.parse(sessionStorage.getItem("emp_training") as string) || [
      getInitialFormData(),
    ]
  );
  const [validationErrors, setValidationErrors] = useState<{ [key: number]: string }>({});


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("emp_training");
      if (storedData !== null)
        setTableData(storedData ? JSON.parse(storedData) : [{}]);
    }
  }, [props.setSession]);

  function setDataSesson() {
    if (typeof window !== "undefined") {
      tableData?.forEach((val, i: number) => {
        delete tableData[i].sl_no;
      });

      sessionStorage.setItem("emp_training", JSON.stringify(tableData));
    }
  }

  const handleReset = (): void => {
    setTableData([getInitialFormData()]);
  };

  console.log(tableData, "dd");

  useEffect(() => {
    setDataSesson();
  }, [props.setSession]);

  useEffect(() => {
    if (props.resetTable !== 0) handleReset();
  }, [props.resetTable]);

  const COLUMNS_FOR_EMP_TRNG_INFRM: COLUMNS[] = [
    {
      HEADER: "#",
      ACCESSOR: "sl_no",
      isRequired: false,
    },
    {
      HEADER: "Name of Training",
      ACCESSOR: "name_of_training",
      isRequired: true,
    },
    {
      HEADER: "Training Type",
      ACCESSOR: "training_type",
      isRequired: true,
    },

    {
      HEADER: "Name of Institution",
      ACCESSOR: "name_of_institution",
      isRequired: true,
    },

    {
      HEADER: "Starting From",
      ACCESSOR: "starting_from",
      isRequired: true,
    },

    {
      HEADER: "End To",
      ACCESSOR: "end_to",
      isRequired: true,
    },

    {
      HEADER: "Total Days of Training",
      ACCESSOR: "total_days_of_train",
      isRequired: true,
    },
    {
      HEADER: "Upload",
      ACCESSOR: "upload_edu",
      isRequired: true,
    },
  ];

  const handleInputChange = (
    fieldName: string,
    value: string | number,
    nestedKey?: string,
    rowIndex?: number
  ) => {
    setTableData((prevFormData) => {
      const updatedData = [...prevFormData];

      if (nestedKey !== undefined && rowIndex !== undefined) {
        if (typeof updatedData[rowIndex][fieldName] !== "object") {
          updatedData[rowIndex][fieldName] = { [nestedKey]: value };
        } else {
          updatedData[rowIndex][fieldName][nestedKey] = value;
        }

        const fromDate = updatedData[rowIndex]?.starting_from?.from;
        const toDate = updatedData[rowIndex]?.end_to?.to;

        if (fromDate && toDate) {
          if (new Date(toDate) < new Date(fromDate)) {
            setValidationErrors((prev) => ({
              ...prev,
              [rowIndex]: "'To' date cannot be earlier than 'From' date.",
            }));
            updatedData[rowIndex].tot_day_training = ""; // Optional: clear invalid total
          } else {
            setValidationErrors((prev) => {
              const { [rowIndex]: _, ...rest } = prev;
              return rest; // remove error for this row if valid
            });

            const total_days = calculateTotalDays(fromDate, toDate).toString();
            updatedData[rowIndex].tot_day_training = total_days;
          }
        }
      } else if (rowIndex !== undefined) {
        updatedData[rowIndex][fieldName] = value;
      }

      return updatedData;
    });
  };


  const addRow = () => {
    setDataSesson();
    if (addedRows < 6) {
      setTableData((prevData) => [...prevData, getInitialFormData()]);
      setAddedRows((prevRows) => prevRows + 1);
    }
  };

  const removeRow = (index: number) => {
    setTableData((prev: any) => {
      prev?.splice(index, 1);
      return [...prev];
    });
  };

  useEffect(() => {
    if (props.setData) {
      const filterTableData = removeObj(tableData);
      props.setData("emp_training", filterTableData);
    }
  }, [tableData]);

  // File Upload Handler with DMS Integration
  const handleFileChange = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF, PNG, JPEG)
    const acceptedFileTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!acceptedFileTypes.includes(file.type)) {
      alert("Please upload a valid training document (PDF, PNG, or JPEG).");
      return;
    }

    // Validate file size (max 2MB)
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
      alert("File cannot be more than 2MB.");
      return;
    }

    try {
      // Prepare FormData for DMS upload
      const formData = new FormData();
      formData.append("img", file);

      // Step 1: Upload to DMS (replace with actual production endpoint)
      const response = await axios.post("/dms/get-url", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Step 2: Get the file URL from the response
      const fileUrl = response.data.data;

      // Step 3: Update table data with the uploaded file URL
      setTableData((prev) => {
        const temp = [...prev];
        temp[index].upload_edu = fileUrl; // Save file URL
        return temp;
      });

      // Update session storage
      setDataSesson();
      console.log("Training document uploaded successfully:", fileUrl);
    } catch (error) {
      console.error("Error uploading training document:", error);
      alert("Training document upload failed.");
    }
  };

  return (
    <>
      <Toaster />
      <SubHeading className="text-[20px] pt-4 mb-4">
        Employee Training Information
      </SubHeading>

      <div className="overflow-auto ">
        <table className="overflow-x-hidden">
          <thead className="text-[1rem] bg-primary_green text-[#211F35]  ">
            <tr>
              {COLUMNS_FOR_EMP_TRNG_INFRM?.map((cols, index: number) => (
                <>
                  <th
                    key={index}
                    className={`font-medium ${index === 0 ? "w-[2%]" : "w-[5%]"}`}
                  >
                    <div className="flex gap-2 py-4 px-6 rounded-md">
                      <span>
                        {cols.HEADER}
                        {/* <span>{index === 0 ? "" : "*"}</span> */}
                      </span>
                    </div>
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((rowData: any, rowIndex) => (
              <tr
                key={rowIndex}
                className=" py-2 px-4 border-b w-full overflow-x-auto "
              >
                {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, colIndex) => {
                  const stateKey: any =
                    Object.keys(getInitialFormData())[colIndex];
                  return (
                    <>
                      <td key={colIndex} className="px-5">
                        {colIndex === 0 ? (
                          <>
                            <p className="">
                              <span>{rowIndex + 1}</span>
                            </p>
                          </>
                        ) : null}

                        {colIndex === 1 ? (
                          <input
                            type="text"
                            className=" bg-transparent outline-none"
                            placeholder={`Enter ${column.HEADER}`}
                            value={rowData[stateKey]}
                            onChange={(e) =>
                              handleInputChange(
                                stateKey,
                                e.target.value,
                                undefined,
                                rowIndex
                              )
                            }
                            onKeyPress={(e: any) => {
                              const regex = /^[a-zA-Z0-9.]$/;
                              if (!regex.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        ) : null}

                        {colIndex === 2 ? (
                          <select
                            className="bg-white border p-1 mx-2"
                            value={rowData[stateKey]}
                            onChange={(e) =>
                              handleInputChange(
                                stateKey,
                                e.target.value,
                                undefined,
                                rowIndex
                              )
                            }
                          >
                            <option>Please Select Option</option>
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advance">Advance</option>
                          </select>
                        ) : null}

                        {colIndex === 3 ? (
                          <input
                            type="text"
                            className=" bg-transparent outline-none"
                            placeholder={`Enter ${column.HEADER}`}
                            value={rowData[stateKey]}
                            onChange={(e) =>
                              handleInputChange(
                                stateKey,
                                e.target.value,
                                undefined,
                                rowIndex
                              )
                            }
                            onKeyPress={(e: any) => {
                              const regex = /^[a-zA-Z0-9.]$/;
                              if (!regex.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        ) : null}

                        {colIndex === 4 ? (
                          <div className=" inline-flex items-center pt-1 pb-1  my-2">
                            <React.Fragment>
                              <p className="mr-2">From:</p>
                              <input
                                type="date"
                                className=" p-2 bg-transparent border border-gray-300"
                                placeholder="Enter Starting From"
                                onChange={(e) =>
                                  handleInputChange(
                                    stateKey,
                                    e.target.value,
                                    "from",
                                    rowIndex
                                  )
                                }
                                value={rowData[stateKey]?.from || ""}
                              />
                            </React.Fragment>
                          </div>
                        ) : null}

                        {colIndex === 5 ? (
                          <div className="inline-flex flex-col pt-1 pb-1 my-2">
                            <div className="flex items-center">
                              <p className="ml-2 mr-2">To:</p>
                              <input
                                type="date"
                                className="p-2 bg-transparent border border-gray-300"
                                placeholder="Enter End To"
                                onChange={(e) =>
                                  handleInputChange(stateKey, e.target.value, "to", rowIndex)
                                }
                                value={rowData[stateKey]?.to || ""}
                              />
                            </div>
                            {validationErrors[rowIndex] && (
                              <p className="text-red-500 text-sm ml-12 mt-1">
                                {validationErrors[rowIndex]}
                              </p>
                            )}
                          </div>
                        ) : null}


                        {colIndex === 6 ? (
                          <input
                            type="text"
                            className=" bg-transparent outline-none"
                            placeholder={`Enter ${column.HEADER}`}
                            value={rowData["tot_day_training"]}
                            onChange={(e) =>
                              handleInputChange(
                                stateKey,
                                e.target.value,
                                undefined,
                                rowIndex
                              )
                            }
                            disabled
                            maxLength={3}
                            onKeyPress={(e: any) => {
                              if (!(e.key >= "0" && e.key <= "9")) {
                                e.preventDefault();
                              }
                            }}
                          />
                        ) : null}

                        {colIndex === 7 ? (
                          <input
                            onChange={(e) => handleFileChange(rowIndex, e)}
                            className="bg-transparent outline-none"
                            type="file"
                          />
                        ) : null}
                      </td>
                    </>

                    // : (
                    // <input
                    //   type="text"
                    //   className=" bg-transparent outline-none"
                    //   placeholder={`Enter ${column.placeholder}`}
                    //   value={colIndex === 0 ? rowIndex + 1 : rowData[stateKey]}
                    //   onChange={(e) => handleInputChange(stateKey, e.target.value, undefined, rowIndex)}
                    // />
                  );
                })}
                {rowIndex > 0 && (
                  <td className="w-[5%]">
                    <Button
                      variant="cancel"
                      onClick={() => {
                        removeRow(rowIndex);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex items-center justify-end mt-3">
        <Button onClick={addRow} buttontype="button" variant="primary_rounded">
          Add
        </Button>
      </div>
    </>
  );
};

export default EmployeeTrainingTable;
