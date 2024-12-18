import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./team.module.css";

const single_lay = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/Team</Breadcrumb.Item>
        <Breadcrumb.Item active>Right Team</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className={`col-xl-12 `}>
          <form className={`card ${styles.team_direct}`}>
            <div className="card-header card-no-border pb-0">
              <h3 className="card-title mb-0">Filter</h3>
              <div className="card-options"></div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search by Name"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-2">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search by User ID"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-end">
              <button
                className={`btn btn-primary ${styles.direct_btn}`}
                type="submit"
              >
                Filter
              </button>
              <button
                className={`btn btn-danger ${styles.direct_btn}`}
                type="submit"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        <div className={`col-xl-12`}>
          <div className={`card ${styles.team_direct}`}>
            <div className="card-body">
              <div className="dt-responsive table-responsive">
                <table
                  id="base-style"
                  className="table table-striped table-bordered nowrap"
                >
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Join Date</th>
                      <th>Active Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>fgd</td>
                      <td>395268</td>
                      <td>ft@t.com</td>
                      <td>2024-10-14 16:50:50</td>
                      <td>Inactive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default single_lay;
