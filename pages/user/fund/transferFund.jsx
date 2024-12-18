import React, { useState, useEffect, useContext } from "react";
import { common } from "../../../src/helper/Common";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import styles from "./fund.module.css";

const TransferFund = () => {
  const [getAllUserData, setGetAllUserData] = useState({});
  const [fundWalletBalance, setFundWalletBalance] = useState();
  const [amount, setAmount] = useState();
  const [enteredUserId, setEnteredUserId] = useState("");
  const [matchedUserName, setMatchedUserName] = useState("");
  const [getCurrentUserId, setCurrentUserId] = useState("");
  const [getCurrentBalance, setCurrentBalance] = useState();
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const getUserDashboardAnalytics = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getUserDashboardAnalytics",
        data: {},
      },
      (resp) => {
        if (resp && resp.status === "success" && resp.data) {
          setFundWalletBalance(resp.data);
          AlertMsg("success", "Congratulations!");
        } else {
          AlertMsg("error", "Error", "Failed to fetch wallet balances.");
        }
      }
    );
  };

  const getCurrentUser = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: {},
      },
      (resp) => {
        setCurrentUserId(resp.data);
      }
    );
  };

  const getUserProfile = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: {
          userId: enteredUserId,
        },
      },
      (resp) => {
        setGetAllUserData(resp.data);
      }
    );
  };

  const handleTransferFundSubmit = (event) => {
    event.preventDefault();

    const userId = getCurrentUserId._id ? getAllUserData._id : "";
    const payload = {
      userId: userId,
      amount: parseFloat(amount),
      walletType: "fund_wallet",
    };

    common.getAPI(
      {
        method: "POST",
        url: "transaction/userFundTransfer",
        data: payload,
      },
      (resp) => {
        if (resp.status === "success") {
          setCurrentBalance(resp.data.currentWalletBalance);
          AlertMsg(`${resp.data.message}`);
        } else if (resp.status === "error") {
          AlertMsg(
            "error",
            "Oops!",
            resp.message || "Failed to transfer the fund."
          );
        }
      }
    );
    setAmount("");
    setEnteredUserId("");
    setMatchedUserName("");
  };

  const handleUsernameInputChange = async (e) => {
    const userId = e.target.value;
    setEnteredUserId(userId);
    if (!userId.trim()) {
      setMatchedUserName("");
      return;
    }

    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: { userId },
      },
      (resp) => {
        setMatchedUserName(resp.data.name);
      }
    );
  };

  useEffect(() => {
    getCurrentUser();
    getUserProfile();
    getUserDashboardAnalytics();
  }, []);

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_addfund_section_container}`
            : `${styles.addfund_section_container}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/fund</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Fund Transfer
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-xl-12">
                <div className={`card ${styles.fund_transfer_sec}`}>
                  <div className="row">
                    <div className="col-xl-6">
                      <img
                        src="/images/dashboard/fund_add.png"
                        alt="Activate"
                        className={styles.img_fluid}
                      />
                    </div>
                    <div className={`col-xl-6 ${styles.transfer_form}`}>
                      <div className="row d-block">
                        <div className="d-flex justify-content-sm-end">
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: "800",
                              marginRight: "20px",
                            }}
                          >
                            Fund wallet:
                            <span style={{ color: "green" }}>
                              ₹
                              {getCurrentBalance ||
                                fundWalletBalance?.fundWalletBalance ||
                                0}
                            </span>
                          </p>
                        </div>
                        <div className="row">
                          <form onSubmit={handleTransferFundSubmit}>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label>Username (User ID): </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Enter User ID"
                                  value={enteredUserId}
                                  onChange={handleUsernameInputChange}
                                />
                              </div>
                              {matchedUserName && (
                                <p>
                                  Username is:
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "green",
                                    }}
                                  >
                                    {matchedUserName}
                                  </span>
                                </p>
                              )}
                            </div>
                            <div className="col-sm-6 col-md-12">
                              <div className="mb-3">
                                <label>Amount: </label>
                                <input
                                  className="form-control"
                                  type="number"
                                  name="amount"
                                  placeholder="Enter Amount"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="text-start">
                              <button className="btn btn-success" type="submit">
                                Transfer
                              </button>
                            </div>
                          </form>
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
    </div>
  );
};

export default TransferFund;
