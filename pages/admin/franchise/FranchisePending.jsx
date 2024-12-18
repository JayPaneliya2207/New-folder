import React, { useState, useEffect } from "react";
import styles from "./FranchiseApproved.module.css";
import style from "../fund/pagination.module.css";

const FranchisePending = () => {
  const [formData, setFormData] = useState({ username: "", name: "" });
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = originalData.filter(
      ({ uCode }) =>
        uCode?.username
          ?.toLowerCase()
          .includes(formData.username.toLowerCase()) &&
        uCode?.name?.toLowerCase().includes(formData.name.toLowerCase())
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
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const TableHeader = () => (
    <thead>
      <tr>
        {[
          "S No.",
          "Action",
          "Username",
          "Full Name",
          "Amount",
          "Wallet Type",
          "Account Holder Name",
          "Account Number",
          "IFSC Code",
          "Bank Name",
          "Branch Name",
          "Mobile Number",
          "Email",
          "Status",
          "Date & Time",
        ].map((header, idx) => (
          <th key={idx}>{header}</th>
        ))}
      </tr>
    </thead>
  );

  const TableRow = ({ data, index }) => (
    <tr>
      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>{data.uCode?.action || "-"}</td>
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
            {/* Page Title */}
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">Franchise Pending Withdrawals</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="admin/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="admin/dashboard">Withdrawal</a>
                  </li>
                  <li className="breadcrumb-item active">Pending</li>
                </ol>
              </div>
            </div>

            {/* Filter Form */}
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <div className={styles.formRow}>
                {["username", "name"].map((field, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Enter ${
                      field.charAt(0).toUpperCase() + field.slice(1)
                    }`}
                    name={field}
                    className={styles.formControl}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                ))}
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

            {/* Data Table */}
            <div className="table-responsive">
              <table className="table table-hover">
                <TableHeader />
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((data, index) => (
                      <TableRow key={data.id} data={data} index={index} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="15" className="text-center">
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={style.paginationContainer}>
              <button
                className={style.paginationBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
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
                aria-label="Next Page"
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

export default FranchisePending;
