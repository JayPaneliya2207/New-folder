import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./fund.module.css";

const addFund = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/fund</Breadcrumb.Item>
        <Breadcrumb.Item active>add fund</Breadcrumb.Item>
      </Breadcrumb>
      <div className="row">
        <div className="col-xl-6">
          <form className={`card ${styles.addfuns_walet}`}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Amount in USDT"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <select className="form-control btn-square">
                      <option value="0">UEDT(BEP20)</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-12">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="0x8c3C8cd4661cB7856232b175E3f6879a269BAB90"
                    />
                  </div>
                </div>
                <div className="text-start">
                  <button className="btn btn-success" type="submit">
                    Connect Wallet
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xl-6">
          <form className={`card ${styles.addfuns_walet}`}>
            <div className="card-header card-no-border pb-0">
              <h3 className="card-title mb-0">Filter</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search By Name"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search By User ID"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-end">
              <button
                className={`btn btn-primary ${styles.fund_btn}`}
                type="submit"
              >
                Filter
              </button>
              <button
                className={`btn btn-danger ${styles.fund_btn}`}
                type="submit"
              >
                Reset
              </button>
            </div>
          </form>
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
    </div>
  );
};

export default addFund;
