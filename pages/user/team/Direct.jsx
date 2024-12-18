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
import styles from "./team.module.css";

export const customTableStyles = {
  rows: {
    style: {
      minHeight: "55px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#181D3CF0  ",
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

const Direct = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const data = [
    {
      id: 1,
      name: "Martin",
      username: "jdoe",
      mobile: "123-456-7890",
      joinDate: "2023-01-01",
      status: "Active",
      package: "Gold",
      currentBusiness: "$1000",
      previousBusiness: "$800",
      position: "Manager",
    },
    {
      id: 2,
      name: "John",
      username: "jdoe",
      mobile: "123-456-7890",
      joinDate: "2023-05-03",
      status: "Inactive",
      package: "Gold",
      currentBusiness: "$1000",
      previousBusiness: "$800",
      position: "Manager",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Mobile", selector: (row) => row.mobile, sortable: true },
    { name: "Join Date", selector: (row) => row.joinDate, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Package", selector: (row) => row.package, sortable: true },
    {
      name: "Current Business",
      selector: (row) => row.currentBusiness,
      sortable: true,
    },
    {
      name: "Previous Business",
      selector: (row) => row.previousBusiness,
      sortable: true,
    },
    { name: "Position", selector: (row) => row.position, sortable: true },
  ];

  const [filters, setFilters] = useState({
    name: "",
    userId: "",
    status: "",
    fromDate: null,
    toDate: null,
  });

  const geUserDirect = () => {
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
      fromDate: null,
      toDate: null,
    });
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.joinDate);

    return (
      (!filters.status || item.status === filters.status) &&
      (!filters.name || item.name.includes(filters.name)) &&
      (!filters.userId || item.username.includes(filters.userId)) &&
      (!filters.fromDate || itemDate >= filters.fromDate) &&
      (!filters.toDate || itemDate <= filters.toDate)
    );
  });

  return (
    <>
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
              Direct
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
    </>
  );
};

export default Direct;
