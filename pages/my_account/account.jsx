import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./myaccount.module.css";

const Account = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/my_account</Breadcrumb.Item>
        <Breadcrumb.Item active>Account</Breadcrumb.Item>
      </Breadcrumb>
      <div className={`col-sm-12 ${styles.acount_section}`}>
        <div className="card table-card">
          <div className="card-body">
            <div className="col-md-4 m-3">
              <div className="mt-5">
                <label>Select Payment Type</label>
                <select className="form-control btn-square">
                  <option value="0">--Select--</option>
                  <option value="1">USDT-BEP20</option>
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table
                className="table table-hover tbl-product"
                id="pc-dt-simple"
              >
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Default </th>
                    <th>Account details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td>USDT - BEP20 : test</td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td></td>
                    <td>USDT - BEP20 : test</td>
                    <td>delete Set default</td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td></td>
                    <td>USDT - BEP20 : fgukhlhl</td>
                    <td>delete Set default</td>
                  </tr>

                  <tr>
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
                <a href="ecom_product-add.html" className="btn btn-primary">
                  <i className="ti ti-plus f-18"></i> Add Product
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
