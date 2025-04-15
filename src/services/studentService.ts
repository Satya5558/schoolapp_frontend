import { QueryFunctionContext } from "react-query";
import axiosInstance from "./axiosInstance";

export function getStudents({
  queryKey,
}: QueryFunctionContext<[string, Record<string, string>]>) {
  const [_, filters] = queryKey;
  const queryString = "?" + new URLSearchParams(filters);

  return axiosInstance.get(`api/students${queryString}`);
}
