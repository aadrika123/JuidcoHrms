import { useQuery} from "react-query";
import React from "react";
import axios from "axios";
import { useField } from "formik";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 25-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

interface DropDownListBoxProps {
  label: React.ReactNode;
  name: string;
  placeholder: string | "";
  value: number;
  api: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e?: React.FocusEvent<HTMLSelectElement>) => void;
}


interface Employee{
  id: number;
  name: string;
}

const DropDownListBox: React.FC<DropDownListBoxProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;

  const fieldId = "id_" + props.name;

  console.log(field);
  console.log(meta);
  
  const fetchData = async (): Promise<Employee[]> => {
    const res = await axios({
      url: props.api,
      method: "GET",
    });
    
    return res.data?.data?.data;
  };

  
  const {
    data: employeeData = [],
    isError: dataError,
  } = useQuery([], fetchData);
  
  if (dataError) {
    throw new Error("Fatal Error!");
  }
    


  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
        </label>
        <select
          onChange={(event)=> setValue(parseInt(event.target.value))}
          onBlur={props.onBlur}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
        >
          <option value="-1">{props.placeholder}</option>

          {employeeData.map((emp: Employee) => 
          <option key={emp.id} value={emp.id}>{emp.name}</option>
          )}
          
          </select>
        
        
        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default DropDownListBox;
