import React, { useState, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import DataTable from "react-data-table-component";
import { Button, Form, FormControl } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./team.module.css";

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

const Generation = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const data = [
    {
      id: 1,
      action: "act1",
      name: "Martin",
      username: "jdoe",
      joinDate: "2023-01-01",
      status: "Active",
      level: "level 1",
      sponsor: "ducjdcu",
    },
    {
      id: 2,
      action: "act1",
      name: "John",
      username: "jdoe",
      joinDate: "2023-05-03",
      status: "Inactive",
      level: "level 2",
      sponsor: "ducjdcu",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "Action", selector: (row) => row.action, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Join Date", selector: (row) => row.joinDate, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Level", selector: (row) => row.level, sortable: true },
    {
      name: "Sponsor ID(Name)",
      selector: (row) => row.sponsor,
      sortable: true,
    },
  ];

  const [filters, setFilters] = useState({
    name: "",
    userId: "",
    status: "",
    level: "",
    fromDate: null,
    toDate: null,
  });

  const geUserGeneration = () => {
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
      status: "",
      level: "",
      fromDate: null,
      toDate: null,
    });
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.joinDate);

    return (
      (!filters.status || item.status === filters.status) &&
      (!filters.level || item.level === filters.level) &&
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
            ? `${styles.darkmode_container_section}`
            : `${styles.container_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/Team</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Generation
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={`d-flex gap-2 ${styles.direct_section}`}>
          <div
            className={`card ${styles.data_table_container}`}
            style={{
              flex: 2,
              padding: "20px",
              height: "auto",
            }}
          >
            <h3 className={`mb-4 ${styles.direct_company_heading}`}>
              company ( companyname )
            </h3>
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
            className={`${styles.filter_sidebar} p-3`}
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

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  onChange={handleFilterChange}
                  value={filters.status}
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Select
                  name="level"
                  onChange={handleFilterChange}
                  value={filters.level}
                >
                  <option value="">Select Level</option>
                  <option value="level 1">Level 1</option>
                  <option value="level 2">Level 2</option>
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
  );
};

export default Generation;
