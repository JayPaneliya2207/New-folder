/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect, useMemo } from "react";
import styles from "../fund/ApprovedFundRequest.module.css";
import stylepage from "../fund/pagination.module.css";
import style from "../fund/fundRequest.module.css";
import { common } from "../../../src/helper/Common";

const ApprovedSupport = () => {
  const [filters, setFilters] = useState({
    ticket: "",
    username: "",
    limit: 10,
    page: 1,
  });
  // const [userId, setUserId] = useState("");
  const [supportRequests, setSupportRequests] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
  // Fetch support requests with filters
  const fetchSupportRequests = (filters = {}) => {
    const data = {
      ...filters,
    };

    // Assuming `common.getAPI` is the API call function from your common utility
    common.getAPI(
      {
        method: "POST",
        url: "support/getSupports", // Update the URL if needed
        data,
      },
      (resp) => {
        console.log("API Response: ", resp.data);
        setSupportRequests(resp.data || []);
        setFilteredData(resp.data || []);
      }
    );
  };

  useEffect(() => {
    fetchSupportRequests(); // Fetch all data on initial render
  }, []);

  // Derived Data: Filtering the results based on ticket and username
  const filteredRequests = useMemo(() => {
    return filteredData.filter((req) => {
      return (
        (!filters.ticket || req.ticketId.includes(filters.ticket)) &&
        (!filters.username || req.userId.includes(filters.username))
      );
    });
  }, [filters, filteredData]);

  const totalPages = Math.ceil(filteredRequests.length / filters.limit);
  const paginatedRequests = useMemo(() => {
    const start = (filters.page - 1) * filters.limit;
    return filteredRequests.slice(start, start + filters.limit);
  }, [filteredRequests, filters]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: Math.max(1, Math.min(newPage, totalPages)),
    }));
  };

  const handleReset = () => {
    setFilters({ ticket: "", username: "", limit: 10, page: 1 });
  };

  const TableRow = ({ request, index }) => (
    <tr>
      <td>{index + 1 + (filters.page - 1) * filters.limit}</td>
      {/* <td>{request.ticketId}</td> */}
      <td>{`${request.firstName} ${request.lastName}`}</td>
      <td>{request.message}</td>
      <td>{request.status === 1 ? "Approved" : request.status}</td>
      <td>{formatDate(request.createdAt)}</td>
      <td>{request.reply}</td>
    </tr>
  );

  return (
    <div className="pages_container">
      <div className="pu_container">
        <div className="pu_datatable_wrapper">
          <div className="row pt-2 pb-2">
            <div className="col-sm-9">
              <h4 className={styles.pageTitle}>Approved Support</h4>
              <ol className={`breadcrumb ${styles.breadcrumb}`}>
                <li className="breadcrumb-item">
                  <a href="/admin/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Support</a>
                </li>
                <li className="breadcrumb-item active">Approved</li>
              </ol>
            </div>
          </div>

          {/* Filter Form */}
          <form
            className={`form-inline ${style.filterFormApproed} d-flex flex-column flex-sm-row align-items-center`}
          >
            <div className="form-group m-1 flex-grow-1">
              <input
                type="text"
                name="ticket"
                placeholder="Enter Ticket Id"
                className={`form-control ${style.filterInput}`}
                value={filters.ticket}
                onChange={handleInputChange}
                aria-label="Ticket ID"
              />
            </div>
            <div className="form-group m-1 flex-grow-1">
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className={`form-control ${style.filterInput}`}
                value={filters.username}
                onChange={handleInputChange}
                aria-label="Username"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm m-1"
              onClick={() => setFilters((prev) => ({ ...prev, page: 1 }))}
            >
              Filter
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm m-1"
              onClick={handleReset}
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
                  {/* <th>Ticket ID</th> */}
                  <th>User ID</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Reply</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((request, index) => (
                    <TableRow
                      key={request.id}
                      request={request}
                      index={index}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No approved requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className={stylepage.paginationContainer}>
            <button
              className={stylepage.paginationBtn}
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
            >
              Previous
            </button>
            <span className={stylepage.paginationInfo}>
              Page {filters.page} of {totalPages}
            </span>
            <button
              className={stylepage.paginationBtn}
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedSupport;
