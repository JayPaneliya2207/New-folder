import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import DataTable from "react-data-table-component";
import styles from "./withdrawal.module.css";

export const customTableStyles = {
  rows: {
    style: {
      minHeight: "55px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#181D3CF0",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
      cursor: "pointer",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      padding: "8px",
    },
  },
};

const withdrawalReport = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const [getWithdrwalReport, setGetWithdrwalReport] = useState([]);

  const geUserWithdrwalReport = () => {
    common.getAPI(
      {
        method: "POST",
        url: "withdrawal/getTransactions",
        data: {},
      },
      (resp) => {
        console.log("Response:", resp.data);
        if (resp && resp.status === "success" && resp.data) {
          setGetWithdrwalReport(resp.data);
          AlertMsg("success", "Congratulations!");
        } else {
          AlertMsg("error", "Error", "Failed to fetch withdrawal data.");
        }
      }
    );
  };

  useEffect(() => {
    geUserWithdrwalReport();
  }, []);

  const columns = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Amount ($)",
      selector: (row) => row.amount || "0",
      sortable: true,
    },
    {
      name: "Withdrawal charge ($)",
      selector: (row) => row.withdrawal || "N/A",
      sortable: true,
    },
    {
      name: "Payable Amount ($)",
      selector: (row) => row.PayableAmount || "N/A",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status === 1 ? "Active" : row.status === 0 ? "Inactive" : "N/A",
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.resion || "N/A",
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-US") || "N/A",
      sortable: true,
    },
  ];

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Withdrawal Report");
    XLSX.writeFile(workbook, "Withdrawal_Report.xlsx");
  };

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.report_withdrwalreport_section_container}`
            : `${styles.withdrwalreport_section_container}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/Fund</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Withdrawal Report
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="col-xl-12 d-flex justify-content-center">
          <div className="col-xl-6">
            <form className={`card ${styles.withdrawal_report_sect}`}>
              <div className="card-body">
                <div className="row d-block">
                  <div className={styles.withdrawal_export_btn}>
                    <button
                      className={`col-md-3 m-2 p-1 ${styles.export_btn}`}
                      type="button"
                      onClick={handleExportToExcel}
                    >
                      Export to Excel
                    </button>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <h4>Total Withdrawal</h4>
                      <p>₹ 0</p>
                      <hr />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-12">
                    <div className="mb-3">
                      <h4>Paid Withdrawal</h4>
                      <p>₹ 0</p>
                      <hr />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-12">
                    <div className="mb-3">
                      <h4>Pending Withdrawal</h4>
                      <p>₹ 0</p>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-12 mt-4">
          <div
            className={`card ${styles.data_table_container}`}
            style={{
              flex: 2,
              padding: "20px",
              height: "auto",
            }}
          >
            <DataTable
              columns={columns}
              data={getWithdrwalReport}
              pagination
              highlightOnHover
              responsive
              customStyles={customTableStyles}
              noDataComponent="No withdrawal data available."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withdrawalReport;
