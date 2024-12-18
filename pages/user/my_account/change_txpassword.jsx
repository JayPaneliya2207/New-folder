import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import { common } from "../../../src/helper/Common";
import Link from "next/link";
import styles from "./myaccount.module.css";

const change_txpassword = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const handletxpassword = (event) => {
    event.preventDefault();
    const payload = {};

    common.getAPI(
      {
        method: "POST",
        url: "support/addSupport",
        data: payload,
      },
      (resp) => {
        if (resp.status === "success") {
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

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_txpassword_section}`
            : `${styles.txpassword_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/My account</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Tx Password
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={`row`}>
          <div className="row d-flex justify-content-center">
            <div className={`col-xl-6 ${styles.ttpassword}`}>
              <form className={`card ${styles.change_ttpassword}`}>
                <div className={`card-body`}>
                  <div className={`row`}>
                    <div className="col-md-12">
                      <h2 className={styles.set_transaction_heading}>
                        Change Tx PASSWORD
                      </h2>
                      <div className="mb-3">
                        <label className={`text-white ${styles.ttlabel}`}>
                          Old Transaction Password
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Old Transaction Password"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-12">
                      <div className="mb-3">
                        <label className={`text-white ${styles.ttlabel}`}>
                          Transaction Password
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Transaction Password"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-12">
                      <div className="mb-3">
                        <label className={`text-white ${styles.ttlabel}`}>
                          Confirm Transaction Password
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Confirm Transaction Password"
                        />
                      </div>
                    </div>
                    <div className="text-start">
                      <button
                        className={`btn btn-info ${styles.txbtn}`}
                        type="button"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.strong_password}>
                  <p className={styles.strong_password_heading}>
                    A Strong Transaction password
                  </p>
                  <ul>
                    <li>
                      <span>*</span>Is at_least eight Character long.
                    </li>
                    <li>
                      <span>*</span>Does not contain your user name, real name,
                      or company name.
                    </li>
                    <li>
                      <span>*</span>does not containe a completed word.
                    </li>
                    <li>
                      <span>*</span>Is significantly diffrent from previous
                      password.
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default change_txpassword;
