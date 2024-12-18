import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./team.module.css";

const Direct = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/Team</Breadcrumb.Item>
        <Breadcrumb.Item active>Direct</Breadcrumb.Item>
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
                      placeholder="Search By Name"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-2">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search By User Id"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-2">
                  <div className="mb-3">
                    <input className="form-control" type="date" />
                  </div>
                </div>
                <div className="col-sm-6 col-md-2">
                  <div className="mb-3">
                    <input className="form-control" type="date" />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="mb-3">
                    <select className="form-control btn-square">
                      <option value="0">--Select--</option>
                      <option value="1">Active</option>
                      <option value="2">InActive</option>
                    </select>
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
                      <th>Mobile</th>
                      <th>Join Date</th>
                      <th>Status</th>
                      <th>Package</th>
                      <th>Current Business</th>
                      <th>Previous Business</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
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

export default Direct;
