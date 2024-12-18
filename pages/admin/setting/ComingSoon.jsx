import React from "react";
import styles from "./ComingSoon.module.css";

const ComingSoon = () => {
  return (
    <div className={styles.containerFluid}>
      <br />
      <nav>
        <ol className={styles.breadcrumb}>
          <li className={styles.breadcrumbItem}>
            <a href="https://thewinnersacademy.in/admin/dashboard">Home</a>
          </li>
          <li className={styles.breadcrumbItem}>
            <a href="https://thewinnersacademy.in/admin/settings">Settings</a>
          </li>
          <li className={`${styles.breadcrumbItem} ${styles.active}`}>
            Coming Soon
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className={`col-md-12 ${styles.card} ${styles.cardBody}`}>
          <div className="table-responsive">
            <table className={`${styles.table} table-bordered`}>
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Setting Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Coming Soon</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
