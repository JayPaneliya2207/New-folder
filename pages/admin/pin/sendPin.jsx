import React from "react";
import styles from "./style.module.css"; // Importing the styles

const SendPin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure? You want to Submit.")) {
      console.log("Form Submitted");
    }
  };

  return (
    <div className={styles.pu_container}>
      <div className={styles.pu_datatable_wrapper}>
        <div className="container-fluid p-4">
          <div className="row mb-4">
            <div className="col-md-9">
              <h4 className={`${styles.pageTitle} text-primary`}>Send Pin</h4>
              <ol className="breadcrumb bg-light p-2 rounded">
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none text-secondary">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a
                    href="http://localhost/hellotrade_main/admin/pin"
                    className="text-decoration-none text-secondary"
                  >
                    Pin
                  </a>
                </li>
                <li
                  className="breadcrumb-item active text-dark"
                  aria-current="page"
                  style={{ color: "#5e72e4" }}
                >
                  Send Pin
                </li>
              </ol>
            </div>
          </div>

          <h5 className="text-uppercase text-secondary">Send Pin</h5>
          <hr />
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className={`${styles.cardHeader} card-header text-center`}>
                  <h3 style={{ textTransform: "uppercase" }}>Send Pin Form</h3>
                </div>
                <div className={`${styles.cardBody} card-body`}>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="username" className={styles.labels}>
                        Username
                      </label>
                      <input
                        type="text"
                        name="tx_username"
                        className="form-control"
                        placeholder="Enter Username"
                        aria-describedby="helpId"
                      />
                      <span
                        id="username_res"
                        className="form-text text-danger"
                      ></span>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="selected_pin" className={styles.labels}>
                        Select Pin
                      </label>
                      <select
                        className="form-control"
                        name="selected_pin"
                        id="selected_pin"
                        required
                      >
                        <option value="">Select Pin</option>
                        <option value="Package">Package</option>
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="no_of_pins" className={styles.labels}>
                        No. of Pins
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="no_of_pins"
                        id="no_of_pins"
                        placeholder="Enter No. of pins"
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        name="pin_transfer_btn"
                        style={{ backgroundColor: "#5e72e4" }}
                      >
                        Transfer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPin;
