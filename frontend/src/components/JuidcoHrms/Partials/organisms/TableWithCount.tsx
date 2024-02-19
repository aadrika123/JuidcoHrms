"use client";
import React, { ReactElement, ReactNode } from "react";
import TotalCountTable from "../molecules/TotalCountTable";
import Button from "@/components/global/atoms/Button";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/reducers/PopupReducers";
import Table from "@/components/global/molecules/Table";
import goBack from "@/utils/helper";

export interface ColumnProps {
  name: string;
  caption: string | ReactElement;
  value?: (id: string) => ReactNode;
  color?: string;
  width?: string;
}

type FooterData = {
  key: string;
  value: number;
};

interface TableHOCProps<T> {
  columns: Array<ColumnProps>;
  data?: T[];
  center?: boolean;
  scrollable?: boolean;
  height?: string;
  title: string;
  footerData?: FooterData[];
  handleStore: (data: T[] | undefined) => void;
  handleResetTable: () => void;
}

const TableWithCount: React.FC<TableHOCProps<unknown>> = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openPopup());
  };

  return (
    <>
      <section className="border bg-white rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between items-center mb-2">
          <div className="text-secondary text-sub_head font-semibold">
            {props.title}
          </div>
          <Button onClick={handleClick} buttontype="button" variant="primary">
            Add New Entry
          </Button>
        </div>
        <Table {...props} />
        {props.footerData && props.footerData.length > 0 && (
          <TotalCountTable footerData={props.footerData} />
        )}
        <aside className="flex items-center justify-end py-5 gap-5">
          <Button onClick={goBack} buttontype="button" variant="cancel">
            Back
          </Button>
          <Button
            onClick={props.handleResetTable}
            buttontype="button"
            variant="cancel"
          >
            Reset
          </Button>
          <Button
            onClick={() => props.handleStore(props.data)}
            buttontype="button"
            variant="primary"
          >
            Submit
          </Button>
        </aside>
      </section>
    </>
  );
};

export default TableWithCount;
