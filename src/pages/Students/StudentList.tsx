import { Table } from "antd";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageComponents";
import { itemRender } from "../../components/Pagination";
import { getStudents } from "../../services/studentService";
import Student from "../../types/studentType";
import { StudentFilterType } from "../../types/studentTypes";

const StudentList = () => {
  const [filters, setFilters] = useState<Record<string, string>>({
    numRecords: "10",
    pageNum: "1",
  });

  const { data, error, isLoading, isError, isSuccess } = useQuery(
    ["students", filters],
    getStudents
  );

  let students: Student[] = [];
  let totalCount: number = 0;

  if (isSuccess) {
    ({
      data: { students, totalCount },
    } = data);
  }

  const { register, handleSubmit } = useForm();

  function filterStudents(filters: StudentFilterType) {}

  const column = [
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: (a: Student, b: Student) =>
        a.firstName.length - b.firstName.length,
      render: (text, record: Student) => (
        <>
          <h2 className="table-avatar">
            <Link className="text-dark" to="/studentsview">
              {record.firstName} {record.lastName}
            </Link>
          </h2>
        </>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a: Student, b: Student) => a.lastName.length - b.lastName.length,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a: Student, b: Student) => a.gender.length - b.gender.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: Student, b: Student) => a.email.length - b.email.length,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text: any, record: Student) => (
        <>
          <div className="actions">
            <Link
              to={`/view-student/${record.id}`}
              className="btn btn-sm bg-success-light me-2"
            >
              <i className="feather-eye">
                <FeatherIcon icon="eye" />
              </i>
            </Link>
            <Link
              to={`/edit-student/${record.id}`}
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

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header  */}
          <PageHeader title="Students" breadcrumb={[{ label: "Students" }]} />
          <div className="student-group-form">
            <form action="#" onSubmit={handleSubmit(filterStudents)}>
              <div className="row">
                <div className="col-lg-2 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by ID ..."
                      {...register("student_id")}
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
                        <h3 className="page-title">Students</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <Link
                          to="/students"
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
                        total: 20,
                        itemRender: itemRender,
                        onChange: (page, size) => {
                          setFilters({ ...filters, pageNum: page.toString() });
                        },
                      }}
                      columns={column}
                      dataSource={students}
                      rowKey={(record: Student) => record.id}
                    />
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

export { StudentList };
