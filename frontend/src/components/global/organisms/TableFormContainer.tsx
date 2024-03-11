// "use client";

// /***
//  * Author: Krish
//  * Status: Open
//  * Date: 23/02/2024
//  */

// import { InnerHeading } from "@/components/Helpers/Heading";
// import React, { useEffect, useState } from "react";
// import Button from "../atoms/Button";

// type OptionProps = {
//   id: number;
//   name: string;
// };

// export interface COLUMNS {
//   HEADER: string;
//   ACCESSOR: string;
//   isRequired: boolean;
//   type?: "radio" | "select" | "text" | "number" | "date";
//   select_options?: OptionProps[];
//   placeholder?: string;
//   sl_no?: boolean;
// }

// interface TableFormProps {
//   columns: COLUMNS[];
//   getData: [];
//   addRows?: () => void;
//   session_key: string;
//   subHeading: string;
//   isRequired?: boolean;
//   setData: (key: string, values: any, index?: number | undefined) => void;
//   labels?: string[];

// }

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   isRequired?: boolean;
// }

// const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
//   return (
//     <>
//       <input
//         className={`w-full h-full p-2 bg-transparent outline-none ${isRequired && "placeholder-zinc-400"}`}
//         type="text"
//         {...props}
//       />
//     </>
//   );
// };

// const TableFormContainer: React.FC<TableFormProps> = (props) => {
//   const [tableData, setTableData] = useState([{}]);
//   const [tableLabels, setTableLabels] = useState(props.labels || []);

//    useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedData = sessionStorage.getItem(`${props.session_key}`);
//       setTableData(
//         storedData
//           ? JSON.parse(storedData)
//           : Array.from({ length: tableLabels?.length || 1 }, () => ({}))
//       );
//     }
//   }, [props.session_key, tableLabels]);

//   // useEffect(() => {
//   //   if (typeof window !== "undefined") {
//   //     const storedData = sessionStorage.getItem(`${props.session_key}`);
//   //     setTableData(
//   //       storedData
//   //         ? JSON.parse(storedData)
//   //         : Array.from({ length: props.labels?.length || 1 }, () => ({}))
//   //     );
//   //   }
//   // }, [props.session_key, props.labels]);

//   // useEffect(() => {
//   //   if (typeof window !== "undefined") {
//   //     const storedData = sessionStorage.getItem(`${props.session_key}`);
//   //     setTableData(storedData ? JSON.parse(storedData) : [{}]);
//   //   }
//   // }, [props.session_key]);

//   function setDataSesson() {
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem(`${props.session_key}`, JSON.stringify(tableData));
//     }
//   }

//   // useEffect(() => {
//   //   props.setData(`${props.session_key}`, tableData);
//   // }, [tableData]);

//   function onChangeTableDataHandler(id: number, value: string | number, key: string) {
//     setTableData((prev: any) => {
//       const updatedData = [...prev];
//       const row: any = { ...updatedData[id] };
//       row[key as keyof typeof row] = value;
//       updatedData[id] = row;
//       return updatedData;
//     });
//   }

//   function addRow() {
//     setDataSesson();
//     const lastRow = tableData[tableData.length - 1];
//     const isLastRowEmpty =
//       Object.keys(lastRow).length === 0 ||
//       props.columns.some(
//         (col) =>
//           col.isRequired && !lastRow[col.ACCESSOR as keyof typeof lastRow]
//       );

//     if (!isLastRowEmpty) {
//       setTableData((prev: any) => [...prev, {}]);
//     }
//   }

//   const options = [
//     {
//       key: "yes",
//       value: "Yes",
//     },
//     {
//       key: "no",
//       value: "No",
//     },
//   ];

//   const header = <InnerHeading>{props.subHeading}</InnerHeading>;
//   return (
//     <>
//       {header}
//       <table className="table table-md">

//         <thead className="  text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400 ">
//           <tr>
//             {props.labels && props.labels.length > 0 && (
//               <th className=" font-medium w-[5%]">
//                 <div className="flex gap-2">
//                   <span>Education Level</span>
//                 </div>
//               </th>
//             )}

//             {props.columns?.map((cols, index: number) => (
//               <>
//                 <th
//                   key={index}
//                   className={`border  border-zinc-400  font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
//                 >
//                   <div className="flex gap-2">
//                     <span>{cols.HEADER}</span>
//                   </div>
//                 </th>
//               </>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {tableData?.map((row: any, index: number) => {
//             return (
//               <tr key={index} className=" text-secondary">

//                 {/* {props.labels && props.labels.length > 0 && (
//                   <td className="">
//                     {props.labels[index] || `Label ${index + 1}`}
//                   </td>
//                 )} */}
//                 {props.columns?.map((col) => {
//                   return (
//                     <React.Fragment key={col.ACCESSOR}>
//                       <td className="">
//                         {!col.type ? (
//                           <InputField
//                             onChange={(
//                               e: React.ChangeEvent<HTMLInputElement>
//                             ) =>
//                               onChangeTableDataHandler(
//                                 index,
//                                 e.target.value,
//                                 col.ACCESSOR
//                               )
//                             }
//                             value={
//                               col.sl_no
//                                 ? index + 1
//                                 : (tableData[index] as Record<string, string>)[
//                                 col.ACCESSOR
//                                 ] || ""
//                             }
//                             readOnly={col.sl_no}
//                             name={col.ACCESSOR}
//                             placeholder={"Enter " + col.HEADER}
//                             isRequired={col.isRequired}
//                           />
//                         ) : col.type === "number" ? (
//                           <InputField
//                             onChange={(
//                               e: React.ChangeEvent<HTMLInputElement>
//                             ) =>
//                               onChangeTableDataHandler(
//                                 index,
//                                 Number(e.target.value),
//                                 col.ACCESSOR
//                               )
//                             }
//                             value={
//                               col.sl_no
//                                 ? index + 1
//                                 : (tableData[index] as Record<string, string>)[
//                                 col.ACCESSOR
//                                 ] || ""
//                             }
//                             readOnly={col.sl_no}
//                             name={col.ACCESSOR}
//                             type="number"
//                             placeholder={"Enter " + col.HEADER}
//                             isRequired={col.isRequired}
//                           />
//                         ) : col.type === "radio" ? (
//                           <div className="flex flex-col gap-3 pl-5 items-start">
//                             {options.map((option) => (
//                               <div
//                                 className="flex items-center mr-3 gap-2"
//                                 key={option.key}
//                               >
//                                 <input
//                                   className="mr-1 appearance-none  rounded w-6 h-6 checked:bg-primary_green checked:text-white  checked:border-transparent"
//                                   type="radio"
//                                   id={option.value}
//                                   value={option.value}
//                                   onChange={() =>
//                                     onChangeTableDataHandler(
//                                       index,
//                                       option.value,
//                                       col.ACCESSOR
//                                     )
//                                   }
//                                   checked={
//                                     (
//                                       tableData[index] as Record<string, string>
//                                     )?.[col.ACCESSOR] === option.value
//                                   }
//                                 />
//                                 <label
//                                   className="text-secondary text-sm"
//                                   htmlFor={option.key}
//                                 >
//                                   {option.value}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         ) : col.type === "select" ? (
//                           <select
//                             onChange={(
//                               e: React.ChangeEvent<HTMLSelectElement>
//                             ) =>
//                               onChangeTableDataHandler(
//                                 index,
//                                 e.target.value,
//                                 col.ACCESSOR
//                               )
//                             }
//                             value={
//                               (tableData[index] as Record<string, string>)?.[
//                               col.ACCESSOR
//                               ]
//                             }
//                             name={col.ACCESSOR}
//                             className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 w-full`}
//                           >
//                             <option selected value="">
//                               {col.placeholder}
//                             </option>
//                             {col?.select_options?.map((d: OptionProps) => (
//                               <option key={d?.id} value={d?.id}>
//                                 {d?.name}
//                               </option>
//                             ))}
//                           </select>
//                         ) : col.type === "date" ? (
//                           <InputField
//                             onChange={(
//                               e: React.ChangeEvent<HTMLInputElement>
//                             ) =>
//                               onChangeTableDataHandler(
//                                 index,
//                                 e.target.value,
//                                 col.ACCESSOR
//                               )
//                             }
//                             value={
//                               col.sl_no
//                                 ? index + 1
//                                 : (tableData[index] as Record<string, string>)[
//                                 col.ACCESSOR
//                                 ] || ""
//                             }
//                             readOnly={col.sl_no}
//                             name={col.ACCESSOR}
//                             type="date"
//                             isRequired={col.isRequired}
//                           />
//                         ) : (
//                           <></>
//                         )}
//                       </td>
//                     </React.Fragment>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="w-full flex items-center justify-end mt-3">
//         <Button onClick={addRow} buttontype="button" variant="primary_rounded">
//           Add
//         </Button>
//       </div>
//     </>
//   );
// };

// export default TableFormContainer;

"use client";

/***
 * Author: Krish
 * Status: Open
 * Date: 23/02/2024
 */

import { InnerHeading } from "@/components/Helpers/Heading";
import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { removeObj } from "@/utils/helper";

type OptionProps = {
  id: number;
  name: string;
};

export interface COLUMNS {
  HEADER: string;
  ACCESSOR: string;
  isRequired: boolean;
  type?: "radio" | "select" | "text" | "number" | "date";
  select_options?: OptionProps[];
  placeholder?: string;
  sl_no?: boolean;
}

interface TableFormProps {
  columns: COLUMNS[];
  getData: [];
  addRows?: () => void;
  session_key: string;
  subHeading: string;
  isRequired?: boolean;
  setData: (key: string, values: any, index?: number | undefined) => void;
  labels?: string[];
  // validate: (value: boolean) => void;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
  return (
    <>
      <input
        className={`w-full h-full p-2 bg-transparent outline-none ${isRequired && "placeholder-zinc-400"}`}
        type="text"
        {...props}
      />
    </>
  );
};

const TableFormContainer: React.FC<TableFormProps> = (props) => {
  const [tableData, setTableData] = useState([{}]);
  const [tableLabels] = useState(props.labels || []);
  // const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const filterData = removeObj(tableData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem(`${props.session_key}`);
      setTableData(
        storedData
          ? JSON.parse(storedData)
          : Array.from({ length: tableLabels?.length || 1 }, () => ({}))
      );
    }
  }, [props.session_key, tableLabels]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedData = sessionStorage.getItem(`${props.session_key}`);
  //     setTableData(
  //       storedData
  //         ? JSON.parse(storedData)
  //         : Array.from({ length: props.labels?.length || 1 }, () => ({}))
  //     );
  //   }
  // }, [props.session_key, props.labels]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedData = sessionStorage.getItem(`${props.session_key}`);
  //     setTableData(storedData ? JSON.parse(storedData) : [{}]);
  //   }
  // }, [props.session_key]);

  function setDataSesson() {
    if (global?.window && typeof window !== "undefined") {
      sessionStorage.setItem(
        `${props.session_key}`,
        JSON.stringify(filterData)
      );
    }
  }

  // useEffect(() => {
  //   props.setData(`${props.session_key}`, filterData);
  // }, [filterData]);

  useEffect(() => {
    props.setData(`${props.session_key}`, filterData, tableLabels as any);
  }, [tableData, tableLabels]);

  function onChangeTableDataHandler(
    id: number,
    value: string | number,
    key: string
  ) {
    setTableData((prev: any) => {
      const updatedData = [...prev];
      const row: any = { ...updatedData[id] };

      console.log(row, "row");
      row[key as keyof typeof row] = value;
      updatedData[id] = row;
      return updatedData;
    });
  }

  // function addRow() {
  //   setDataSesson();
  //   const lastRow = tableData[tableData.length - 1];
  //   const isLastRowEmpty =
  //     Object.keys(lastRow).length === 0 ||
  //     props.columns.some(
  //       (col) =>
  //         col.isRequired && !lastRow[col.ACCESSOR as keyof typeof lastRow]
  //     );

  //   if (!isLastRowEmpty) {
  //     setTableData((prev: any) => [...prev, {}]);
  //   }
  // }

  function addRow() {
    setDataSesson();

    if (tableData && tableData.length > 0) {
      const lastRow = tableData[tableData.length - 1];
      const isLastRowEmpty =
        Object.keys(lastRow).length === 0 ||
        props.columns.some(
          (col) =>
            col.isRequired && !lastRow[col.ACCESSOR as keyof typeof lastRow]
        );

      if (!isLastRowEmpty) {
        const newRow = props.columns.reduce(
          (acc: { [key: string]: string }, col) => {
            if (col.ACCESSOR !== "sl_no") {
              acc[col.ACCESSOR] = "";
            }

            return acc;
          },
          {}
        );

        setTableData((prev: any) => [...prev, newRow]);
        // setTableLabels((prevLabels) => [...prevLabels, ""]);
      }
    }
  }

  const options = [
    {
      key: "yes",
      value: "Yes",
    },
    {
      key: "no",
      value: "No",
    },
  ];

  const header = <InnerHeading>{props.subHeading}</InnerHeading>;
  return (
    <>
      {header}
      <table className="table table-md mt-4">
        <thead className="  text-[1rem] bg-primary_green text-[#211F35]  ">
          <tr>
            {/* {props.labels && props.labels.length > 0 && (
              <th className=" font-medium w-[5%]">
                <div className="flex gap-2">
                  <span>Education Level</span>
                </div>
              </th>
            )} */}

            {props.columns?.map((cols, index: number) => (
              <>
                <th
                  key={index}
                  className={`border-b border-zinc-50 font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
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
          {tableData?.map((row: any, index: number) => {
            return (
              <tr
                key={index}
                className=" text-secondary border-b border-zinc-300"
              >
                {props.labels && props.labels.length > 0 && (
                  <td className="">
                    {props.labels[index] || `Label ${index + 1}`}
                  </td>
                )}
                {props.columns?.map((col, i: number) => {
                  return (
                    <React.Fragment key={col.ACCESSOR}>
                      <td className="">
                        {!col.type ? (
                          col.sl_no && i === 0 ? (
                            <span>{index + 1}</span>
                          ) : (
                            <InputField
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                onChangeTableDataHandler(
                                  index,
                                  e.target.value,
                                  col.ACCESSOR
                                )
                              }
                              value={
                                (tableData[index] as Record<string, string>)[
                                  col.ACCESSOR
                                ] || ""
                              }
                              name={col.ACCESSOR}
                              placeholder={"Enter " + col.HEADER}
                              isRequired={col.isRequired}
                            />
                          )
                        ) : col.type === "number" ? (
                          <InputField
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              onChangeTableDataHandler(
                                index,
                                Number(e.target.value),
                                col.ACCESSOR
                              )
                            }
                            value={
                              (tableData[index] as Record<string, string>)[
                                col.ACCESSOR
                              ] || ""
                            }
                            name={col.ACCESSOR}
                            type="text"
                            onKeyPress={(e: any) => {
                              if (!(e.key >= "0" && e.key <= "9")) {
                                e.preventDefault();
                              }
                            }}
                            placeholder={"Enter " + col.HEADER}
                            isRequired={col.isRequired}
                          />
                        ) : col.type === "radio" ? (
                          <div className="flex flex-col gap-3 pl-5 items-start">
                            {options.map((option) => (
                              <div
                                className="flex items-center mr-3 gap-2"
                                key={option.key}
                              >
                                <input
                                  className="mr-1 appearance-none border-2 border-zinc-400  rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent cursor-pointer"
                                  type="radio"
                                  id={option.value}
                                  value={option.value}
                                  onChange={() =>
                                    onChangeTableDataHandler(
                                      index,
                                      option.value,
                                      col.ACCESSOR
                                    )
                                  }
                                  checked={
                                    (
                                      tableData[index] as Record<string, string>
                                    )?.[col.ACCESSOR] === option.value
                                  }
                                />
                                <label
                                  className="text-secondary text-sm"
                                  htmlFor={option.key}
                                >
                                  {option.value}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : col.type === "select" ? (
                          <select
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              onChangeTableDataHandler(
                                index,
                                e.target.value,
                                col.ACCESSOR
                              )
                            }
                            value={
                              (tableData[index] as Record<string, string>)?.[
                                col.ACCESSOR
                              ]
                            }
                            name={col.ACCESSOR}
                            className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 w-full`}
                          >
                            <option selected value="">
                              {col.placeholder}
                            </option>
                            {/* tableData[0]?.name ? col?.select_options?.filter((item) => tableData[0]?.name !== item.name) */}
                            {/* {col?.select_options?.map((d: OptionProps) => (
                              <option key={d?.id} value={d?.name}>
                                {d?.name}
                              </option>
                            )): col?.select_options?.map((d: OptionProps) => (
                              <option key={d?.id} value={d?.name}>
                                {d?.name}
                              </option>
                            ))} */}

                            {col?.select_options?.map((d: OptionProps) => (
                              <option key={d?.id} value={d?.name}>
                                {d?.name}
                              </option>
                            ))}
                          </select>
                        ) : col.type === "date" ? (
                          <InputField
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              onChangeTableDataHandler(
                                index,
                                e.target.value,
                                col.ACCESSOR
                              )
                            }
                            value={
                              (tableData[index] as Record<string, string>)[
                                col.ACCESSOR
                              ] || ""
                            }
                            name={col.ACCESSOR}
                            type="date"
                            isRequired={col.isRequired}
                          />
                        ) : (
                          <></>
                        )}
                      </td>
                    </React.Fragment>
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

// "use client";

// /***
//  * Author: Krish
//  * Status: Open
//  * Date: 23/02/2024
//  */

// import { InnerHeading } from "@/components/Helpers/Heading";
// import React, { useEffect, useState } from "react";
// import Button from "../atoms/Button";

// type OptionProps = {
//   id: number;
//   name: string;
// };

// export interface COLUMNS {
//   HEADER: string;
//   ACCESSOR: string;
//   isRequired: boolean;
//   type?: "radio" | "select" | "text" | "number" | "date";
//   select_options?: OptionProps[];
//   placeholder?: string;
//   sl_no?: boolean;
// }

// interface TableFormProps {
//   columns: COLUMNS[];
//   getData: [];
//   addRows?: () => void;
//   session_key: string;
//   subHeading: string;
//   isRequired?: boolean;
//   setData: (key: string, values: any, index?: number | undefined) => void;
// }

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   isRequired?: boolean;
// }

// const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
//   return (
//     <>
//       <input
//         className={`w-full h-full p-2 bg-transparent outline-none ${isRequired && "placeholder-zinc-400"}`}
//         type="text"
//         {...props}
//       />
//     </>
//   );
// };

// const TableFormContainer: React.FC<TableFormProps> = (props) => {
//   const [tableData, setTableData] = useState([{}]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedData = sessionStorage.getItem(`${props.session_key}`);
//       setTableData(storedData ? JSON.parse(storedData) : [{}]);
//     }
//   }, [props.session_key]);

//   function setDataSesson() {
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem(`${props.session_key}`, JSON.stringify(tableData));
//     }
//   }

//   useEffect(() => {
//     props.setData(`${props.session_key}`, tableData);
//   }, [tableData]);

//   function onChangeTableDataHandler(id: number, value: string | number, key: string) {
//     setTableData((prev: any) => {
//       const updatedData = [...prev];
//       const row: any = { ...updatedData[id] };
//       row[key as keyof typeof row] = value;
//       updatedData[id] = row;
//       return updatedData;
//     });
//   }

//   function addRow() {
//     setDataSesson();
//     const lastRow = tableData[tableData.length - 1];
//     const isLastRowEmpty =
//       Object.keys(lastRow).length === 0 ||
//       props.columns.some(
//         (col) =>
//           col.isRequired && !lastRow[col.ACCESSOR as keyof typeof lastRow]
//       );

//     if (!isLastRowEmpty) {
//       setTableData((prev: any) => [...prev, {}]);
//     }
//   }

//   const options = [
//     {
//       key: "yes",
//       value: "Yes",
//     },
//     {
//       key: "no",
//       value: "No",
//     },
//   ];

//   const header = <InnerHeading>{props.subHeading}</InnerHeading>;
//   return (
//     <>
//       {header}
//       <table className="table table-md">
//         <thead className="  text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400 ">
//           <tr>
//             {props.columns?.map((cols, index: number) => (
//               <>
//                 <th
//                   key={index}
//                   className={`border  border-zinc-400  font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
//                 >
//                   <div className="flex gap-2">
//                     <span>{cols.HEADER}</span>
//                   </div>
//                 </th>
//               </>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {tableData?.map((row: any, index: number) => {
//             return (
//               <tr key={index} className=" text-secondary">
//                 {props.columns?.map((col) => {
//                   return (
//                     <React.Fragment key={col.ACCESSOR}>
//                       <td className="">
//                         {!col.type ? (
//                           <InputField
//                             onChange={(
//                               e: React.ChangeEvent<HTMLInputElement>
//                             ) =>
//                               onChangeTableDataHandler(
//                                 index,
//                                 e.target.value,
//                                 col.ACCESSOR
//                               )
//                             }
//                             value={
//                               col.sl_no
//                                 ? index + 1
//                                 : (tableData[index] as Record<string, string>)[
//                                     col.ACCESSOR
//                                   ] || ""
//                             }
//                             readOnly={col.sl_no}
//                             name={col.ACCESSOR}
//                             placeholder={"Enter " + col.HEADER}
//                             isRequired={col.isRequired}
//                           />
//                         ) : col.type === "number" ? (
//                           <InputField
//                             onChange={(
//                               e: React.ChangeEvent<HTMLInputElement>
//                             ) =>
//                               onChangeTableDataHandler(
//                                 index,
//                                 Number(e.target.value),
//                                 col.ACCESSOR
//                               )
//                             }
//                             value={
//                               col.sl_no
//                                 ? index + 1
//                                 : (tableData[index] as Record<string, string>)[
//                                     col.ACCESSOR
//                                   ] || ""
//                             }
//                             readOnly={col.sl_no}
//                             name={col.ACCESSOR}
//                             type="number"
//                             placeholder={"Enter " + col.HEADER}
//                             isRequired={col.isRequired}
//                           />
//                         ) : col.type === "radio" ? (
//                           <div className="flex flex-col gap-3 pl-5 items-start">
//                             {options.map((option) => (
//                               <div
//                                 className="flex items-center mr-3 gap-2"
//                                 key={option.key}
//                               >
//                                 <input
//                                   className="mr-1 appearance-none  rounded w-6 h-6 checked:bg-primary_green checked:text-white  checked:border-transparent"
//                                   type="radio"
//                                   id={option.value}
//                                   value={option.value}
//                                   onChange={() =>
//                                     onChangeTableDataHandler(
//                                       index,
//                                       option.value,
//                                       col.ACCESSOR
//                                     )
//                                   }
//                                   checked={
//                                     (
//                                       tableData[index] as Record<string, string>
//                                     )?.[col.ACCESSOR] === option.value
//                                   }
//                                 />
//                                 <label
//                                   className="text-secondary text-sm"
//                                   htmlFor={option.key}
//                                 >
//                                   {option.value}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         ) : col.type === "select" ? (
//                           <select
//                             onChange={(
//                               e: React.ChangeEvent<HTMLSelectElement>
//                             ) =>
//                               onChangeTableDataHandler(
//                                 index,
//                                 e.target.value,
//                                 col.ACCESSOR
//                               )
//                             }
//                             value={
//                               (tableData[index] as Record<string, string>)?.[
//                                 col.ACCESSOR
//                               ]
//                             }
//                             name={col.ACCESSOR}
//                             className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 w-full`}
//                           >
//                             <option selected value="">
//                               {col.placeholder}
//                             </option>
//                             {col?.select_options?.map((d: OptionProps) => (
//                               <option key={d?.id} value={d?.id}>
//                                 {d?.name}
//                               </option>
//                             ))}
//                           </select>
//                         ) : col.type === "date" ? (
//                           <InputField
//                             onChange={(
//                               e: React.ChangeEvent<HTMLInputElement>
//                             ) =>
//                               onChangeTableDataHandler(
//                                 index,
//                                 e.target.value,
//                                 col.ACCESSOR
//                               )
//                             }
//                             value={
//                               col.sl_no
//                                 ? index + 1
//                                 : (tableData[index] as Record<string, string>)[
//                                     col.ACCESSOR
//                                   ] || ""
//                             }
//                             readOnly={col.sl_no}
//                             name={col.ACCESSOR}
//                             type="date"
//                             isRequired={col.isRequired}
//                           />
//                         ) : (
//                           <></>
//                         )}
//                       </td>
//                     </React.Fragment>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="w-full flex items-center justify-end mt-3">
//         <Button onClick={addRow} buttontype="button" variant="primary_rounded">
//           Add
//         </Button>
//       </div>
//     </>
//   );
// };

// export default TableFormContainer;
