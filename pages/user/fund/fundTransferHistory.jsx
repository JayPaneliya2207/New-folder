import React, { useState, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import DataTable from "react-data-table-component";
import { Button, Form, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
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

const FundTransferHistory = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserFundTransferHistory = () => {
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
      txuser: "deo",
      txtype: "saving",
      balance: "$5000",
      creditdebit: "debit",
      remark: "ddfdfrfr",
      datetime: "15-05-2023",
    },
    {
      id: 2,
      txuser: "John",
      txtype: "current",
      balance: "$1000",
      creditdebit: "credit",
      remark: "ddfdfrfr",
      datetime: "10-02-2024",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "Tx user", selector: (row) => row.txuser, sortable: true },
    { name: "Tx Type", selector: (row) => row.txtype, sortable: true },
    {
      name: "Credit/Debit",
      selector: (row) => row.creditdebit,
      sortable: true,
    },
    { name: "Balance", selector: (row) => row.balance, sortable: true },
    { name: "Remark", selector: (row) => row.remark, sortable: true },
    { name: "Date&Time", selector: (row) => row.datetime, sortable: true },
  ];

  const [filters, setFilters] = useState({
    txuser: "",
    userId: "",
    fromDate: null,
    toDate: null,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFromDateChange = (date) => {
    setFilters((prev) => ({ ...prev, fromDate: date }));
  };

  const handleToDateChange = (date) => {
    setFilters((prev) => ({ ...prev, toDate: date }));
  };

  const resetFilters = () => {
    setFilters({
      txuser: "",
      userId: "",
      fromDate: null,
      toDate: null,
    });
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.datetime.split("-").reverse().join("-"));

    return (
      (!filters.txuser || item.txuser.includes(filters.txuser)) &&
      (!filters.userId || item.txuser.includes(filters.userId)) &&
      (!filters.fromDate || itemDate >= filters.fromDate) &&
      (!filters.toDate || itemDate <= filters.toDate)
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
            Fund Transfer
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={`d-flex gap-2 ${styles.direct_section}`}>
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
                  name="txuser"
                  placeholder="Search by name"
                  onChange={handleFilterChange}
                  value={filters.txuser}
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

              <Form.Group className="mb-3">
                <Form.Label>Join Date (From)</Form.Label>
                <DatePicker
                  selected={filters.fromDate}
                  onChange={handleFromDateChange}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select start date"
                  className="form-control"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Join Date (To)</Form.Label>
                <DatePicker
                  selected={filters.toDate}
                  onChange={handleToDateChange}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select end date"
                  className="form-control"
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundTransferHistory;
