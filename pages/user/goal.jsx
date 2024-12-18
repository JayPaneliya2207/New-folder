import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";
import styles from "./userall.module.css";

const goal = () => {
  return (
    <div className="user_pages_container">
      <div className={styles.award_container_sec}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className={styles.background_video}
          src="/images/dashboard/awardbgvideo.mp4"
        ></video>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Goal
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.award_table_section}>
          <div className="row">
            <div className="col-12">
              <div className={`card ${styles.table_goal_card_award}`}>
                <h1>
                  <img
                    src="/images/dashboard/award_winning.png"
                    alt="Trophy"
                    width="85"
                  />
                  Reward &amp; Award
                </h1>
              </div>
            </div>

            <div className="col-12 mt-4">
              <div className={`card ${styles.reward_section}`}>
                <div className="card-header d-flex align-items-center justify-content-between py-3">
                  <h3 className="pt-10">Award, Reward & Tour</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className={`table table-hover ${styles.reward_section}`}
                      id="pc-dt-simple"
                    >
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Self Package</th>
                          <th>Direct Business</th>
                          <th>Team Business</th>
                          <th>Required Directs</th>
                          <th>Award</th>
                          <th>Rewards</th>
                          <th>status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-bottom border-primary">
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">Gain</h6>
                              </div>
                            </div>
                          </td>
                          <td>$</td>
                          <td>$</td>
                          <td>$</td>
                          <td> </td>
                          <td>$ ()</td>
                          <td>%</td>
                          <td>
                            <button className="btn btn-info">Archived</button>
                          </td>
                        </tr>
                        <tr className="border-bottom border-success">
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">Allowance</h6>
                              </div>
                            </div>
                          </td>
                          <td>$</td>
                          <td>$</td>
                          <td>$</td>
                          <td> </td>
                          <td>$ ()</td>
                          <td>%</td>
                          <td>
                            <button className="btn btn-info">Archived</button>
                          </td>
                        </tr>
                        <tr className="border-bottom border-danger">
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">Proceed</h6>
                              </div>
                            </div>
                          </td>
                          <td>$</td>
                          <td>$</td>
                          <td>$</td>
                          <td> </td>
                          <td>$ ()</td>
                          <td>%</td>
                          <td>
                            <button className="btn btn-info">Archived</button>
                          </td>
                        </tr>
                        <tr className="border-bottom border-warning">
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">Premium</h6>
                              </div>
                            </div>
                          </td>
                          <td>$</td>
                          <td>$</td>
                          <td>$</td>
                          <td> </td>
                          <td>$ ()</td>
                          <td>%</td>
                          <td>
                            <button className="btn btn-info">Archived</button>
                          </td>
                        </tr>
                        <tr className="border-bottom border-info">
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0">SAPPHIRE</h6>
                              </div>
                            </div>
                          </td>
                          <td>$</td>
                          <td>$</td>
                          <td>$</td>
                          <td> </td>
                          <td>$ ()</td>
                          <td>%</td>
                          <td>
                            <button className="btn btn-info">Archived</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default goal;
