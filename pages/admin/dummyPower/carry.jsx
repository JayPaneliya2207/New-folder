import React, { useState } from "react";
import styles from "./style.module.css"; // Import the CSS module

const DummyPowerAdd = () => {
  const [username, setUsername] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(1);
  const [dummyPower, setDummyPower] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      username,
      selectedPosition,
      dummyPower,
    });
  };

  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className={`row pt-2 pb-2 ${styles.row}`}>
        <div className="col-sm-9">
          <h4 className={styles.pageTitle}>Dummy Power</h4>
          <ol className={`breadcrumb ${styles.breadcrumb}`}>
            <li className="breadcrumb-item">
              <a href="https://thewinnersacademy.in/admin/dashboard">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Fund</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dummy Power Add
            </li>
          </ol>
        </div>
        <div className="col-sm-3"></div>
      </div>
      <div className={`row justify-content-center ${styles.formRow}`}>
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className={`card card-body shadow-lg ${styles.cardBody}`}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="tx_username" className={styles.label}>
                  Username
                </label>
                <input
                  type="text"
                  name="tx_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`form-control ${styles.input}`}
                  placeholder="Enter Username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="selected_Position" className={styles.label}>
                  Select Position
                </label>
                <select
                  name="selected_Position"
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className={`form-control ${styles.input}`}
                  required
                >
                  <option value={1}>Left</option>
                  <option value={2}>Right</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="carry" className={styles.label}>
                  Enter Dummy Power
                </label>
                <input
                  type="number"
                  name="carry"
                  value={dummyPower}
                  onChange={(e) => setDummyPower(e.target.value)}
                  className={`form-control ${styles.input}`}
                  placeholder="Enter Carry"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  style={{ width: "100%", backgroundColor: "#5e72e4" }}
                  className={`btn btn-primary btn-block btn-lg mt-3 ${styles.submitButton}`}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyPowerAdd;
