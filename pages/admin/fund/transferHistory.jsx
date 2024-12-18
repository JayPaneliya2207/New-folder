import React, { useState, useEffect } from "react";
import { common } from "../../../src/helper/Common";
import styles from "./FundTransfer.module.css";
import style from "./pagination.module.css";

const FundTransferHistory = () => {
  const [formData, setFormData] = useState({ username: "", name: "" });
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch fund transfer data
  const getFundTransfer = () => {
    common.getAPI(
      {
        method: "POST",
        url: "transaction/getAllFundTransactions",
      },
      (resp) => {
        if (resp?.data) {
          setTableData(resp.data);
          setOriginalData(resp.data); // Store original data
          setTotalPages(Math.ceil(resp.data.length / 10)); // Assuming 10 items per page
        }
      }
    );
  };

  useEffect(() => {
    getFundTransfer();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (filter data)
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
    setTotalPages(Math.ceil(filteredData.length / 10)); // Update total pages
  };

  // Reset filters
  const handleReset = () => {
    setFormData({ username: "", name: "" });
    setTableData(originalData); // Reset to original data
    setCurrentPage(1);
    setTotalPages(Math.ceil(originalData.length / 10));
  };

  // Pagination logic
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  // Paginated data
  const paginatedData = tableData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <div className="pages_container">
      <div className="pu_container">
        <div className="pu_datatable_wrapper">
          <div className="container-fluid">
            {/* Header */}
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">Fund Transfer</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="https://thewinnersacademy.in/admin/dashboard">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Fund Transfer</li>
                </ol>
              </div>
            </div>

            {/* Filter Form */}
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

            {/* Data Table */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Tx User</th>
                    <th>Full Name</th>
                    <th>Amount</th>
                    <th>Wallet Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((data, index) => (
                      <tr key={data.id}>
                        <td>{(currentPage - 1) * 10 + index + 1}</td>
                        <td>{data.uCode?.username || "-"}</td>
                        <td>{data.uCode?.name || "-"}</td>
                        <td>{data.amount || "-"}</td>
                        <td>{data.walletType || "-"}</td>
                        <td>
                          {(() => {
                            const date = new Date(data.createdAt);
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
                      <td colSpan="6" className="text-center">
                        No Data Available
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

export default FundTransferHistory;
