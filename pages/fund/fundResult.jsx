import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./fund.module.css";

const fundResult = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/Fund</Breadcrumb.Item>
        <Breadcrumb.Item active>Fund Request</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className="col-xl-6">
          <form className={`card ${styles.addfuns_walet}`}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Method</label>
                    <select className="form-control btn-square">
                      <option value="0">Select Method</option>
                      <option value="0">USDT</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Payment Type</label>
                    <select className="form-control btn-square">
                      <option value="0">Select</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label>Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="000000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label>UTR Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter UTR Number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label>Payment Slip</label>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Enter UTR Number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-start">
                  <button className={`btn btn-success ${styles.fund_request_btn}`} type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xl-6">
          <form className={`card ${styles.addfuns_result}`}>
            <div className="card-body">
              <div className="row">
                <h3>QR Code</h3>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default fundResult;
