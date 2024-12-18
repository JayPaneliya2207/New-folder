import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./fund.module.css";

const fundConvert = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/fund</Breadcrumb.Item>
        <Breadcrumb.Item active>add fund History</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className="col-xl-6">
          <form className={`card ${styles.addfuns_walet}`}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Select From Wallet</label>
                    <select className="form-control btn-square">
                      <option value="0">Select Wallet</option>
                      <option value="0">Roi Wallet</option>
                      <option value="0">Refferal Wallet</option>
                      <option value="0">Autopool Wallet</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Select To Wallet</label>
                    <select className="form-control btn-square">
                      <option value="0">Select Wallet</option>
                      <option value="0">Fund Wallet</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Enter Amount</label>
                    <input type="number" className="form-control" placeholder="000000"/>
                  </div>
                </div>
                <div className="text-start">
                  <button className="btn btn-success" type="submit">
                    Convert
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default fundConvert;
