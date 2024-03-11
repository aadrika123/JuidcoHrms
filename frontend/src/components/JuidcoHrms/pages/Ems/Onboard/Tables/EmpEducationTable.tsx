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

interface TableFormProps {
  validate: (value: boolean) => void;
  setData: (key: string, values: any, index?: number | undefined) => void;
  setSession: boolean;
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
  const initialTableData: EmployeeEducation[] = Array.from(
    { length: 4 },
    (_, index) => ({
      edu_level:
        index === 0
          ? "Matric"
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
    }
  }, [props.setSession]);

  function setDataSesson() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_education", JSON.stringify(tableData));
    }
  }

  useEffect(() => {
    setDataSesson();
  }, [props.setSession]);

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
      if (
        Object.values(row)
          .slice(1)
          .every((key) => key === "") ||
        Object.values(row)
          .slice(1)
          .every((key) => key !== "")
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
                <td className=" px-5 py-2">
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
                    type="number"
                    min={1111}
                    max={9999}
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
                    type="number"
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
      <div className="w-full flex items-start justify-between mt-3">
        <span className="text-xs italic">
          P.S-You can add more 4 other information of education
        </span>
        <Button onClick={addRow} buttontype="button" variant="primary_rounded">
          Add
        </Button>
      </div>
    </>
  );
};

export default EmployeeEducationTable;
