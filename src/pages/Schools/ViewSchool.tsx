import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getSchoolById } from "../../services/schoolService";
import PageHeader from "./PageHeader";

export default function ViewSchool() {
  const { schoolId } = useParams();

  const {
    data: response,
    error,
    isLoading,
    isSuccess,
  } = useQuery(["school-details", schoolId], getSchoolById);

  if (isSuccess) {
    var {
      data: {
        data: { schoolData },
      },
    } = response;
  }

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
                <form action="#">
                  <div className="form-group">
                    <label>Name</label>
                    {schoolData?.name}
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    {schoolData?.email}
                  </div>
                  <div className="form-group">
                    <label>Phone number</label>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                  </div>
                  <div className="form-group">
                    <label>City</label>
                  </div>
                  <div className="form-group">
                    <label>Postalcode</label>
                  </div>
                  <div className="form-group">
                    <label>State</label>
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                  </div>

                  <div className="avatar avatar-xxl">
                    <img className="avatar-img rounded" alt="User Image" />
                  </div>

                  <div className="text-end">
                    <Link to="/schools" className="btn">
                      Cancel
                    </Link>
                    <Link to="/schools" className="btn">
                      Edit
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
