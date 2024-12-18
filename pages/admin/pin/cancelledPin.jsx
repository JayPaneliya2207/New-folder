import React, { useState } from "react";

const InputField = ({ value, onChange, placeholder, name }) => (
  <div className="form-group m-1 flex-fill">
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      className="form-control"
      value={value}
      onChange={onChange}
    />
  </div>
);

const CancelledEpin = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleReset = () => {
    setName("");
    setUsername("");
    setStartDate("");
    setEndDate("");
  };

  // Static data for the table
  const tableData = [
    {
      id: 1,
      txUser: "User1",
      username: "john_doe",
      numPins: 5,
      utrNumber: "12345ABC",
      slip: "slip1.jpg",
      status: "Cancelled",
      date: "2024-11-20",
    },
    {
      id: 2,
      txUser: "User2",
      username: "jane_doe",
      numPins: 3,
      utrNumber: "67890XYZ",
      slip: "slip2.jpg",
      status: "Cancelled",
      date: "2024-11-19",
    },
    {
      id: 3,
      txUser: "User3",
      username: "mark_smith",
      numPins: 2,
      utrNumber: "11223LMN",
      slip: "slip3.jpg",
      status: "Cancelled",
      date: "2024-11-18",
    },
  ];

  return (
    <div className="pu_container">
            <div className="pu_datatable_wrapper">
    <div className="container-fluid">
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h4 className="page-title">Cancelled Epin</h4>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="http://localhost/hellotrade_main/admin/dashboard">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Cancelled Epin</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cancelled Epin
            </li>
          </ol>
        </div>
      </div>

      <h6 className="text-uppercase">Cancelled Epin</h6>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="form-inline d-flex flex-wrap align-items-center">
          <InputField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            name="name"
          />
          <InputField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            name="username"
          />
          <div id="daterange-picker" className="form-group m-1 flex-fill">
            <div className="input-daterange input-group">
              <InputField
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="From"
                name="start_date"
              />
              <div className="input-group-prepend">
                <span className="input-group-text">to</span>
              </div>
              <InputField
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End date"
                name="end_date"
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
              onClick={handleReset}
              className="btn btn-sm btn-secondary mb-2"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      <br />
      <form
        action="http://localhost/hellotrade_main/admin/withdrawal/action_multiple"
        method="post"
      >
        <div
          className="modal fade"
          id="formemodal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Please give reject reason.</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="input-3">Enter Reason</label>
                  <textarea name="reject_reason" className="form-control" />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    name="reject_btn"
                    className="btn btn-info shadow-info px-5"
                  >
                    Reject All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Tx user</th>
                <th>Username</th>
                <th>Number of Pins</th>
                <th>Utr Number</th>
                <th>Slip</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.txUser}</td>
                  <td>{row.username}</td>
                  <td>{row.numPins}</td>
                  <td>{row.utrNumber}</td>
                  <td>
                    <img
                      src={`/${row.slip}`}
                      alt="Slip"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{row.status}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default CancelledEpin;
