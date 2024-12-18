import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./fund.module.css";

const addFundHistory = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/fund</Breadcrumb.Item>
        <Breadcrumb.Item active>add fund History</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row mt-5">
        <div className={`col-xl-12`}>
          <div className={`card ${styles.addfuns_walet}`}>
            <div className="card-body">
              <div className="dt-responsive table-responsive">
                <table
                  id="base-style"
                  className="table table-striped table-bordered nowrap"
                >
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Tx user</th>
                      <th>Tx Type</th>
                      <th>Credit/Debit</th>
                      <th>Balance</th>
                      <th>Remark</th>
                      <th>Date&Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addFundHistory;
