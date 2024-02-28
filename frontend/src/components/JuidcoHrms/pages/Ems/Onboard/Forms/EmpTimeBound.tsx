"use client"

import React, { useState } from 'react'
import TableFormContainer from '@/components/global/organisms/TableFormContainer'
import { SubHeading } from '@/components/Helpers/Heading'
import { COLUMNS } from '@/components/global/organisms/TableFormContainer'
import PrimaryButton from '@/components/Helpers/Button'
import goBack from "@/utils/helper";
import Button from '@/components/global/atoms/Button'
import { EmployeeTimeBoundDetailType, EmployeeDetailsProps } from '@/utils/types/employee.type'
import { usePathname, useRouter } from "next/navigation";



export const EmpTimeBound: React.FC<
    EmployeeDetailsProps<EmployeeTimeBoundDetailType>
> = (props) => {

    const pathName = usePathname();
    const router = useRouter();

    const COLUMNS_FOR_EMP_TRNG_INFRM = [
        {
            HEADER: "Sl. No.",

        },
        {
            HEADER: "Pay Scale",

        },

        {
            HEADER: "Increment Amount",

        },

        {
            HEADER: "B.Pay After Increment",

        },

        {
            HEADER: "Vide Order No",

        },

        {
            HEADER: "Vide Order Date",


        },
        {
            HEADER: "Remarks",

        },
    ];

    const [tableData, setTableData] = useState({
        pay_scale: {
            from: "",
            to: "",
        },
        inc_amt: "",
        b_after_pay: "",
        vide_order_no: "",
        vide_order_date: "",
        remarks: ""
    });


    const handleInputChange = (fieldName: string, value: string, nestedKey?: string) => {
        setTableData((prevFormData) => {
            if (nestedKey) {
                return {
                    ...prevFormData,
                    [fieldName]: {
                        ...(prevFormData as any)[fieldName],
                        [nestedKey]: value,
                    },
                };
            } else {
                return {
                    ...prevFormData,
                    [fieldName]: value,
                };
            }
        });
    };

    const saveDataToSessionStorage = () => {
        if (typeof window !== "undefined") {
            const updatedFormData: any = {
                ...tableData,

            };
            sessionStorage.setItem("emp_timebound_details", JSON.stringify(updatedFormData));

            if (props.setData) {
                props.setData("emp_timebound_details", updatedFormData);
            }

            router.push(`${pathName}?page=9`);
        }
    };

    const [employeeTrainig, setEmployeeTrainig] = useState<EmployeeTimeBoundDetailType[]>([]);

    const defaultRowValuesEmployees = {
        pay_scale: {
            from: "",
            to: "",
        },
        inc_amt: "",
        b_after_pay: "",
        vide_order_no: "",
        vide_order_date: "",
        remarks: ""
    };

    const handleRowChanges = (rowIndex: number, key: keyof typeof defaultRowValuesEmployees, value: string) => {
        setEmployeeTrainig((prevTrainig) => {
            const updatedEmployeeTrainig = [...prevTrainig];
            updatedEmployeeTrainig[rowIndex][key as keyof EmployeeTimeBoundDetailType] = value;
            return updatedEmployeeTrainig;
        });
    };
    


    const addDatas = () => {
        if (employeeTrainig.length < 2) {
            const newRow = COLUMNS_FOR_EMP_TRNG_INFRM.reduce((acc, column, index) => {
                const stateKey = Object.keys(defaultRowValuesEmployees)[index];
                return { ...acc, [stateKey]: '' };
            }, {} as EmployeeTimeBoundDetailType);
    
            setEmployeeTrainig((prev: EmployeeTimeBoundDetailType[]) => [...prev, newRow]);
        }
    };
    
    
    return (
        <>
            <SubHeading className="text-[20px] pt-4 mt-10 mb-4">
                Time Bound Promotion/ACP/MACP details
            </SubHeading>
            <div>
                <table>
                    <thead className="text-[1rem] bg-primary_green text-white ">
                        <tr>
                            {COLUMNS_FOR_EMP_TRNG_INFRM?.map((cols, index: number) => (
                                <>
                                    <th
                                        key={index}
                                        className={`border  border-zinc-400 p-3 font-medium ${index === 0 ? "w-[5%]" : "w-[20%]"}`}
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
                        <tr className="border border-zinc-400 text-secondary w-full">
                            <td className="text-center w-[4.27%]">
                                <span>1</span>
                            </td>

                            <td className="border border-zinc-400 w-[24.27%]">
                                <div className='inline-flex items-center px-2 py-2'>
                                    <React.Fragment>
                                        <p className="mr-2">From:</p>
                                        <input
                                            type="text"
                                            className="w-full h-full p-2 bg-transparent border border-gray-300"
                                            placeholder="Enter Increment Amount"
                                            onChange={(e) => handleInputChange("pay_scale", e.target.value, "from")}
                                            value={tableData.pay_scale.from}
                                        />
                                        <p className="ml-2 mr-2">To:</p>
                                        <input
                                            type="text"
                                            className="w-full h-full p-2 bg-transparent border border-gray-300"
                                            placeholder="Enter Increment Amount"
                                            onChange={(e) => handleInputChange("pay_scale", e.target.value, "to")}
                                            value={tableData.pay_scale.to}
                                        />
                                    </React.Fragment>
                                </div>
                            </td>

                            <td className="border border-zinc-400 w-[14.27%]">
                                <input
                                    type="text"
                                    className="w-full h-full p-2 bg-transparent outline-none"
                                    placeholder="Enter Increment Amount"
                                    value={tableData.inc_amt}
                                    onChange={(e) => handleInputChange("inc_amt", e.target.value)}
                                />
                            </td>

                            <td className="border border-zinc-400 w-[14.27%]">
                                <input
                                    type="text"
                                    className="w-full h-full p-2 bg-transparent outline-none"
                                    placeholder="Enter B.Pay After Incrementing"
                                    value={tableData.b_after_pay}
                                    onChange={(e) => handleInputChange("b_after_pay", e.target.value)}
                                />
                            </td>

                            <td className="border border-zinc-400 w-[14.27%]">
                                <input
                                    type="text"
                                    className="w-full h-full p-2 bg-transparent outline-none"
                                    placeholder="Enter Vide Order No"
                                    value={tableData.vide_order_no}
                                    onChange={(e) => handleInputChange("vide_order_no", e.target.value)}
                                />
                            </td>

                            <td className="border border-zinc-400 w-[14.27%]">
                                <input
                                    type="date"
                                    className="w-full h-full p-2 bg-transparent outline-none"
                                    placeholder="Enter Vide Order Date"
                                    value={tableData.vide_order_date}
                                    onChange={(e) => handleInputChange("vide_order_date", e.target.value)}
                                />
                            </td>

                            <td className="border border-zinc-400 w-[14.27%]">
                                <input
                                    type="text"
                                    className="w-full h-full p-2 bg-transparent outline-none"
                                    placeholder="Enter Remarks"
                                    value={tableData.remarks}
                                    onChange={(e) => handleInputChange("remarks", e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                    
                    <tbody>
                        {employeeTrainig.map((rowData: any, rowIndex) => (
                            <tr key={rowIndex} className="border py-2 px-4 ">
                                <td className="border py-2 px-4 text-center ">
                                    <span>{rowIndex + 2}</span>
                                </td>
                                {COLUMNS_FOR_EMP_TRNG_INFRM.map((column, colIndex) => {
                                    const stateKey: any = Object.keys(defaultRowValuesEmployees)[colIndex];
                                    return (
                                        <td key={colIndex} className="border">
                                            {colIndex === 0 ? (
                                                <div className=' inline-flex items-center pt-1 pb-1 mx-2 my-2'>
                                                    <React.Fragment>
                                                    <p className="mr-2">From:</p>
                                                    <input
                                                        type="text"
                                                        className="w-full h-full p-2 bg-transparent border border-gray-300"
                                                        placeholder="Enter Increment Amount"
                                                        onChange={(e) => handleInputChange(stateKey, e.target.value, "from")}
                                                        value={rowData[stateKey]?.from || ''}
                                                    />
                                                    <p className="ml-2 mr-2">To:</p>
                                                    <input
                                                        type="text"
                                                        className="w-full h-full p-2 bg-transparent border border-gray-300"
                                                        placeholder="Enter Increment Amount"
                                                        onChange={(e) => handleInputChange(stateKey, e.target.value, "to")}
                                                        value={rowData[stateKey]?.to || ''}
                                                    />
                                                </React.Fragment>
                                                </div>
                                                
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="w-full h-full bg-transparent outline-none"
                                                    // placeholder={`Enter ${column.HEADER}`}
                                                    // placeholder={colIndex === 1 ? `Enter ${column.HEADER}` : ""}
                                                    placeholder={colIndex === 1 ? `Enter Increment Amount` : colIndex === 2 ? `Enter B.Pay After Increment` : colIndex === 3 ? `Enter Vide Order No` : colIndex === 4 ? `Enter Vide Order Date` :  colIndex === 5 ? `Enter Remakrs` : `Enter ${column.HEADER}`}
                                                    value={rowData[stateKey]}
                                                    onChange={(e) => handleRowChanges(rowIndex, stateKey, e.target.value)}
                                                />
                                            )}
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

            <div className="flex items-center justify-end mt-5 gap-5">
                <PrimaryButton buttonType="button" variant={"cancel"} onClick={goBack}>
                    Back
                </PrimaryButton>

                <PrimaryButton buttonType="button" variant={"cancel"}>
                    Reset
                </PrimaryButton>

                <PrimaryButton onClick={saveDataToSessionStorage} buttonType="submit" variant="primary">
                    Save
                </PrimaryButton>
            </div>


        </>
    )
}

