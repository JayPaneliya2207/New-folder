import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./myaccount.module.css";

const change_ttpassword = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/my_account</Breadcrumb.Item>
        <Breadcrumb.Item active>Tt Password</Breadcrumb.Item>
      </Breadcrumb>

      <div className={`row`}>
        <div className="row d-flex justify-content-center">
          <div className={`col-xl-6 ${styles.ttpassword}`}>
            <form className={`card ${styles.change_ttpassword}`}>
              <div className={`card-body`}>
                <div className={`row`}>
                  <div className="col-md-12">
                    <h2 className={styles.set_transaction_heading}>
                      SET TRANSACTION PASSWORD
                    </h2>
                    <div className="mb-3">
                      <label className={`text-white ${styles.ttlabel}`}>
                        Enter Transaction Password
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Set Transaction Password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-12">
                    <div className="mb-3">
                      <label className={`text-white ${styles.ttlabel}`}>
                        Enter Confirm Transaction Password
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Confirm Transaction Password"
                      />
                    </div>
                  </div>
                  <div className="text-start">
                    <button
                      className={`btn btn-success ${styles.ttbtn}`}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default change_ttpassword;
