import React from "react";
import { Link } from "react-router-dom";

const Error401 = () => {
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <h1>401</h1>
        <h3 className="h2 mb-3">
          <i className="fas fa-exclamation-triangle" /> Oops! Unauthorized!
        </h3>
        <p className="h4 font-weight-normal">
          The Page you requested is Unauthorized.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export { Error401 };
