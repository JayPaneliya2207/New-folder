import React, { useState } from "react";
import styles from "./Account.module.css";
import Switch from "react-switch";

const Account = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSwitchChange = (checked) => {
    setIsEnabled(checked);
  };

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
            Account
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className={`${styles.card} col-md-12`}>
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
                  <td>Account with OTP</td>
                  <td>
                    <div className={styles.switchContainer}>
                      <Switch
                        checked={isEnabled}
                        onChange={handleSwitchChange}
                        offColor="#ccc"
                        onColor="#008cff"
                        offHandleColor="#fff"
                        onHandleColor="#fff"
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={18}
                        width={40}
                      />
                      <small className={styles.description}>
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

export default Account;
