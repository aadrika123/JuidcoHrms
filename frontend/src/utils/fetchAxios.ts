/***
 * AUTHOR: KRISH
 * STATUS: OPEN
 * USE: FETCH ANY GET DATA AND POST ANY DATA WITH THIS FETCH AXIOS RESUSEABLE COMPONENT
 */

import axios from "@/lib/axiosConfig";
import { useQuery, useQueryClient } from "react-query";

export type FetchAxios = {
  url: string;
  url_extend: string;
  method: "GET" | "POST";
  data: any;
  res_type: 1 | 2 | 3;
  query_key: string;
};

async function fetchAxios<T>(
  url: string,
  url_extend: string,
  method: "GET" | "POST",
  data: any,
  res_type: 1 | 2 | 3
): Promise<T[]> {
  if (data === undefined || data === null || !data) return [];

  try {
    const res = await axios({
      method: method,
      url: `${url}${url_extend}`,
      data: data,
    });

    if (res_type === 1) {
      return res.data?.data || [];
    } else if (res_type === 2) {
      return res.data?.data?.data || [];
    } else if (res_type === 3) {
      return res.data?.data?.data?.data || [];
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const useCodeQuery = <T>(config: FetchAxios) => {
  const queryClient = useQueryClient();
  const { url, url_extend, method, data, res_type, query_key } = config;
  return useQuery<T>([query_key, url, url_extend], async () => {
    const _data = await fetchAxios<T>(url, url_extend, method, data, res_type);
    queryClient.setQueryData(query_key, _data);
    return Array.isArray(_data) ? _data[0] : _data;
  });
};
