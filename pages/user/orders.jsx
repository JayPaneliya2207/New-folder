import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../src/helper/Common";
import styles from "./userall.module.css";

const orders = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserGetOrders = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: {},
      },
      (resp) => {
        console.log("===============", resp);
      }
    );
  };

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_order_containe_section}`
            : `${styles.order_containe_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            orders
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="col-sm-12">
            <div className={`card ${styles.orders_section}`}>
              <div className="card-body">
                <div className={`${styles.orders_income_section}`}>
                  <div>
                    <h6>Total Package Amount</h6>
                    <p>0</p>
                  </div>
                </div>
                <div className="dt-responsive table-responsive">
                  <table
                    id="base-style"
                    className="table table-striped table-bordered nowrap"
                  >
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Package amount</th>
                        <th>Package Date</th>
                        <th>Package Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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

export default orders;
