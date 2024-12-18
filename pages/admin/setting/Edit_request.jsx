/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import styles from "./EditRequest.module.css";

const EditRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    file: null,
  });

  const [requests, setRequests] = useState([{ id: 1, name: "", value: 0 }]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  // Toggle switch value
  const handleSwitchChange = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, value: request.value === 1 ? 0 : 1 }
          : request
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="container-fluid">
      <br />
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/admin/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/admin/settings">Settings</a>
          </li>
          <li className="breadcrumb-item active">Payment Request Method</li>
        </ol>
      </nav>

      <div className="row">
        {/* Requests Table */}
        <div className="col-md-12 card card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Setting Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={request.id}>
                    <td>{index + 1}</td>
                    <td>{request.name}</td>
                    <td>
                      <label
                        className={styles.switch}
                        style={{ marginRight: "7px" }}
                      >
                        <input
                          type="checkbox"
                          checked={request.value === 1}
                          onChange={() => handleSwitchChange(request.id)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                      <small>Enabled = "1", Disabled = "0"</small>
                    </td>
                    <td>
                      <a
                        href={`/admin/settings/edits?req_id=${request.id}`}
                        className="btn btn-info btn-sm"
                      >
                        <i className="fa fa-edit" /> Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Request Form */}
        <div className="col-md-12 card card-body">
          <h5>Add New Request</h5>
          <div className="col-md-6 card card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <label>Upload File</label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRequest;
