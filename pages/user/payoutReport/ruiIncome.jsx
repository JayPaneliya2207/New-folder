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
import styles from "./payout.module.css";

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
    // Customizing the sorting arrow
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

const ruiIncome = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserGetRoiIncome = () => {
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
      name: "deo",
      username: "jdoe",
      amount: "4567890",
      package: "fvnjhg",
      remark: "jntunjjk",
      date: "15-12-2022",
    },
    {
      id: 2,
      name: "John",
      username: "jdoe",
      amount: "1234567890",
      package: "djfj",
      remark: "htfeueu",
      date: "18-02-2024",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Amount (₹)", selector: (row) => row.amount, sortable: true },
    { name: "Package (₹)", selector: (row) => row.package, sortable: true },
    { name: "Remark", selector: (row) => row.remark, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
  ];

  const [filters, setFilters] = useState({
    name: "",
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
      name: "",
      userId: "",
      fromDate: null,
      toDate: null,
    });
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.joinDate);

    return (
      (!filters.name || item.name.includes(filters.name)) &&
      (!filters.userId || item.username.includes(filters.userId)) &&
      (!filters.fromDate || itemDate >= filters.fromDate) &&
      (!filters.toDate || itemDate <= filters.toDate)
    );
  });

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_payout_report_sect}`
            : `${styles.payout_report_sect}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/income</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            RoiIncome
          </Breadcrumb.Item>
        </Breadcrumb>

        <div>
          <div className={`${styles.roi_income_section} mb-1`}>
            <div>
              <h6>Total Income</h6>
              <p>0</p>
            </div>
            <div>
              <h6>Payable Income</h6>
              <p>0</p>
            </div>
          </div>

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
              className={`${styles.payout_roi} p-3`}
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
              <Button variant="btn btn-success" onClick={resetFilters}>
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
    </div>
  );
};

export default ruiIncome;
