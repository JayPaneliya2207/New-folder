import React, { useState, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import DataTable from "react-data-table-component";
import { Button, Form, FormControl } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
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

const AddFund = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
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

  const [filters, setFilters] = useState({
    name: "",
    userId: "",
  });

  const handleonfundSubmit = (event) => {
    event.preventDefault();

    const payload = {};

    common.getAPI(
      {
        method: "POST",
        url: "support/addSupport",
        data: payload,
      },
      (resp) => {
        if (resp.status === "success") {
          AlertMsg("successfuly submit");
        } else if (resp.status === "error") {
          AlertMsg(
            "error",
            "Oops!",
            resp.message || "Failed to transfer the fund."
          );
        }
      }
    );
    event.target.reset();
  };

  const geUseraddfund = () => {
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      userId: "",
    });
  };

  const filteredData = data.filter((item) => {
    return (
      (!filters.name || item.txuser.includes(filters.name)) &&
      (!filters.userId || item.id.toString().includes(filters.userId))
    );
  });

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_fund_section_container}`
            : `${styles.fund_section_container}`
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
            add fund
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="col-xl-12 d-flex align-items-center justify-content-center">
          <form
            className={`card ${styles.addfuns_walet}`}
            onSubmit={handleonfundSubmit}
          >
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
                  <button className="btn btn-success" type="button">
                    Connect Wallet
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className={`mt-4 d-flex gap-2 ${styles.addfund_section}`}>
            {/* Data Table */}
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
                data={filteredData}
                pagination
                highlightOnHover
                responsive
                customStyles={customTableStyles}
              />
            </div>

            {/* Sidebar Filter */}
            <div
              className={`${styles.addfund_sidebar} p-3`}
              style={{
                width: "250px",
                height: "85vh",
                borderRight: "1px solid #ddd",
                position: "sticky",
                top: 0,
              }}
            >
              <h4>
                <FiFilter />
                Filter
              </h4>
              <Button variant="btn btn-info" onClick={resetFilters}>
                Reset
              </Button>
              <hr />
              <Form>
                <Form.Group className="mb-3">
                  <FormControl
                    name="name"
                    placeholder="Search by name"
                    onChange={handleFilterChange}
                    value={filters.name}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <FormControl
                    name="userId"
                    placeholder="Search by User ID"
                    onChange={handleFilterChange}
                    value={filters.userId}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFund;
