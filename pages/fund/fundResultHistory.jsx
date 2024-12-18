import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./fund.module.css";

const fundResultHistory = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/Fund</Breadcrumb.Item>
        <Breadcrumb.Item active>Fund Request Hostory</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className={`col-xl-12 `}>
          <form className={`card ${styles.addfuns_walet}`}>
            <div className="card-header card-no-border pb-0">
              <h3 className="card-title mb-0">Filter</h3>
              <div className="card-options"></div>
            </div>
            <div className="card-body">
              <div className="row">
              <div className="col-md-2">
                  <div className="mb-3">
                    <select className="form-control btn-square">
                      <option value="0">20</option>
                      <option value="1">30</option>
                      <option value="2">40</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mb-3">
                    <select className="form-control btn-square">
                      <option value="0">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">InActive</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-2">
                  <div className="mb-3">
                    <input className="form-control" type="date" />
                  </div>
                </div>
                <div className="col-sm-6 col-md-2">
                  <div className="mb-3">
                    <input className="form-control" type="date" />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-end">
              <button
                className={`btn btn-primary ${styles.request_history_btn}`}
                type="submit"
              >
                Filter
              </button>
              <button
                className={`btn btn-danger ${styles.request_history_btn}`}
                type="submit"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
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
                      <th>Amount($)</th>
                      <th>Method</th>
                      <th>Type</th>
                      <th>UTR Number</th>
                      <th>Payment slip</th>
                      <th>Status</th>
                      <th>Reason</th>
                      <th>Date</th>
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

export default fundResultHistory;
