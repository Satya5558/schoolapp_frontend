import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather/dist";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../../components/imagepath";
import { authSchool, resetStatus } from "../../slices/userSlice";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Credentials } from "../../types/authTypes";

import useAppDispatch from "../../hooks/useAppDispatch";
import type { RootState } from "../../store";

const SchoolLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const { status, message } = useSelector(
    (state: RootState) => state?.userReducer
  );

  const dispatch = useAppDispatch();

  const history = useHistory();

  const welcomeHeader: string = "Welcome to My School";

  //Use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: Credentials) => {
    const result = await dispatch(authSchool(data));

    if (authSchool.fulfilled.match(result)) {
      await dispatch(resetStatus());
      history.push("/dashboard");
    }
  };

  const onError = (err) => {
    console.log("Error occured");
    console.log(err);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={login} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>{welcomeHeader}</h1>
                  <p className="account-subtitle">
                    Need an account? <Link to="/register">Sign Up</Link>
                  </p>
                  <h2>Sign in</h2>
                  {/* Form */}
                  {status === "failed" && <p>{message}</p>}
                  <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="form-group">
                      <label>
                        Username <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />

                      <span className="profile-views">
                        <i className="fas fa-user-circle" />
                      </span>
                      {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                      <label>
                        Password <span className="login-danger">*</span>
                      </label>

                      <input
                        type={passwordVisible ? "" : "password"}
                        className="form-control pass-input"
                        {...register("password", { required: true })}
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <EyeOff className="react-feather-custom" />
                        ) : (
                          <Eye className="react-feather-custom" />
                        )}
                      </span>
                      {errors.password &&
                        errors.password.type === "required" && (
                          <p>Password is required</p>
                        )}
                    </div>
                    <div className="forgotpass">
                      <div className="remember-me">
                        <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                          {" "}
                          Remember me
                          <input type="checkbox" name="radio" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <Link to="/forgotpassword">Forgot Password?</Link>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  {/* /Form */}
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>
                  {/* Social Login */}
                  <div className="social-login">
                    <Link to="#">
                      <i className="fab fa-google-plus-g" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolLogin;
