import React, { useContext, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import { AlertMsg } from "../../../src/helper/helper";
import styles from "./fund.module.css";

const fundConvert = () => {
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

    if (parseFloat(amount) > parseFloat(currentBalance)) {
      AlertMsg(
        "Amount exceeds current balance. Please enter a smaller amount."
      );
      return;
    }

    const payload = {
      txType: "withdrawal",
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
          AlertMsg(`Conversion successful: ${resp.data.message}`);
        } else {
          AlertMsg(resp.message || "Failed to convert the wallet balance.");
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
            ? styles.darkmode_addfund_section_container
            : styles.addfund_section_container
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
            Add Fund History
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={`row ${styles.fundConvert_sec}`}>
          <div className="col-xl-6">
            <form
              className={`card ${styles.addfuns_walet}`}
              onSubmit={handleSubmit}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Select From Wallet</label>
                      <select
                        className="form-control btn-square"
                        required
                        value={walletType}
                        onChange={handleWalletChange}
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
                          <strong style={{ color: "green", fontSize: "15px" }}>
                            {currentBalance}
                          </strong>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Select To Wallet</label>
                      <select
                        className="form-control btn-square"
                        value={walletType}
                        required
                      >
                        <option value="">Select Wallet</option>
                        <option value="main_wallet">Main Wallet</option>
                        <option value="fund_wallet">Fund Wallet</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Enter Amount</label>
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
                    <button className="btn btn-success" type="submit">
                      Convert
                    </button>
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

export default fundConvert;
