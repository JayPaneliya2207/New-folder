/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import styles from "./Alert.module.css";

const AlertComponent = () => {
  const alertData = [
    {
      id: 1,
      title: "Alert 1",
      description: "This is a description of alert 1.",
      image: "https://via.placeholder.com/80",
      status: "Active",
    },
    {
      id: 2,
      title: "Alert 2",
      description: "This is a description of alert 2.",
      image: "https://via.placeholder.com/80",
      status: "Inactive",
    },
    {
      id: 3,
      title: "Alert 3",
      description: "This is a description of alert 3.",
      image: "https://via.placeholder.com/80",
      status: "Active",
    },
  ];

  const [alertType, setAlertType] = useState("popup");

  const handleAlertTypeChange = (event) => setAlertType(event.target.value);

  const renderAlertRows = () =>
    alertData.map((alert) => (
      <tr key={alert.id}>
        <td>{alert.id}</td>
        <td>{alert.title}</td>
        <td>{alert.description}</td>
        <td>
          <img src={alert.image} alt={alert.title} />
        </td>
        <td>
          <span
            className={
              alert.status === "Active"
                ? styles.statusActive
                : styles.statusInactive
            }
          >
            {alert.status}
          </span>
        </td>
        {/* <td>
          <a
            className={styles.btnSuccess}
            href={`/admin/setting/editAlert?id=${alert.id}`}
            style={{ textDecoration: "none" }}
          >
            Edit
          </a>
          <button className={styles.btnDanger} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </td> */}
        <td>
          <a
            className={styles.btnSuccess}
            href={`/admin/setting/editAlert?id=${alert.id}`}
            style={{
              textDecoration: "none",
              marginBottom: "10px",
              paddingLeft: "17px",
              paddingRight: "17px",
            }}
          >
            Edit
          </a>
          <button className={styles.btnDanger} style={{ marginTop: "10px" }}>
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <div className={styles.containerFluid}>
      {/* Page Header */}
      <div className="row pt-2 pb-2">
        <div className="col-sm-12">
          <h4 className={styles.pageTitle}>Advance</h4>
          <div className="row pt-3 bg-default">
            <div className="col-sm-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Advance</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Alert
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Add Alert Form */}
        <div className={`col-md-4 ${styles.card}`}>
          <div className={styles.cardHeader}>Add Alert</div>
          <div className={styles.cardBody}>
            <form
              action="/admin/advance/add-alert"
              method="POST"
              encType="multipart/form-data"
            >
              <div className={styles.formGroup}>
                <label htmlFor="alert_type">Select Alert Type</label>
                <select
                  id="alert_type"
                  name="alert_type"
                  className="form-control"
                  value={alertType}
                  onChange={handleAlertTypeChange}
                >
                  <option value="popup">Image and Text</option>
                  <option value="marquee">One Line</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className={`${styles.inputShadow} form-control`}
                  placeholder="Enter Title here"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Enter description here"
                />
              </div>

              {alertType === "popup" && (
                <div className={styles.formGroup}>
                  <label htmlFor="file">Image</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className={`${styles.inputShadow} form-control`}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <button
                  type="submit"
                  className={`${styles.btnRemove} px-5`}
                  name="alert_btn"
                >
                  <i className="icon-lock" /> Add Alert
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Alert Table */}
        <div className={`col-md-8 ${styles.card}`}>
          <div className={styles.cardBody}>
            <form className="search-form">
              <div className="form-inline d-flex flex-wrap justify-content-between">
                <div className={`${styles.formGroup} px-2`}>
                  <input
                    type="text"
                    name="admin_advance_search[description]"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
                <div className={`${styles.formGroup} px-2`}>
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                </div>
              </div>
            </form>

            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{renderAlertRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
