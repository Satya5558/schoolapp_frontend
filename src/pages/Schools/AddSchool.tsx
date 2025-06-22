import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import * as yup from "yup";
import { addSchool } from "../../services/schoolService";

import { avatar04 } from "../../components/imagepath";

import alertify from "alertifyjs";
import PageHeader from "./PageHeader";

const AddSchool = function () {
  const imageTypes: string[] = ["image/png", "image/jpg", "image/jpeg"];

  const schoolSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    phone_number: yup.string().required("Phone number is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    postal_code: yup.string().required("Postalcode is required"),
    state: yup.string().required("Postal code is required"),
    country: yup.string().required("Country is required"),
    password: yup.string().min(8).max(32).required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required("Confirm password is required"),
    logo: yup
      .mixed()
      .notRequired()
      .test(
        "fileType",
        "Only PNG, JPG and JPEG formats are allowed",
        (file) => {
          if (file instanceof FileList && file.length > 0) {
            const f = file[0];
            return !!f && imageTypes.includes(f.type);
          }
          return true;
        }
      ),
  });

  interface SchoolFormData {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    postal_code: string;
    state: string;
    country: string;
    password: string;
    confirm_password: string;
    logo?: any;
  }

  const [preview, setPreview] = useState(avatar04);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setError,
    setFocus,
  } = useForm<SchoolFormData>({ resolver: yupResolver(schoolSchema) });

  const {
    mutate,
    data,
    error,
    isSuccess: isLoginSuccess,
    isError,
  } = useMutation({
    mutationFn: (schoolData: FormData) => addSchool(schoolData),
  });

  const onSubmit: SubmitHandler<SchoolFormData> = useCallback(
    (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "logo" && value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value as string);
        }
      });
      alertify.set("notifier", "position", "top-right");
      mutate(formData, {
        onSuccess: () => {
          alertify.success("School created successfully!");
          reset();
          setPreview(avatar04);
        },
        onError: (err: any) => {
          const { response } = err;
          const errors = response?.data?.data?.errors;
          if (errors) {
            const firstError = Object.keys(errors).find(
              (field) => errors[field]
            );
            if (firstError) setFocus(firstError as keyof SchoolFormData);
            for (let errorKey in errors) {
              setError(errorKey as keyof SchoolFormData, {
                type: "server",
                message: errors[errorKey],
              });
            }
          }
          alertify.error("Something went wrong please try again!");
        },
      });
    },
    [mutate, reset, setError, setFocus]
  );

  const handleUploadedFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && imageTypes.includes(file.type)) {
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
      } else {
        setPreview(avatar04);
      }
    },
    [imageTypes]
  );

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <PageHeader pageTitle="Add School" />

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">School</h5>
              </div>
              <div className="card-body">
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      className={
                        "form-control " +
                        (errors?.name?.message ? " is-invalid" : "")
                      }
                    />
                    <div className="invalid-feedback">
                      {errors?.name?.message}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      {...register("email")}
                      className={
                        "form-control " +
                        (errors?.email?.message ? " is-invalid" : "")
                      }
                    />
                    <div className="invalid-feedback">
                      {errors?.email?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone number</label>
                    <input
                      type="text"
                      {...register("phone_number")}
                      className={
                        "form-control " +
                        (errors?.phone_number?.message ? " is-invalid" : "")
                      }
                    />
                    <div className="invalid-feedback">
                      {errors?.phone_number?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <div className="col-md-10">
                      <textarea
                        rows={20}
                        cols={5}
                        className={
                          "form-control " +
                          (errors?.address?.message ? " is-invalid" : "")
                        }
                        placeholder="Enter Address"
                        {...register("address")}
                      ></textarea>
                      <div className="invalid-feedback">
                        {errors?.address?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      {...register("city")}
                      className={
                        "form-control " +
                        (errors?.city?.message ? " is-invalid" : "")
                      }
                    />
                    <div className="invalid-feedback">
                      {errors?.city?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Postalcode</label>
                    <input
                      type="text"
                      {...register("postal_code")}
                      className={
                        "form-control " +
                        (errors?.postal_code?.message ? " is-invalid" : "")
                      }
                    />
                    <div className="invalid-feedback">
                      {errors?.postal_code?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      {...register("state")}
                      className={
                        "form-control " +
                        (errors?.state?.message ? " is-invalid" : "")
                      }
                    />
                    <div className="invalid-feedback">
                      {errors?.state?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      {...register("country")}
                      className={
                        "form-control " +
                        (errors?.country?.message ? " is-invalid" : "")
                      }
                    />
                    <div className="invalid-feedback">
                      {errors?.country?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      autoComplete="off"
                      className={
                        "form-control " +
                        (errors?.password?.message ? " is-invalid" : "")
                      }
                      {...register("password")}
                    />
                    <div className="invalid-feedback">
                      {errors?.password?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      autoComplete="off"
                      className={
                        "form-control " +
                        (errors?.confirm_password?.message ? " is-invalid" : "")
                      }
                      {...register("confirm_password")}
                    />
                    <div className="invalid-feedback">
                      {errors?.confirm_password?.message}
                    </div>
                  </div>

                  <div className="custom-file">
                    <label
                      className="custom-file-label"
                      htmlFor="validatedCustomFile"
                    >
                      Choose School Logo
                    </label>
                    <input
                      type="file"
                      className={
                        "form-control " +
                        (errors?.logo?.message ? " is-invalid" : "")
                      }
                      id="validatedCustomFile"
                      {...register("logo")}
                      onChange={handleUploadedFile}
                    />

                    <div className="invalid-feedback">
                      {typeof errors?.logo?.message === "string"
                        ? errors.logo.message
                        : null}
                    </div>
                  </div>

                  <div className="avatar avatar-xxl">
                    <img
                      className="avatar-img rounded"
                      alt="User Image"
                      src={preview}
                    />
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;
