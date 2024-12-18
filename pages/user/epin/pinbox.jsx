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
import styles from "./epin.module.css";

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

const PinBox = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserWatchadsHistory = () => {
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
      pin: "758258",
      usein: "jfjdee",
      pinType: "Current",
      usefor: "kyuyhey",
      datetime: "11-1-2020",
    },
    {
      id: 2,
      pin: "741258",
      usein: "sddee",
      pinType: "Saving",
      usefor: "deyhey",
      datetime: "12-2-2023",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "Pin", selector: (row) => row.pin, sortable: true },
    { name: "Use In", selector: (row) => row.usein, sortable: true },
    { name: "Pin Type", selector: (row) => row.pinType, sortable: true },
    { name: "Use for", selector: (row) => row.usefor, sortable: true },
    { name: "Date&Time", selector: (row) => row.datetime, sortable: true },
  ];

  const [filters, setFilters] = useState({
    name: "",
    userId: "",
    creditDebit: "",
    fromDate: null,
    toDate: null,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFilters((prev) => ({ ...prev, [name]: date }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      userId: "",
      creditDebit: "",
      fromDate: null,
      toDate: null,
    });
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.datetime);

    return (
      (!filters.creditDebit || item.pinType === filters.creditDebit) &&
      (!filters.name ||
        item.usein.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.userId || item.id.toString().includes(filters.userId)) &&
      (!filters.fromDate || itemDate >= filters.fromDate) &&
      (!filters.toDate || itemDate <= filters.toDate)
    );
  });

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_epin_contain_section}`
            : `${styles.epin_contain_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/epin</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            PinBox
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row">
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
              className={`${styles.pinHistory_sidebar} p-3`}
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
              <Button variant="info" onClick={resetFilters}>
                Reset
              </Button>
              <hr />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Select
                    name="creditDebit"
                    onChange={handleFilterChange}
                    value={filters.creditDebit}
                  >
                    <option value="">Select Type</option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinBox;
