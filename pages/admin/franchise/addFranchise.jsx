/* eslint-disable @next/next/no-html-link-for-pages */

import React from "react";
import styles from "./AddFranchiseUser.module.css";

const addFranchise = () => {
  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className={`row ${styles.headerRow}`}>
        <div className="col-sm-9">
          <h4 className={styles.pageTitle}>Add Franchise User</h4>
          {/* <ol className={styles.breadcrumb}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="https://jeevannarogya.com/admin/franchise">Franchise</a>
            </li>
            <li className={styles.activeBreadcrumb}>Add User</li>
          </ol> */}
        </div>
        <div className="col-sm-3"></div>
      </div>
      <h6 className={`text-uppercase ${styles.sectionTitle}`}>Register</h6>
      <hr />
      <form>
        <div className={`card card-body ${styles.formCard}`}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={styles.formControl}
                  placeholder="Name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className={`${styles.formControl} ${styles.checkExist}`}
                  placeholder="Enter Username"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={styles.formControl}
                  placeholder="Email"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="mobile" className={styles.label}>
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className={styles.formControl}
                  placeholder="Mobile"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="country" className={styles.label}>
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className={styles.formControl}
                  placeholder="Country"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  className={styles.formControl}
                  placeholder="Enter address"
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="state" className={styles.label}>
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className={styles.formControl}
                  placeholder="Enter State"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="pin_code" className={styles.label}>
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pin_code"
                  id="pin_code"
                  className={styles.formControl}
                  placeholder="Enter Pin Code"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={styles.formControl}
                  placeholder="Password"
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="col-md-6">
              <div className={styles.formGroup}>
                <label htmlFor="nominee_relation" className={styles.label}>
                  Nominee Relation
                </label>
                <input
                  type="text"
                  name="nominee_relation"
                  className={styles.formControl}
                  placeholder="Nominee Relation"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="nominee_name" className={styles.label}>
                  Nominee Name
                </label>
                <input
                  type="text"
                  name="nominee_name"
                  className={styles.formControl}
                  placeholder="Nominee Name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="franchise_name" className={styles.label}>
                  Franchise Name
                </label>
                <input
                  type="text"
                  name="franchise_name"
                  id="franchise_name"
                  className={styles.formControl}
                  placeholder="Franchise Name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="franchise_pan" className={styles.label}>
                  Franchise Pan
                </label>
                <input
                  type="text"
                  name="franchise_pan"
                  id="franchise_pan"
                  className={styles.formControl}
                  placeholder="Franchise Pan Number"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="franchise_gst" className={styles.label}>
                  Franchise GST
                </label>
                <input
                  type="text"
                  name="franchise_gst"
                  id="franchise_gst"
                  className={styles.formControl}
                  placeholder="GST Number"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className={styles.formControl}
                  placeholder="City"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirm_password" className={styles.label}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className={styles.formControl}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <button
                type="submit"
                className={`Button btn-primary ${styles.saveButton}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default addFranchise;
