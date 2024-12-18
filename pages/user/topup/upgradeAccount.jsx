import React from "react";
import styles from "./topup.module.css";

const UpgradeAccount = ({ handleToggle }) => (
  <div className="row">
    <div className="col-xl-12">
      <div className="row">
        <div className="col-xl-12">
          <div className={`card ${styles.topup_activate}`}>
            <div className="row">
              <div className="col-xl-6">
                <img
                  src="/images/dashboard/topup.png"
                  alt="Activate"
                  className={styles.img_fluid}
                />
              </div>
              <div className={`col-xl-6 ${styles.topup_form}`}>
                <div className="row d-block">
                  <div className="d-flex justify-content-sm-end">
                    <button
                      className={`col-md-3 m-2 p-1 ${styles.export_btn}`}
                      onClick={handleToggle}
                      type="button"
                    >
                      Upgrade
                    </button>
                  </div>
                  <div className="row">
                    <p style={{ color: "green" }}>
                      Fund wallet: <span>₹ 0</span>
                    </p>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label>Username: </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Username"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-12">
                      <div className="mb-3">
                        <label>Amount: </label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="Enter Amount"
                        />
                      </div>
                    </div>
                    <div className="text-start">
                      <button className="btn btn-info" type="submit">
                        Topup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UpgradeAccount;
