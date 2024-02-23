import { SubHeading } from "@/components/Helpers/Heading";
import React, { useState } from "react";
import Button from "../atoms/Button";

interface COLUMNS {
  HEADER: string;
  ACCESSOR: string;
  isRequired: boolean;
  sl_no?: boolean;
}

interface TableFormProps {
  columns: COLUMNS[];
  getData: [];
  addRows?: () => void;
  subHeading: string;
  isRequired?: boolean;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
  return (
    <>
      <input
        className={`w-full h-full p-2 bg-transparent outline-none ${isRequired && "placeholder-red-500"}`}
        type="text"
        {...props}
      />
    </>
  );
};

const TableFormContainer: React.FC<TableFormProps> = (props) => {
  const [tableData, setTableData] = useState([{}]);

  function onChangeTableDataHandler(id: number, value: string, key: string) {
    setTableData((prev) => {
      const updatedData = [...prev];
      const row: any = { ...updatedData[id] };
      row[key as keyof typeof row] = value;
      updatedData[id] = row;
      return updatedData;
    });
  }

  function addRow() {
    const lastRow = tableData[tableData.length - 1];
    const isLastRowEmpty =
      Object.keys(lastRow).length === 0 ||
      props.columns.some(
        (col) =>
          col.isRequired && !lastRow[col.ACCESSOR as keyof typeof lastRow]
      );

    if (!isLastRowEmpty) {
      setTableData((prev) => [...prev, {}]);
    }
  }

  const header = (
    <SubHeading className="text-[18px]">{props.subHeading}</SubHeading>
  );
  return (
    <>
      {header}
      <table className="table table-md">
        <thead className="  text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400 ">
          <tr>
            {props.columns?.map((cols, index: number) => (
              <>
                <th
                  key={index}
                  className="border border-zinc-400 w-[20%] font-medium"
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
              <tr key={index} className="border border-zinc-400 text-secondary">
                {props.columns?.map((col) => {
                  return (
                    <>
                      <td className="border border-zinc-400 ">
                        <InputField
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChangeTableDataHandler(
                              index,
                              e.target.value,
                              col.ACCESSOR
                            )
                          }
                          value={
                            col.sl_no
                              ? index
                              : (tableData[index] as Record<string, string>)[
                                  col.ACCESSOR
                                ] || ""
                          }
                          name={col.ACCESSOR}
                          placeholder={"Enter " + col.HEADER}
                          isRequired={col.isRequired}
                        />
                      </td>
                    </>
                  );
                })}
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

export default TableFormContainer;
