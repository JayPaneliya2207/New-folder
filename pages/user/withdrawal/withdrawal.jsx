import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import styles from "./withdrawal.module.css";

const withdrawal = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const [walletType, setWalletType] = useState("");
  const [amount, setAmount] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");

  const handleWalletChange = (event) => {
    const selectedWalletType = event.target.value;
    setWalletType(selectedWalletType);

    if (selectedWalletType) {
      const payload = { walletType: selectedWalletType };

      common.getAPI(
        {
          method: "POST",
          url: "user/getCurrentWalletBalance",
          data: payload,
        },
        (resp) => {
          if (resp.status === "success") {
            setCurrentBalance(resp.data.currentWalletBalance);
            AlertMsg("success");
          } else {
            AlertMsg(resp.message || "Failed to fetch the wallet balance.");
            setCurrentBalance("");
          }
        }
      );
    } else {
      setCurrentBalance("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amounts = Number(amount);

    const payload = {
      txType: "Withdrawal",
      debitCredit: "DEBIT",
      walletType,
      amount,
    };

    common.getAPI(
      {
        method: "POST",
        url: "withdrawal/createRequest",
        data: payload,
      },
      (resp) => {
        if (resp.status === "success") {
          console.log("=-=========", resp);
          AlertMsg("Successfully retrieved wallet balance");
        } else {
          AlertMsg(resp.data);
        }
      }
    );
    setWalletType("");
    setAmount("");
    event.target.reset();
  };

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_withdrwal_section_container}`
            : `${styles.withdrwal_section_container}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/Fund</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Withdrawal
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={`row ${styles.withdrawal_sect}`}>
          <div className="col-xl-6">
            <form className={`card ${styles.withdrawal_section}`}>
              <div className="card-body">
                <div className="row">
                  <h4>Withdraw</h4>
                  <div className={`card-body ${styles.main_Withdraw}`}>
                    <div className={styles.main_balance}>
                      <div>
                        <h3>PAYOUT PAID AMOUNT</h3>
                        <h1>$ 0</h1>
                      </div>
                      <div className={styles.dolo_icon}>
                        <span>₹</span>
                      </div>
                    </div>
                    <div className={styles.Withdraw_row}>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="main_box">
                          <h4>Minimum Withdrawal</h4>
                          <h6>₹&nbsp;20 </h6>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className={styles.main_box}>
                          <h4>Withdrawal Conditions</h4>
                          <h6>
                            <ul>
                              <li>All the Withdrawals Available Sunday</li>
                            </ul>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xl-6 mt-2">
            <form
              className={`card ${styles.withdrawal_section}`}
              onSubmit={handleSubmit}
            >
              <div className="card-body">
                <div className="row">
                  <div className={`card-body ${styles.main_Withdraw_form}`}>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label>Select Wallet</label>
                        <select
                          className="form-control btn-square"
                          value={walletType}
                          onChange={handleWalletChange}
                          required
                        >
                          <option value="">Select Wallet</option>
                          <option value="main_wallet">Main Wallet</option>
                          <option value="fund_wallet">Fund Wallet</option>
                        </select>
                        {walletType ? (
                          <p>
                            Your
                            <strong style={{ color: "gray", fontSize: "15px" }}>
                              {walletType}
                            </strong>
                            balance is :-
                            <strong
                              style={{ color: "green", fontSize: "15px" }}
                            >
                              {currentBalance}
                            </strong>
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className={styles.Withdraw_row}>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="mb-1">Enter Amount</label>
                          <input
                            type="number"
                            name="amount"
                            className="form-control"
                            placeholder="000000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="text-start">
                        <button className="btn btn-info" type="submit">
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

export default withdrawal;
