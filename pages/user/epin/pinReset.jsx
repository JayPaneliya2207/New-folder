import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import styles from "./epin.module.css";

const pinReset = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const handleOnUserPinRequest = (event) => {
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
          AlertMsg("successfuly submit");
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
            ? `${styles.darkmode_epin_contain_section}`
            : `${styles.epin_contain_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/epin</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            pin_request
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row">
          <div className="col-12">
            <form className={`card ${styles.pin_request}`}>
              <div className="card-body">
                <div className={`d-flex flex-wrap ${styles.response_pin_req}`}>
                  {/* Left Column */}
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className={`${styles.response_pin_request}`}>
                      <div className={`text-center ${styles.response_pin_img}`}>
                        <img
                          src="/images/dashboard/pin_request.png"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label>Username</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter user name"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label>Utr Number</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter utr number"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label>Slip</label>
                          <input type="file" className="form-control" />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label>Select Pin</label>
                          <select
                            className={`form-control ${styles.customSelect}`}
                            name=""
                          >
                            <option value="0">Select pin</option>
                            <option value="1">Package</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label>Number of Pins</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Number of pins"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label>Remark</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Remarks"
                          />
                        </div>
                      </div>

                      <div className="col-12 text-start">
                        <button className="btn btn-info " type="button">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pinReset;
