/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router"; // Import useRouter
import { common } from "../../../src/helper/Common";

const ViewWithdrawal = () => {
  const router = useRouter(); // Use useRouter hook
  const [withdrawals, setWithdrawals] = useState([]);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const viewQuery = router.query?.id; // Access the query parameters

  const formatWithdrawals = (data) => {
    return data.map((item) => {
      const amount = parseFloat(item.amount || 0);
      const txCharge = parseFloat(item.txCharge || 0);
      const payableAmount = amount - (amount * txCharge) / 100;

      return {
        id: item._id,
        username: item.uCode?.username || "N/A",
        name: item.uCode?.name || "N/A",
        email: item.uCode?.email || "N/A",
        type: item.txType || "N/A",
        amount: amount.toFixed(2),
        status: item.status === 0 ? "Pending" : "Completed",
        date: new Date(item.createdAt).toLocaleDateString(),
        txCharge: txCharge.toFixed(2),
        payableAmount: payableAmount.toFixed(2),
        accountDetails: item.walletType || "N/A",
      };
    });
  };

  const fetchWithdrawals = () => {
    setLoading(true);
    common
      .getAPI(
        {
          method: "POST",
          url: "/withdrawal/getTransactions",
          data: {},
        },
        (resp) => {
          const formattedWithdrawals = formatWithdrawals(resp.data);
          setWithdrawals(formattedWithdrawals);
          setLoading(false);
        }
      )
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert("An error occurred while fetching data. Please try again.");
      });
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleAction = (status) => {
    if (!currentWithdrawal) {
      alert("No withdrawal selected.");
      return;
    }

    const payload = {
      id: currentWithdrawal.id,
      status: status,
    };

    const response = common.getAPI({
      method: "POST",
      url: "/withdrawal/updateTransactions",
      data: payload,
    });
    console.log("API Response:", response);
    if (response && response.status === "success") {
      alert(
        status === 1
          ? "Withdrawal approved successfully!"
          : "Withdrawal canceled successfully!"
      );
      fetchWithdrawals();
      // fetchWithdrawals();
      // if (status === 1) {
      //   router.push("/approved");
      // }

      // if (status === 2) {
      //   router.push("/canceled");
      // }
    }
  };

  const currentWithdrawal = withdrawals.find(
    (withdrawal) => withdrawal.id === viewQuery
  );

  return (
    <div className="container-fluid">
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h4 className="page-title">Withdrawal Details</h4>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/dashboard">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Withdrawals</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pending</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Withdrawal Detail
            </li>
          </ol>
        </div>
      </div>

      <h6 className="text-uppercase">Withdrawal Detail</h6>
      <hr />

      <div className="row">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-hover">
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                ) : currentWithdrawal ? (
                  <>
                    <tr>
                      <th>User</th>
                      <td>:</td>
                      <td>{currentWithdrawal.name}</td>
                    </tr>
                    <tr>
                      <th>Amount</th>
                      <td>:</td>
                      <td>{currentWithdrawal.amount}</td>
                    </tr>
                    <tr>
                      <th>Account Details</th>
                      <td>:</td>
                      <td>{currentWithdrawal.accountDetails}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>:</td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            currentWithdrawal.status === "Pending"
                              ? "badge-warning"
                              : "badge-success"
                          }`}
                          style={{
                            background:
                              currentWithdrawal.status === "Pending"
                                ? "#fb6340"
                                : "#28a745",
                          }}
                        >
                          {currentWithdrawal.status}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>:</td>
                      <td>{currentWithdrawal.date}</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan="3">No data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4">
          <form>
            <div className="form-group">
              <label htmlFor="reason">
                Reason (Provide a reason for cancellation)
              </label>
              <textarea
                name="reason"
                id="reason"
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="form-group mt-2 d-flex gap-2">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleAction(1)}
                disabled={loading}
              >
                {loading ? "Processing..." : "Approve"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleAction(2)}
                disabled={loading}
              >
                {loading ? "Processing..." : "Cancel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewWithdrawal;
