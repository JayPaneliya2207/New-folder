/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import style from "../fund/fundRequest.module.css";
import { common } from "../../../src/helper/Common";
import { useRouter } from "next/router";

const PendingSupport = () => {
  const [filters, setFilters] = useState({
    ticket: "",
    username: "",
    limit: 10,
    startDate: "",
    endDate: "",
  });

  const [supportRequests, setSupportRequests] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const router = useRouter();

  // // Fetch Support Requests
  const fetchSupportRequests = (filters = {}) => {
    const data = {
      ...filters,
    };

    common.getAPI(
      {
        method: "POST",
        url: "support/getSupports",
        data,
      },
      (resp) => {
        console.log("API Response: ", resp.data);
        const pendingRequests = (resp.data || []).filter(
          (item) => item.status === 1
        );
        setSupportRequests(pendingRequests);
        setFilteredData(pendingRequests);
      }
    );
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  // Handle Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Handle Form Submission (Filtering)
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSupportRequests(filters); // Fetch data with filters
  };

  // Handle Reset Filters
  const handleReset = () => {
    setFilters({
      ticket: "",
      username: "",
      limit: 10,
      startDate: "",
      endDate: "",
    });
    fetchSupportRequests(); // Fetch all data without filters
  };
  const handleReplyClick = (itemId, message) => {
    router.push(
      `/admin/support/supportView?id=${itemId}&message=${encodeURIComponent(
        message
      )}`
    );
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

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h4 className={styles.pageTitle}>Support Pending</h4>
          <ol className={styles.breadcrumb}>
            <li>
              <a href="/admin/dashboard">Home</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>Pending</li>
          </ol>
        </div>
      </div>

      {/* Filters Section */}
      <form
        onSubmit={handleSubmit}
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
        <button type="submit" className="btn btn-primary btn-sm m-1">
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

      {/* Table Section */}
      <div className={styles.tableContainer}>
        {filteredData.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S No.</th>
                {/* <th>Ticket Id</th> */}
                <th>User Id</th>
                <th>Description</th>
                <th>Create Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  {/* <td>{item.ticketId}</td> */}
                  <td>{`${item.firstName} ${item.lastName}`}</td>
                  <td>{item.message}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>Pending</td>
                  <td>
                    <a
                      href="#"
                      className={styles.btnSuccess}
                      onClick={() => handleReplyClick(item._id, item.message)}
                    >
                      Reply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending support tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default PendingSupport;
