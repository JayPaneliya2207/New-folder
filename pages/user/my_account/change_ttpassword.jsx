import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import { common } from "../../../src/helper/Common";
import Link from "next/link";
import styles from "./myaccount.module.css";

const change_ttpassword = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const handlettpassword = (event) => {
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
            ? `${styles.darkmode_ttpassword_section}`
            : `${styles.ttpassword_section}`
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
            Tt Password
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
                        SET TRANSACTION PASSWORD
                      </h2>
                      <div className="mb-3">
                        <label className={`text-white ${styles.ttlabel}`}>
                          Enter Transaction Password
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Set Transaction Password"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-12">
                      <div className="mb-3">
                        <label className={`text-white ${styles.ttlabel}`}>
                          Enter Confirm Transaction Password
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Confirm Transaction Password"
                        />
                      </div>
                    </div>
                    <div className="text-start">
                      <button
                        className={`btn btn-info ${styles.ttbtn}`}
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default change_ttpassword;
