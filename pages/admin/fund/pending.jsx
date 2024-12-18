/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect, useCallback } from "react";
import styles from "./fundRequest.module.css";
import style from "./pagination.module.css";
import { common } from "../../../src/helper/Common";

const Pending = () => {
  const [txUser, setTxUser] = useState(""); // Input for username filter
  const [transactionRequests, setTransactionRequests] = useState([]); // All requests
  const [filteredRequests, setFilteredRequests] = useState([]); // Filtered requests
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch fund requests
  const fetchFundRequests = useCallback(() => {
    common.getAPI(
      {
        method: "POST",
        url: "transaction/getAllFundTransactions",
      },
      (resp) => {
        const requests = resp?.data || [];
        setTransactionRequests(requests);
        setFilteredRequests(requests.filter((request) => request.status === 0)); // Initialize with pending requests
        setTotalPages(
          Math.ceil(
            requests.filter((request) => request.status === 0).length / 10
          )
        );
      }
    );
  }, []);

  // Load initial data
  useEffect(() => {
    fetchFundRequests();
  }, [fetchFundRequests]);

  // Handle filtering by username
  const handleFilterClick = () => {
    const filtered = transactionRequests.filter(
      (request) =>
        request.status === 0 &&
        request.uCode?.username?.toLowerCase().includes(txUser.toLowerCase())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
    setTotalPages(Math.ceil(filtered.length / 10));
  };

  // Reset filter
  const resetFilter = () => {
    setTxUser("");
    setFilteredRequests(
      transactionRequests.filter((request) => request.status === 0)
    );
    setCurrentPage(1);
    setTotalPages(
      Math.ceil(
        transactionRequests.filter((request) => request.status === 0).length /
          10
      )
    );
  };

  // Paginated filtered transactions
  const paginatedTransactions = filteredRequests.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  // Render table rows
  const renderTableRows = () => {
    if (paginatedTransactions.length === 0) {
      return (
        <tr>
          <td colSpan="10" className="text-center">
            No pending requests found.
          </td>
        </tr>
      );
    }

    return paginatedTransactions.map((request, index) => (
      <tr key={request.id}>
        <td>{(currentPage - 1) * 10 + index + 1}</td>
        <td>{request.uCode?.username}</td>
        <td>
          <a
            className="btn btn-sm btn-info"
            href={`/admin/fund/view?id=${request._id}`}
          >
            View
          </a>
        </td>
        <td>{request.amount}</td>
        <td>{request.method}</td>
        <td>{request.txType}</td>
        <td>{request.txNumber}</td>
        <td>
          <a href={request.payment_slip_url} target="_blank" rel="noreferrer">
            <img
              src={request.payment_slip_url}
              style={{ height: 50, width: 50 }}
              alt="Payment Slip"
            />
          </a>
        </td>
        <td>
          <span
            className={`badge badge-warning ${styles.badgeWarning}`}
            style={{ backgroundColor: "orange" }}
          >
            Pending
          </span>
        </td>
        <td>{formatDate(request.createdAt)}</td>
      </tr>
    ));
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  // Handle input change and reset filter
  const handleTxUserChange = (e) => setTxUser(e.target.value);

  return (
    <div className="pages_container">
      <div className="container-fluid">
        <div className="pu_datatable_wrapper">
          {/* Page Header */}
          <div className="row pt-2 pb-2">
            <div className="col-sm-9">
              <h4 className="page-title">Pending Fund Request</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Fund Request</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Pending
                </li>
              </ol>
            </div>
          </div>

          {/* Filter Form */}
          <form
            className={`form-inline ${styles.filterForm} d-flex flex-column flex-sm-row align-items-center`}
          >
            <div className="form-group m-1 flex-grow-1">
              <input
                type="text"
                placeholder="Enter Tx User"
                name="name"
                className={`form-control ${styles.filterInput}`}
                value={txUser}
                onChange={(e) => setTxUser(e.target.value)}
                aria-label="Transaction User"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm m-1"
              onClick={handleFilterClick}
            >
              Filter
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm m-1"
              onClick={resetFilter}
            >
              Reset
            </button>
          </form>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Tx User</th>
                  <th>Action</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Type</th>
                  <th>Utr Number</th>
                  <th>Payment Slip</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={style.paginationContainer}>
            <button
              className={style.paginationBtn}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={style.paginationInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={style.paginationBtn}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;
