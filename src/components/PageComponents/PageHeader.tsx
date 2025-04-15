import React from "react";
import { Link } from "react-router-dom";

const PageHeader = ({
  title,
  breadcrumb,
}: {
  title: string;
  breadcrumb: { label: string; link?: string }[];
}) => {
  return (
    <div className="page-header">
      <div className="row">
        <div className="col-sm-12">
          <div className="page-sub-header">
            <h3 className="page-title">{title}</h3>
            <ul className="breadcrumb">
              {breadcrumb.map((item, index) => (
                <li key={index} className="breadcrumb-item">
                  {item.link ? (
                    <Link to={item.link}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageHeader };
