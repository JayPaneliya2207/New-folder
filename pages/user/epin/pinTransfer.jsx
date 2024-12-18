import React, { useContext } from "react";
import { VscFolderActive } from "react-icons/vsc";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { TbPinnedFilled } from "react-icons/tb";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import styles from "./epin.module.css";

const PinTransfer = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserGetPinTransfer = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: {},
      },
      (resp) => {
        console.log("===============", resp);
      }
    );
  };

  const handleOnUserPinTransfer = (event) => {
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
            pin Request
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row">
          <div className="col-xl-12 mt-3">
            <div
              className={` card ${
                darkMoreMainSection
                  ? `${styles.darkmode_epin_transfer}`
                  : `${styles.epin_transfer}`
              }`}
            >
              <div className={`card-body`}>
                <div className="row text-center">
                  <div className={`col-md-4 p-3 ${styles.active_balance}`}>
                    <div className="d-flex flex-column align-items-center">
                      <VscFolderActive size={40} className="mb-2" />
                      <h6>Active E-pin Balance</h6>
                      <h5>
                        0 <TbPinnedFilled />
                      </h5>
                    </div>
                  </div>
                  <div className={`col-md-4 p-3 ${styles.pending_balance}`}>
                    <div className="d-flex flex-column align-items-center">
                      <MdOutlinePendingActions size={40} className="mb-2" />
                      <h6>Available E-pin Balance</h6>
                      <h5>
                        0 <TbPinnedFilled />
                      </h5>
                    </div>
                  </div>
                  <div className={`col-md-4 p-3 ${styles.wallet_balance}`}>
                    <div className="d-flex flex-column align-items-center">
                      <GiWallet size={40} className="mb-2" />
                      <h6> Pending E-pin Balance</h6>
                      <h5>
                        0 <TbPinnedFilled />
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 mt-3">
            <form className={`card ${styles.generate_pin}`}>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="">Username</label>
                      <input
                        className="form-control w-100"
                        type="text"
                        placeholder="Enter Username"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="">Select Pin</label>
                      <select
                        className={`form-control w-100 ${styles.customSelect}`}
                        name=""
                      >
                        <option value="0">Select pin</option>
                        <option value="1">Package</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="">No. of Pins</label>
                      <input
                        className="form-control w-100"
                        type="number"
                        placeholder="No. of pins"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                <button
                  className={`btn btn-success ${styles.request_history_btn}`}
                  type="button"
                >
                  Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinTransfer;
