/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect, useCallback } from "react";
import styles from "./kyc.module.css";
import { useRouter } from "next/router";
import { common } from "../../../src/helper/Common.js";

const AllKyc = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ username: "", name: "" });
  const [requests, setRequests] = useState([]);
  const [txUser, setTxUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Separate state for search

  const totalPages = Math.ceil(totalRows / perPage);

  // Fetch user data
  const fetchUsers = useCallback((page, searchTerm, listPerPage) => {
    setLoading(true);
    common.getAPI(
      {
        method: "POST",
        url: "admin/getUsers",
        data: { page, listPerPage, searchTerm },
      },
      (resp) => {
        setRequests(
          resp.data.map((item) => ({ ...item, nominee: item.nominee }))
        );
        setPerPage(listPerPage);
        setTotalRows(resp.totalUser);
        setLoading(false);
      }
    );
  }, []);

  // Handle filter submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(txUser); // Update search term
    setCurrentPage(1);
  };

  // Handle page changes
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Reset filters
  const handleReset = () => {
    setTxUser("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Navigate to KYC details page
  const handleView = (id) => {
    router.push(`/admin/kyc/kyc-details?id=${id}`);
  };

  // Fetch initial data and on dependency changes
  useEffect(() => {
    fetchUsers(currentPage, searchTerm, perPage);
  }, [currentPage, perPage, searchTerm, fetchUsers]);

  return (
    <div className="pages_container">
      <div className="pu_datatable_wrapper">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="row pt-2 pb-2">
            <div className="col-sm-9">
              <h4 className="page-title">Pending KYC</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">KYC</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Pending KYC
                </li>
              </ol>
            </div>
          </div>

          {/* Filter Section */}
          <h6 className="text-uppercase">Pending KYC</h6>
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
            <button
              type="button"
              className="btn btn-secondary btn-sm m-1"
              onClick={handleReset}
            >
              Reset
            </button>
          </form>

          {/* Table Section */}
          <div className="row">
            <div className="col-12">
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>USER ID</th>
                      <th>NAME</th>
                      <th>KYC ALL</th>
                      <th>AADHAR</th>
                      <th>NOMINEE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length > 0 ? (
                      requests.map((req, index) => (
                        <tr key={req.id || `${req.username}-${index}`}>
                          <td>{(currentPage - 1) * perPage + index + 1}</td>
                          <td>{req.username}</td>
                          <td>{req.name}</td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => handleView(req._id)}
                            >
                              All KYC View
                            </button>
                          </td>
                          <td className="badge-success badge-sm">Pending</td>
                          <td className="badge-success badge-sm">Pending</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination Section */}
          <div className="row">
            <div className="col-12 text-center">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="m-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
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

export default AllKyc;
