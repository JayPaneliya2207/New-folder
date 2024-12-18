/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from "react";
import { common } from "../../../src/helper/Common";

const CancelledWithdrawals = () => {
  const [filters, setFilters] = useState({
    username: "",
    name: "",
    limit: 10,
    page: 1,
  });
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = (filters = {}) => {
    common.getAPI(
      {
        method: "POST",
        url: "/withdrawal/getTransactions",
        data: { ...filters, status: 1 },
      },
      (resp) => {
        const formattedWithdrawals = formatWithdrawals(resp.data);
        setWithdrawals(formattedWithdrawals);
        setTotalPages(Math.ceil(resp.total / filters.limit));
        setLoading(false);
      }
    );
  };
  const formatWithdrawals = (data) => {
    return data.map((item) => {
      const amount = item.amount || 0;
      const txCharge = parseFloat(item.txCharge || 0);
      const payableAmount = amount - (amount * txCharge) / 100;

      return {
        id: item._id,
        username: item.uCode?.username,
        name: item.uCode?.name,
        email: item.uCode?.email,
        type: item.txType,
        amount: amount,
        status: item.status === 0 ? "Pending" : "cancelled",
        date: new Date(item.createdAt).toLocaleDateString(),
        txCharge: txCharge.toFixed(2),
        payableAmount: payableAmount.toFixed(2),
      };
    });
  };
  useEffect(() => {
    fetchWithdrawals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pages_container">
      <div className="container-fluid">
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Cancelled Withdrawals</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Withdrawals</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Cancelled
              </li>
            </ol>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <h6 className="text-uppercase">Cancelled Withdrawals</h6>
        <hr />
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="row align-items-center">
                <div className="col-12 col-sm-3 col-md-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    className="form-control"
                    value={filters.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 col-sm-3 col-md-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    name="name"
                    className="form-control"
                    value={filters.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 col-sm-3 col-md-2 mb-2">
                  <select
                    name="limit"
                    className="form-control"
                    value={filters.limit}
                    onChange={handleInputChange}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                  </select>
                </div>
                <div className="col-12 col-md-2 mb-2">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary w-100"
                  >
                    Filter
                  </button>
                </div>
                <div className="col-12 col-md-1 mb-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary w-100"
                    onClick={() =>
                      setFilters({ username: "", name: "", limit: 10 })
                    }
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>

            <br />
            <br />
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Tx User</th>
                    <th>Amount</th>
                    <th>Tx Charge</th>
                    <th>Payable Amount</th>
                    <th>Account Details</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((withdrawal, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {withdrawal.name}
                        {withdrawal.username && " "}
                        {withdrawal.username && (
                          <small>({withdrawal.username})</small>
                        )}
                        <br />
                      </td>{" "}
                      <td>{withdrawal.amount}</td>
                      <td>{withdrawal.txCharge}</td>
                      <td>{withdrawal.payableAmount}</td>
                      <td>{withdrawal.accountDetails}</td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            withdrawal.status === "Pending"
                              ? "badge-warning"
                              : "badge-danger"
                          }`}
                          style={{
                            background:
                              withdrawal.status === "Pending"
                                ? "#fb6340"
                                : "#dc3545",
                          }}
                        >
                          {withdrawal.status}
                        </span>
                      </td>
                      <td>{withdrawal.reason}</td>
                      <td>{withdrawal.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelledWithdrawals;
