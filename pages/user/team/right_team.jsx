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
  },
  cells: {
    style: {
      fontSize: "14px",
      padding: "8px",
    },
  },
};

const right_team = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const data = [
    {
      id: 1,
      name: "Martin",
      username: "jdoe",
      email: "def@gmail.com",
      joinDate: "2023-01-01",
      status: "Active",
    },
    {
      id: 2,
      name: "John",
      username: "jdoe",
      email: "abc@gmail.com",
      joinDate: "2023-05-03",
      status: "Inactive",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Join Date", selector: (row) => row.joinDate, sortable: true },
    { name: "Active Status", selector: (row) => row.status, sortable: true },
  ];

  const [filters, setFilters] = useState({
    name: "",
    username: "",
  });

  const geUserRightTeam = () => {
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
      username: "",
    });
  };

  const filteredData = data.filter((item) => {
    return (
      (!filters.name ||
        item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.username ||
        item.username.toLowerCase().includes(filters.username.toLowerCase()))
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
            RightTeam
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
              <FiFilter /> Filter
            </h4>
            <Button variant="btn btn-info" onClick={resetFilters}>
              Reset
            </Button>
            <hr />
            <Form>
              <Form.Group className="mb-3">
                <FormControl
                  name="name"
                  placeholder="Enter Name"
                  onChange={handleFilterChange}
                  value={filters.name}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <FormControl
                  name="username"
                  placeholder="Enter Username"
                  onChange={handleFilterChange}
                  value={filters.username}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default right_team;
