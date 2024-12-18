import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./myaccount.module.css";

const change_txpassword = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/my_account</Breadcrumb.Item>
        <Breadcrumb.Item active>Tx Password</Breadcrumb.Item>
      </Breadcrumb>

      <div className={`row`}>
        <div className="row d-flex justify-content-center">
          <div className={`col-xl-6 ${styles.ttpassword}`}>
            <form className={`card ${styles.change_ttpassword}`}>
              <div className={`card-body`}>
                <div className={`row`}>
                  <div className="col-md-12">
                    <h2 className={styles.set_transaction_heading}>
                      Change Tx PASSWORD
                    </h2>
                    <div className="mb-3">
                      <label className={`text-white ${styles.ttlabel}`}>
                        Old Transaction Password
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Old Transaction Password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-12">
                    <div className="mb-3">
                      <label className={`text-white ${styles.ttlabel}`}>
                        Transaction Password
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Transaction Password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-12">
                    <div className="mb-3">
                      <label className={`text-white ${styles.ttlabel}`}>
                        Confirm Transaction Password
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Confirm Transaction Password"
                      />
                    </div>
                  </div>
                  <div className="text-start">
                    <button
                      className={`btn btn-success ${styles.txbtn}`}
                      type="submit"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.strong_password}>
                <p className={styles.strong_password_heading}>
                  A Strong Transaction password
                </p>
                <ul>
                  <li>
                    <span>*</span>Is at_least eight Character long.
                  </li>
                  <li>
                    <span>*</span>Does not contain your user name, real name, or
                    company name.
                  </li>
                  <li>
                    <span>*</span>does not containe a completed word.
                  </li>
                  <li>
                    <span>*</span>Is significantly diffrent from previous
                    password.
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default change_txpassword;
