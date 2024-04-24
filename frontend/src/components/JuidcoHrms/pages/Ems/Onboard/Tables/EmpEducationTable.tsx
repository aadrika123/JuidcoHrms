/***
 * Author: Krish
 * Status: Open
 * Uses: EMployee promotion details is a section of Emp Service details
 */

import React, { useEffect, useState } from "react";
import Button from "../../../../../global/atoms/Button";
import { EmployeeEducation } from "@/utils/types/employee.type";
import { COLUMNS } from "@/components/global/organisms/TableFormContainer";
import toast, { Toaster } from "react-hot-toast";
import { removeObj } from "@/utils/helper";
3;
interface TableFormProps {
  validate: (value: boolean) => void;
  setData: (key: string, values: any, index?: number | undefined) => void;
  setSession: boolean;
  resetTable: number;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
  return (
    <>
      <input
        className={`w-full h-full p-2 bg-transparent outline-none rounded-xl ${isRequired && "placeholder-zinc-400"}`}
        type="text"
        {...props}
      />
    </>
  );
};

const EmployeeEducationTable: React.FC<TableFormProps> = (props) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const initialTableData: EmployeeEducation[] = Array.from(
    { length: 4 },
    (_, index) => ({
      edu_level:
        index === 0
          ? "Matriculation"
          : index === 1
            ? "Intermediate"
            : index === 2
              ? "Graduation"
              : index === 3
                ? "Post Graduation"
                : "",
      stream: "",
      board: "",
      passing_year: "",
      marks: undefined,
      grade: "",
      upload_edu: "",
    })
  );

  const [tableData, setTableData] = useState<any[]>(
    JSON.parse(sessionStorage.getItem("emp_education") as string) ||
      initialTableData
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("emp_education");
      if (storedData !== null)
        setTableData(storedData ? JSON.parse(storedData) : [{}]);
      props.validate(true);
    }
  }, [props.setSession]);

  function setDataSesson() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_education", JSON.stringify(tableData));
    }
  }
  const handleReset = (): void => {
    // const emptyTableData = [...initialTableData];
    const emptyTableData = initialTableData.resetData();
    emptyTableData?.forEach((m) => {
      m.marks = "" as string;
    });
    setTableData(emptyTableData);
    props.validate(true);
  };

  useEffect(() => {
    setDataSesson();
  }, [props.setSession]);

  useEffect(() => {
    if (props.resetTable !== 0) handleReset();
  }, [props.resetTable]);

  const COLUMNS_FOR_EDUCATION: COLUMNS[] = [
    {
      HEADER: "#",
      ACCESSOR: "sl_no",
      isRequired: false,
    },
    {
      HEADER: "Education Level",
      ACCESSOR: "edu_level",
      isRequired: true,
    },
    {
      HEADER: "Subject/Stream",
      ACCESSOR: "stream",
      isRequired: true,
    },
    {
      HEADER: "Board/University",
      ACCESSOR: "board",
      isRequired: true,
    },
    {
      HEADER: "Passing Year",
      ACCESSOR: "passing_year",
      isRequired: true,
    },
    {
      HEADER: "Marks in %",
      ACCESSOR: "marks",
      isRequired: true,
    },
    {
      HEADER: "Grade/Division",
      ACCESSOR: "grade",
      isRequired: true,
    },
    {
      HEADER: "Upload",
      ACCESSOR: "upload_edu",
      isRequired: true,
    },
  ];

  function onChangeTableDataHandler(
    id: number,
    value: string | number,
    key: string,
    innerKey?: string
  ) {
    setTableData((prev) => {
      const updatedData = [...prev];
      const row: Record<string, any> = { ...updatedData[id] };

      if (key === "marks") {
        if (!row[key]) {
          row[key] = {};
        }
        value = Math.min(Number(value), 100);

        row["grade"] =
          (value as number) >= 60
            ? "1st"
            : (value as number) >= 49
              ? "2nd"
              : (value as number) >= 34
                ? "3rd"
                : (value as number) < 34 && (value as number) > 0
                  ? "FAIL"
                  : (value as number) === 0
                    ? ""
                    : "";
      }

      if (innerKey) {
        if (!row[key]) {
          row[key] = {};
        }
        const nestedObject: Record<string, string | boolean | number> =
          row[key];
        nestedObject[innerKey] = value;
      } else {
        row[key] = value;
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setIsTyping(true);

      if (key === "passing_year") {
        setTimeoutId(
          setTimeout(() => {
            if (!isTyping && id > 0) {
              const prevRow = updatedData[id - 1];
              if (row["passing_year"] < prevRow["passing_year"]) {
                toast.error("Year must be greator than prev year");
              }
            }
          }, 1500)
        );
      }

      // Reset typing status after 1500ms (1.5 seconds)
      setTimeout(() => {
        setIsTyping(false);
      }, 1500);

      if (
        Object.values(row)
          .slice(1)
          .every((key) => key !== "") ||
        Object.values(row)
          .slice(1)
          .every((key) => key === "")
      ) {
        props.validate(true);
      } else {
        props.validate(false);
      }

      updatedData[id] = { ...row } as EmployeeEducation;
      return updatedData;
    });
  }

  function addRow() {
    setDataSesson();
    // props.setSession("emp_education", tableData);
    const lastRow = tableData[tableData.length - 1];

    const isLastRowEmpty = Object.values(lastRow).every(
      (row) =>
        row !== undefined &&
        Object?.values(row as any).every((val) => val !== "")
    );

    if (tableData.length < 6) {
      if (isLastRowEmpty) {
        setTableData((prev: any) => [
          ...prev,
          {
            edu_level: "",
            stream: "",
            board: "",
            passing_year: "",
            marks: undefined,
            grade: "",
            upload_edu: "",
          },
        ]);
      }
    } else {
      toast.error("can't add more than six education details");
    }
  }

  useEffect(() => {
    if (props.setData) {
      const filterTableData = removeObj(tableData);
      props.setData("emp_education", filterTableData);
    }
  }, [tableData]);

  return (
    <>
      <Toaster />
      <table className=" mt-4 p-5">
        <thead className="text-[1rem] bg-[#E1E7FF] text-[#211F35] rounded-md">
          <tr>
            {COLUMNS_FOR_EDUCATION?.map((cols, index: number) => (
              <>
                <th
                  key={index}
                  className={`font-medium ${index === 0 ? "w-[2%]" : "w-[10%]"}`}
                >
                  <div className="flex gap-2 py-4 px-6 rounded-md">
                    <span>
                      {cols.HEADER}
                      <span className="text-red-500">
                        {index === 0 ? "" : "*"}
                      </span>
                    </span>
                  </div>
                </th>
              </>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData?.map((row, index: number) => {
            return (
              <tr key={index} className=" text-secondary w-full border-b">
                <td className="px-6">
                  <span>{index + 1}</span>
                </td>
                {/* -----------------------Edu Level----------------------------------- */}
                <td className=" px-5 py-2 flex items-center w-[15rem]">
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                    </svg>
                  </span>
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(
                        index,
                        e.target.value,
                        "edu_level"
                      )
                    }
                    value={row.edu_level}
                    placeholder={"Enter "}
                    isRequired={true}
                  />
                </td>
                {/* -----------------------Edu Level----------------------------------- */}
                {/* ---------------------------STREAM----------------------------------- */}
                <td className=" px-6">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(index, e.target.value, "stream")
                    }
                    value={row?.stream}
                    placeholder={"Enter "}
                    isRequired={true}
                    onKeyPress={(e: any) => {
                      if (
                        !(
                          ((e.key >= "a" || e.key >= "A") &&
                            (e.key <= "z" || e.key <= "Z")) ||
                          e.key === " " ||
                          e.key === ","
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                {/* ---------------------------STREAM----------------------------------- */}
                {/* ---------------------------BOARD----------------------------------- */}
                <td className="px-6 ">
                  <React.Fragment>
                    <InputField
                      onChange={(e) =>
                        onChangeTableDataHandler(index, e.target.value, "board")
                      }
                      value={row.board}
                      placeholder={"Enter "}
                      isRequired={true}
                      onKeyPress={(e: any) => {
                        if (
                          !(
                            ((e.key >= "a" || e.key >= "A") &&
                              (e.key <= "z" || e.key <= "Z")) ||
                            e.key === " " ||
                            e.key === "."
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </React.Fragment>
                </td>
                {/* ---------------------------BOARD----------------------------------- */}
                {/* ---------------------------PASSING YEAR----------------------------------- */}
                <td className=" px-6">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(
                        index,
                        e.target.value,
                        "passing_year"
                      )
                    }
                    value={row?.passing_year}
                    maxLength={4}
                    type="text"
                    onKeyPress={(e: any) => {
                      if (!(e.key >= "0" && e.key <= "9")) {
                        e.preventDefault();
                      }
                    }}
                    placeholder={"Enter "}
                    isRequired={true}
                  />
                </td>
                {/* ---------------------------PASSING YEAR----------------------------------- */}
                {/* ---------------------------MARKS----------------------------------- */}
                <td className=" px-6">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(
                        index,
                        Number(e.target.value),
                        "marks"
                      )
                    }
                    type="text"
                    maxLength={3}
                    onKeyPress={(e: any) => {
                      if (!(e.key >= "0" && e.key <= "9")) {
                        e.preventDefault();
                      }
                    }}
                    value={row?.marks}
                    placeholder={"Enter "}
                    isRequired={true}
                  />
                </td>
                {/* ---------------------------MARKS----------------------------------- */}
                {/* ---------------------------GRADE----------------------------------- */}
                <td className=" px-6">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(index, e.target.value, "grade")
                    }
                    value={row?.grade}
                    placeholder={"Enter "}
                    isRequired={true}
                    disabled
                  />
                </td>
                {/* ---------------------------GRADE----------------------------------- */}
                {/* ---------------------------UPLOAD FILE----------------------------------- */}
                <td className=" px-6">
                  <div className="flex gap-3 cursor-pointer mt-7 pb-2">
                    <p className="text-zinc-600 whitespace-nowrap ">
                      Browse File
                    </p>

                    <div className="w-[8rem] h-[2rem] bg-transparent  border border-blue-300 rounded-xl flex flex-col items-center justify-center">
                      <label htmlFor="xyz">Upload Image</label>

                      <input
                        type="file"
                        id="xyz"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          onChangeTableDataHandler(
                            index,
                            e.target.value,
                            "upload_edu"
                          )
                        }
                        required
                        // value={row?.upload_edu}
                      />
                    </div>
                  </div>
                </td>
                {/* ---------------------------UPLOAD FILE----------------------------------- */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="w-full flex items-start justify-end mt-3">
        <span className="text-xs italic">
          P.S-You can add more 4 other information of education
        </span>
        <Button onClick={addRow} buttontype="button" variant="primary_rounded">
          Add
        </Button>
      </div> */}

      <div className="w-full flex items-start justify-between mt-3">
        <span className="text-xs italic">
          P.S-You can add more 4 other information of education
        </span>
      </div>
      <div className="w-full flex items-center justify-end mt-3 mb-3">
        <Button
          onClick={addRow}
          buttontype="button"
          variant="primary_rounded"
          className="absolute"
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default EmployeeEducationTable;
