import React, { useEffect, useRef, useState, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { FaRegCopy } from "react-icons/fa6";
import { common } from "../../../src/helper/Common";
import { AlertMsg } from "../../../src/helper/helper";
import styles from "./fund.module.css";

const FundResult = () => {
  const [method, setMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState();
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentSlip, setPaymentSlip] = useState("");
  const [txNumber, setTxNumber] = useState("hgh4578");
  const [debitCredit, setDebitCredit] = useState("CREDIT");
  const [getpayment, setGetPayment] = useState([]);
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const fileInputRef = useRef(null); // Add ref for the file input

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const getPaymentMethodList = () => {
    common.getAPI(
      {
        method: "POST",
        url: "/generalSettings/getPaymentMethods",
      },
      (resp) => {
        setGetPayment(resp.data);
      }
    );
  };

  const handlePaymentTypeChange = (e) => {
    const selectedPayment = e.target.value;
    setPaymentType(selectedPayment);

    if (selectedPayment === "gpay") {
      setAddress("addressForGPay12345");
    } else if (selectedPayment === "phonepe") {
      setAddress("addressForPhonePe67890");
    } else {
      setAddress("");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setPaymentSlip(e.target.files[0].name);
    }
  };

  const handleFundRequestSubmit = async (e) => {
    e.preventDefault();

    if (!method || !debitCredit || !amount || !txNumber || !paymentSlip) {
      AlertMsg("error", "Oops!", "All required fields must be filled.");
      return;
    }

    const payload = {
      txType: "fund_request",
      debitCredit: debitCredit,
      walletType: "fund_wallet",
      amount: amount,
      paymentSlip: paymentSlip,
      txNumber: utrNumber,
      method: method,
    };

    common.getAPI(
      {
        method: "POST",
        url: "transaction/createFundTransactionRequest",
        data: payload,
      },
      (resp) => {
        if (resp.status === "success") {
          AlertMsg(
            "success",
            "Success!",
            "Transaction submitted successfully."
          );

          // Reset all input fields after successful submission
          setGetPayment("");
          setMethod("");
          setPaymentType("");
          setAddress("");
          setAmount("");
          setUtrNumber("");
          setPaymentSlip("");
          setTxNumber("");
          setDebitCredit("CREDIT");

          // Reset the file input field
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          AlertMsg(
            "error",
            "Oops!",
            resp.message || "Failed to submit the transaction request."
          );
        }
      }
    );
  };

  useEffect(() => {
    getPaymentMethodList();
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
            Fund Request
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row">
          <div className="col-xl-6">
            <form
              className={`card ${styles.addfuns_walet}`}
              onSubmit={handleFundRequestSubmit}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Method</label>
                      <select
                        className="form-control btn-square"
                        onChange={handleMethodChange}
                      >
                        <option value="">Select Method</option>
                        {getpayment &&
                          getpayment.map((method, index) => (
                            <option key={index} value={method.slug}>
                              {method.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Payment Type</label>
                      <select
                        className="form-control btn-square"
                        onChange={handlePaymentTypeChange}
                      >
                        {method === "USDT" ||
                        method === "gpay" ||
                        method === "phonepe" ? (
                          <>
                            <option value="0">Select Payment Type</option>
                            <option value="gpay">GPay</option>
                            <option value="phonepe">PhonePe</option>
                          </>
                        ) : (
                          <option value="0">Select</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="000000"
                        onChange={(e) => setAmount(Number(e.target.value))} // Convert to number
                        value={amount}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>UTR Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter UTR Number"
                        onChange={(e) => setUtrNumber(e.target.value)}
                        value={utrNumber}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Payment Slip</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Upload Payment Slip"
                        onChange={handleFileChange}
                        ref={fileInputRef} // Add ref here
                      />
                    </div>
                  </div>

                  <div className="text-start">
                    <button
                      className={`btn btn-success ${styles.fund_request_btn}`}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-xl-6">
            <form className={`card ${styles.addfuns_result}`}>
              <div className="card-body">
                <div className="row">
                  <h3>QR Code</h3>
                  {paymentType && address && (
                    <>
                      <div>
                        <img
                          src="/images/dashboard/QRcode.png"
                          className={styles.qrcode_section}
                          alt="QR Code"
                        />
                        <h5>
                          Address:
                          <span style={{ color: "green" }}>{address}</span>
                        </h5>
                        <div className={styles.wallet_input}>
                          <input
                            type="text"
                            className={`form-control ${styles.linkToCopy}`}
                            value={address}
                            readOnly
                          />
                          <button
                            className={styles.copyButton}
                            onClick={(e) => {
                              e.preventDefault();
                              copyToClipboard(address);
                            }}
                          >
                            <FaRegCopy />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundResult;
