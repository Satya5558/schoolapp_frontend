import { QueryFunctionContext } from "react-query";
import axiosInstance from "./axiosInstance";

export function getSchools({
  queryKey,
}: QueryFunctionContext<[string, Record<string, string>]>) {
  const [_, filters] = queryKey;
  const queryString = "?" + new URLSearchParams(filters);

  return axiosInstance.get(`api/schools${queryString}`);
}

export function addSchool(schoolData) {
  return axiosInstance.post(`api/schools`, schoolData);
}

export function getSchoolById({ queryKey }) {
  const [_, schoolId] = queryKey;
  return axiosInstance.get(`api/schools/${schoolId}`);
}

export function editSchool(schoolData) {
  let schoolId = schoolData.get("schoolId");
  if (schoolId) {
    return axiosInstance.put(`api/schools/${schoolId}`, schoolData);
  } else {
    return Promise.reject("Something went wrong!");
  }
}
