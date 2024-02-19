import { useQuery } from "react-query";
import React from "react";
import axios from "@/lib/axiosConfig";
import { useField } from "formik";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 27-01-2024
 * | Created for- Select Input Field
 * | Status- done
 */

interface DropDownListProps {
  label?: React.ReactNode;
  name: string;
  placeholder: string | "";
  value: number | string;
  api: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e?: React.FocusEvent<HTMLSelectElement>) => void;
}

interface DropDownList {
  id: number;
  name?: string;
  type?: string;
}

const DropDownList: React.FC<DropDownListProps> = (props) => {
  const [, , helpers] = useField(props.name);

  const { setValue } = helpers;

  const fieldId = "id_" + props.name;

  const fetchData = async (): Promise<DropDownList[]> => {
    const res = await axios({
      url: props.api,
      method: "GET",
    });

    return res.data?.data;
  };

  const { data: dataList = [], isError: dataError } = useQuery({
    queryKey: [props.name],
    queryFn: fetchData,
  });

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
          onChange={(event) => setValue(parseInt(event.target.value))}
          onBlur={props.onBlur}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
        >
          <option selected value="">
            {props.placeholder}
          </option>
          {dataList.map((d: DropDownList) => (
            <option key={d?.id} value={d?.id}>
              {d?.name || d?.type}
            </option>
          ))}
        </select>

        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default DropDownList;
