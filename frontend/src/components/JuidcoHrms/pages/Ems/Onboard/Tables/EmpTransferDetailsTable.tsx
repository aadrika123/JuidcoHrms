/***
 * Author: Krish
 * Status: Open
 * Uses: EMployee promotion details is a section of Emp Service details
 */

import { InnerHeading } from "@/components/Helpers/Heading";
import React, { useEffect, useState } from "react";
import Button from "../../../../../global/atoms/Button";
import { EmployeeTransDetails } from "@/utils/types/employee.type";
import { removeObj } from "@/utils/helper";

interface TableFormProps {
  setData: (key: string, values: any, index?: number | undefined) => void;
  setSession: number;
  resetTable: number;
  validate: (value: boolean) => void;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
  return (
    <>
      <input
        className={`w-full h-full p-2 bg-transparent outline-none border border-zinc-400 rounded-xl ${isRequired && "placeholder-zinc-400"}`}
        type="text"
        {...props}
      />
    </>
  );
};

const EmployeeTransferDetailsTable: React.FC<TableFormProps> = (props) => {
  const [tableData, setTableData] = useState<EmployeeTransDetails[]>([
    {
      designation: {
        from: "",
        to: "",
      },
      office: {
        from: "",
        to: "",
      },
      join_date: "",
      vide_order_no: "",
      vide_order_date: "",
      transfer_after_prom: "no",
    },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("emp_trans_details");
      setTableData(storedData ? JSON.parse(storedData) : [{}]);
    }
  }, []);

  function setDataSesson() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("emp_trans_details", JSON.stringify(tableData));
    }
  }

  useEffect(() => {
    if (props.setSession === 1) setDataSesson();
  }, [props.setSession]);

  const columns = [
    {
      header: "Sl.No.",
    },
    {
      header: "Designation ",
    },
    {
      header: "Office",
    },
    {
      header: "Joining Date",
    },
    {
      header: "Vide Order No.",
    },
    {
      header: "Vide Order Date",
    },
    {
      header: "Transfer and Promotion",
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
      console.log(row, "row");
      updatedData[id] = { ...row } as EmployeeTransDetails;
      return updatedData;
    });
  }

  function addRow() {
    setDataSesson();
    const lastRow = tableData[tableData.length - 1];
    const isLastRowEmpty = Object.values(lastRow).every((row) =>
      Object.values(row).every((val) => val === "")
    );

    if (!isLastRowEmpty) {
      setTableData((prev: any) => [
        ...prev,
        {
          designation: {
            from: "",
            to: "",
          },

          office: {
            from: "",
            to: "",
          },

          vide_order_no: "",

          vide_order_date: "",

          transfer: "",
        },
      ]);
    }
  }

  const removeRow = (index: number) => {
    setTableData((prev: any) => {
      prev?.splice(index, 1)
      return [
        ...prev
      ]
    });
  }

  const options = [
    {
      key: "Yes",
      value: "yes",
    },
    {
      key: "No",
      value: "no",
    },
  ];

  useEffect(() => {
    if (props.setData) {
      const filterTableData = removeObj(tableData);
      props.setData("emp_trans_details", filterTableData);
    }
  }, [tableData]);

  useEffect(() => {
    if (props.resetTable !== 0) {
      // setTableData([
      //   {
      //     designation: {
      //       from: "",
      //       to: "",
      //     },
      //     scale: {
      //       from: "",
      //       to: "",
      //     },
      //     vide_order_no: "",
      //     vide_order_date: "",
      //     transfer: "no",
      //     join_date: "",
      //   },
      // ]);
      props.validate(true);
    }
  }, [props.resetTable]);

  const header = <InnerHeading>Employee Transfer Details </InnerHeading>;
  return (
    <>
      {header}
      <table className="table table-md mt-4">
        <thead className="  text-[1rem] bg-primary_green text-[#211F35]  ">
          <tr>
            {columns?.map((cols, index: number) => (
              <>
                <th
                  key={index}
                  className={` border-b border-zinc-50 font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
                >
                  <div className="flex gap-2">
                    <span>{cols.header}</span>
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
                className=" text-secondary w-full border-b border-zinc-300"
              >
                {/* -----------------------SL_NO----------------------------------- */}
                <td className="text-center">
                  <span>{index + 1}</span>
                </td>
                {/* -----------------------SL_NO----------------------------------- */}

                {/* -----------------------DESIGINATION----------------------------------- */}
                <td className=" ">
                  <React.Fragment>
                    <p>From:</p>
                    <InputField
                      onChange={(e) =>
                        onChangeTableDataHandler(
                          index,
                          e.target.value,
                          "designation",
                          "from"
                        )
                      }
                      value={row?.designation?.from}
                      placeholder={"Enter "}    
                      isRequired={true}
                      onKeyPress={(e: any) => {
                        const regex = /^[a-zA-Z0-9.]$/;
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />

                    <p>To:</p>
                    <InputField
                      onChange={(e) =>
                        onChangeTableDataHandler(
                          index,
                          e.target.value,
                          "designation",
                          "to"
                        )
                      }
                      value={row.designation?.to}
                      placeholder={"Enter "}
                      isRequired={true}
                      onKeyPress={(e: any) => {
                        const regex = /^[a-zA-Z0-9.]$/;
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </React.Fragment>
                </td>
                {/* -----------------------DESIGINATION----------------------------------- */}

                {/* ---------------------------OFFICE----------------------------------- */}
                <td className="">
                  <React.Fragment>
                    <p>From:</p>
                    <InputField
                      onChange={(e) =>
                        onChangeTableDataHandler(
                          index,
                          e.target.value,
                          "office",
                          "from"
                        )
                      }
                      value={row?.office?.from}
                      placeholder={"Enter "}
                      isRequired={true}
                    />

                    <p>To:</p>
                    <InputField
                      onChange={(e) =>
                        onChangeTableDataHandler(
                          index,
                          e.target.value,
                          "office",
                          "to"
                        )
                      }
                      value={row?.office?.to}
                      placeholder={"Enter "}
                      isRequired={true}
                    />
                  </React.Fragment>
                </td>
                {/* ---------------------------OFFICE----------------------------------- */}

                {/* ---------------------------Joining date----------------------------------- */}
                <td className=" ">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(
                        index,
                        e.target.value,
                        "join_date"
                      )
                    }
                    type="date"
                    value={row?.join_date}
                    placeholder={"Enter "}
                    isRequired={true}
                  />
                </td>
                {/* ---------------------------Joining date----------------------------------- */}

                {/* ---------------------------VIDE ORDER NO----------------------------------- */}
                <td className=" ">
                  <React.Fragment>
                    <InputField
                      onChange={(e) =>
                        onChangeTableDataHandler(
                          index,
                          e.target.value,
                          "vide_order_no"
                        )
                      }
                      value={row?.vide_order_no}
                      placeholder={"Enter "}
                      isRequired={true}
                      maxLength={10}
                      onKeyPress={(e: any) => {
                        if (
                          !(
                            (e.key >= "a" && e.key <= "z") ||
                            (e.key >= "A" && e.key <= "Z") ||
                            (e.key >= "0" && e.key <= "9") ||
                            e.key === " "
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </React.Fragment>
                </td>
                {/* ---------------------------VIDE ORDER NO----------------------------------- */}

                {/* ---------------------------VIDE ORDER DATE----------------------------------- */}
                <td className=" ">
                  <InputField
                    onChange={(e) =>
                      onChangeTableDataHandler(
                        index,
                        e.target.value,
                        "vide_order_date"
                      )
                    }
                    type="date"
                    value={row?.vide_order_date}
                    placeholder={"Enter "}
                    isRequired={true}
                  />
                </td>
                {/* ---------------------------VIDE ORDER DATE----------------------------------- */}

                {/* ---------------------------TRANSFER----------------------------------- */}
                <td className=" ">
                  <div className="flex flex-col items-start justify-center gap-4">
                    <div>
                      <div className="flex flex-col gap-3 pl-5 items-start">
                        {options.map((option) => (
                          <div
                            className="flex items-center mr-3 gap-2"
                            key={option.key}
                          >
                            <input
                              className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent"
                              type="radio"
                              id={option.value}
                              value={option.value}
                              onChange={() =>
                                onChangeTableDataHandler(
                                  index,
                                  option.value,
                                  "transfer_after_prom"
                                )
                              }
                              checked={
                                tableData[index]?.transfer_after_prom ===
                                option.value
                              }
                            />
                            <label
                              className="text-secondary text-sm"
                              htmlFor={option.key}
                            >
                              {option.key}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                {/* ---------------------------TRANSFER----------------------------------- */}

                {index > 0 && (
                  <td className="w-[5%]">
                    <Button
                      variant="cancel"
                      onClick={() => {
                        removeRow(index);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                )}
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

export default EmployeeTransferDetailsTable;

/***
 * Author: Krish
 * Status: Open
 * Uses: EMployee promotion details is a section of Emp Service details
//  */

// import { InnerHeading } from "@/components/Helpers/Heading";
// import React, { useEffect, useState } from "react";
// import Button from "../../../../../global/atoms/Button";
// import { EmployeeTransDetails } from "@/utils/types/employee.type";
// import { removeObj } from "@/utils/helper";

// interface TableFormProps {
//   setData: (key: string, values: any, index?: number | undefined) => void;
//   setSession: number;
// }

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   isRequired?: boolean;
// }

// const InputField: React.FC<InputFieldProps> = ({ isRequired, ...props }) => {
//   return (
//     <>
//       <input
//         className={`w-full h-full p-2 bg-transparent outline-none border border-zinc-400 rounded-xl ${isRequired && "placeholder-zinc-400"}`}
//         type="text"
//         {...props}
//       />
//     </>
//   );
// };

// const EmployeeTransferDetailsTable: React.FC<TableFormProps> = (props) => {
//   const [tableData, setTableData] = useState<EmployeeTransDetails[]>([
// {
//   designation: {
//     from: "",
//     to: "",
//   },
//   office: {
//     from: "",
//     to: "",
//   },
//   join_date: "",
//   vide_order_no: "",
//   vide_order_date: "",
//   transfer_after_prom: "no",
// },
//   ]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedData = sessionStorage.getItem("emp_trans_details");
//       setTableData(storedData ? JSON.parse(storedData) : [{}]);
//     }
//   }, []);

//   function setDataSesson() {
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem("emp_trans_details", JSON.stringify(tableData));
//     }
//   }

//   useEffect(() => {
//     if (props.setSession === 1) setDataSesson();
//   }, [props.setSession]);

// const columns = [
//   {
//     header: "Sl.No.",
//   },
//   {
//     header: "Designation ",
//   },
//   {
//     header: "Office",
//   },
//   {
//     header: "Joining Date",
//   },
//   {
//     header: "Vide Order No.",
//   },
//   {
//     header: "Vide Order Date",
//   },
//   {
//     header: "Transfer and Promotion",
//   },
// ];
//   function onChangeTableDataHandler(
//     id: number,
//     value: string,
//     key: string,
//     innerKey?: string
//   ) {
//     setTableData((prev) => {
//       const updatedData = [...prev];
//       const row: Record<string, any> = { ...updatedData[id] };

//       if (innerKey) {
//         if (!row[key]) {
//           row[key] = {};
//         }
//         const nestedObject: Record<string, string | boolean> = row[key];
//         nestedObject[innerKey] = value;
//       } else {
//         row[key] = value;
//       }

//       updatedData[id] = { ...row } as EmployeeTransDetails;
//       return updatedData;
//     });
//   }

//   function addRow() {
//     setDataSesson();
//     const lastRow = tableData[tableData.length - 1];
//     const isLastRowEmpty = Object.values(lastRow).every((row) =>
//       Object.values(row).every((val) => val === "")
//     );
//     console.log(isLastRowEmpty);
//     if (!isLastRowEmpty) {
//       setTableData((prev: any) => [
//         ...prev,
//         {
//           desigination: {
//             from: "",
//             to: "",
//           },
//           office: {
//             from: "",
//             to: "",
//           },

//           join_date: "",

//           vide_order_no: "",
//           vide_order_date: "",
//           transfer_after_prom: "no",
//         },
//       ]);
//     }
//   }

//   const options = [
//     {
//       key: "Yes",
//       value: "yes",
//     },
//     {
//       key: "No",
//       value: "no",
//     },
//   ];

//   useEffect(() => {
//     if (props.setData) {
//       const filterTableData = removeObj(tableData);
//       props.setData("emp_trans_details", filterTableData);
//     }
//   }, [tableData]);

//   const header = <InnerHeading>Employee Transfer Details</InnerHeading>;
//   return (
//     <>
//       {header}
//       <table className="table table-md mt-4">
//         <thead className="  text-[1rem] bg-primary_green text-[#211F35]  ">
//           <tr>
//             {columns?.map((cols, index: number) => (
//               <>
//                 <th
//                   key={index}
//                   className={`border border-transparent font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
//                 >
//                   <div className="flex gap-2">
//                     <span>{cols.header}</span>
//                   </div>
//                 </th>
//               </>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {tableData?.map((row, index: number) => {
//             return (
//               <tr
//                 key={index}
//                 className=" text-secondary w-full border-b border-zinc-300"
//               >
//                 {/* -----------------------SL_NO----------------------------------- */}
//                 <td className="text-center">
//                   <span>{index + 1}</span>
//                 </td>
//                 {/* -----------------------SL_NO----------------------------------- */}

//                 {/* -----------------------DESIGINATION----------------------------------- */}
//                 <td className=" ">
//                   <React.Fragment>
//                     <p>From:</p>
//                     <InputField
//                       onChange={(e) =>
//                         onChangeTableDataHandler(
//                           index,
//                           e.target.value,
//                           "designation",
//                           "from"
//                         )
//                       }
//                       value={row?.designation?.from}
//                       placeholder={"Enter "}
//                       isRequired={true}
//                     />

//                     <p>To:</p>
//                     <InputField
//                       onChange={(e) =>
//                         onChangeTableDataHandler(
//                           index,
//                           e.target.value,
//                           "designation",
//                           "to"
//                         )
//                       }
//                       value={row.designation?.to}
//                       placeholder={"Enter "}
//                       isRequired={true}
//                     />
//                   </React.Fragment>
//                 </td>
//                 {/* -----------------------DESIGINATION----------------------------------- */}

//                 {/* ---------------------------OFFICE----------------------------------- */}
//                 <td className=" ">
//                   <React.Fragment>
//                     <p>From:</p>
//                     <InputField
//                       onChange={(e) =>
//                         onChangeTableDataHandler(
//                           index,
//                           e.target.value,
//                           "office",
//                           "from"
//                         )
//                       }
//                       value={row?.office?.from}
//                       placeholder={"Enter "}
//                       isRequired={true}
//                     />

//                     <p>To:</p>
//                     <InputField
//                       onChange={(e) =>
//                         onChangeTableDataHandler(
//                           index,
//                           e.target.value,
//                           "office",
//                           "to"
//                         )
//                       }
//                       value={row?.office?.to}
//                       placeholder={"Enter "}
//                       isRequired={true}
//                     />
//                   </React.Fragment>
//                 </td>
//                 {/* ---------------------------SCALE----------------------------------- */}

//                 {/* join_date */}

// <td className=" ">
//   <InputField
//     onChange={(e) =>
//       onChangeTableDataHandler(
//         index,
//         e.target.value,
//         "join_date"
//       )
//     }
//     type="date"
//     value={row?.join_date}
//     placeholder={"Enter "}
//     isRequired={true}
//   />
// </td>

// {/* ---------------------------VIDE ORDER NO----------------------------------- */}
// <td className=" ">
//   <React.Fragment>
//     <InputField
//       onChange={(e) =>
//         onChangeTableDataHandler(
//           index,
//           e.target.value,
//           "vide_order_no"
//         )
//       }
//       value={row?.vide_order_no}
//       placeholder={"Enter "}
//       isRequired={true}
//     />
//   </React.Fragment>
// </td>
// {/* ---------------------------VIDE ORDER NO----------------------------------- */}

//                 {/* ---------------------------VIDE ORDER DATE----------------------------------- */}
//                 <td className=" ">
//                   <InputField
//                     onChange={(e) =>
//                       onChangeTableDataHandler(
//                         index,
//                         e.target.value,
//                         "vide_order_date"
//                       )
//                     }
//                     type="date"
//                     value={row?.vide_order_date}
//                     placeholder={"Enter "}
//                     isRequired={true}
//                   />
//                 </td>
//                 {/* ---------------------------VIDE ORDER DATE----------------------------------- */}

// {/* ---------------------------TRANSFER----------------------------------- */}
// <td className=" ">
//   <div className="flex flex-col items-start justify-center gap-4">
//     <div>
//       <div className="flex flex-col gap-3 pl-5 items-start">
//         {options.map((option) => (
//           <div
//             className="flex items-center mr-3 gap-2"
//             key={option.key}
//           >
//             <input
//               className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-[#4338CA] checked:text-white  checked:border-transparent"
//               type="radio"
//               id={option.value}
//               value={option.value}
//               onChange={() =>
//                 onChangeTableDataHandler(
//                   index,
//                   option.value,
//                   "transfer_after_prom"
//                 )
//               }
//               checked={
//                 tableData[index]?.transfer_after_prom ===
//                 option.value
//               }
//             />
//             <label
//               className="text-secondary text-sm"
//               htmlFor={option.key}
//             >
//               {option.key}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// </td>
// {/* ---------------------------TRANSFER----------------------------------- */}
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

// export default EmployeeTransferDetailsTable;
