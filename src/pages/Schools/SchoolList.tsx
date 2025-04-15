import { Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { avatar02 } from "../../components/imagepath";
import { itemRender } from "../../components/Pagination";
import { getSchools } from "../../services/schoolService";

const SchoolList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({ numRecords: "10", pageNum: "1" });

  const { data, error, isLoading, isError, isSuccess } = useQuery(
    ["schools", filters],
    getSchools
  );

  const { register, handleSubmit } = useForm();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  let schools = [];
  let totalCount = 0;

  if (isSuccess) {
    ({
      data: {
        data: { schools, totalCount },
      },
    } = data);
  }

  const column = [
    {
      title: "ID",
      dataIndex: "school_unique_id",
      sorter: (a, b) =>
        a.school_unique_id.match(/\d+/g) - b.school_unique_id.match(/\d+/g),
    },
    {
      title: "Logo",
      dataIndex: "storage_logo_name",
      render: (text, record) => (
        <div className="avatar avatar-lg">
          <img
            className="avatar-img rounded-circle"
            alt="User Image"
            src={record.logo_url ?? avatar02}
          />
        </div>
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => (
        <>
          <h2 className="table-avatar">
            <Link className="text-dark" to="/studentsview">
              {record.name}
            </Link>
          </h2>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, record) => (
        <>
          <div className="actions">
            <Link
              to={`/view-school/${record.id}`}
              className="btn btn-sm bg-success-light me-2"
            >
              <i className="feather-eye">
                <FeatherIcon icon="eye" />
              </i>
            </Link>
            <Link
              to={`/edit-school/${record.id}`}
              className="btn btn-sm bg-danger-light"
            >
              <i className="feather-edit">
                <FeatherIcon icon="edit" className="list-edit" />
              </i>
            </Link>
          </div>
        </>
      ),
    },
  ];

  function filterSchools(filters) {
    setFilters({ ...filters });
  }

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header  */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-sub-header">
                  <h3 className="page-title">Schools</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/schools">School</Link>
                    </li>
                    <li className="breadcrumb-item active">All Schools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="student-group-form">
            <form action="#" onSubmit={handleSubmit(filterSchools)}>
              <div className="row">
                <div className="col-lg-2 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by ID ..."
                      {...register("school_id")}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Name ..."
                      {...register("name")}
                    />
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Phone ..."
                      {...register("phone_number")}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Email ..."
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="search-student-btn">
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table comman-shadow">
                <div className="card-body">
                  {/* Page Header */}
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">Schools</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <Link
                          to="/schools"
                          className="btn btn-outline-gray me-2 active"
                        >
                          <FeatherIcon className="feather-list" icon="list" />
                        </Link>
                        <Link
                          to="/studentgrid"
                          className="btn btn-outline-gray me-2"
                        >
                          <FeatherIcon className="feather-grid" icon="grid" />
                        </Link>
                        <Link to="#" className="btn btn-outline-primary me-2">
                          <i className="fas fa-download" /> Download
                        </Link>
                        <Link to="/add-school" className="btn btn-primary">
                          <i className="fas fa-plus" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: totalCount,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: (current, pageSize) => {
                          setFilters({ ...filters, numRecords: pageSize });
                          //onShowSizeChange(current, pageSize);
                        },
                        itemRender: itemRender,
                        pageSize: filters.numRecords,
                        onChange: (page, size) => {
                          setFilters({ ...filters, pageNum: page });
                        },
                      }}
                      columns={column}
                      dataSource={schools}
                      rowSelection={rowSelection}
                      rowKey={(record) => record.Id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default SchoolList;
