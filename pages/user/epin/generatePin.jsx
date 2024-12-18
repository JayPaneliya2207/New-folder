import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import styles from "./epin.module.css";

const GeneratePin = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const handleOnUserGeneratePin = (event) => {
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
            generate_pin
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row d-flex justify-content-center mt-4">
          <div className={`col-xl-8`}>
            <form className={`card ${styles.generate_pin}`}>
              <div className="d-flex">
                <div className={`col-xl-6 ${styles.pin_gen_img}`}>
                  <img src="/images/dashboard/pin_gen.jpg" alt="" />
                </div>
                <div className={`card-body ${styles.epin_body}`}>
                  <div className="col-sm-8 col-md-10">
                    <div className="mb-3">
                      <select
                        className={`form-control w-100 ${styles.customSelect}`}
                        name=""
                      >
                        <option value="0">Select pin</option>
                        <option value="1">Package</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-8 col-md-10">
                    <div className="mb-3">
                      <input
                        className="form-control w-100"
                        type="number"
                        placeholder="Enter No. of pins"
                      />
                    </div>
                  </div>
                  <button
                    className={`btn btn-info ${styles.request_history_btn}`}
                    type="button"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePin;
