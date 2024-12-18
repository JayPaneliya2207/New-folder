import React, { useState, useEffect } from "react";
import styles from "./FranchiseApproved.module.css";
import style from "../fund/pagination.module.css";

const FranchiseApproved = () => {
  const [formData, setFormData] = useState({ username: "", name: "" });
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = originalData.filter(
      (data) =>
        data.uCode?.username
          ?.toLowerCase()
          .includes(formData.username.toLowerCase()) &&
        data.uCode?.name?.toLowerCase().includes(formData.name.toLowerCase())
    );
    setTableData(filteredData);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFormData({ username: "", name: "" });
    setTableData(originalData);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const formatDateTime = (timestamp) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(timestamp).toLocaleString("en-GB", options);
  };

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (data, index) => (
    <tr key={data.id}>
      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>{data.uCode?.username || "-"}</td>
      <td>{data.uCode?.name || "-"}</td>
      <td>{data.amount || "-"}</td>
      <td>{data.walletType || "-"}</td>
      <td>{data.accountHolderName || "-"}</td>
      <td>{data.accountNumber || "-"}</td>
      <td>{data.ifscCode || "-"}</td>
      <td>{data.bankName || "-"}</td>
      <td>{data.branchName || "-"}</td>
      <td>{data.mobileNumber || "-"}</td>
      <td>{data.email || "-"}</td>
      <td>{data.status || "-"}</td>
      <td>{formatDateTime(data.createdAt)}</td>
    </tr>
  );

  return (
    <div className="pages_container">
      <div className="pu_container">
        <div className="pu_datatable_wrapper">
          <div className="container-fluid">
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">Franchise Approved Withdrwals</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="https://thewinnersacademy.in/admin/dashboard">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="https://thewinnersacademy.in/admin/dashboard">
                      Withdrwal
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Approved</li>
                </ol>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  className={styles.formControl}
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  name="name"
                  className={styles.formControl}
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <button type="submit" className={styles.btnPrimary}>
                  Filter
                </button>

                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{ background: "gray" }}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
            {/* Stats Section */}
            <div className={styles.statsContainer}>
              <div className="table-responsive">
                <table className={styles.statsTable}>
                  <tbody>
                    <tr>
                      <th>Payable Amount(0)</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>User Name</th>
                    <th>Full Name</th>
                    <th>Total Amount</th>
                    <th>Payable Amount</th>
                    <th>A/c Holder Name</th>
                    <th>A/c No.</th>
                    <th>IFSC Code</th>
                    <th>Bank Name</th>
                    <th>Branch Name</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map(renderRow)
                  ) : (
                    <tr>
                      <td colSpan="14" className="text-center">
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className={style.paginationContainer}>
              <button
                className={style.paginationBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className={style.paginationInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={style.paginationBtn}
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

export default FranchiseApproved;
