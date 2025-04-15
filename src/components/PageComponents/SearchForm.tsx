import { useForm } from "react-hook-form";

import { SubmitHandler } from "react-hook-form";

import React from "react";

interface SearchFormProps {
  onSubmit: SubmitHandler<Record<string, any>>;
}

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {[
          { name: "school_id", placeholder: "Search by ID ..." },
          { name: "name", placeholder: "Search by Name ..." },
          { name: "phone_number", placeholder: "Search by Phone ..." },
          { name: "email", placeholder: "Search by Email ..." },
        ].map((field) => (
          <div key={field.name} className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder={field.placeholder}
                {...register(field.name)}
              />
            </div>
          </div>
        ))}
        <div className="col-lg-2">
          <div className="search-student-btn">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export { SearchForm };
