import React, { useState, useEffect } from "react";
import { common } from "../../../src/helper/Common";
import styles from "./FundTransfer.module.css";
import style from "./pagination.module.css";

const FundRetrieveHistory = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
  });
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [originalData, setOriginalData] = useState([]); // To store the original unfiltered data

  // Function to fetch fund transfer data
  const fetchFundTransferData = () => {
    common.getAPI(
      {
        method: "POST",
        url: "transaction/getRetrieveFunds",
      },
      (resp) => {
        if (Array.isArray(resp.data) && resp.data.length > 0) {
          setTableData(resp.data);
          setOriginalData(resp.data);
        } else {
          console.error("No data or invalid response received:", resp);
        }
      }
    );
  };

  useEffect(() => {
    fetchFundTransferData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission for filtering
  const handleSubmit = (e) => {
    e.preventDefault();

    // Apply filter based on the form data
    const filteredData = originalData.filter((item) => {
      const usernameMatch = formData.username
        ? item.txUCode?.username
            ?.toLowerCase()
            .includes(formData.username.toLowerCase())
        : true;
      const nameMatch = formData.name
        ? item.txUCode?.name
            ?.toLowerCase()
            .includes(formData.name.toLowerCase())
        : true;

      return usernameMatch && nameMatch;
    });

    setTableData(filteredData);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Handle reset button
  const handleReset = () => {
    setFormData({ username: "", name: "" });
    setTableData(originalData);
    setCurrentPage(1); // Reset to the first page
  };

  // Pagination logic
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="pages_container">
      <div className="pu_container">
        <div className="pu_datatable_wrapper">
          <div className={styles.contentWrapper}>
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className={styles["page-title"]}>Fund Retrieve</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="https://thewinnersacademy.in/admin/dashboard">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Fund Transfer</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Fund Retrieve
                  </li>
                </ol>
              </div>
              <div className="col-sm-3"></div>
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

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Sr.no</th>
                    <th>User Id</th>
                    <th>Full Name</th>
                    <th>Amount</th>
                    <th>Wallet Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((data, index) => (
                      <tr key={data.id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{data.txUCode?.username || ""}</td>
                        <td>{data.txUCode?.name || ""}</td>
                        <td>{data?.amount !== null ? data?.amount : ""}</td>
                        <td>{data.walletType || ""}</td>
                        <td>
                          {data.createdAt
                            ? new Date(data.createdAt).toLocaleString()
                            : ""}
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

export default FundRetrieveHistory;
