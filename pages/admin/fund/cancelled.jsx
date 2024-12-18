/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./Cancelled.module.css";
import { common } from "../../../src/helper/Common";
import style from "./pagination.module.css";

const Cancelled = () => {
  const [txUser, setTxUser] = useState("");
  const [page, setPage] = useState(1);
  const [getTransactionRequestList, setGetTransactionRequestList] = useState(
    []
  );
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [recordsPerPage] = useState(10); // Number of records to display per page

  const getFundRequestList = (appliedFilters = {}) => {
    common.getAPI(
      {
        method: "POST",
        url: "transaction/getAllFundTransactions",
        data: appliedFilters,
      },
      (resp) => {
        if (resp.data && resp.data.length > 0) {
          setGetTransactionRequestList(resp.data);
          setFilteredRequests(resp.data); // Set the filtered list initially to the full list
        } else {
          setGetTransactionRequestList([]);
          setFilteredRequests([]); // Reset filtered requests when no data is returned
        }
      }
    );
  };

  useEffect(() => {
    getFundRequestList();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filtered = getTransactionRequestList.filter(
      (request) =>
        request.uCode?.username.toLowerCase().includes(txUser.toLowerCase()) // Filter requests based on the input
    );
    setFilteredRequests(filtered);
    setPage(1); // Reset to the first page after applying filter
  };

  // Pagination logic
  const approvedFundRequests = filteredRequests.filter(
    (request) => request.status === 2 // Only include cancelled transactions
  );

  const totalPages = Math.ceil(approvedFundRequests.length / recordsPerPage);
  const startIndex = (page - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedRequests = approvedFundRequests.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="pages_container">
      <div className="pu_container">
        <div className="pu_datatable_wrapper">
          <div className="container-fluid">
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className={styles.pageTitle}>Cancelled Fund Request</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="https://thewinnersacademy.in/admin/dashboard">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Fund Request</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Cancelled
                  </li>
                </ol>
              </div>
              <div className="col-sm-3"></div>
            </div>

            <form
              onSubmit={handleFilterSubmit}
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
              <button type="submit" className="btn btn-primary btn-sm m-1">
                Filter
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm m-1"
                onClick={() => {
                  setTxUser(""); // Clear the input field
                  getFundRequestList(); // Fetch all data without filters
                }}
              >
                Reset
              </button>
            </form>

            <div className={styles.tableResponsive}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Tx User</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Type</th>
                    <th>UTR Number</th>
                    <th>Payment Slip</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.length > 0 ? (
                    paginatedRequests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{startIndex + index + 1}</td>{" "}
                        {/* Sequential numbering */}
                        <td>{request.uCode?.username}</td>
                        <td>{request.amount}</td>
                        <td>{request.method}</td>
                        <td>{request.txType}</td>
                        <td>{request.txNumber}</td>
                        <td>
                          <a
                            href={request.paymentSlip}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={request.paymentSlip}
                              alt="Payment Slip"
                              className={styles.paymentSlipImage}
                            />
                          </a>
                        </td>
                        <td>
                          <span
                            className={`badge badge-warning badge-sm ${styles.badgeWarning}`}
                            style={{ backgroundColor: "red" }}
                          >
                            Cancelled
                          </span>
                        </td>
                        <td>
                          {(() => {
                            const date = new Date(request.createdAt);
                            const day = date
                              .getDate()
                              .toString()
                              .padStart(2, "0");
                            const month = (date.getMonth() + 1)
                              .toString()
                              .padStart(2, "0");
                            const year = date.getFullYear();
                            const hours = date
                              .getHours()
                              .toString()
                              .padStart(2, "0");
                            const minutes = date
                              .getMinutes()
                              .toString()
                              .padStart(2, "0");
                            const seconds = date
                              .getSeconds()
                              .toString()
                              .padStart(2, "0");
                            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                          })()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No cancelled requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className={style.paginationContainer}>
              {" "}
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
    </div>
  );
};

export default Cancelled;
