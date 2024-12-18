import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import DataTable from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./fund.module.css";

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
    sortOrder: {
      ascending: {
        fontSize: "16px",
        color: "#fff",
      },
      descending: {
        fontSize: "16px",
        color: "#fff",
      },
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      padding: "8px",
    },
  },
};

const addFundHistory = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserFundHistory = () => {
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

  const data = [
    {
      id: 1,
      txuser: "martin",
      txtype: "txt",
      creditDebit: "credit",
      balance: "$2000",
      remark: "jnfvjnvjfnv",
      dateTime: "05-08-2021",
    },
    {
      id: 2,
      txuser: "John",
      txtype: "tx",
      creditDebit: "Debit",
      balance: "$1000",
      remark: "jgytubhtu",
      dateTime: "08-05-2025",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "Tx user", selector: (row) => row.txuser, sortable: true },
    { name: "Tx Type", selector: (row) => row.txtype, sortable: true },
    {
      name: "Credit/Debit",
      selector: (row) => row.creditDebit,
      sortable: true,
    },
    { name: "Balance", selector: (row) => row.balance, sortable: true },
    { name: "Remark", selector: (row) => row.remark, sortable: true },
    { name: "Date&Time", selector: (row) => row.dateTime, sortable: true },
  ];

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_addfund_section_container}`
            : `${styles.addfund_section_container}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/fund</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            add fund History
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row mt-5">
          <div className={`col-xl-12`}>
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
                data={data}
                pagination
                highlightOnHover
                responsive
                customStyles={customTableStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addFundHistory;
