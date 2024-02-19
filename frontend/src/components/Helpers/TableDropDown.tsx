import { useQuery } from "react-query";
import React from "react";
import axios from "@/lib/axiosConfig";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 30-01-2024
 * | Created for- Select Input Field
 * | Status- done
 */

interface DropDownListProps {
  name: string;
  placeholder: string | "";
  value: number | string;
  api: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isRequired?: boolean | false;
}

interface DropDownList {
  id: number;
  name?: string;
  type?: string;
}

const TableDropDownList: React.FC<DropDownListProps> = (props) => {
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
        <select
          onChange={props.onChange}
          required={props.isRequired}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
        >
          <option selected value="">{props.placeholder}</option>
          {dataList.map((d: DropDownList) => (
            <option key={d?.id} value={d?.id}>
              {d?.name || d?.type}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TableDropDownList;
