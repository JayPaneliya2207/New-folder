import React, { useState } from "react";
import Switch from "react-switch";
import styles from "./Profile.module.css";

const Profile = () => {
  const [switchStates, setSwitchStates] = useState({
    editProfileOtp: false,
    editBankOtp: false,
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
          <li className="breadcrumb-item active">Profile</li>
        </ol>
      </nav>

      {/* Profile Settings */}
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
                <tr>
                  <td>1.</td>
                  <td>Edit with OTP</td>
                  <td>
                    <div className={styles.switchWrapper}>
                      <Switch
                        onChange={() => handleSwitchChange("editProfileOtp")}
                        checked={switchStates.editProfileOtp}
                        onColor="#008cff"
                        offColor="#ccc"
                        onHandleColor="#fff"
                        checkedIcon={false}
                        uncheckedIcon={false}
                      />
                      <span className={styles.switchText}>
                        {switchStates.editProfileOtp ? "Yes" : "No"}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Edit bank with OTP</td>
                  <td>
                    <div className={styles.switchWrapper}>
                      <Switch
                        onChange={() => handleSwitchChange("editBankOtp")}
                        checked={switchStates.editBankOtp}
                        onColor="#008cff"
                        offColor="#ccc"
                        onHandleColor="#fff"
                        checkedIcon={false}
                        uncheckedIcon={false}
                      />
                      <span className={styles.switchText}>
                        {switchStates.editBankOtp ? "Yes" : "No"}
                      </span>
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

export default Profile;
