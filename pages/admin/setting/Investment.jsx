import React, { useState } from "react";
import Switch from "react-switch";
import styles from "./Investment.module.css";

const Investment = () => {
  const [topupType, setTopupType] = useState(false);
  const [investmentTopup, setInvestmentTopup] = useState(false);

  return (
    <div className={styles.container}>
      <nav>
        <ol className={`breadcrumb ${styles.breadcrumb}`}>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/settings">Settings</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Investment</a>
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className={`col-md-12 card card-body ${styles.card}`}>
          <div className="table-responsive">
            <table className={`table table-bordered ${styles.table}`}>
              <tbody>
                <tr>
                  <th>S No.</th>
                  <th>Setting Name</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>Topup type</td>
                  <td>
                    <div className={styles.switchContainer}>
                      <Switch
                        onChange={() => setTopupType(!topupType)}
                        checked={topupType}
                        offColor="#ccc"
                        onColor="#4caf50"
                        checkedIcon={false}
                        uncheckedIcon={false}
                      />
                      <small className={styles.smallText}>
                        On Enable value = "pin", On Disable value = "amount"
                      </small>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Investment Topup with OTP</td>
                  <td>
                    <div className={styles.switchContainer}>
                      <Switch
                        onChange={() => setInvestmentTopup(!investmentTopup)}
                        checked={investmentTopup}
                        offColor="#ccc"
                        onColor="#4caf50"
                        checkedIcon={false}
                        uncheckedIcon={false}
                      />
                      <small className={styles.smallText}>
                        On Enable value = "yes", On Disable value = "no"
                      </small>
                    </div>
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

export default Investment;
