import React from "react";

const AddProjects = () => {
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Project Name"
            />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="address" />
          </div>
          <div className="col">
            <select className="custom-select my-1 mr-sm-2">
              <option disabled>status</option>
              <option value="1">OPEN</option>
              <option value="2">PENDING</option>
              <option value="3">CLOSED</option>
            </select>
          </div>
          <button className="btn btn-primary">ADD</button>
        </div>
      </form>
    </div>
  );
};

export default AddProjects;
