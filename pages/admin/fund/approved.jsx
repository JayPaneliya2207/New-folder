/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from "react";
import styles from "./ApprovedFundRequest.module.css";
import { common } from "../../../src/helper/Common";
import style from "./pagination.module.css";

const ApprovedFundRequest = () => {
  const [page, setPage] = useState(1);
  const [txUser, setTxUser] = useState("");
  const [transactionRequests, setTransactionRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const recordsPerPage = 10;

  // Fetch approved fund requests
  const fetchFundRequests = (filters = {}) => {
    const data = {
      ...filters, // Include any filters (e.g., username)
    };
    common.getAPI(
      {
        method: "POST",
        url: "transaction/getAllFundTransactions",
        data,
      },
      (resp) => {
        console.log("API Response: ", resp.data); // Debugging API response
        setTransactionRequests(resp.data || []);
      }
    );
  };

  useEffect(() => {
    fetchFundRequests(); // Fetch all data on initial render
  }, []);

  // Filter approved requests
  const approvedRequests = transactionRequests.filter(
    (request) => request.status === 2
  );
  console.log("Approved Requests: ", approvedRequests); // Debugging approved requests

  // Apply filter when button is clicked
  const applyFilter = () => {
    const filtered = approvedRequests.filter((request) =>
      request.uCode?.username.toLowerCase().includes(txUser.toLowerCase())
    );
    setFilteredRequests(filtered);
    setPage(1); // Reset to page 1 when filter is applied
    console.log("Filtered Requests: ", filtered); // Debugging filtered requests
  };

  // If no filter is applied, use the full list
  const requestsToDisplay =
    filteredRequests.length > 0 ? filteredRequests : approvedRequests;

  // Pagination calculations
  const totalPages = Math.ceil(requestsToDisplay.length / recordsPerPage);
  const paginatedRequests = requestsToDisplay.slice(
    (page - 1) * recordsPerPage,
    page * recordsPerPage
  );

  // Handlers
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Table Row Component
  const TableRow = ({ request, index }) => (
    <tr>
      <td>{index + 1}</td>
      <td>{request.uCode?.username}</td>
      <td>{request.amount}</td>
      <td>{request.method}</td>
      <td>{request.txType}</td>
      <td>{request.txNumber}</td>
      <td>
        <a href={request.paymentSlip} target="_blank" rel="noopener noreferrer">
          <img
            src={request.paymentSlip}
            alt="Payment Slip"
            className={styles.paymentSlipImage}
          />
        </a>
      </td>
      <td>
        <span className={`badge badge-sm ${styles.approvedBadge}`}>
          Approved
        </span>
      </td>
      <td>
        {(() => {
          const date = new Date(request.createdAt);
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const seconds = date.getSeconds().toString().padStart(2, "0");
          return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        })()}
      </td>
    </tr>
  );

  return (
    <div className="pages_container">
      <div className="pu_container">
        <div className="pu_datatable_wrapper">
          <div className="row pt-2 pb-2">
            <div className="col-sm-9">
              <h4 className={styles.pageTitle}>Approved Fund Request</h4>
              <ol className={`breadcrumb ${styles.breadcrumb}`}>
                <li className="breadcrumb-item">
                  <a href="/admin/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Fund Request</a>
                </li>
                <li className="breadcrumb-item active">Approved</li>
              </ol>
            </div>
          </div>

          {/* Filter Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyFilter(); // Apply filter on form submit
            }}
            className={`form-inline ${styles.filterForm} d-flex flex-column flex-sm-row align-items-center`}
          >
            <div className="form-group m-1 flex-grow-1">
              <input
                type="text"
                placeholder="Enter Tx User"
                className={`form-control ${styles.filterInput}`}
                value={txUser}
                onChange={(e) => setTxUser(e.target.value)}
                aria-label="Transaction User"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm m-1">
              Filter
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm m-1"
              onClick={() => {
                setTxUser(""); // Clear the input field
                fetchFundRequests(); // Fetch all data without filters
                setFilteredRequests(approvedRequests); // Reset filtered data
              }}
            >
              Reset
            </button>
          </form>

          {/* Data Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Tx User</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Type</th>
                  <th>Utr Number</th>
                  <th>Payment Slip</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((request, index) => (
                    <TableRow
                      key={request.id}
                      request={request}
                      index={index + (page - 1) * recordsPerPage}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No approved requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className={style.paginationContainer}>
            <button
              className={style.paginationBtn}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className={style.paginationInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              className={style.paginationBtn}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedFundRequest;
