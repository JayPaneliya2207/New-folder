import React, { useState, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../src/helper/Common";
import { HiRefresh } from "react-icons/hi";
import styles from "./userall.module.css";

const Report = () => {
  const [showAllData, setShowAllData] = useState(false);
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const reportData = [
    { label: "Weekly ROI", value: "0" },
    { label: "Direct Income", value: "0" },
    { label: "Direct Bonanza", value: "0" },
    { label: "Voucher Income", value: "0" },
    { label: "Matching", value: "0" },
    { label: "Total", value: "0" },
  ];

  const printTable = () => {
    const printContent = document.getElementById("printableTable").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const geUserGetReport = () => {
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
            Report
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="row d-flex">
          <div className="row">
            <div className="col-xl-6">
              <div className={`card ${styles.report_sect}`}>
                <div className="card-body">
                  <div className={styles.total_report_data}>
                    <h4>Total Report</h4>
                    <form action="" method="get">
                      <div className={styles.report_row}>
                        <div className="col-md-6">
                          <div className="report_table">
                            <div className="form-group">
                              <label className="control-label">
                                Date wise income
                              </label>
                              <select
                                name="income_type"
                                id="income_type"
                                className="form-control"
                              >
                                <option selected="" value="all">
                                  Overall
                                </option>
                                <option value="today">Today</option>
                                <option value="24hour">Yesterday</option>
                                <option value="currweek">Current Week</option>
                                <option value="lastweek">Last Week</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 d-flex">
                          <div className={styles.report_data_new}>
                            <button
                              type="button"
                              className={styles.btn_refresh}
                              onClick={() => setShowAllData(true)}
                              name="btn_submit"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={printTable}
                              className={styles.btn_refresh}
                            >
                              Print
                            </button>
                            <button
                              type="button"
                              className={styles.btn_refresh}
                              onClick={() => setShowAllData(true)}
                            >
                              <HiRefresh />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className={`card ${styles.report_sect}`}>
                <div className="card-body">
                  <div className={styles.total_report_data}>
                    <div className={`${styles.user_report} text-white`}>
                      <h3 className="text-white">Username</h3>
                      <p>companyname</p>
                      <h5 className="text-white">Total Income</h5>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-5">
              <div className={`card ${styles.report_sect}`}>
                <div className="card-body">
                  <div
                    className="dt-responsive table-responsive"
                    id="printableTable"
                  >
                    <table
                      id="base-style"
                      className="table table-striped table-bordered nowrap"
                    >
                      <tbody>
                        {reportData
                          .filter(
                            (data) => showAllData || data.label === "Total"
                          )
                          .map((data, index) => (
                            <tr key={index}>
                              <th>{data.label}</th>
                              <td>{data.value}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
