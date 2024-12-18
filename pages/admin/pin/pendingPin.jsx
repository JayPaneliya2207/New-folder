import React, { useState, useEffect } from "react";

const PendingEpin = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    startDate: "",
    endDate: "",
  });
  const [pendingPins, setPendingPins] = useState([]);

  // Simulate fetching static data
  useEffect(() => {
    const staticData = [
      {
        txUser: "JohnDoe",
        username: "john123",
        numberOfPins: 5,
        utrNumber: "1234567890",
        slipUrl: "http://example.com/slip1.jpg",
        status: "Pending",
        date: "2024-11-01",
      },
      {
        txUser: "JaneSmith",
        username: "jane456",
        numberOfPins: 10,
        utrNumber: "0987654321",
        slipUrl: "http://example.com/slip2.jpg",
        status: "Pending",
        date: "2024-11-02",
      },
      {
        txUser: "AliceGreen",
        username: "alice789",
        numberOfPins: 3,
        utrNumber: "1122334455",
        slipUrl: "http://example.com/slip3.jpg",
        status: "Pending",
        date: "2024-11-03",
      },
    ];
    setPendingPins(staticData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Filter or update the data based on formData values
  };

  const handleReset = () => {
    setFormData({
      name: "",
      username: "",
      startDate: "",
      endDate: "",
    });
  };

  const TableRow = ({ pin, index }) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{pin.txUser}</td>
      <td>{pin.username}</td>
      <td>{pin.numberOfPins}</td>
      <td>{pin.utrNumber}</td>
      <td>
        <a href={pin.slipUrl} target="_blank" rel="noopener noreferrer">
          View Slip
        </a>
      </td>
      <td>{pin.status}</td>
      <td>{pin.date}</td>
      <td style={{ display: "flex", gap: "10px" }}>
        <button className="btn btn-info btn-sm">Approve</button>
        <button
          className="btn btn-danger btn-sm"
          data-toggle="modal"
          data-target="#formemodal"
        >
          Reject
        </button>
      </td>
    </tr>
  );

  return (
    <div className="pu_container">
      <div className="pu_datatable_wrapper">
        <div className="container-fluid">
          <div className="row pt-2 pb-2">
            <div className="col-sm-9">
              <h4 className="page-title">Pending Epin</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="http://localhost/hellotrade_main/admin/dashboard">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Epin</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Epin
                </li>
              </ol>
            </div>
            <div className="col-sm-3"></div>
          </div>

          <h6 className="text-uppercase">Pending Epin</h6>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-inline d-flex flex-wrap align-items-center">
              <div className="form-group m-1 flex-fill">
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group m-1 flex-fill">
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group m-1 flex-fill">
                <div className="input-daterange input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="From"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text">to</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="End date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-sm btn-primary mb-2">
                  Filter
                </button>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary mb-2"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Tx user</th>
                  <th>Username</th>
                  <th>Number Of Pins</th>
                  <th>Utr Number</th>
                  <th>Slip</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingPins.length === 0 ? (
                  <tr>
                    <td colSpan="9">No pending pins available</td>
                  </tr>
                ) : (
                  pendingPins.map((pin, index) => (
                    <TableRow pin={pin} index={index} key={index} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingEpin;
