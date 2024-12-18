import React, { useState } from "react";
import Switch from "react-switch";
import styles from "./FundComponent.module.css";

const FundComponent = () => {
  const [switchStates, setSwitchStates] = useState({
    adminTransferOtp: false,
    fundTransferOtp: false,
  });

  const handleSwitchChange = (key) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className={styles.containerFluid}>
      <br />
      {/* Breadcrumb Navigation */}
      <nav>
        <ol className={`breadcrumb ${styles.breadcrumb}`}>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/settings">Settings</a>
          </li>
          <li className="breadcrumb-item active">Fund</li>
        </ol>
      </nav>

      {/* Fund Settings Table */}
      <div className="row">
        <div className={`col-12 card ${styles.cardBody}`}>
          <div className="table-responsive">
            <table className={`table ${styles.table}`}>
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Setting Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td>1.</td>
                  <td>Transfer Limit</td>
                  <td>
                    <input
                      className={`form-control ${styles.inputField}`}
                      type="text"
                      placeholder="Enter Limit"
                    />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td>2.</td>
                  <td>Admin transfer with OTP</td>
                  <td>
                    <Switch
                      onChange={() => handleSwitchChange("adminTransferOtp")}
                      checked={switchStates.adminTransferOtp}
                      onColor="#008cff"
                      offColor="#ccc"
                      onHandleColor="#fff"
                      checkedIcon={false}
                      uncheckedIcon={false}
                    />
                    <span className={styles.switchText}>
                      {switchStates.adminTransferOtp ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td>3.</td>
                  <td>Deposit Limit</td>
                  <td>
                    <input
                      className={`form-control ${styles.inputField}`}
                      type="text"
                      placeholder="Enter Limit"
                    />
                  </td>
                </tr>

                {/* Row 4 */}
                <tr>
                  <td>4.</td>
                  <td>Fund Transfer with OTP</td>
                  <td>
                    <Switch
                      onChange={() => handleSwitchChange("fundTransferOtp")}
                      checked={switchStates.fundTransferOtp}
                      onColor="#008cff"
                      offColor="#ccc"
                      onHandleColor="#fff"
                      checkedIcon={false}
                      uncheckedIcon={false}
                    />
                    <span className={styles.switchText}>
                      {switchStates.fundTransferOtp ? "Yes" : "No"}
                    </span>
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

export default FundComponent;
