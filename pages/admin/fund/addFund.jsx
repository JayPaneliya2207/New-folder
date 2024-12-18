import React, { useState } from "react";
import { common } from "../../../src/helper/Common.js";
import style from "./pagination.module.css";

const AddFund = () => {
  const [formData, setFormData] = useState({ username: "", amount: "" });
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      setUserName("");
      setUserId("");
      setValidationError("");
      if (value.trim() === "") {
        setValidationError("Please enter a username.");
        return;
      }

      common.getAPI(
        {
          method: "POST",
          url: "admin/getUser",
          data: { id: value.trim() },
        },
        (response) => {
          if (response.status === "success" && response.data) {
            const user = response.data;

            if (user) {
              setUserName(user.name);
              setUserId(user._id);
            } else {
              setValidationError("Invalid Username.");
            }
          } else {
            setValidationError("Error fetching username.");
          }
        },
        (error) => {
          console.error("Error fetching username:", error);
          setValidationError("An error occurred. Please try again.");
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      setValidationError("Please select a valid user.");
      return;
    }

    const confirmTransfer = window.confirm("Are you sure you want to submit?");
    if (confirmTransfer) {
      setIsLoading(true);
      const payload = {
        userId: userId,
        debitCredit: "CREDIT",
        walletType: "fund_wallet",
        amount: formData.amount,
      };
      common.getAPI(
        {
          method: "POST",
          url: "/transaction/directFundTransfer",
          data: payload,
        },
        (response) => {
          if (response.status === "success") {
            alert("Fund transfer successful!");
            setFormData({ username: "", amount: "" });
            setUserName("");
            setUserId("");
          } else {
            alert("Failed to transfer funds: " + response.message);
          }
          setIsLoading(false);
        },

        (error) => {
          console.error("Error transferring funds:", error);
          alert("An error occurred while transferring funds.");
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <div className="container my-4">
      <div className="row align-items-center mb-4">
        <div className="col-lg-8">
          <h4 className="page-title">Fund Transfer</h4>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="https://jeevannarogya.com/admin/dashboard">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Fund</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Fund Transfer
            </li>
          </ol>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label
                htmlFor="usernameInput"
                className="form-label"
                style={{ textTransform: "uppercase" }}
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="usernameInput"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Username"
                required
              />
              <div
                className={`mt-2 d-block  ${
                  validationError
                    ? "text-danger"
                    : userName
                    ? "text-success"
                    : ""
                }`}
              >
                {validationError || (userName && `Name: ${userName}`)}
              </div>
            </div>

            <div className="form-group mb-3">
              <label
                htmlFor="amountInput"
                className="form-label"
                style={{ textTransform: "uppercase" }}
              >
                Enter Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amountInput"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="form-control"
                placeholder="Enter Amount"
                required
              />
            </div>

            <div className="text-end">
              <button
                type="submit"
                className={style.paginationBtn}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Transfer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFund;
