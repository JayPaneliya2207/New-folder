import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import styles from "./topup.module.css";

const ReTopup = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  return (
    <>
      <div className="user_pages_container">
        <div
          className={`${
            darkMoreMainSection
              ? `${styles.darkmode_topup_section}`
              : `${styles.topup_section}`
          }`}
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard" passHref>
                <a className="text-decoration-none">/Home</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-white">/Invest</Breadcrumb.Item>
            <Breadcrumb.Item active className="text-white">
              Retopup
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-12">
                  <div className={`card ${styles.topup_activate}`}>
                    <div className="row">
                      <div className="col-xl-6">
                        <img
                          src="/images/dashboard/retopup.png"
                          alt="Activate"
                          width="600px"
                          height="550px"
                          className={styles.img_fluid}
                        />
                      </div>
                      <div className={`col-xl-6 ${styles.topup_form}`}>
                        <div className="row d-block">
                          <div className="d-flex justify-content-sm-end">
                            <button
                              className={`col-md-3 m-2 p-1 ${styles.export_btn}`}
                              type="button"
                            >
                              Re-topup
                            </button>
                          </div>
                          <div className="row">
                            <p style={{ color: "green" }}>
                              Fund wallet: <span>₹ 0</span>
                            </p>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label>Username: </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Enter Username"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-12">
                              <div className="mb-3">
                                <label>Amount: </label>
                                <input
                                  className="form-control"
                                  type="number"
                                  placeholder="Enter Amount"
                                />
                              </div>
                            </div>
                            <div className="text-start">
                              <button className="btn btn-info" type="submit">
                                Topup
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`row d-flex justify-content-center`}>
            <div className="col-sm-8 mt-4">
              <div className={`card ${styles.topup_steps_activate}`}>
                <div className="card-body">
                  <div className="detail_topup text-center">
                    <h4>Steps for Re-Topup</h4>
                    <p>
                      <i
                        className="fa fa-check-square m-1"
                        aria-hidden="true"
                      ></i>
                      You can re-topup any user ID.
                    </p>
                    <p>
                      <i
                        className="fa fa-check-square m-1"
                        aria-hidden="true"
                      ></i>
                      Enter the username you want to re-topup.
                    </p>
                    <p>
                      <i
                        className="fa fa-check-square m-1"
                        aria-hidden="true"
                      ></i>
                      Select the package from the dropdown menu, and then click
                      on the topup button.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReTopup;
