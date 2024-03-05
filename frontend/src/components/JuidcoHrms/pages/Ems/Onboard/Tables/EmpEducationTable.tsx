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
  setData: (key: string, values: any, index?: number | undefined) => void;
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
          ? "Metric"
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
      marks: "",
      grade: "",
    })
  );

  const [tableData, setTableData] =
    useState<EmployeeEducation[]>(initialTableData);

  console.log(tableData, "table data");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("emp_education");
      if (storedData !== null)
        setTableData(storedData ? JSON.parse(storedData) : [{}]);
    }
  }, []);

  function setDataSesson() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_education", JSON.stringify(tableData));
    }
  }

  const COLUMNS_FOR_EDUCATION: COLUMNS[] = [
    {
      HEADER: "Education Level*",
      ACCESSOR: "edu_level",
      isRequired: true,
    },
    {
      HEADER: "Subject/Stream*",
      ACCESSOR: "stream",
      isRequired: true,
    },
    {
      HEADER: "Board/University*",
      ACCESSOR: "board",
      isRequired: true,
    },
    {
      HEADER: "Passing Year*",
      ACCESSOR: "passing_year",
      isRequired: true,
    },
    {
      HEADER: "Marks in %*",
      ACCESSOR: "marks",
      isRequired: true,
    },
    {
      HEADER: "Grade/Division*",
      ACCESSOR: "grade",
      isRequired: true,
    },
  ];
  function onChangeTableDataHandler(
    id: number,
    value: string,
    key: string,
    innerKey?: string
  ) {
    setTableData((prev) => {
      const updatedData = [...prev];
      const row: Record<string, any> = { ...updatedData[id] };

      if (innerKey) {
        if (!row[key]) {
          row[key] = {};
        }
        const nestedObject: Record<string, string | boolean> = row[key];
        nestedObject[innerKey] = value;
      } else {
        row[key] = value;
      }

      updatedData[id] = { ...row } as EmployeeEducation;
      return updatedData;
    });
  }

  function addRow() {
    setDataSesson();
    const lastRow = tableData[tableData.length - 1];
    const isLastRowEmpty = Object.values(lastRow).every((row) =>
      Object.values(row).every((val) => val !== "")
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
            marks: "",
            grade: "",
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
      <table className="table table-md mt-4">
        <thead className="text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400">
          <tr>
            {COLUMNS_FOR_EDUCATION?.map((cols, index: number) => (
              <>
                <th
                  key={index}
                  className={`border  border-zinc-400  font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
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
          {tableData?.map((row, index: number) => {
            return (
              <tr
                key={index}
                className="border border-zinc-400 text-secondary w-full"
              >
                {/* -----------------------Edu Level----------------------------------- */}
                <td className="border border-zinc-400 ">
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
                <td className="border border-zinc-400 ">
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
                <td className="border border-zinc-400 ">
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
                <td className="border border-zinc-400 ">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(
                        index,
                        e.target.value,
                        "passing_year"
                      )
                    }
                    value={row?.passing_year}
                    placeholder={"Enter "}
                    isRequired={true}
                  />
                </td>
                {/* ---------------------------PASSING YEAR----------------------------------- */}

                {/* ---------------------------MARKS----------------------------------- */}
                <td className="border border-zinc-400 ">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(index, e.target.value, "marks")
                    }
                    type="number"
                    value={row?.marks}
                    placeholder={"Enter "}
                    isRequired={true}
                  />
                </td>
                {/* ---------------------------MARKS----------------------------------- */}

                {/* ---------------------------GRADE----------------------------------- */}
                <td className="border border-zinc-400 ">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(index, e.target.value, "grade")
                    }
                    type="number"
                    value={row?.grade}
                    placeholder={"Enter "}
                    isRequired={true}
                  />
                </td>
                {/* ---------------------------GRADE----------------------------------- */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-end mt-3">
        <Button onClick={addRow} buttontype="button" variant="primary_rounded">
          Add
        </Button>
      </div>
    </>
  );
};

export default EmployeeEducationTable;
