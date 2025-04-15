import { yupResolver } from "@hookform/resolvers/yup";
import alertify from "alertifyjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";
import { avatar04 } from "../../components/imagepath";
import { editSchool, getSchoolById } from "../../services/schoolService";
import PageHeader from "./PageHeader";

const imageTypes = ["image/png", "image/jpg", "image/jpeg"];

const schoolSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postal_code: yup.string().required("Postalcode is required"),
  state: yup.string().required("Postal code is required"),
  country: yup.string().required("Country is required"),
  password: yup
    .string()
    .nullable()
    .transform((currentValue, originalValue) =>
      originalValue === "" ? null : currentValue
    )
    .min(8, "Password must be atleast 8 characters")
    .max(32, "Password must be below 32 characters"),
  confirm_password: yup
    .string()
    .nullable()
    .transform((currentValue, originalValue) =>
      originalValue === "" ? null : currentValue
    )
    .oneOf([yup.ref("password"), null], "Password must match"),
  logo: yup
    .mixed()
    .nullable()
    .test("required", "Only PNG, JPG and JPEG formats are allowed", (file) => {
      if (file?.length > 0) {
        if (imageTypes.includes(file[0]?.type)) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }),
});

const EditSchool = function () {
  //Hooks
  const { schoolId } = useParams();
  const [preview, setPreview] = useState(avatar04);
  const [dataExists, isDataExists] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setError,
    setFocus,
  } = useForm({ resolver: yupResolver(schoolSchema) });

  const {
    mutate,
    data: mutationData,
    error: mutationError,
  } = useMutation({
    mutationFn: (schoolData) => {
      return editSchool(schoolData);
    },
    onSuccess: () => {
      alertify.success("School updated successfully!");
    },
    onError: (err) => {
      alertify.errorAlert(err.message);
    },
  });

  const { data, error, isLoading, isSuccess } = useQuery(
    ["school-details", schoolId],
    getSchoolById,
    {
      enabled: !dataExists,
    }
  );

  useEffect(() => {
    if (data) {
      const {
        data: {
          data: { schoolData },
        },
      } = data;

      if (schoolData.logo_url) {
        setPreview(schoolData.logo_url);
      }
      //setting data in state
      isDataExists(true);

      //Setting fields in hook form
      reset(schoolData);
    }
  }, [data]);

  function onSubmit(data) {
    let formData = new FormData();

    //Appending School ID
    formData.append("schoolId", schoolId);

    for (let param in data) {
      if (param === "logo") {
        if (data[param].length > 0) {
          //Adding file in to the Form data object
          formData.append(param, data[param][0]);
        }
      } else {
        formData.append(param, data[param]);
      }
    }
    formData.append("is_logo_changed", fileChanged);
    mutate(formData);
  }

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];

    if (imageTypes.includes(file?.type)) {
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
      setFileChanged(true);
    } else {
      setPreview(avatar04);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <PageHeader pageTitle="Edit School" />
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
                        rows="20"
                        cols="5"
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
                      {errors?.logo?.message}
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
                    <Link to="/schools" className="btn">
                      Cancel
                    </Link>
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

export default EditSchool;
