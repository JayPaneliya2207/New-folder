import React from "react";
import styles from "./PendingStock.module.css";

const PendingPayout = () => {
  return (
    <div className={`container-fluid ${styles.container}`}>
      {/* Header Section */}
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h4 className={styles.pageTitle}>Payouts</h4>
        </div>
        <div className="col-sm-9">
          <h6>Total Payouts(0)</h6>
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

      {/* Table Section */}
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Total Payouts</th>
                  <th>Charges</th>
                  <th>Franchise Name</th>
                  <th>Net Profit</th>
                  <th>Name</th>
                  <th>Date</th>
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

export default PendingPayout;
