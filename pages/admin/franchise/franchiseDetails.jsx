import React from "react";
import styles from "./FranchiseDetails.module.css";

const FranchiseDetails = () => {
  return (
    <div className={`container-fluid ${styles.container}`}>
      {/* Header Section */}
      <div className="row pt-3 pb-3 align-items-center">
        <div className="col-sm-12">
          <h4 className={styles.pageTitle}>Franchise</h4>
        </div>
      </div>

      {/* Title Section */}
      <div className="row">
        <div className="col">
          <h6 className="text-uppercase">All Franchise Users (0)</h6>
          <hr />
        </div>
      </div>

      {/* Filter Section (Single Row) */}
      <form
        action="https://jeevannarogya.com/admin/franchise/users"
        method="get"
        className={`row ${styles.filterForm}`}
      >
        <div className="col-md-2">
          <input
            type="text"
            name="username"
            className={styles.formControl}
            placeholder="Username"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="name"
            className={styles.formControl}
            placeholder="Name"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="franchise_name"
            className={styles.formControl}
            placeholder="Franchise Name"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="mobile_number"
            className={styles.formControl}
            placeholder="Mobile Number"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="city"
            className={styles.formControl}
            placeholder="City"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="pin_code"
            className={styles.formControl}
            placeholder="Pin Code"
          />
        </div>
        <div className="col-md-2">
          <select name="limit" className={styles.formControl}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button type="submit" className={styles.primaryButton}>
            Filter
          </button>
          <a href="admin/franchise/users" className={styles.secondaryButton}>
            Reset
          </a>
        </div>
      </form>

      {/* Table Section */}
      <div className="row">
        <div className="col">
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Action</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Franchise Name</th>
                  <th>Mobile Number</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Pin Code</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="10" className={styles.noData}>
                    No data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseDetails;
