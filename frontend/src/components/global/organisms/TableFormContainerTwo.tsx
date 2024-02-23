import { SubHeading } from "@/components/Helpers/Heading";
import React, { useState } from "react";
import Button from "../atoms/Button";

interface COLUMNS<T> {
  HEADER: string;
  ACCESSOR: T;
  isRequired: boolean;
  sl_no?: boolean;
}

interface TableFormProps {
  columns: COLUMNS<any>[];
  getData: [];
  addRows?: () => void;
  subHeading: string;
  isRequired?: boolean;
  doubleField: boolean;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
  return (
    <>
      <input
        className={`w-full h-full p-2 bg-transparent outline-none border border-zinc-400 rounded-xl ${isRequired && "placeholder-red-500"}`}
        type="text"
        {...props}
      />
    </>
  );
};

const TableFormContainerTwo: React.FC<TableFormProps> = (props) => {
  const [tableData, setTableData] = useState([{}]);

  console.log(tableData);

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
                        <div className="flex items-center gap-3">
                          <p>From:</p>
                          <InputField
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              onChangeTableDataHandler(
                                index,
                                e.target.value,
                                col.ACCESSOR.from
                              )
                            }
                            value={
                              col.sl_no
                                ? index
                                : (tableData[index] as Record<string, string>)[
                                    col.ACCESSOR.from
                                  ] || ""
                            }
                            name={col.ACCESSOR.from}
                            placeholder={"Enter " + col.HEADER}
                            isRequired={col.isRequired}
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <p>To:</p>
                          <InputField
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              onChangeTableDataHandler(
                                index,
                                e.target.value,
                                col.ACCESSOR.to
                              )
                            }
                            value={
                              col.sl_no
                                ? index
                                : (tableData[index] as Record<string, string>)[
                                    col.ACCESSOR.to
                                  ] || ""
                            }
                            name={col.ACCESSOR.to}
                            placeholder={"Enter " + col.HEADER}
                            isRequired={col.isRequired}
                          />
                        </div>
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

export default TableFormContainerTwo;
