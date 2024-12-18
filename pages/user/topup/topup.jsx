// TopUp.js
import React, { useState, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import Activate from "./activate";
import UpgradeAccount from "./upgradeAccount";
import styles from "./topup.module.css";

const TopUp = () => {
  const [isActivateMode, setIsActivateMode] = useState(true);
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const handleToggle = () => {
    setIsActivateMode((prevMode) => !prevMode);
  };

  return (
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
            {isActivateMode ? "Activate" : "Upgrade"}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={`row d-flex justify-content-center`}>
          {isActivateMode ? (
            <Activate handleToggle={handleToggle} />
          ) : (
            <UpgradeAccount handleToggle={handleToggle} />
          )}

          <div className="col-sm-8 mt-4">
            <div className={`card ${styles.topup_steps_activate}`}>
              <div className="card-body">
                <div className="detail_topup">
                  <h4>Steps for {isActivateMode ? "Topup" : "Re-Topup"}</h4>
                  <p>
                    <i
                      className="fa fa-check-square m-1"
                      aria-hidden="true"
                    ></i>
                    You can {isActivateMode ? "topup" : "re-topup"} any user ID.
                  </p>
                  <p>
                    <i
                      className="fa fa-check-square m-1"
                      aria-hidden="true"
                    ></i>
                    Enter the username you want to
                    {isActivateMode ? "topup" : "re-topup"}.
                  </p>
                  <p>
                    <i
                      className="fa fa-check-square m-1"
                      aria-hidden="true"
                    ></i>
                    Select the package from the dropdown menu, and then click on
                    the topup button.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
