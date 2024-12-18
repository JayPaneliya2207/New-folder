import React from "react";
import styles from "./EditAlert.module.css"; // Import CSS Module

const EditAlert = () => {
  return (
    <div className={`container-fluid ${styles.container}`}>
      <div className="row pt-2 pb-2">
        <div className="col-sm-12">
          <h4 className="page-title">Edit Alert</h4>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Advance</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Alert
            </li>
          </ol>
        </div>
      </div>
      {/* End Breadcrumb*/}
      {/*End Row*/}
      <div className="row">
        <div className="col-md-4 card bg-light">
          <div className="card-header">Add Alert</div>
          <div className="card-body">
            <form
              action="https://thewinnersacademy.in/admin/advance/edit_alert"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className={`form-control input-shadow bg-white ${styles.input}`}
                  defaultValue="Opportunity Call at 9:00Pm"
                  name="title"
                  id="title"
                  placeholder="Enter Title here"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Enter description here"
                  defaultValue={
                    "https://us06web.zoom.us/j/88131887581?pwd=TE3addNjw6X5gztbtLg5KVVXt8p3U6.1\n"
                  }
                />
              </div>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <button
                  type="submit"
                  className={`btn btn-dark shadow-dark px-5 ${styles.submitBtn}`}
                  name="edit_alert_btn"
                >
                  <i className="icon-lock" />
                  Edit Alert
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-8 card bg-light">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Title </th>
                    <th>Description </th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Opportunity Call at 9:00Pm</td>
                    <td>
                      https://us06web.zoom.us/j/88131887581?pwd=TE3addNjw6X5gztbtLg5KVVXt8p3U6.1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/*End Row*/}
    </div>
  );
};

export default EditAlert;
