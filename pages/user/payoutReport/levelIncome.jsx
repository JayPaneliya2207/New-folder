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
    sortOrder: {
      ascending: { fontSize: "16px", color: "#fff" },
      descending: { fontSize: "16px", color: "#fff" },
    },
  },
  cells: {
    style: { fontSize: "14px", padding: "8px" },
  },
};

const LevelIncome = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserGetLevelIncome = () => {
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
      user: "deo",
      form: "",
      level: "Level1",
      amount: "1234567890",
      remark: "htfeueu",
      date: "18-02-2024",
    },
    {
      id: 2,
      user: "John",
      form: "",
      level: "Level2",
      amount: "1234567890",
      remark: "htfeueu",
      date: "18-02-2024",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "User", selector: (row) => row.user, sortable: true },
    { name: "From", selector: (row) => row.form, sortable: true },
    { name: "Level", selector: (row) => row.level, sortable: true },
    { name: "Amount (₹)", selector: (row) => row.amount, sortable: true },
    { name: "Remark", selector: (row) => row.remark, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
  ];

  const [filters, setFilters] = useState({
    user: "",
    userId: "",
    level: "",
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
      user: "",
      userId: "",
      level: "",
      fromDate: null,
      toDate: null,
    });
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      (!filters.user || item.user.includes(filters.user)) &&
      (!filters.level || item.level.includes(filters.level)) &&
      (!filters.userId || item.user.includes(filters.userId)) &&
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
            DirectIncome
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
            <div
              className={`card ${styles.data_table_container}`}
              style={{ flex: 2, padding: "20px", height: "auto" }}
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
                <FiFilter /> Filter
              </h4>
              <Button variant="btn btn-info" onClick={resetFilters}>
                Reset
              </Button>
              <hr />
              <Form>
                <Form.Group className="mb-3">
                  <FormControl
                    name="user"
                    placeholder="Search by name"
                    onChange={handleFilterChange}
                    value={filters.user}
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
                  <Form.Label>Level</Form.Label>
                  <Form.Select
                    name="level"
                    onChange={handleFilterChange}
                    value={filters.level}
                  >
                    <option value="">Select Level</option>
                    <option value="Level1">Level 1</option>
                    <option value="Level2">Level 2</option>
                    <option value="Level3">Level 3</option>
                    <option value="Level4">Level 4</option>
                  </Form.Select>
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

export default LevelIncome;
