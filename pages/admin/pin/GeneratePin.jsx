import React, { useState } from "react";
import styles from "./style.module.css"; // Import the CSS module

const GeneratePin = () => {
  const [noOfPins, setNoOfPins] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure? you want to submit.")) {
      // Add your form submission logic here
      console.log("Form Submitted:", noOfPins);
    }
  };

  return (
    <div className={styles.pu_container}>
      <div className={styles.pu_datatable_wrapper}>
        <div className="container-fluid">
          <div className="row pt-3 pb-3">
            <div className="col-sm-9">
              <h4 className={`${styles.pageTitle} text-primary`}>
                Generate Pin
              </h4>
              <ol className={`${styles.breadcrumb} bg-light p-2 rounded`}>
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none text-secondary">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a
                    href="https://thewinnersacademy.in/admin/pin"
                    className="text-decoration-none text-secondary"
                  >
                    Pin
                  </a>
                </li>
                <li
                  className="breadcrumb-item active text-dark"
                  aria-current="page"
                >
                  Generate Pin
                </li>
              </ol>
            </div>
            <div className="col-sm-3"></div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="mb-4 card shadow-sm">
                <div className={`${styles.cardHeader} card-header text-center`}>
                  <h6
                    style={{ textTransform: "uppercase" }}
                    className={`${styles.textUppercase} ${styles.fontWeightBold} ${styles.textCenter} mb-4`}
                  >
                    Generate Pin
                  </h6>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group p-4  mb-4">
                    <label
                      htmlFor="no_of_pins"
                      className={`${styles.fontWeightBold} form-label`}
                    >
                      No. of Pins
                    </label>
                    <input
                      type="text"
                      className={`form-control ${styles.shadowSm}`}
                      name="no_of_pins"
                      value={noOfPins}
                      onChange={(e) => setNoOfPins(e.target.value)}
                      placeholder="Enter No. of pins"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#5e72e4",
                        marginBottom: "20px",
                      }}
                      className={`btn btn-primary ${styles.shadowSm} ${styles.w50}`}
                    >
                      Generate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePin;
