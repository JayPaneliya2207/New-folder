/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import styles from "./kyc.module.css";

const ApprovedKyc = ({ data = [] }) => {
  const [txUser, setTxUser] = useState("");

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log("Filtering for Tx User:", txUser);
  };

  // Static fallback data
  const staticData = [
    {
      id: 1,
      txUser: "TX12345",
      username: "johndoe",
      fullName: "John Doe",
      co: "Jane Doe",
      dob: "01/01/1990",
      idNo: "ID98765",
      address: "123 Main Street, City",
      taxId: "PAN123456",
      bankDetail: "XYZ Bank, A/C: 1234567890",
    },
    {
      id: 2,
      txUser: "TX67890",
      username: "janedoe",
      fullName: "Jane Doe",
      co: "John Smith",
      dob: "02/02/1992",
      idNo: "ID54321",
      address: "456 Elm Street, Town",
      taxId: "PAN654321",
      bankDetail: "ABC Bank, A/C: 0987654321",
    },
  ];

  const tableData = data.length > 0 ? data : staticData; // Use static data if no data is provided

  return (
    <div className="pages_container">
      <div className="container-fluid">
        <div className="pu_datatable_wrapper">
          {/* Header Section */}
          <div className="row pt-2 pb-2">
            <div className="col-sm-9">
              <h4 className={styles.pageTitle}>Approved Kyc</h4>
              <ol className={`breadcrumb ${styles.breadcrumb}`}>
                <li className="breadcrumb-item">
                  <a href="https://thewinnersacademy.in/admin/dashboard">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Kyc</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Approved Kyc
                </li>
              </ol>
            </div>
          </div>

          {/* Filter Section */}
          <h6 className="text-uppercase">Approved Kyc</h6>
          <hr />
          <form
            className={`form-inline ${styles.filterForm} d-flex flex-column flex-sm-row align-items-center`}
            onSubmit={handleFilterSubmit}
          >
            <div className="form-group m-1 flex-grow-1">
              <input
                type="text"
                placeholder="Enter Tx User"
                name="txUser"
                className={`form-control ${styles.filterInput}`}
                value={txUser}
                onChange={(e) => setTxUser(e.target.value)}
                aria-label="Transaction User"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm m-1">
              Filter
            </button>
            <a
              href="/admin/fund/cancelled"
              className="btn btn-secondary btn-sm m-1"
            >
              Reset
            </a>
          </form>

          {/* Table Section */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Tx User</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>C/o</th>
                  <th>Dob Number</th>
                  <th>Id No.</th>
                  <th>Address</th>
                  <th>Tax ID/Pan Number</th>
                  <th>Bank Detail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((request, index) => (
                    <tr key={request.id || index}>
                      <td>{index + 1}</td>
                      <td>{request.txUser || "N/A"}</td>
                      <td>{request.username || "N/A"}</td>
                      <td>{request.fullName || "N/A"}</td>
                      <td>{request.co || "N/A"}</td>
                      <td>{request.dob || "N/A"}</td>
                      <td>{request.idNo || "N/A"}</td>
                      <td>{request.address || "N/A"}</td>
                      <td>{request.taxId || "N/A"}</td>
                      <td>{request.bankDetail || "N/A"}</td>
                      <td>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedKyc;
