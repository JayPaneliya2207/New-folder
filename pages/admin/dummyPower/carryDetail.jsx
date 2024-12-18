import React, { useState, useEffect } from "react";

const DummyPowerTable = () => {
  const [txUser, setTxUser] = useState("");
  const [tableData, setTableData] = useState([
    {
      id: 1,
      txUser: "MORYA ENTERPRISES( WA2013976 )",
      carry: 6756,
      position: "Right",
      date: "2024-09-09 10:38:53",
    },
  ]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log("Filtering by", txUser);
  };

  const handleReset = () => {
    setTxUser("");
    setTableData([
      {
        id: 1,
        txUser: "MORYA ENTERPRISES( WA2013976 )",
        carry: 6756,
        position: "Right",
        date: "2024-09-09 10:38:53",
      },
    ]);
  };

  const handleExport = () => {
    console.log("Exporting to Excel");
  };

  return (
    <div className="pu_container">
      <div className="pu_datatable_wrapper">
        <div className="container-fluid">
          <div className="row pt-4 pb-2">
            <div className="col-sm-9">
              <h4 className="page-title">Dummy Power</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="https://thewinnersacademy.in/admin/dashboard">
                    home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Dummy Power</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dummy Power
                </li>
              </ol>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <form
                onSubmit={handleFilterSubmit}
                className="d-flex align-items-center mb-3"
              >
                <div className="form-group m-1">
                  <input
                    type="text"
                    placeholder="Enter Tx User"
                    name="name"
                    className="form-control"
                    value={txUser}
                    onChange={(e) => setTxUser(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-sm btn-primary m-1"
                  value="Filter"
                />
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-sm btn-secondary m-1"
                >
                  Reset
                </button>
              </form>

              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>S No.</th>
                      <th>Tx User</th>
                      <th>Carry</th>
                      <th>Position</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.txUser}</td>
                        <td>{row.carry}</td>
                        <td>{row.position}</td>
                        <td>{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyPowerTable;
