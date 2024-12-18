import React from "react";
import styles from "./PaymentMethod.module.css";

const PaymentMethod = () => {
  return (
    <div className={`container-fluid ${styles.container}`}>
      <br />
      <nav>
        <ol className={`breadcrumb ${styles.breadcrumb}`}>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/settings">Settings</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Payment</a>
          </li>
        </ol>
      </nav>

      <div className={`row ${styles.row}`}>
        <div className="col-md-12 card card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>S No.</th>
                  <th>Setting Name</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>Bank</td>
                  <td>
                    <div className="bt-switch mt-3">
                      <input
                        type="checkbox"
                        data-slug={1}
                        name="change_payments"
                        data-size="small"
                        className="js-switch change_payments_setting"
                        data-color="#008cff"
                        data-on-text={1}
                        data-off-text={0}
                        data-off-color="danger"
                        data-switchery="true"
                        style={{ display: "none" }}
                      />
                      <span
                        className="switchery switchery-small"
                        style={{
                          boxShadow: "rgb(223, 223, 223) 0px 0px 0px 0px inset",
                          borderColor: "rgb(223, 223, 223)",
                          backgroundColor: "rgb(255, 255, 255)",
                          transition: "border 0.4s, box-shadow 0.4s",
                        }}
                      >
                        <small
                          style={{
                            left: 0,
                            transition: "background-color 0.4s, left 0.2s",
                          }}
                        />
                      </span>
                    </div>
                    <small>On Enable value = "1", On Disable value = "0"</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-12 card card-body">
          <h5>Add New</h5>
          <div className="col-md-6 card card-body">
            <form action="" method="post" encType="multipart/form-data">
              <label>Method Name</label>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  className="form-control"
                  name="method_name"
                  required=""
                />
                <span>E.g: Google Pay, Paytm</span>
              </div>
              <label>Unique Name</label>
              <div className="form-group" style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  className="form-control"
                  name="unique_name"
                  required=""
                />
                <span className={styles.spanText}>E.g: googlepay, paytm</span>
              </div>
              <button type="submit" className="btn btn-primary" name="add_btn">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
