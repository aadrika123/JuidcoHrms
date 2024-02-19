"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import Loader from "../atoms/Loader";
import DebouncedSearch from "../atoms/DebouncedSearch";
import Table, { ColumnProps } from "../molecules/Table";
import NextPrevPagination from "../molecules/NextPrevPagination";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 02-02-2024
 * | Created for- Reusable Record List With Search
 * | Status: open
 */

interface TableWithFeaturesProps {
  title: string;
  columns: Array<ColumnProps>;
  api: string;
  numberOfRowsPerPage: number;
  value?: () => void;
  center?: boolean;
}

interface stateTypes<T> {
  page: number;
  pageCount: number;
  searchText: string;
  data: T[];
}

const TableWithFeatures = <T,>({
  title,
  columns,
  api,
  numberOfRowsPerPage,
  center=false,
}: TableWithFeaturesProps) => {
  const [state, setState] = useState<stateTypes<T>>({
    page: 1,
    pageCount: 0,
    searchText: "",
    data: [],
  });
  const { page, pageCount, searchText, data } = state;

  const fetchData = async (): Promise<T[]> => {
    const res = await axios({
      url: `${api}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}`,
      method: "GET",
    });

    let data = res.data?.data;
    console.log(data)
    if (data == null) {
      data = { totalPage: 0, data: [] };
    }

    setState((prev) => ({
      ...prev,
      pageCount: data.totalPage,
      data: data.data,
    }));
    return data?.data;
  };

  const {
    isError: fetchingError,
    isLoading: isFetching,
    refetch: refetchData,
  } = useQuery([page, searchText], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
  }

  useEffect(() => {
    refetchData();
  }, [page, searchText]);

  const handlePageChange = (direction: "prev" | "next") => {
    const newPageNumber = direction === "prev" ? page - 1 : page + 1;
    if (newPageNumber > 0 && newPageNumber <= pageCount) {
      setState((prev) => ({ ...prev, page: newPageNumber }));
    }
  };

  const onSearchTextChange = (text: string) => {
    setState((prev) => ({ ...prev, searchText: text, page: 1 }));
  };

  return (
    <>
      <section className="border bg-white rounded-lg border-[#12743B] p-6 px-10">
        <div className="flex justify-between items-center">
          <div className="text-secondary text-sub_head font-semibold">
            {title}
          </div>
          <DebouncedSearch onChange={onSearchTextChange} />
        </div>

        <div className="mt-8">
          {isFetching ? (
            <Loader />
          ) : (
            <>
              <Table
                columns={columns}
                data={data}
                center={center}
                // scrollable
              />
              <NextPrevPagination
                page={page}
                pageCount={pageCount}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TableWithFeatures;
