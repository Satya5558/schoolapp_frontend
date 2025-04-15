import React from "react";
import { Link } from "react-router-dom";

const PageHeader = function ({ pageTitle }) {
  return (
    <div className="page-header">
      <div className="row">
        <div className="col">
          <h3 className="page-title">{pageTitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/schools">Schools</Link>
            </li>
            <li className="breadcrumb-item active">{pageTitle}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
