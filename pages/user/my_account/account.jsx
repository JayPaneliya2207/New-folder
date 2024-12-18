import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import styles from "./myaccount.module.css";

const Account = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_account_container}`
            : `${styles.account_container}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/My account</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Account
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={`col-sm-12 ${styles.acount_section}`}>
          <div className={`card ${styles.table_card}`}>
            <div className={`card-body ${styles.account_body}`}>
              <div className="col-md-4 m-3">
                <div className="mt-5">
                  <label className="text-white">Select Payment Type</label>
                  <select className="form-control btn-square">
                    <option value="0">--Select--</option>
                    <option value="1">USDT-BEP20</option>
                  </select>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  className={`table table-hover tbl-product`}
                  id="pc-dt-simple"
                >
                  <thead>
                    <tr className="border-bottom border-primary">
                      <th>S No.</th>
                      <th>Default </th>
                      <th>Account details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-bottom border-success">
                      <td>1</td>
                      <td></td>
                      <td>USDT - BEP20 : test</td>
                      <td></td>
                    </tr>

                    <tr className="border-bottom border-danger">
                      <td>2</td>
                      <td></td>
                      <td>USDT - BEP20 : test</td>
                      <td>delete Set default</td>
                    </tr>

                    <tr className="border-bottom border-warning">
                      <td>3</td>
                      <td></td>
                      <td>USDT - BEP20 : fgukhlhl</td>
                      <td>delete Set default</td>
                    </tr>

                    <tr className="border-bottom border-info">
                      <td>4</td>
                      <td></td>
                      <td> </td>
                      <td>delete Set default</td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td></td>
                      <td> </td>
                      <td>delete Set default</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center p-sm-4 pb-sm-2">
                  <button className="btn btn-primary">
                    <i className="ti ti-plus f-18"></i> Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
