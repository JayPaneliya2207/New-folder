import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./team.module.css";

const matrix = () => {
  return (
    <div className="pages_container">
      <Breadcrumb>
        <Breadcrumb.Item href="#">/Team</Breadcrumb.Item>
        <Breadcrumb.Item active>Mtrix</Breadcrumb.Item>
      </Breadcrumb>
      <div className="row">
        <div className="row">
          <div className={`col-xl-5`}>
            <div className={`card`}>
              <div className={`card-body ${styles.team_section}`}>
                <div className="dt-responsive table-responsive">
                  <h4>Left Team</h4>
                  <table
                    id="base-style"
                    className="table table-striped table-bordered nowrap"
                  >
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>BV</th>
                        <th>Green Unit</th>
                        <th>Green Direct</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-xl-5`}>
            <div className={`card`}>
              <div className={`card-body  ${styles.team_section}`}>
                <div className="dt-responsive table-responsive">
                  <h4>Right Team</h4>
                  <table
                    id="base-style"
                    className="table table-striped table-bordered nowrap"
                  >
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>BV</th>
                        <th>Green Unit</th>
                        <th>Green Direct</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 mt-5">
            <div className="card">
              <div
                className={`card-body d-flex flex-column flex-md-row ${styles.team_section}`}
              >
                <form
                  className={`card col-md-4 direct_team_tree ${styles.team_section}`}
                >
                  <div className={`card-header card-no-border pb-0`}>
                    <h3 className="card-title mb-0">Filter</h3>
                    <div className="card-options">
                      <a
                        className="card-options-collapse"
                        href="#"
                        data-bs-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-up"></i>
                      </a>
                      <a
                        className="card-options-remove"
                        href="#"
                        data-bs-toggle="card-remove"
                      >
                        <i className="fe fe-x"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <select className="form-control btn-square">
                            <option value="0">Select</option>
                            <option value="1">Whole Team</option>
                            <option value="2">Right Team</option>
                            <option value="3">Left Team</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-danger">Filter</button>
                      <button className="btn btn-primary">Reset</button>
                    </div>
                  </div>
                </form>
                <div>
                  <div className={styles.tree}>
                    <ul>
                      <li>
                        <div className="node">Parent</div>
                        <ul>
                          <li>
                            <div className="node">Child 1</div>
                            <ul>
                              <li>
                                <div className="node">Grandchild 1</div>
                              </li>
                              <li>
                                <div className="node">Grandchild 2</div>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <div className="node">Child 2</div>
                            <ul>
                              <li>
                                <div className="node">Grandchild 3</div>
                              </li>
                              <li>
                                <div className="node">Grandchild 4</div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default matrix;
