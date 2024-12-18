import React, { useEffect, useState, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { FiFilter } from "react-icons/fi";
import { Button, Form, FormControl } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { common } from "../../src/helper/Common";
import styles from "./userall.module.css";

export const customTableStyles = {
  rows: {
    style: {
      minHeight: "55px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#056b83",
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

const Support = () => {
  const [getSupport, setGetSupport] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const [filters, setFilters] = useState({
    ticketId: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const printDiv = (id) => {
    const content = document.getElementById(id).innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const getCurrentUser = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: {},
      },
      (resp) => {
        setCurrentUserId(resp.data._id);
      }
    );
  };

  const getUserSupport = () => {
    common.getAPI(
      {
        method: "POST",
        url: "support/getSupports",
        data: {},
      },
      (resp) => {
        if (resp && resp.status === "success" && resp.data) {
          setGetSupport(resp.data);
          AlertMsg("success", "Congratulations!");
        } else {
          AlertMsg("error", "Error", "Failed to fetch wallet balances.");
        }
      }
    );
  };

  const handleOnUserSupport = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const payload = {
      uCode: currentUserId,
      message: formData.get("message"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      contactNo: formData.get("contactNo"),
      subject: formData.get("subject"),
    };

    common.getAPI(
      {
        method: "POST",
        url: "support/addSupport",
        data: payload,
      },
      (resp) => {
        if (resp.status === "success") {
          AlertMsg("successfuly submit");
          getUserSupport();
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

  const resetFilters = () => {
    setFilters({
      ticketId: "",
      status: "",
    });
  };

  useEffect(() => {
    getCurrentUser();
    getUserSupport();
  }, []);

  const filteredData = getSupport
    .map((item, index) => ({ ...item, dynamicIndex: index + 1 }))
    .filter((item) => {
      const matchesIndex = filters.ticketId
        ? item.dynamicIndex.toString() === filters.ticketId
        : true;

      const matchesStatus = filters.status
        ? (filters.status === "replied" && item.replyStatus === 1) ||
          (filters.status === "notreplied" && item.replyStatus === 0)
        : true;

      return matchesIndex && matchesStatus;
    });

  const columns = [
    {
      name: "Index",
      selector: (row) => row.dynamicIndex,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Create Date",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Reply",
      selector: (row) => (row.replyStatus === 0 ? "Not replied" : "Replied"),
      sortable: true,
    },
  ];

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_support_continer_sec}`
            : `${styles.support_continer_sec}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Support
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row d-flex">
          <div className="row">
            <div className="col-sm-12">
              <div className={`card ${styles.support_section}`}>
                <div className="card-body">
                  <div className="row">
                    {[
                      "Order",
                      "Pending",
                      "Running",
                      "Smooth",
                      "Done",
                      "Cancel",
                    ].map((status, index) => (
                      <div
                        className="col-xl-4 col-sm-6 box-col-6 mb-1"
                        key={status}
                      >
                        <div className={`card ${styles.support_widget}`}>
                          <div className="card-body support-ticket-font">
                            <div className="row">
                              <div className="col-5">
                                <span className="text-white">{status}</span>
                                <h3
                                  className={`${styles.total_num} counter text-white`}
                                >
                                  {index * 1000 + 2060}
                                </h3>
                              </div>
                              <div className="col-7">
                                <div className="text-end">
                                  <ul>
                                    <li>
                                      Profit
                                      <span className="product-stts text-success ms-2">
                                        8989
                                        <i className="icon-angle-up f-12 ms-1"></i>
                                      </span>
                                    </li>
                                    <li>
                                      Loss
                                      <span className="product-stts text-danger ms-2">
                                        2560
                                        <i className="icon-angle-down f-12 ms-1"></i>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className={styles.progress_showcase}>
                              <div className="progress sm-progress-bar">
                                <div
                                  className={`progress-bar ${
                                    index === 0
                                      ? "bg-primary"
                                      : index === 1
                                      ? "bg-secondary"
                                      : index === 2
                                      ? "bg-warning"
                                      : index === 3
                                      ? "bg-info"
                                      : index === 4
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                  role="progressbar"
                                  style={{ width: "70%" }}
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12 mt-5">
              <div className={`card ${styles.support_section}`}>
                <div className="card-body">
                  <div className={styles.total_report_data}>
                    <div className="user_report">
                      <h3 className="text-white">Latest Ticket</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12 mt-5">
              <div className={`card ${styles.support_section}`}>
                <div className="card-body">
                  <div className={styles.total_support}>
                    <h4>NEW SUPPORT TICKET</h4>
                    <p className="text-white">
                      Would you like to speak to one of our financial advisers
                      over the phone? Just submit your details and we&apos;ll be
                      in touch shortly. You can also email us if you would
                      prefer.
                    </p>
                    <form method="get" onSubmit={handleOnUserSupport}>
                      <div className={styles.report_row}>
                        <div className="col-md-12">
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <label
                                className="form-label text-white"
                                htmlFor="support-email"
                              >
                                FirstName
                              </label>
                              <input
                                className="form-control"
                                id="support-email"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                className="form-label text-white"
                                htmlFor="support-ticket-id"
                              >
                                LastName
                              </label>
                              <input
                                className="form-control"
                                id="support-ticket-id"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <label
                                className="form-label text-white"
                                htmlFor="support-email"
                              >
                                Email <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                className="form-control"
                                id="support-email"
                                type="text"
                                name="email"
                                required
                                placeholder="Enter email"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                className="form-label text-white"
                                htmlFor="support-ticket-id"
                              >
                                Contact No.
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                className="form-control"
                                id="support-ticket-id"
                                type="number"
                                name="contactNo"
                                required
                                placeholder="Enter your number"
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <label
                                className="form-label text-white"
                                htmlFor="support-email"
                              >
                                Subject <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                className="form-control"
                                id="support-email"
                                type="text"
                                name="subject"
                                required
                                placeholder="Enter subject"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <label
                              className="form-label text-white"
                              htmlFor="support-email"
                            >
                              Message <span style={{ color: "red" }}>*</span>
                            </label>
                            <textarea
                              className="form-control"
                              id="support-email"
                              type="text"
                              name="message"
                              required
                              placeholder="Enter Message"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3">
                        <div className={styles.report_data_new}>
                          <button
                            type="submit"
                            className={styles.btn_refresh}
                            name="btn_submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12 mt-5">
              <div className={`card ${styles.support_section}`}>
                <div className="card-body">
                  <div className={styles.total_support}>
                    <div className={styles.user_support}>
                      <h3 className="text-white">Support Detail</h3>
                      <hr className={styles.support_hiriz} />
                    </div>
                    <div className="col-sm-6 d-flex justify-content-between">
                      <h4 className="text-white">Not Replied Inquiry</h4>
                      <p style={{ color: "red" }}>0</p>
                    </div>
                    <hr className={styles.support_hiriz} />
                    <div className="col-sm-6 d-flex justify-content-between">
                      <h4 className="text-white">Replied Inquiry</h4>
                      <p style={{ color: "green" }}>0</p>
                    </div>
                    <hr className={styles.support_hiriz} />
                    <div className="col-sm-6 d-flex justify-content-between">
                      <h4 className="text-white">Total Inquiry</h4>
                      <p style={{ color: "green" }}>0</p>
                    </div>
                    <hr className={styles.support_hiriz} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`row ${styles.response_support_ticket}`}>
            <div className="col-12 col-lg-10 mt-5">
              <div className={`card ${styles.support_card}`}>
                <div className={`card-body ${styles.suppor_body}`}>
                  <h1>Support Ticket</h1>
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    customStyles={customTableStyles}
                    pagination
                    highlightOnHover
                    responsive
                    noDataComponent="No transactions match your filter criteria."
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-2 mt-5">
              <div
                className={`card ${styles.support_card}`}
                style={{
                  width: "100%",
                  height: "78vh",
                  borderRight: "1px solid #ddd",
                  position: "sticky",
                  top: 0,
                }}
              >
                <div className={`card-body ${styles.sidebar_suppor_body}`}>
                  <h4>
                    <FiFilter />
                    Filter
                  </h4>
                  <Button variant="btn btn-info" onClick={resetFilters}>
                    Reset
                  </Button>
                  <hr />
                  <Form>
                    <Form.Label>Ticket ID</Form.Label>
                    <Form.Group className="mb-3">
                      <FormControl
                        name="ticketId"
                        placeholder="Search by Ticket ID"
                        onChange={handleFilterChange}
                        value={filters.ticketId}
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
                        <option value="replied">Replied</option>
                        <option value="notreplied">Not Replied</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
