import React from "react";
import styles from "./PendingStock.module.css";

const PendingStock = () => {
  return (
    <div className={`container-fluid ${styles.container}`}>
      {/* Header Section */}
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h4 className={styles.pageTitle}>Franchise Pending Stock</h4>
        </div>
      </div>

      {/* Form Section */}
      <form
        action="admin/franchise/pending-stock"
        method="get"
        className={styles.filterForm}
      >
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              className={styles.formControl}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              className={styles.formControl}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Enter Member name"
              name="franchise_name"
              className={styles.formControl}
            />
          </div>
          <div className={styles.formGroup}>
            <select name="limit" className={styles.selectControl}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.buttonGroup}>
              <input
                type="submit"
                name="submit"
                value="Filter"
                className={styles.primaryBtn}
              />
              <a
                href="admin/franchise/pending-stock"
                className={styles.secondaryBtn}
              >
                Reset
              </a>
            </div>
          </div>
        </div>
      </form>

      {/* Stats Section */}
      <div className={styles.statsContainer}>
        <div className="table-responsive">
          <table className={styles.statsTable}>
            <tbody>
              <tr>
                <th>Total Amount Pending (0)</th>
                <th>Total BV Pending (0)</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Section */}
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Franchise Username</th>
                  <th>Franchise Name</th>
                  <th>Member Name</th>
                  <th>Mobile Number</th>
                  <th>Total Qty</th>
                  <th>Amount Pending</th>
                  <th>BV Pending</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="9" className={styles.noData}>
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

export default PendingStock;
